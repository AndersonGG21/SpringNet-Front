import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { MenuItem } from 'primeng/api';
import { timeInterval } from 'rxjs';
import { Post, User } from 'src/app/models/types';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent {

  font: any;
  posts : Post[] = [];
  recommendedUsers : User[] = [];
  time = 0;
  renderPlaceholder = false;
  userId = Number(this.cookie.get('uuid'));
  // skeletons : Number[] = [1,2,3];

  constructor(private title : Title, private cookie : CookieService, private userService : UserService, private postService : PostService) {


    this.postService.getPost(Number(cookie.get("uuid"))).subscribe((posts) => {
      this.posts = posts;
      this.posts.sort((a,b) => a.id! - b.id!);

      this.posts.length > 0 ? this.renderPlaceholder = false : this.renderPlaceholder = true;
    })

    if (!this.renderPlaceholder) {
      this.userService.getAllUsers().subscribe((users) => {
        this.recommendedUsers = users;
      });
    }

    this.title.setTitle("Feed")

  }

}


