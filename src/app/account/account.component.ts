import { Component, OnInit } from '@angular/core';
import { response } from 'express';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  userValid = false;
  roleOfUser = '';
  userInfo: any;
  userObject: any;
  username = '';

  constructor(private httpService: HttpService) { 
    if (localStorage.getItem("user") != undefined) {
      this.userValid = true;
      this.userRole();
    }
  }


  ngOnInit(): void {
  }

  userRole(){ //check the role of the logged in user
    this.userInfo = localStorage.getItem("user"); //get user info from storage
    this.userObject = JSON.parse(this.userInfo); //convert back to json object
    this.username = this.userObject.username; //get username
    this.roleOfUser = this.userObject.role //get the users role
    //console.log(this.roleOfUser);
    return this.roleOfUser;
  }
  

}
