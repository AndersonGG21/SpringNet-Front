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
  }

  ngAfterViewChecked(): void {
    this.scrollDown();
  }

  /**
   * The connect function establishes a connection with a user, sets the session ID, retrieves the
   * messages list, connects to the socket service, selects a user, shows the chat area, and triggers
   * the onConnected function after a delay.
   * @param {User} user - The `user` parameter is an object that represents the user who is connecting.
   * It likely contains information such as the user's ID, name, and other relevant details.
   */
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

  /**
   * The function sends a chat message using a socket service and updates the messages list.
   * @param {string} message - The `message` parameter is a string that represents the content of the
   * message that will be sent.
   */
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

  /**
   * The scrollDown function scrolls to the bottom of a chat text area with a smooth animation.
   */
  scrollDown() {
    const container = document.querySelector('.chat-text-area') as HTMLDivElement;
    container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
  }

  /**
   * The function filters an array of users based on a query string and assigns the filtered users to a
   * variable.
   * @param {any} event - The event parameter is an object that contains information about the event
   * that triggered the filtering. It could include properties such as the query string entered by the
   * user.
   */
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

  /**
   * The function `showChatArea()` displays the chat area, hides the placeholder, and checks if the
   * selected user is online.
   */
  showChatArea() : void {
    const container = document.querySelector(".chat-area") as HTMLElement;
    const placeholder = document.querySelector(".placeholder") as HTMLElement;
    container.style.display = "flex";
    placeholder.style.display = "none";
  }

  /**
   * The function navigates to the profile page of the selected user.
   */
  showSelectedUser() : void {
    const userId = this.selectedUser?.id
    this.router.navigate([`/profile/${userId}`])
  }

  /**
   * The function sends a JOIN message to the socket service with the sender's username and session ID.
   */
  onConnected() : void{
    let chatMessage = {
      content: "",
      sender: this.cookie.get("username"),
      sessionID: this.sessionID,
      type: 'JOIN',
    };
    this.socketService.send(chatMessage);
  }

  /**
   * The function `onDisconnected` sends a leave message to the server, disconnects the socket
   * connection, and hides the chat area while displaying a placeholder.
   */
  onDisconnected() : void {
    let chatMessage = {
      content: "",
      sender: this.cookie.get("username"),
      sessionID: this.sessionID,
      type: 'LEAVE',
    };
    this.socketService.send(chatMessage);
    this.socketService.disconnect();
    this.connected = false;
    const container = document.querySelector(".chat-area") as HTMLElement;
    const placeholder = document.querySelector(".placeholder") as HTMLElement;
    container.style.display = "none";
    placeholder.style.display = "flex";
  }

  avoidEnter(event : any) : void {
    let key = event.keyCode;

    if (key === 13) {
        event.preventDefault();
        this.sendMessage(event.target.value);
    }
  }
}
