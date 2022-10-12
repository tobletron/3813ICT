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

  /**
   * This function is called when the component is initialized. It checks if the user is logged in, if
   * not, it redirects them to the login page. It then gets all the users, groups, and channels from
   * the database and stores them in the users, groups, and channels arrays. It also gets the group
   * name from session storage
   */
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

 /**
  * The function creates a channel object with the title, group name, and members, and then sends a
  * post request to the server to insert the channel into the database
  */
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

  /**
   * This function takes in a channel object and sends it to the backend to be deleted
   * @param {any} channel - any - this is the channel object that is being passed in.
   */
  deleteChannel(channel: any) {
    this.httpClient.post(this.url + "/api/deleteChannel", JSON.stringify(channel), httpOptions).subscribe((data: any) => {
      if (data == true) {
        alert("Channel has been deleted");
        window.location.reload();
      }
    });
  }

}
