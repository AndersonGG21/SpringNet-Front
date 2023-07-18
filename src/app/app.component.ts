import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  renderLayout: boolean = false;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url = this.router.url;
        if (url.includes('/register') || url.includes('/login') || url.includes('/not-logged') || url.includes('/404')) {
          this.renderLayout = false;
        } else {
          this.renderLayout = true;
        }
      }
    });
  }
}
