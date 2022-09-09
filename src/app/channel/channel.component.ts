import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {

  newMessage = "";
  messages: any = [];

  constructor() { }

  ngOnInit(): void {
  }

  post() {
    this.messages.push(this.newMessage);
  }

}
