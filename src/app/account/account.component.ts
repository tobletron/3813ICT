import { Component, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { response } from 'express';
import { UserService } from '../user-service.service'
import { UserModel } from '../user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  username: string = "";
  userRole: string = "";
  users: any = [];
  groups: any = [];

  userToDelete: any = {};


  url = "http://localhost:3000";


  constructor(private userService: UserService, private router: Router, private httpClient: HttpClient) {
  }


  ngOnInit() {
    if (sessionStorage.getItem('group')){
      sessionStorage.removeItem('group');
    }
    if (!sessionStorage.getItem('username')) {
      sessionStorage.clear();
      alert("Please log in first");
      this.router.navigateByUrl('/login');
    }

    this.username = sessionStorage.getItem('username')!;
    this.userRole = sessionStorage.getItem('role')!;

    if (this.userRole == "SuperAdmin" || this.userRole == "GroupAdmin") {
      //get groups
      this.httpClient.get(this.url + "/api/getGroups").subscribe((result: any) => {
        for (let i = 0; i < result.length; i++) {
          this.groups.push(result[i]);
        }
      });
      //get users
      this.httpClient.get(this.url + "/api/getUsers").subscribe((result: any) => {
        for (let i = 0; i < result.length; i++) {
          this.users.push(result[i]);
        }
      });
    }    
    if (this.userRole == "GroupAssis" || this.userRole == "Member") {
      //get only groups that the user is part of
      this.httpClient.get(this.url + "/api/getGroups").subscribe((result: any) => {
        for (let i = 0; i < result.length; i++) {
          for (let j = 0; j < result[i].members.length; j++){
            if (result[i].members[j] == this.username){
              this.groups.push(result[i]);
            }
          }
        }
      });
    }
  }

  deleteUser(user: any) {
    this.httpClient.post(this.url + "/api/deleteUser", JSON.stringify(user), httpOptions).subscribe((data: any) => {
      if (data == true) {
        alert("User has been deleted");
        window.location.reload();
      }
    });
  }

  updateUser(user: any) {
    sessionStorage.setItem('inputUsername', user.username);
    sessionStorage.setItem('inputEmail', user.email);
    sessionStorage.setItem('inputRole', user.role);
    this.router.navigateByUrl("/admin");
  }

  createUser() {
    this.router.navigateByUrl("/admin");
  }

  createGroup() {
    this.router.navigateByUrl("/adminGroup");
  }

  deleteGroup(group: any) {
    this.httpClient.post(this.url + "/api/deleteGroup", JSON.stringify(group), httpOptions).subscribe((data: any) => {
      if (data == true) {
        alert("Group has been deleted");
        window.location.reload();
      }
    });
  }

  linkToGroup(group: any) {
    if (!group){
      console.log("error in link");
    }
    else {
      sessionStorage.setItem('group', group.title);
      this.router.navigateByUrl("/group");
    }
  }


  

}
