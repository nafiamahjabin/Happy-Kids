import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ServiceoneService } from '../serviceone.service';
import { Profile } from '../models/profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile_user = '';
  token = {
    access_token: localStorage['access_token']
  };
  register = {
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    oldPassword: '',
    newPassword: '',
    cls: '',
    school: '',
    mobile: ''
  };
  dataloaded = false;
  profile_data: any;
  editClicked = false;
  constructor(private httpClient: HttpClient, private router: Router, private serviceone: ServiceoneService) { }
  hasAccess = false;
  checkloggedIn() {
    let url = 'http://localhost:3000/token-decode';

    this.httpClient.post(url, this.token).subscribe((result: any) => {
      if (result.logged_in && result.username == this.profile_user) this.hasAccess = true;
    })

  }
  getProfileInfo() {
    this.serviceone.getProfile$.subscribe((username: any) => {
      if (username.length > 0) sessionStorage.setItem('username', username);

      console.log(username);
      this.profile_user = sessionStorage['username'];
      let payload = {
        username: sessionStorage['username']
      }
      this.checkloggedIn();
      let url = 'http://localhost:3000/get-profile';
      this.httpClient.post(url, payload).subscribe((result: any) => {

        this.profile_data = result[0];
        console.log(this.profile_data);
        this.dataloaded = true;
      })

    })
  }
  ngOnInit() {
    this.getProfileInfo();
  }
  onEditProfileClick() {
    this.editClicked = true;

  }
  errorOcc=false;
  errorMsg = "This Field is required!";

  onUpdateClick() {

    if (this.register.oldPassword.length==0) this.errorOcc = true;
    else this.errorOcc = false;

    if (!this.errorOcc) {
      if (this.register.firstname.length==0) this.register.firstname = this.profile_data.firstname;
      if (this.register.lastname.length==0) this.register.lastname = this.profile_data.lastname;
      if (this.register.username.length==0) this.register.username = this.profile_data.username;
      if (this.register.email.length==0) this.register.email = this.profile_data.email;
      if (this.register.cls.length==0) this.register.cls = this.profile_data.class;
      if (this.register.mobile.length==0) this.register.mobile = this.profile_data.mobile;
      if (this.register.school.length==0) this.register.school = this.profile_data.school;

      if (this.register.newPassword.length==0) this.register.newPassword = this.register.oldPassword;
      console.log(this.register);
      let url = 'http://localhost:3000/update-profile';
      this.httpClient.post(url, this.register).subscribe((result:any)=> {
        if(result.message=='Password did not matched')
        {
          this.errorOcc= true;
          this.errorMsg=result.message;

        }
        else
        window.location.reload();
      })


    }

  }

}
