import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket : Socket) { }

  connect(username : String ) : void {
    this.socket.emit('join', username);
  }

  disconnect() : void {
    this.socket.disconnect();
  }

  sendMessage(message : String) {
    this.socket.emit('message', message);
  }

  public onMessageReceived(): Observable<any> {
    return this.socket.fromEvent('message');
  }
}
