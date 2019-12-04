import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'HappyKids';
  videoCat = '';
  videoSrc = '';
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    if (localStorage['access_token'] == null) {
      let url = 'http://localhost:3000/logout';
      this.httpClient.get(url).subscribe((result: any) => {
        localStorage.setItem('access_token', result.access_token);
      })
    }
  }
}
