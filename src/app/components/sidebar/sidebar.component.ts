import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MenuItem } from 'primeng/api';
import { User } from 'src/app/models/types';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  items : MenuItem[] = [];
  private router = inject(Router);
  private cookie = inject(CookieService);
  private userService = inject(UserService);
  selectedUser : User | undefined;
  filteredUsers : User[] = [];
  users : User[] = [];

  ngOnInit()
  {
    this.items = [
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-sign-out',
        routerLink: '/'
      }
    ];

    this.userService.getAllUsers().subscribe((response) => {
      this.users = response;
    })

  }

  isLinkActive(link: string): boolean {
    return this.router.isActive(link, true);
  }

  redirectToSaved() : void {
    this.router.navigate([`/profile/saved/${Number(this.cookie.get("uuid"))}`])
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
