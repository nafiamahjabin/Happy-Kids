import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Movies } from '../models/movies.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Url } from 'url';
@Component({
  selector: 'app-movieframe',
  templateUrl: './movieframe.component.html',
  styleUrls: ['./movieframe.component.css']
})
export class MovieframeComponent implements OnInit {
  safeURL: SafeResourceUrl[] =[];
  constructor(private httpClient: HttpClient, private router: Router, private _sanitizer: DomSanitizer) {
   
   }
  movies: Movies[] = [];
 

  getAllMovies (){
    
    let url= 'http://localhost:3000/getMovies';
    this.httpClient.get(url).subscribe( (result: any) => {
      
      result.forEach((movie: any) => {
        let mov: Movies= movie;
        this.movies.push(mov);
        let url = this._sanitizer.bypassSecurityTrustResourceUrl(mov.mov_src);
        this.safeURL.push(url);
        
        
      })
    })
  }
  ngOnInit() {
    this.getAllMovies();
    }
    
}
