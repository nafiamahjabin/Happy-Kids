import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cms',
  templateUrl: './cms.component.html',
  styleUrls: ['./cms.component.css']
})
export class CmsComponent implements OnInit {
  cartoon = {
    title: '',
    src: '',
    category: ''
  };
  poem = {
    title: '',
    src: '',
    category: ''
  };
  movie = {
    title: '',
    src: ''
  };
  addMovie = false;
  addCartoon = false;
  addPoem = false;
  constructor(private httpClient: HttpClient, private router: Router) { }
  token = {
    access_token: localStorage['access_token']
  };
  hasAccess = false;
  checkloggedIn()
  {
      let url = 'http://localhost:3000/token-decode';
     
      this.httpClient.post(url,this.token).subscribe((result:any) => {
         if(result.logged_in && result.username=='admin') this.hasAccess = true;
      })

  }
  ngOnInit() {
    this.checkloggedIn();
  }
  trytoAddCartoon()
  {
    let url='http://localhost:3000/addCartoon';
    this.httpClient.post(url, this.cartoon).subscribe((result:any) => {
      alert(result.message);
    
    })
    
  }
  
  trytoAddPoem()
  {
    let url='http://localhost:3000/addPoem';
    this.httpClient.post(url, this.poem).subscribe((result:any) => {
      alert(result.message);
    
    })
    
  }
  
  trytoAddMovie()
  {
    let url='http://localhost:3000/addMovie';
    this.httpClient.post(url, this.movie).subscribe((result:any) => {
      alert(result.message);
    
    })
    
  }
  showMovieForm(){
    this.addMovie = true;
    this.addCartoon = false;
    this.addPoem=false;
  }
  showCartoonForm(){
    this.addCartoon = true;
    this.addMovie = false;
    this.addPoem = false;
  }
  
  showPoemForm(){
    this.addCartoon = false;
    this.addMovie = false;
    this.addPoem = true;
  }
  onAddCartoonClick() { 
    this.trytoAddCartoon();
  }
  onAddMovieClick(){
    this.trytoAddMovie();
  }
  
  onAddPoemClick(){
    this.trytoAddPoem();
  }
  setAQuizTest(){
    this.router.navigate(['/set-quiz-test']);
  }

}
