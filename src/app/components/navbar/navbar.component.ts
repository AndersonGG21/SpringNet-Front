import { Component, Input } from '@angular/core';
import {MenuItem} from 'primeng/api';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input() home  = false;
  @Input() likes  = false;
  @Input() reels  = false;
  items: MenuItem[] = [];

    ngOnInit() {
        this.items = [
            {label: 'Home', icon: 'pi pi-fw pi-home'},
            {label: 'Likes', icon: 'pi pi-fw pi-heart'},
            {label: 'Reels', icon: 'pi pi-fw pi-video'},
            {label: 'Add Story', icon: 'pi pi-fw pi-history'},
            {label: 'Add Post', icon: 'pi pi-fw pi-hashtag'}
        ];
    }
}
