import { Component, OnInit, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Post } from 'src/app/models/types';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-liked-posts',
  templateUrl: './liked-posts.component.html',
  styleUrls: ['./liked-posts.component.css']
})
export class LikedPostsComponent implements OnInit {
  posts : Post[] = [];
  private postService = inject(PostService);
  private cookieService = inject(CookieService);

  ngOnInit(): void
  {
    this.postService.getLikedPosts(Number(this.cookieService.get('uuid'))).subscribe(posts => {
      this.posts = posts;
      console.log(posts);
    })
  }

}

