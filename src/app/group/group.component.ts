import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  /* declare variables */
  group: any = "";
  url = "http://localhost:3000";
  username = "";
  userRole = "";
  channels: any = [];

  constructor( private router: Router, private httpClient: HttpClient) { }

 /**
  * This function is called when the component is initialized. It checks if the user is logged in and
  * if they are in a group. If they are not logged in, they are redirected to the login page. If they
  * are not in a group, they are redirected to the account page. If they are logged in and in a group,
  * the function gets the channels for the group and stores them in the channels array
  */
  ngOnInit(): void {


    //user authentication p1
    if (!sessionStorage.getItem('username')) {
      sessionStorage.clear();
      alert("Please log in first");
      this.router.navigateByUrl('/login');
    }

    if (!sessionStorage.getItem("group")) {
      alert("error");
      this.router.navigateByUrl("/account");
    }

    this.username = sessionStorage.getItem('username')!;
    this.userRole = sessionStorage.getItem('role')!;
    this.group = sessionStorage.getItem('group');

    //get channels
    this.httpClient.get(this.url + "/api/getChannels").subscribe((result: any) => {
      for (let i = 0; i < result.length; i++) {
        if (result[i].groupName == this.group){
          console.log(result[i]);
          this.channels.push(result[i]);
        }
      }
    });

  }

  
 /**
  * The function createChannel() navigates to the adminChannel page
  */
  createChannel() {
    this.router.navigateByUrl("/adminChannel");
  }

/**
 * This function removes a group from the database
 */
  removeGroup() {
    this.httpClient.get(this.url + "/api/getGroups").subscribe((result: any) => {
      for (let i = 0; i < result.length; i++) {
        if (result[i].title == this.group){
          this.httpClient.post(this.url + "/api/deleteGroup", JSON.stringify(result[i]), httpOptions).subscribe((data: any) => {
            if (data == true) {
              alert("successfully deleted group");
              sessionStorage.removeItem('group');
              this.router.navigateByUrl("/account");
            }
            else {
              alert("error deleting group");
            }
          });
        }
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

/**
 * The goBack() function navigates the user back to the account page and removes the group from session
 * storage
 */
  goBack() {
    this.router.navigateByUrl("/account");
    sessionStorage.removeItem('group');
  }

/**
 * This function checks if the user is a member of the channel they are trying to enter. If they are
 * not, they are not allowed to enter the channel
 * @param {any} channel - any - the channel that the user is trying to enter
 */
  enterChannel(channel: any) {
    var valid = false;
    for (var index in channel.members) {
      if (channel.members[index] == this.username){
        valid = true;
      }
      else if (this.userRole == "SuperAdmin" || this.userRole == "SuperAdmin"){
        valid = true;
      }
    }
    if (valid == false ) {
      alert("You do not have permission to enter this channel");
    }
    else {
      sessionStorage.setItem("channel", channel.title);
      this.router.navigateByUrl("/channel");
    }
    
  }

}
