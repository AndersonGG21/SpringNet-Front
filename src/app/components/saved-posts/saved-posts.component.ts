import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Post } from 'src/app/models/types';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-saved-posts',
  templateUrl: './saved-posts.component.html',
  styleUrls: ['./saved-posts.component.css']
})
export class SavedPostsComponent implements OnInit {
  posts : Post[] = [];

  constructor(private postService : PostService, private cookie : CookieService){}

  ngOnInit(): void {
    this.postService.getSavedPosts(Number(this.cookie.get('uuid'))).subscribe((response) => {
      for (let index = 0; index < response.length; index++) {
        this.posts.push(response[index].post)
      }
    })
  };


}
