import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Spinkit } from 'ng-http-loader/spinkits';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public spinkit = Spinkit;
  title = 'app';
  isLoggedIn: boolean = false;
  isPopIn: boolean = true;
  Isheader: boolean = true;
  showLogin: boolean = true;
  loginUser: string = "";
  constructor(private router:Router){

  }

  toggleLogin() { 
    this.showLogin = !this.showLogin;
  }

  fromLoginPage(data) { 
    this.isLoggedIn = data.isLoggedIn;
    this.loginUser = data.loginUser;
    this.isPopIn = true;
  }

  ngOnInit() {
    if (sessionStorage.loginUser){
      this.loginUser = sessionStorage.loginUser;
    }
    if (sessionStorage.token) {
      this.Isheader=false;
      this.isLoggedIn = true;
    }
    else {
      this.Isheader=true;
      this.isLoggedIn = false;
    }
  }
  togglepop(){
    if(this.isPopIn){
      this.isPopIn=false;
    }
    else{
      this.isPopIn=true;
    }
  }

  logout() {
    sessionStorage.clear();
    this.isLoggedIn = false;
    this.router.navigateByUrl('/');
  }

}
