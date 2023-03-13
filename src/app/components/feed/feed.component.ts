import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MenuItem } from 'primeng/api';
import { Post } from 'src/app/models/types';
import { PostDataBehaviorSubjectService } from 'src/app/services/post-data-behavior-subject.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent {

  items: MenuItem[] = [];
  font: any;
  posts : Post[] = [];

  constructor(private postDataB : PostDataBehaviorSubjectService, private title : Title) {
    this.items = [
      { label: 'Post', icon: 'pi pi-fw pi-hashtag' },
      { label: 'Story', icon: 'pi pi-fw pi-history' },
    ];

    this.postDataB.posts.subscribe((posts) => {
      this.posts = posts;
    })

    this.title.setTitle("Feed")

    console.log(this.posts)


  }

}


