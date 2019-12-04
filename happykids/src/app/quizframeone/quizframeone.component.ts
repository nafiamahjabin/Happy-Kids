import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Quiz } from '../models/quiz';
import { ServiceoneService } from '../serviceone.service';
import { filter } from 'minimatch';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-quizframeone',
  templateUrl: './quizframeone.component.html',
  styleUrls: ['./quizframeone.component.css']
})
export class QuizframeoneComponent implements OnInit {

  constructor(private httpClient: HttpClient, private router:Router, private serviceone:ServiceoneService) { }
  url = 'http://localhost:3000';
  isrunning=false;
  isupcomming=false;
  ispast=false;
  runningQuiz:Quiz[]=[];
  upcommingQuiz:Quiz[]=[];
  pastQuiz:Quiz[]=[];
  logged_in=false;
  err=false;
  getAllRunningQuiz()
  {
    this.httpClient.get(this.url+'/running-quiz').subscribe((result:any) => {
      if(result.length>=1) this.isrunning=true;
      result.forEach((q:any) => {
       let quiz = new Quiz();
       quiz = q;
       this.runningQuiz.push(quiz);
      
      });

    })

  }
  getAllUpcommingQuiz()
  {
    this.httpClient.get(this.url+'/upcomming-quiz').subscribe((result:any) => {
      if(result.length>=1) this.isupcomming=true;
      result.forEach((q:any) => {
       let quiz = new Quiz();
       quiz = q;
       this.upcommingQuiz.push(quiz);

      });

    })


  }
  getAllPastQuiz()
  {
    this.httpClient.get(this.url+'/past-quiz').subscribe((result:any) => {
      if(result.length>=1) this.ispast=true;
      result.forEach((q:any) => {
       let quiz = new Quiz();
       quiz = q;
       this.pastQuiz.push(quiz);

      });

    })


  }
  isLoggedIn()
  {
     let token = {
      access_token: localStorage['access_token']
    }
    this.httpClient.post(this.url+'/token-decode', token).subscribe((result:any)=> {
      this.logged_in= result.logged_in;
    })
  }
  ngOnInit() {
    this.getAllPastQuiz();
    this.getAllRunningQuiz();
    this.getAllUpcommingQuiz();
    this.isLoggedIn();
  }
  
  onParticipateClick(quizTitle:any){
   if(this.logged_in) {
     this.err = false;
    this.serviceone.getquizTitle(quizTitle);
    this.router.navigate(['/quiz']);

   }
   else this.err=true;
    
  }
  onStandingsClick(quizTitle:any){
    this.serviceone.getStandingData(quizTitle);
    this.router.navigate(['/quiz-tests/standings']);
  }
}
