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

/* This class is used to display the account page, and it contains functions that allow the admin to
delete users, groups, and channels */
export class AccountComponent implements OnInit {

  /* variable intialisation */
  username: string = "";
  userRole: string = "";
  users: any = [];
  groups: any = [];
  groupTitles: any = [];
  channels: any = [];
  userToDelete: any = {};
  url = "http://localhost:3000";


  constructor(private userService: UserService, private router: Router, private httpClient: HttpClient) {
  }


  /**
   * This function is called when the page is loaded. It checks if the user is logged in, and if not,
   * redirects them to the login page. If the user is logged in, it checks their role and loads the
   * appropriate data
   */
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
          this.groupTitles.push(result[i].title);
        }
      });
      //get users
      this.httpClient.get(this.url + "/api/getUsers").subscribe((result: any) => {
        for (let i = 0; i < result.length; i++) {
          this.users.push(result[i]);
        }
      });
      //get channels, delete any lingering channels with no groups
      this.httpClient.get(this.url + "/api/getChannels").subscribe((result: any) => {
        for (let i=0; i < result.length; i++) {
          
          if (this.groupTitles.includes(result[i].groupName)) {
            this.channels.push(result[i]);
          }
          else {
            //group no longer exists, delete the channel
            this.httpClient.post(this.url + "/api/deleteChannel", JSON.stringify(result[i]), httpOptions).subscribe((data: any) => {
              if (data) {
                console.log("deleted a channel");
              }
            });
          }
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

  /**
   * The function takes in a user object, and then sends a post request to the server with the user
   * object as the body. If the server returns true, then the user has been deleted, and the page is
   * reloaded
   * @param {any} user - any - this is the user object that is passed in from the component.
   */
  deleteUser(user: any) {
    this.httpClient.post(this.url + "/api/deleteUser", JSON.stringify(user), httpOptions).subscribe((data: any) => {
      if (data == true) {
        alert("User has been deleted");
        window.location.reload();
      }
    });
  }

  /**
   * The function takes in a user object, and then sets the sessionStorage items to the values of the
   * user object
   * @param {any} user - any - this is the user object that is passed in from the admin.component.html
   * file.
   */
  updateUser(user: any) {
    sessionStorage.setItem('inputUsername', user.username);
    sessionStorage.setItem('inputEmail', user.email);
    sessionStorage.setItem('inputRole', user.role);
    this.router.navigateByUrl("/admin");
  }

  /**
   * The function createUser() navigates to the admin page
   */
  createUser() {
    this.router.navigateByUrl("/admin");
  }

  /**
   * The function createGroup() navigates to the adminGroup page
   */
  createGroup() {
    this.router.navigateByUrl("/adminGroup");
  }

  /**
   * This function takes in a group object and sends it to the backend to be deleted
   * @param {any} group - any - this is the group that is being deleted.
   */
  deleteGroup(group: any) {
    this.httpClient.post(this.url + "/api/deleteGroup", JSON.stringify(group), httpOptions).subscribe((data: any) => {
      if (data == true) {
        alert("Group has been deleted");
        window.location.reload();
      }
    });
  }

/**
 * This function takes in a group object and sets the group title to the session storage
 * @param {any} group - any - this is the group that the user clicked on.
 */
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
