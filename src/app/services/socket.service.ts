import { Injectable, OnInit } from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { ChatMessage } from '../models/types';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SocketService implements OnInit {
  ngOnInit(): void {}

  stompClient: any;
  privateTopic: string = "/direct/"
  webSocketPoint : string = "http://3.16.159.39:81/spring-websocket";
  messages : ChatMessage[] = [];
  connectUsers : string[] = [];
  private chats : Subject<ChatMessage> = new Subject<ChatMessage>();

  /**
   * The connect function initializes a WebSocket connection using SockJS and Stomp, and subscribes to
   * a specific topic using the provided id.
   * @param {any} id - The `id` parameter is of type `any` and represents the identifier used to
   * subscribe to a specific WebSocket topic.
   */
  connect(id : any) : void {
    console.log("Intialize WebSocket Connection");
    let ws = SockJS(this.webSocketPoint);
    this.stompClient = Stomp.over(ws);
    const _this = this;
    if (this.stompClient) {
      _this.stompClient.connect({}, function (frame : any){
        _this.stompClient.subscribe(`${_this.privateTopic}${id}`,function (response : any){
          _this.onMessageRecieved(response);
        })
      }, this.errorCallBack )
    }
  }

  /**
   * The disconnect function checks if the stompClient is not null and then calls the disconnected
   * method on it, and logs "Disconnected" to the console.
   */
  disconnect() : void {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }
  }

  /**
   * The send function logs a message and sends it as a JSON string to a specific endpoint.
   * @param {any} message - The `message` parameter is of type `any`, which means it can accept any
   * data type. It represents the message that you want to send.
   */
  send(message : any) {
    this.stompClient.send("/app/chat.sendMessageV1", {}, JSON.stringify(message));
  }

 /**
  * The function logs a message and adds it to an array of messages.
  * @param {any} message - The `message` parameter is of type `any`, which means it can accept any data
  * type.
  */
  onMessageRecieved(message : any) {
    const obj = JSON.parse(message.body);
    this.messages.push(obj);
    this.chats.next(obj);
  }

  /**
   * The errorCallBack function logs the error message to the console.
   * @param {any} error - The error parameter is of type "any", which means it can be any data type. It
   * is used to capture and handle any errors that occur in the code.
   */
  errorCallBack(error : any){
    console.log("errorCallBack -> " + error)
  }

  getMessages(): Observable<ChatMessage> {
    return this.chats.asObservable();
  }

}
