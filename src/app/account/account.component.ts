import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { response } from 'express';
import { UserService } from '../user-service.service'
import { UserModel } from '../user.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  users!: UserModel[];

  userValid = false;
  roleOfUser = '';
  userInfo: any;
  userObject: any;
  username = '';

  url = "http://localhost:3000";


  constructor(private userService: UserService, private router: Router, private httpClient: HttpClient) { 
    if (sessionStorage.getItem("username") != undefined) {
      this.userValid = true;
      //this.userRole();
    }
  }


  ngOnInit() {
  }

 

  deleteUser(user: UserModel) {
    this.userService.usersDelete({_id: user._id});
  }

  // userRole(){ //check the role of the logged in user
  //   this.httpClient.get(this.url + "/api/users").subscribe((data: any) => {
  //     for (let i = 0; i < data.length; i++) {
  //       if (data[i].username == this.user.username) {
  //         console.log("username matches");
  //         this.router.navigateByUrl('/account');
  //       }
  //     }
  //   });
  // }
  

}
