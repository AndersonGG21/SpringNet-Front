import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { MenuItem } from 'primeng/api';
import { timeInterval } from 'rxjs';
import { Post } from 'src/app/models/types';
import { PostDataBehaviorSubjectService } from 'src/app/services/post-data-behavior-subject.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent {

  items: MenuItem[] = [];
  font: any;
  posts : Post[] = [];
  time = 0;

  constructor(private postDataB : PostService, private title : Title, private cookie : CookieService) {
    this.items = [
      { label: 'Post', icon: 'pi pi-fw pi-hashtag' },
      { label: 'Story', icon: 'pi pi-fw pi-history' },
    ];

    this.postDataB.getPost(Number(cookie.get("uuid"))).pipe(timeInterval()).subscribe((posts) => {
      this.time = posts.interval;

      const skeleton = document.getElementById("skeleton-loader") as HTMLElement;
      setTimeout(() => {
        this.posts = posts.value;
        this.posts.sort((a,b) => a.id! - b.id!);
        skeleton.style.display = 'none'
      }, this.time * 10);
    })

    this.title.setTitle("Feed")

  }

}


