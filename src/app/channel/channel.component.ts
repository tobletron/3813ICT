import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'socket.io-client';
import { SocketService } from '../services/socket.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

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

  messageContent: any = "";
  messages: string[] = [];
  ioConnection: any;

  url = "http://localhost:3000";

  history: any = [];

  insertData = false;


  

  constructor(private router: Router, private socketService: SocketService, private httpClient: HttpClient) { }

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


    this.insertData = false;

    console.log(sessionStorage.getItem('channel'));

  
    this.initIoConnection();
  }

  private initIoConnection() {
    this.socketService.initSocket(this.channelTitle);

    this.ioConnection = this.socketService.getMessage()
      .subscribe((message:any) => {
        this.messages.push(message);
      });
  }

  goBack() {
    sessionStorage.removeItem('channel');
    this.router.navigateByUrl("/group");
  }

  sendMessage() {
    if (this.messageContent) {
      this.socketService.send(this.messageContent, this.username);
      this.messageContent = null;
    }
    else {
      console.log("no message to send");
    }
  }

}
