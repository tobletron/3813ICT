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

  initSocket(room: any, username: any) {
    this.socket = io(url);
    this.socket.emit('room', room, username);
  }

  send(message: string, username: string) {
    this.socket.emit('message', message, username);
  }

  getUserDisconnected() {
    return new Observable(observer => {
      this.socket.on('userDisconnected', (data: any) => {
        observer.next(data);
      });
    });
  }

  getUsersJoined() {
    return new Observable(observer => {
      this.socket.on('userJoined', (data: any) => {
        observer.next(data);
      });
    });
  }

  getMessage() {
    return new Observable(observer => {
      this.socket.on('message', (data: any) => {
        observer.next(data);
      });
    });
  }
}
