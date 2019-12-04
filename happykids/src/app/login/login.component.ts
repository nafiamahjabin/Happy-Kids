import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login = {
    username: '',
    password: ''
  };
  constructor(private httpClient: HttpClient, private router: Router) { }
  error=false;
  errorMsg='';
  ngOnInit() {
  }
  onLoginClick() {
    let url = 'http://localhost:3000/login';
    this.httpClient.post(url, this.login).subscribe((result:any) => {
      if(result.message=='Login failed')
      {
        this.error=true;
        this.errorMsg='Username & Password did not matched!';
      }
      else {
      localStorage.setItem('access_token', result.access_token);
      this.router.navigate([''])
      }

    })


  }

}
