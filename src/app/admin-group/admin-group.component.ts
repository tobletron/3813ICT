import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-admin-group',
  templateUrl: './admin-group.component.html',
  styleUrls: ['./admin-group.component.css']
})
export class AdminGroupComponent implements OnInit {

  /* variable intialisation */
  username = "";
  userRole = "";
  title: string = "";
  members: any = [];
  users: any = [];
  groups: any = [];
  usersForCreate: any = [];
  adminUsers: any = [];
  addUser: any = "";
  url = "http://localhost:3000";

  constructor(private router: Router, private httpClient: HttpClient) { }

  
  /**
   * It gets the users and groups from the database and stores them in the users and groups arrays
   */
  ngOnInit(): void {
    if (!sessionStorage.getItem('username')) {
      sessionStorage.clear();
      alert("Please log in first");
      this.router.navigateByUrl('/login');
    }

    this.username = sessionStorage.getItem('username')!;
    this.userRole = sessionStorage.getItem('role')!;

    if((this.userRole == "SuperAdmin") || (this.userRole == "GroupAdmin")) {
    }
    else {
      alert("You do not have permission to use this page");
      this.router.navigateByUrl('/account');
    }

    this.httpClient.get(this.url + "/api/getUsers").subscribe((result: any) => {
      for (let i = 0; i < result.length; i++) {
        if (result[i].role == "Member" || result[i].role == "GroupAssis") {
          this.usersForCreate.push(result[i]);
        }
        this.users.push(result[i]);
      }
    });

    this.httpClient.get(this.url + "/api/getGroups").subscribe((result: any) => {
      for (let i = 0; i < result.length; i++) {
        this.groups.push(result[i]);
      }
    });
  }

 /**
  * The function creates a group by adding the super and group admins to the group and then sending a
  * post request to the server to create the group
  */
  createGroup() {
    //add super and group admins
    for (var index in this.users) {
      if (this.users[index].role == "SuperAdmin" || this.users[index].role == "GroupAdmin") {
        this.members.push(this.users[index].username);
      }
    }

    var groupObject = { title: this.title, members: this.members };
    this.httpClient.post(this.url + "/api/insertGroup", JSON.stringify(groupObject), httpOptions).subscribe((result: any) => {
      if (result == true) {
        alert("successfully created group");
        this.router.navigateByUrl("/account");
      }
      else {
        alert("failed to create group");
      }
    });
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
   * This function removes a user from a group
   * @param {any} user - the user to be removed from the group
   * @param {any} group - the group that the user is being removed from
   */
  removeUserFromGroup(user: any, group: any) {
    var newMembers: any = [];
    var counter = 0;
    for (var index in group.members) {
      if (user != group.members[index]) {
        newMembers[counter] = group.members[index];
        counter++;
      }
    }
    var query = { title: group.title, capacity: group.capacity, members: group.members };
    var setTo = { title: group.title, capacity: group.capacity, members: newMembers };
    var updateObject = { query: query, update: setTo };
    this.httpClient.post(this.url + "/api/updateGroup", JSON.stringify(updateObject), httpOptions).subscribe((data: any) => {
      window.location.reload();
    });

  }

 /**
  * It checks if the user is a SuperAdmin or GroupAdmin. If the user is a SuperAdmin or GroupAdmin, it
  * returns false. If the user is not a SuperAdmin or GroupAdmin, it returns true
  * @param {any} member - The member to be checked.
  * @returns A boolean value.
  */
  memberRoleCheck(member: any) {
    for (var index in this.users) {
      if (this.users[index].username == member) {
        if (this.users[index].role == "SuperAdmin" || this.users[index].role == "GroupAdmin") {
          return false;
        }
      }
    }
    return true;
  }


  /**
   * This function adds a member to a group
   * @param {any} user - the user to be added to the group
   * @param {any} group - the group that the user is being added to
   */
  addMembers(user: any, group: any) {
    if (this.memberRoleCheck(user)){ //if user is not an admin
      if (group.members.includes(user)){
        alert("This user is already in the group");
      }
      else {
        var newMembers: any = [];
        for (var index in group.members) { //add old members
          newMembers.push(group.members[index]);
        }
        newMembers.push(user); //add new member
        var query = { title: group.title, capacity: group.capacity, members: group.members };
        var setTo = { title: group.title, capacity: group.capacity, members: newMembers };
        var updateObject = { query: query, update: setTo };
        this.httpClient.post(this.url + "/api/updateGroup", JSON.stringify(updateObject), httpOptions).subscribe((data: any) => {
          window.location.reload();
        });
      }
      
    }
    else if (this.memberRoleCheck(user) == false){ //if user is an admin
      alert("This user is already in the group");
    }
    else {
      alert("error adding user");
    }
  }

}