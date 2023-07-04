import { AfterViewChecked,Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';
import { ChatMessage, User } from 'src/app/models/types';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subject, interval, switchMap } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, AfterViewChecked {


  users: User[] = [];
  filteredUsers: User[] = [];
  selectedUser: User | undefined;
  sessionID = 0;
  username = this.cookie.get("username");
  messages: ChatMessage[] = [];
  scroller = 0;
  connected = false;
  onlineUsers : string[] = [];
  @ViewChild("input") input: ElementRef = {} as ElementRef;

  constructor(
    private socketService: SocketService,
    private userService: UserService,
    private router: Router,
    private cookie : CookieService
  ) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((response) => {
      this.users = response;
    });

    this.socketService.getOnlineUsersSubject().subscribe((changes) => {
      this.onlineUsers.push(changes);
    })

    this.socketService.connectOnline();
    setTimeout(() => {
       this.onlineConnectionMessage();
    }, 3000);
  }

  ngAfterViewChecked(): void {
    this.scrollDown();
  }

  connect(user: User) {
    this.sessionID = Number(user.id) + Number(this.cookie.get("uuid"));
    this.messages = this.socketService.getMessagesList();
    this.socketService.connect(this.sessionID);
    this.selectedUser = user;
    this.showChatArea();

    setTimeout(() => {
      this.onConnected();
    }, 500);
  }

  sendMessage(message : string) {
    if (message) {
      let chatMessage = {
        content: message,
        sender: this.cookie.get("username"),
        sessionID: this.sessionID,
        type: 'CHAT',
      };
      this.socketService.send(chatMessage);
    }

    this.messages = this.socketService.getMessagesList();
    this.input.nativeElement.value = "";
  }

  scrollDown() {
    const container = document.querySelector('.chat-text-area') as HTMLDivElement;
    container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
  }

  filterUsers(event: any) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < this.users.length; i++) {
      let user = this.users[i];
      if (user.username?.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(user);
      }
    }

    this.filteredUsers = filtered;
  }

  showChatArea() : void {
    const container = document.querySelector(".chat-area") as HTMLElement;
    const placeholder = document.querySelector(".placeholder") as HTMLElement;
    container.style.display = "flex";
    placeholder.style.display = "none";
    this.onlineUsers.find(username => username == this.selectedUser?.username) ? this.connected = true : this.connected = false;
  }

  showSelectedUser() : void {
    const userId = this.selectedUser?.id
    this.router.navigate([`/profile/${userId}`])
  }

  onConnected() : void{
    let chatMessage = {
      content: "",
      sender: this.cookie.get("username"),
      sessionID: this.sessionID,
      type: 'JOIN',
    };
    this.socketService.send(chatMessage);
  }

  onlineConnectionMessage() : void {
    let chatMessage = {
      content: "",
      sender: this.cookie.get("username"),
      sessionID: this.sessionID,
      type: 'JOIN',
    };
    this.socketService.sendConnection(chatMessage);
  }

  onDisconnected() : void {
    let chatMessage = {
      content: "",
      sender: this.cookie.get("username"),
      sessionID: this.sessionID,
      type: 'LEAVE',
    };
    this.socketService.send(chatMessage);
    this.socketService.disconnect();
    const container = document.querySelector(".chat-area") as HTMLElement;
    const placeholder = document.querySelector(".placeholder") as HTMLElement;
    container.style.display = "none";
    placeholder.style.display = "flex";

  }
}
