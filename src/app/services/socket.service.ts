import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, observable } from 'rxjs';
import io, { Socket } from 'socket.io-client';

const url = "http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  socket: any;


  constructor() { 
    this.getMessage();
  }

  initSocket(room: any) {
    this.socket = io(url);
  }

  send(message: string, username: string) {
    this.socket.emit('message', message, username);
  }


  getMessage() {
    return new Observable(observer => {
      this.socket.on('message', (data: any) => {
        observer.next(data)
      });
    });
  }
}
