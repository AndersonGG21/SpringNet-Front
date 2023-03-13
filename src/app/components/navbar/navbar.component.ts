import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {MenuItem} from 'primeng/api';


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
  uuid  = 0;

  constructor(private cookie : CookieService){}

    ngOnInit() {
        this.items = [
            {label: 'Home', icon: 'pi pi-fw pi-home'},
            {label: 'Likes', icon: 'pi pi-fw pi-heart'},
            {label: 'Reels', icon: 'pi pi-fw pi-video'},
            {label: 'Add Story', icon: 'pi pi-fw pi-history'},
            {label: 'Add Post', icon: 'pi pi-fw pi-hashtag'}
        ];

        this.uuid = Number(this.cookie.get("uuid"));
    }
}
