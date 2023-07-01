import { AfterViewChecked, AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';
import { ChatMessage, User } from 'src/app/models/types';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, AfterViewChecked {

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((response) => {
      this.users = response;
    });
  }

  users: User[] = [];
  filteredUsers: User[] = [];
  selectedUser: User | undefined;
  sessionID = 0;
  userID = this.cookie.get("uuid");
  messages: ChatMessage[] = [];
  scroller = 0;

  constructor(
    private socketService: SocketService,
    private userService: UserService,
    private router: Router,
    private cookie : CookieService
  ) {}

  ngAfterViewChecked(): void {
    this.scrollDown();
  }
  connect(id: any) {
    this.sessionID = Number(id) + Number(this.cookie.get("uuid"));
    this.messages = this.socketService.getMessagesList();
    this.socketService.connect(this.sessionID);
  }

  sendMessage(message : string) {
    if (message) {
      let chatMessage = {
        content: message,
        sender: this.cookie.get("uuid"),
        sessionID: this.sessionID,
        type: 'CHAT',
      };
      this.socketService.send(chatMessage);
    }

    this.messages = this.socketService.getMessagesList();

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

  showSelectedUser(): void {
    const userId = this.selectedUser?.id;
    this.router.navigate([`/profile/${userId}`]);
  }
}
