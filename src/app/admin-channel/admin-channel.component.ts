import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-admin-channel',
  templateUrl: './admin-channel.component.html',
  styleUrls: ['./admin-channel.component.css']
})
export class AdminChannelComponent implements OnInit {

  //logged in user data 
  username = "";
  userRole = "";

  title: string = "";
  groupName: string = "";
  members = [];


  users: any = [];
  groups: any = [];
  channels: any = [];

  url = "http://localhost:3000";

  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnInit(): void {
    //user authentication p1
    if (!sessionStorage.getItem('username')) {
      sessionStorage.clear();
      alert("Please log in first");
      this.router.navigateByUrl('/login');
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

    //get channels
    this.httpClient.get(this.url + "/api/getChannels").subscribe((result: any) => {
      for (let i = 0; i < result.length; i++) {
        this.channels.push(result[i]);
      }
    });

    //get group from session storage
    this.groupName = sessionStorage.getItem('group')!;
  }

  createChannel() {
    var channelObj = { title: this.title, groupName: this.groupName, members: this.members };

    this.httpClient.post(this.url + "/api/insertChannel", JSON.stringify(channelObj), httpOptions).subscribe((result: any) => {
      if (result == true) {
        alert("successfully created channel");
        this.router.navigateByUrl("/group");
      }
      else {
        alert("failed to create channel");
      }
    });
  }

  deleteChannel(channel: any) {
    this.httpClient.post(this.url + "/api/deleteChannel", JSON.stringify(channel), httpOptions).subscribe((data: any) => {
      if (data == true) {
        alert("Channel has been deleted");
        window.location.reload();
      }
    });
  }

}
