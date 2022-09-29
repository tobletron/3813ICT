import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {

  username: string = "";
  userRole: string = "";
  group: string = "";
  channelTitle: string = "";

  messages: any = [];
  

  constructor(private router: Router) { }

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

    if (!sessionStorage.getItem("channel")) {
      alert("error");
      this.router.navigateByUrl("/group");
    }

    this.username = sessionStorage.getItem('username')!;
    this.userRole = sessionStorage.getItem('role')!;
    this.group = sessionStorage.getItem('group')!;
    this.channelTitle = sessionStorage.getItem('channel')!;
  }

  goBack() {
    sessionStorage.removeItem('channel');
    this.router.navigateByUrl("/group");
  }

}
