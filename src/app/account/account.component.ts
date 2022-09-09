import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  userValid = false;
  user = localStorage.getItem("user");

  constructor() { 
    if (localStorage.getItem("user") != undefined) {
      this.userValid = true;
    }
  }


  ngOnInit(): void {}

}
