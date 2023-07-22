import { Component, OnInit, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Post } from 'src/app/models/types';
import { LoginService } from 'src/app/services/login.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-saved-posts',
  templateUrl: './saved-posts.component.html',
  styleUrls: ['./saved-posts.component.css'],
})
export class SavedPostsComponent implements OnInit {
  posts: Post[] = [];
  likedPosts: Post[] = [];
  saved = false;
  renderPlaceholder = false;
  private loginService = inject(LoginService);

  constructor(
    private postService: PostService,
    private cookie: CookieService,
    private aRoute: ActivatedRoute,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.loginService.isLoggedIn();

    this.aRoute.url.subscribe((url) => {
      if (url[0].path == 'liked') {
        this.postService
          .getLikedPosts(Number(this.cookie.get('uuid')))
          .subscribe((response) => {
            this.title.setTitle(`${this.cookie.get('username')} | Liked Posts`);
            this.likedPosts = response;
            this.likedPosts.length > 0
              ? (this.renderPlaceholder = false)
              : (this.renderPlaceholder = true);
          });
      } else {
        this.postService
          .getSavedPosts(Number(this.cookie.get('uuid')))
          .subscribe((response) => {
            this.title.setTitle(
              `@${this.cookie.get('username')} | Saved Posts`
            );
            this.saved = true;
            for (let index = 0; index < response.length; index++) {
              this.posts.push(response[index].post);
            }

            this.posts.length > 0
              ? (this.renderPlaceholder = false)
              : (this.renderPlaceholder = true);
          });
      }
    });
  }
}
