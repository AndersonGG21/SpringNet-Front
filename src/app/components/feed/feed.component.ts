import { Component, OnInit, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { Post, User } from 'src/app/models/types';
import { LoginService } from 'src/app/services/login.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {

  font: any;
  posts : Post[] = [];
  recommendedUsers : User[] = [];
  time = 0;
  renderPlaceholder = false;
  userId = Number(this.cookie.get('uuid'));
  skeletons = [1,2,3];
  private loginService = inject(LoginService);
  skeleton = true;

  ngOnInit(): void {
    this.loginService.isLoggedIn();
    this.userService.getAllUsers();
    this.postService.getUserLikedPosts();
    this.postService.getUserSavedPosts();
  }

  constructor(private title : Title, private cookie : CookieService, private userService : UserService, private postService : PostService) {

    this.postService.getPost(Number(cookie.get("uuid"))).subscribe((posts) => {
      this.posts = posts;
      this.posts.sort((a,b) => b.id! - a.id!);
      this.posts.length > 0 ? this.renderPlaceholder = false : this.renderPlaceholder = true;
      this.skeleton = false;
    })

    if (!this.renderPlaceholder) {
      this.userService.users$.subscribe(users => {
        this.recommendedUsers = users;
      })
    }

    this.title.setTitle("SpringNet | Feed")

  }

}


