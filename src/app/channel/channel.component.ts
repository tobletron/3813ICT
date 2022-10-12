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

  /* declare variables */
  username: string = "";
  userRole: string = "";
  group: string = "";
  channelTitle: string = "";
  messageContent: any = "";
  messages: string[] = [];
  formattedMessages: { "name": string, "time": string, "message": string}[] = [];
  ioConnection: any;
  userJoined: string = "";
  url = "http://localhost:3000";

  constructor(private router: Router, private socketService: SocketService, private httpClient: HttpClient) { }

  /**
   * This function is called when the component is initialized. It checks if the user is logged in, and if not, redirects 
   * them to the login page. 
   * It also checks if the user has a group and channel selected, and if not, redirects them to the group page.
   *  It then sets the username, user role, group, and channel title variables to the values stored in session storage. 
   * It then gets the chat history from the database and stores it in the messages array. Finally, it calls the
   * initIoConnection() function
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

    if (!sessionStorage.getItem("channel")) {
      alert("error");
      this.router.navigateByUrl("/group");
    }

    this.username = sessionStorage.getItem('username')!;
    this.userRole = sessionStorage.getItem('role')!;
    this.group = sessionStorage.getItem('group')!;
    this.channelTitle = sessionStorage.getItem('channel')!;

    //get chat history
    this.httpClient.get(this.url + "/api/getChats").subscribe((result: any) => {
      for (let i = 0; i < result.length; i++) {
        if (result[i].channel == this.channelTitle){
          for (let j=0; j < result[i].chats.length; j++){
            this.messages.push(result[i].chats[j]);
            this.formattedMessages.push(this.stringFormatter(result[i].chats[j]));
          }
        }
      }
    });

  
    this.initIoConnection();
  }

 /**
  * The function is called when the user joins the channel. It initializes the socket connection and
  * subscribes to the events emitted by the server
  */
  initIoConnection() {
    this.socketService.initSocket(this.channelTitle, this.username);

    this.ioConnection = this.socketService.getUsersJoined()
      .subscribe((content: any) => {
        this.userJoined = content;
      });

      this.ioConnection = this.socketService.getUserDisconnected()
      .subscribe((content: any) => {
        this.userJoined = content;
      });

    this.ioConnection = this.socketService.getMessage()
      .subscribe((message:any) => {
        this.messages.push(message);
        let chatsObj = { channel: this.channelTitle, chats: this.messages }
        //save the history
        this.httpClient.post(this.url + "/api/insertChats", JSON.stringify(chatsObj), httpOptions).subscribe((result: any) => {
          if (result == true) {
            console.log("db updated");
          }
        })

        this.formattedMessages.push(this.stringFormatter(message));
        

      });
  }

/**
 * It disconnects the user from the socket, removes the channel from the session storage and navigates
 * the user to the group page
 */
  goBack() {
    this.socketService.disconnectUser();
    sessionStorage.removeItem('channel');
    this.router.navigateByUrl("/group");
  }

  /**
   * If the messageContent property of the component is not empty, then send the message to the server
   * using the socketService
   */
  sendMessage() {
    console.log(this.formattedMessages);
    if (this.messageContent) {
      this.socketService.send(this.messageContent, this.username);
      this.messageContent = null;
    }
    else {
      console.log("no message to send");
    }
  }

  /**
   * This function is called when the user clicks the "Clear History" button. It sends a post request
   * to the server with the channel name and the messages array. The server then deletes the messages
   * from the database
   */
  clearHistory() {

    let chatsObj = { channel: this.channelTitle, chats: this.messages }
    this.httpClient.post(this.url + "/api/deleteChats", JSON.stringify(chatsObj), httpOptions).subscribe((result: any) => {
      if (!result) {
        alert("there is no history to delete");
      }
      else {
        window.location.reload();
      }
    });

  }

  stringFormatter(message: any) {
    var wordArray = message.split(" ");

    //first word is always username
    var name = wordArray[0];
    //third word is always the time
    var time = wordArray[2];

    var arrayLength = wordArray.length;
    var numToSlice = arrayLength - 4

    var theMessage = wordArray.splice(4, numToSlice);
    theMessage = theMessage.join(' ');

    console.log(name, time, theMessage);

    var msgObj = {"name": String(name), "time": String(time), "message": String(theMessage)}
    

    return msgObj;

  }

}
