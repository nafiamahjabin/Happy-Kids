import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  register = {
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    password: '',
    cls: '',
    school: '',
    mobile: ''
  };
  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnInit() {
  }
  onRegisterClick() {
    let url = 'http://localhost:3000/register';
    this.httpClient.post(url, this.register).subscribe((result:any) => {
      alert(result.message);
      console.log(result.token);
      
      localStorage.setItem('access_token', result.access_token);
      this.router.navigate([''])

    })
  }

}
