import { Component, OnInit } from '@angular/core';
import { ServiceoneService } from '../serviceone.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Ques } from '../models/ques.model';
@Component({
  selector: 'app-quizframetwo',
  templateUrl: './quizframetwo.component.html',
  styleUrls: ['./quizframetwo.component.css']
})
export class QuizframetwoComponent implements OnInit {
  ques: Ques[] = [];
  quizTitle = '';
  ans: any = [];
  dataloaded = false;
  timeCounter = 0;
  username: any;
  hasAccess = true;
  hasSubmitted = false;
  ansClicked = false;
  url = "http://localhost:3000";
  score:any;
  timeTaken: any;
  token = {
    access_token: localStorage['access_token']
  };
  constructor(private serviceone: ServiceoneService, private httpClient: HttpClient, private router: Router) { }



  getQuizQues() {
    console.log(this.quizTitle);
    let Title = {
      quizTitle: this.quizTitle

    }
    this.httpClient.post(this.url + '/get-quiz-ques', Title).subscribe((result: any) => {

      result.forEach((q: any) => {
        let que = new Ques();
        que = q;
        this.ques.push(que);
      });
      this.dataloaded = true;

    })
  }
  t: any;
  countTime() {
    this.t = setInterval(() => {
      this.timeCounter = this.timeCounter + 1;
    }, 1000)
  }
  setScore(cnt: any) {
    let payload = {
      score: cnt,
      time: this.timeCounter,
      quizTitle: this.quizTitle,
      username: this.username
    }

    this.httpClient.post(this.url + '/set-score', payload).subscribe((result: any) => { 

    })

  }
  checkLoggedIn() {
    let log_in = false;
    this.httpClient.post(this.url + '/token-decode', this.token).subscribe((result: any) => {
      log_in = result.logged_in;
      if(log_in){
      this.username = result.username;
      this.hasAccess=true;
      this.ifSubmittedPrev();
      }
    })

  }
  getquizTitle()
  {
    this.serviceone.getquizTitle$.subscribe((quizTitle: any) => {
      if(quizTitle.length==0 && sessionStorage['quizTitle']==quizTitle)
        sessionStorage.setItem('quizTitle', 'Quiz Test 1');
      else if(quizTitle.length!=0) sessionStorage.setItem('quizTitle', quizTitle);
      this.quizTitle = sessionStorage['quizTitle'];
    })

  }
  onClickSubmit() {
    clearTimeout(this.t);
    let cnt: number = 0;
    let i = 0;
    this.ques.forEach((q: any) => {

      if (this.ans[i] == "A" && q.correctAns == "A") cnt = cnt + 1;

      else if (this.ans[i] == "B" && q.correctAns == "B") cnt = cnt + 1;

      else if (this.ans[i] == "C" && q.correctAns == "C") cnt = cnt + 1;

      else if (this.ans[i] == "D" && q.correctAns == "D") cnt = cnt + 1;
      i = i + 1;
    })
    this.setScore(cnt);
    this.hasSubmitted=true;
    this.score=cnt;
    this.timeTaken=this.timeCounter;
    


  }
  ifSubmittedPrev() {
    let submitted = false;
    this.getquizTitle();
    let payload = {
      quizTitle: this.quizTitle,
      username: this.username
    }
    this.httpClient.post(this.url+'/check-result', payload).subscribe((result:any)=>{
      submitted = result.submitted;
      if(submitted) 
      {
        this.score=result.score;
        this.timeTaken=result.time;
        this.hasSubmitted=true;

      }
      else {
        this.getQuizQues();
        this.countTime();
      }

    })

  }
  onAnswerClick() {
    let i=0;
    if(this.ques.length==0)
    this.getQuizQues();
    this.ques.forEach((q: any)=> {
      if(q.correctAns=="A") this.ans[i]=q.optionA;
      else if(q.correctAns=="B") this.ans[i]=q.optionB;
      
      else if(q.correctAns=="C") this.ans[i]=q.optionC;
      
      else if(q.correctAns=="D") this.ans[i]=q.optionD;
      i++;
    })
    this.ansClicked=true;
  }
  onStandingsClick(){
    this.serviceone.getStandingData(this.quizTitle);
    this.router.navigate(['/quiz-tests/standings']);

  }
  
  
  ngOnInit() {
    
    this.checkLoggedIn();
    
  }


}
