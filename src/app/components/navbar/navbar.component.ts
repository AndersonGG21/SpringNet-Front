import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {MenuItem} from 'primeng/api';
import { User } from 'src/app/models/types';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  @Input() home  = false;
  @Input() likes  = false;
  @Input() reels  = false;
  items: MenuItem[] = [];
  users: User[] = [];
  selectedUser : User | undefined;
  filteredUsers : User[] = [];
  uuid  = 0;
  openSearchInput = false;
  user !: User;

  constructor(private cookie : CookieService, private userService : UserService, private router : Router){}

    ngOnInit() {
        this.items = [
            {label: 'Home', icon: 'pi pi-fw pi-home'},
            {label: 'Likes', icon: 'pi pi-fw pi-heart'},
            {label: 'Reels', icon: 'pi pi-fw pi-video'},
            {label: 'Add Story', icon: 'pi pi-fw pi-history'},
            {label: 'Add Post', icon: 'pi pi-fw pi-hashtag'}
        ];

        this.uuid = Number(this.cookie.get("uuid"));

        this.userService.getAllUsers().subscribe((response) => {
          this.users = response;
        })

        this.userService.getUserProfile(this.uuid).subscribe((response) => {
          this.user = response;
        })
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

    handleSearch() : void {
      this.openSearchInput = !this.openSearchInput;
    }

    redirect() : void {
      this.router.navigate([`/profile/${Number(this.cookie.get("uuid"))}`])
    }

}
