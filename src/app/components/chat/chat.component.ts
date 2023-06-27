import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';
import { ChatMessage, User } from 'src/app/models/types';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, AfterViewInit {
  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((response) => {
      this.users = response;
    })
  }

  users: User[] = [];
  filteredUsers : User[] = [];
  selectedUser : User | undefined;
  openSearchInput = false;

  constructor(private socketService: SocketService, private userService : UserService, private router : Router) {}

  ngAfterViewInit(): void {
    this.chatPage = document.querySelector('#chat-page') as HTMLElement;
    this.usernameForm = document.querySelector(
      '#usernameForm'
    ) as HTMLFormElement;
    this.messageForm = document.querySelector(
      '#messageForm'
    ) as HTMLFormElement;
    this.messageInput = document.querySelector('#message') as HTMLInputElement;
    this.messageArea = document.querySelector('#messageArea') as HTMLElement;
    this.connectingElement = document.querySelector(
      '.connecting'
    ) as HTMLElement;
    this.usernamePage = document.querySelector(
      '#username-page1'
    ) as HTMLElement;
  }

  usernamePage: any;
  chatPage: any;
  usernameForm: any;
  messageForm: any;
  messageInput: any;
  messageArea: any;
  connectingElement: any;
  username: string = '';
  stompClient : any;
  messages : ChatMessage[] = [];


  colors = [
    '#2196F3',
    '#32c787',
    '#00BCD4',
    '#ff5652',
    '#ffc107',
    '#ff85af',
    '#FF9800',
    '#39bbb0',
  ];

  connect(event: any) {
    let name = document.querySelector('#name') as HTMLInputElement;
    this.username = name.value.trim();

    if (this.username) {
      this.usernamePage.classList.add('hidden');
      this.chatPage.classList.remove('hidden');

      this.socketService.connect()
      this.connectingElement.classList.add('hidden');

    }
    event.preventDefault();
  }

  onConnected() {
    // this.socketService.onConnected(this.username);
    this.connectingElement.classList.add('hidden');
  }

  onError() {
    this.connectingElement.textContent =
      'Could not connect to WebSocket server. Please refresh this page to try again!';
    this.connectingElement.style.color = 'red';
  }

  sendMessage() {
    var messageContent = this.messageInput.value.trim();
    if (messageContent) {
      var chatMessage = {
        content: this.messageInput.value,
        sender: this.username,
        type: 'CHAT',
      };
      // stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
      this.socketService.send(chatMessage);
      this.messageInput.value = '';
    }
    this.messages = this.socketService.getMessagesList();
    console.log(this.messages)
  }

  onMessageReceived(payload: any) {
    // let message = JSON.parse(payload.body);

    // let messageElement = document.createElement('li');

    // if (message.type === 'JOIN') {
    //   messageElement.classList.add('event-message');
    //   message.content = message.sender + ' joined!';
    // } else if (message.type === 'LEAVE') {
    //   messageElement.classList.add('event-message');
    //   message.content = message.sender + ' left!';
    // } else {
    //   messageElement.classList.add('chat-message');

    //   let avatarElement = document.createElement('i');
    //   let avatarText = document.createTextNode(message.sender[0]);
    //   avatarElement.appendChild(avatarText);
    //   avatarElement.style.backgroundColor = this.getAvatarColor(message.sender);

    //   messageElement.appendChild(avatarElement);

    //   let usernameElement = document.createElement('span');
    //   let usernameText = document.createTextNode(message.sender);
    //   usernameElement.appendChild(usernameText);
    //   messageElement.appendChild(usernameElement);
    // }

    // let textElement = document.createElement('p');
    // let messageText = document.createTextNode(message.content);
    // textElement.appendChild(messageText);

    // messageElement.appendChild(textElement);

    // this.messageArea.appendChild(messageElement);
    // this.messageArea.scrollTop = this.messageArea.scrollHeight;
    // this.socketService.onMessageRecieved();
  }

  filterUsers(event : any) {
    let filtered : any[] = [];
    let query = event.query;

    for(let i = 0; i < this.users.length; i++) {
        let user = this.users[i];
        if (user.username?.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(user);
        }
    }

    this.filteredUsers = filtered;
  }

  showSelectedUser() : void {
    const userId = this.selectedUser?.id
    this.router.navigate([`/profile/${userId}`])
  }
}
