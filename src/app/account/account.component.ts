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

  userToDelete: any = {};


  url = "http://localhost:3000";


  constructor(private userService: UserService, private router: Router, private httpClient: HttpClient) {
  }


  ngOnInit() {
    if (!sessionStorage.getItem('username')) {
      sessionStorage.clear();
      alert("Please log in first");
      this.router.navigateByUrl('/login');
    }

    this.username = sessionStorage.getItem('username')!;
    this.userRole = sessionStorage.getItem('role')!;

    if (this.userRole == "SuperAdmin") {

      this.httpClient.get(this.url + "/api/getUsers").subscribe((result: any) => {
        for (let i = 0; i < result.length; i++) {
          this.users.push(result[i]);
        }
      });

    }
  }

  deleteUser(user: any) {
      console.log("attmpting to delete user: ", user);
      this.httpClient.post(this.url + "/api/deleteUser", JSON.stringify(user), httpOptions).subscribe((data: any) => {
        if (data == true) {
          alert("User has been deleted");
          window.location.reload();
        }
    });
  }


  

}
