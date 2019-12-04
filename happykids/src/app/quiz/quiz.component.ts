import { Component, OnInit } from '@angular/core';
import { Quizques } from '../models/quizques.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  quiz = {
    quiztitle: '',
    startTime: '',
    endTime: ''
  };
  quizSet: Quizques[] = [];

  f: any[]=[];
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
  onClickADD() {
    let qz = new Quizques();
    qz.quizTitle=this.quiz.quiztitle;
    qz.startTime = this.quiz.startTime;
    qz.endTime = this.quiz.endTime;

    this.quizSet.push(qz);

  }
  onClickSubmit(){
    let url='http://localhost:3000/set-quiz';
    console.log(this.quizSet);
    this.httpClient.post(url, this.quizSet).subscribe((result: any) => {
      alert(result.message);
      this.router.navigate(['/cms']);
    })

  }

}
