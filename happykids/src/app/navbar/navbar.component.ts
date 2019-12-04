import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categories } from '../models/categories.model'
import { Router } from '@angular/router'
import { ServiceoneService } from '../serviceone.service';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedin = false;
  name = '';
  username ='';
  cartoon = {
    categoryName: ''
  };
  public data : any ;
  categories: Categories[] =[];
  constructor(private httpClient: HttpClient, private router: Router, private serviceone: ServiceoneService) { }
   token = {
        access_token: localStorage['access_token']
      };
  checkloggedIn()
  {
      let url = 'http://localhost:3000/token-decode';
      
     
      this.httpClient.post(url,this.token).subscribe((result:any) => {
          this.isLoggedin=result.logged_in;
          
          if(this.isLoggedin==true)
          {
              this.name=result.firstname+result.lastname;
              this.username = result.username;
          }
      })

  }
  ngOnInit() {
    this.getCategories();
    this.checkloggedIn();
  }
  getCategories() {
    let url = 'http://localhost:3000/getCategory';
    this.httpClient.get(url).subscribe((result: any) => {
  
      result.forEach((cat: any) => {
        let item: Categories = cat;
        this.categories.push(item);
      })
    })
  }
  onClickCartoon(categoryName) {
    this.data=categoryName;
    this.serviceone.myMethod(this.data);
    this.router.navigate(['/cartoon']);
    
  }
  onMovieClick()
  {
    this.router.navigate(['/movie']);

  } 
  onLoginClick()
  {
      this.router.navigate(['/login']);

  }
  onRegisterClick(){
    this.router.navigate(['/register']);

  }
  onProfileClick(){
    this.serviceone.getProfiledata(this.username);
    console.log(this.username);
    this.router.navigate(['/profile']);

  }
  onLogoutClick(){
      let url = 'http://localhost:3000/logout';

      this.httpClient.get(url).subscribe((result:any)=>{
        localStorage.setItem('access_token', result.access_token);
          this.isLoggedin=false;
          window.location.reload();

      })

  }
  onPoemClick(data:any) {
    this.serviceone.getPoemData(data);
    this.router.navigate(['/poem']);
  }
  onClickQuizTest() {
    this.router.navigate(['/quiz-tests'])
  }

}
