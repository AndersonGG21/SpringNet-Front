import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'spring-net';

  renderLayout: boolean = false;

  constructor(private router: Router) {
    this.renderLayout = true;
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.renderLayout = !event.url.includes('/login');
      }
    });
  }
}
