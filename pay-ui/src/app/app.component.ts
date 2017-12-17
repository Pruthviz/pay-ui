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
  constructor(){

  }

  ngOnInit() {
    if (sessionStorage.token) {
      this.isLoggedIn = true;
    }
    else {
      this.isLoggedIn = false;
    }
  }


  logout() {
    sessionStorage.clear();
    this.isLoggedIn=false;
  }

}
