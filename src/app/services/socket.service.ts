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

/**
 * The function takes in a room and username, connects to the socket, and emits the room and username
 * to the server
 * @param {any} room - the room you want to join
 * @param {any} username - The username of the user who is joining the room.
 * @returns A function that disconnects the socket.
 */
  initSocket(room: any, username: any) {
    this.socket = io(url);
    this.socket.emit('room', room, username);
    return()=>{this.socket.disconnect();}
  }

/**
 * When the user clicks the send button, emit a message event with the message and username.
 * @param {string} message - The message that the user wants to send.
 * @param {string} username - The username of the user sending the message.
 */
  send(message: string, username: string) {
    this.socket.emit('message', message, username);
  }

/**
 * It disconnects the user from the socket
 */
  disconnectUser() {
    this.socket.disconnect();
  }


  /**
   * We are creating a new Observable that will listen for the 'userDisconnected' event from the server
   * and then emit the data received from the server
   * @returns An observable that listens for the 'userDisconnected' event.
   */
  getUserDisconnected() {
    return new Observable(observer => {
      this.socket.on('userDisconnected', (data: any) => {
        observer.next(data);
      });
    });
  }

  /**
   * The function returns an Observable that listens to the 'userJoined' event and returns the data
   * received from the server
   * @returns An observable that listens for the 'userJoined' event.
   */
  getUsersJoined() {
    return new Observable(observer => {
      this.socket.on('userJoined', (data: any) => {
        observer.next(data);
      });
    });
  }

  /**
   * The function returns an observable that listens for the 'message' event on the socket and then
   * passes the data to the observer
   * @returns An observable that will emit a new value every time the socket receives a message.
   */
  getMessage() {
    return new Observable(observer => {
      this.socket.on('message', (data: any) => {
        observer.next(data);
      });
    });
  }
  
}
