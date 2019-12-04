import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServiceoneService } from '../serviceone.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private httpClient: HttpClient, private serviceone: ServiceoneService, private router: Router) { }
  name1=''; name2=''; name3=''; cls1=''; cls2=''; cls3='';school1='';school2='';school3='';
  username1='';
  username2='';
  username3='';
  quizTitle='';
  cname1=''; cname2=''; cname3='';cname4='';ccls4=''; ccls1=''; ccls2=''; ccls3='';
  pname1=''; pname2=''; pname3='';pname4='';pcls4=''; pcls1=''; pcls2=''; pcls3='';
  mname1=''; mname2=''; mname3='';mname4='';
  getRecentQuiz()
  {
    this.httpClient.get('http://localhost:3000/recent-quiz').subscribe((result:any)=>{
      let i=0;
      console.log(result);
     
      result.forEach((r: any)=>{
        if(i==0) 
        {
         this.quizTitle=r.quizTitle;
          this.name1=r.firstname+' '+r.lastname;
          this.cls1 = r.class;
          this.school1 = r.school;
          this.username1=r.username;

        }
        else if(i==1)
        {
          
          this.name2=r.firstname+' '+r.lastname;
          this.cls2 = r.class;
          this.school2 = r.school;
          this.username2=r.username;

        }
        else if(i==2) 
        {
          
          this.name3=r.firstname+' '+r.lastname;
          this.cls3 = r.class;
          this.school3 = r.school;
          this.username3=r.username;
        }
        i=i+1;

      })

    })
  }
  getRecentCartoons()
  {
    this.httpClient.get('http://localhost:3000/recent-cartoon').subscribe((result:any)=>{
      let i=0;
      result.forEach((r: any)=>{
        if(i==0) 
        {
          this.cname1=r.car_title;
          this.ccls1 = r.car_category;

        }
        else if(i==1)
        {
          
          this.cname2=r.car_title;
          this.ccls2 = r.car_category;

        }
        else if(i==2) 
        {
          
          this.cname3=r.car_title;
          this.ccls3 = r.car_category;
        }
        
        else if(i==3) 
        {
          
          this.cname4=r.car_title;
          this.ccls4 = r.car_category;
        }
        i=i+1;

      })
    })
  
  }
  
  getRecentMovies()
  {
    this.httpClient.get('http://localhost:3000/recent-movie').subscribe((result:any)=>{
      let i=0;
      result.forEach((r: any)=>{
        if(i==0) 
        {
          this.mname1=r.mov_title;

        }
        else if(i==1)
        {
          
          this.mname2=r.mov_title;

        }
        else if(i==2) 
        {
          this.mname3=r.mov_title;
        }
        
        else if(i==3) 
        {
          this.mname4=r.mov_title;
        }
        i=i+1;

      })
    })
  
  }
  
  getRecentPoems()
  {
    this.httpClient.get('http://localhost:3000/recent-poem').subscribe((result:any)=>{
      let i=0;
      result.forEach((r: any)=>{
        if(i==0) 
        {
          this.pname1=r.po_title;
          this.pcls1 = r.po_category;

        }
        else if(i==1)
        {
          
          this.pname2=r.po_title;
          this.pcls2 = r.po_category;

        }
        else if(i==2) 
        {
          
          this.pname3=r.po_title;
          this.pcls3 = r.po_category;
        }
        
        else if(i==3) 
        {
          
          this.pname4=r.po_title;
          this.pcls4 = r.po_category;
        }
        i=i+1;

      })
    })
  
  }
  onPoemClick(data:any) {
    this.serviceone.getPoemData(data);
    this.router.navigate(['/poem']);
  
  }
  onMovieClick() {
    this.router.navigate(['/movie']);
  }
  onCartoonClick(data:any) {
    this.serviceone.myMethod(data);
    this.router.navigate(['/cartoon']);
  }
  onProfileClick(username) {
    this.serviceone.getProfiledata(username);
    this.router.navigate(['/profile']);
  }
  ngOnInit() {
    this.getRecentQuiz();
    this.getRecentCartoons();
    this.getRecentMovies();
    this.getRecentPoems();
  }

}
