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

  //logged in user data 
  username = "";
  userRole = "";

  //form data
  title: string = "";
  capacity: number = 5;
  members = [];

  users: any = [];
  groups: any = [];

  url = "http://localhost:3000";

  constructor(private router: Router, private httpClient: HttpClient) { }

  ngOnInit(): void {
    //user authentication p1
    if (!sessionStorage.getItem('username')) {
      sessionStorage.clear();
      alert("Please log in first");
      this.router.navigateByUrl('/login');
    }

    this.username = sessionStorage.getItem('username')!;
    this.userRole = sessionStorage.getItem('role')!;

    //user authentication p2
    if((this.userRole == "SuperAdmin") || (this.userRole == "GroupAdmin")) {
      //user has permission
    }
    else {
      alert("You do not have permission to use this page");
      this.router.navigateByUrl('/account');
    }

    //get users
    this.httpClient.get(this.url + "/api/getUsers").subscribe((result: any) => {
      for (let i = 0; i < result.length; i++) {
        this.users.push(result[i]);
      }
    });

    //get groups
    this.httpClient.get(this.url + "/api/getGroups").subscribe((result: any) => {
      for (let i = 0; i < result.length; i++) {
        this.groups.push(result[i]);
      }
    });
  }

  createGroup() {
    var groupObject = { title: this.title, capacity: this.capacity, members: this.members };
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

  deleteGroup(group: any) {
    this.httpClient.post(this.url + "/api/deleteGroup", JSON.stringify(group), httpOptions).subscribe((data: any) => {
      if (data == true) {
        alert("Group has been deleted");
        window.location.reload();
      }
    });
  }


}
