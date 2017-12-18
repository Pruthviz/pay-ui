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
  
  UserName: string = "";
  constructor(){

  }



  fromLoginPage(val) { 
    this.isLoggedIn = val;
  }

  ngOnInit() {
    if(sessionStorage.LoginUser){
    this.UserName=sessionStorage.LoginUser;
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
    this.isLoggedIn=false;
  }

}
