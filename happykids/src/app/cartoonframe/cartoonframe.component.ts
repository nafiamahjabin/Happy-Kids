import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ServiceoneService } from '../serviceone.service';
import { Cartoons } from '../models/cartoons.model';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-cartoonframe',
  templateUrl: './cartoonframe.component.html',
  styleUrls: ['./cartoonframe.component.css']
})
export class CartoonframeComponent implements OnInit {
  cartoons: Cartoons[] = [];
  safeURL: SafeResourceUrl[] = [];
  constructor(private httpclient: HttpClient, private router: Router, private serviceone: ServiceoneService, private _sanitizer: DomSanitizer) { }
  categoryName = {
    data: ''
  };
  getAllCartoonByCategory() {
    this.serviceone.myMethod$.subscribe((data) => {
      if(data.length!=0) sessionStorage['cartoon_category'] = data;
      this.categoryName.data = sessionStorage['cartoon_category'];
      console.log(this.categoryName);
      this.safeURL.length=0;
      this.cartoons.length=0;
      let url = "http://localhost:3000/getCartoon";
      this.httpclient.post(url, this.categoryName).subscribe((result: any) => {
        result.forEach((cartoon: any) => {

          let car: Cartoons = cartoon;

          this.cartoons.push(car);

          let url = this._sanitizer.bypassSecurityTrustResourceUrl(car.car_src);
          this.safeURL.push(url);
        });


      })
    });

  }

  ngOnInit() {
    this.getAllCartoonByCategory();
  }
}
