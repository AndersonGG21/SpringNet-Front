import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MenuItem, MessageService } from 'primeng/api';
import { Post } from 'src/app/models/types';
import { MediaService } from 'src/app/services/media.service';
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

  constructor(private postService : PostService, private postDataB : PostDataBehaviorSubjectService, private title : Title) {
    this.items = [
      { label: 'Post', icon: 'pi pi-fw pi-hashtag' },
      { label: 'Story', icon: 'pi pi-fw pi-history' },
    ];

    this.postDataB.posts.subscribe((posts) => {
      this.posts = posts;
    })

    this.title.setTitle("Feed")


  }

}


