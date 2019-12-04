import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { ServiceoneService } from '../serviceone.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Poems } from '../models/poems.model';

@Component({
  selector: 'app-poem',
  templateUrl: './poem.component.html',
  styleUrls: ['./poem.component.css']
})
export class PoemComponent implements OnInit {

  poems: Poems[] = [];
  safeURL: SafeResourceUrl[] = [];
  constructor(private httpclient: HttpClient, private router: Router, private serviceone: ServiceoneService, private _sanitizer: DomSanitizer) { }
  categoryName = {
    data: ''
  };
  getAllPoemByCategory() {
    this.serviceone.getPoem$.subscribe((data) => {
      if(data.length!=0) sessionStorage['po_category'] = data;
      this.categoryName.data = sessionStorage['po_category'];
      console.log(this.categoryName);
      this.safeURL.length=0;
      this.poems.length=0;
      let url = "http://localhost:3000/getPoem";
      this.httpclient.post(url, this.categoryName).subscribe((result: any) => {
        result.forEach((poem: any) => {

          let p: Poems = poem;

          this.poems.push(p);

          let url = this._sanitizer.bypassSecurityTrustResourceUrl(p.po_src);
          this.safeURL.push(url);
        });


      })
    });

  }

  ngOnInit() {
    this.getAllPoemByCategory();
  }

}
