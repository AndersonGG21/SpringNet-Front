import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { ChatMessage } from '../models/types';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  stompClient: any;
  topic : string = "/topic/public";
  webSocketPoint : string = "http://localhost:8080/spring-websocket";
  messages : ChatMessage[] = [];

  connect() : void {
    console.log("Intialize WebSocket Connection");
    let ws = SockJS(this.webSocketPoint);
    this.stompClient = Stomp.over(ws);
    const _this = this;
    _this.stompClient.connect({}, function (frame : any){
      _this.stompClient.subscribe(_this.topic,function (greetingResponse : any){
        console.log("AQUI RETORNO EL MENSAHE")
        _this.onMessageRecieved(greetingResponse);
      })
    }, this.errorCallBack )
  }

  disconnect() : void {
    if (this.stompClient != null) {
      this.stompClient.disconnected();
    }

    console.log("Disconnected");
  }

  send(message : any) {
    console.log("Sending.....................");
    this.stompClient.send("/app/chat.senMessage", {}, JSON.stringify(message));
  }

  onMessageRecieved(message : any) {
    console.log(`Message recieved from: ${message.body}`);
    const obj = JSON.parse(message.body);
    this.messages.push(obj);
  }

  errorCallBack(error : any){
    console.log("errorCallBack -> " + error)
  }

  getMessagesList() : ChatMessage[] {
    return this.messages;
  }

}
