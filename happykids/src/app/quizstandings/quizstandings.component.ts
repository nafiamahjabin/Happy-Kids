import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServiceoneService } from '../serviceone.service';
import { Standing } from '../models/standing.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quizstandings',
  templateUrl: './quizstandings.component.html',
  styleUrls: ['./quizstandings.component.css']
})
export class QuizstandingsComponent implements OnInit {
  url = 'http://localhost:3000'
  ranklist: Standing[] = [];
  quizTitle = '';
  constructor(private httpClient: HttpClient, private serviceone: ServiceoneService, private router: Router) { }
  getTheStandings()
  {
    this.serviceone.getstandingData$.subscribe((quizTitle) => {
      if(quizTitle.length!=0) sessionStorage.setItem('quizTitle', quizTitle);
      this.quizTitle = sessionStorage['quizTitle'];
      let payload = {
        quizTitle: this.quizTitle
      }
      this.httpClient.post(this.url+'/standings', payload).subscribe((result:any) => {
        result.forEach((r:any) => {
          let standing = new Standing();
          standing = r;
          this.ranklist.push(standing);

        });
      })
      
    })
  }

  ngOnInit() {
    this.getTheStandings();
  }
  onProfileClick(username: any) {
    this.serviceone.getProfiledata(username);
    this.router.navigate(['/profile']);
  }

}
