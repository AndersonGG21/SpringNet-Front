import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
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
  likedPosts : Post[] = [];
  saved = false;

  constructor(private postService : PostService, private cookie : CookieService, private aRoute : ActivatedRoute, private title : Title){}

  ngOnInit(): void {
    this.aRoute.url.subscribe(url => {
      if (url[0].path == "liked") {
        this.postService.getLikedPosts(Number(this.cookie.get('uuid'))).subscribe((response) => {
          this.title.setTitle(`${this.cookie.get('username')} | Liked Posts`);
          this.likedPosts = response;
        })
      }else{
        this.aRoute.paramMap.subscribe((params : ParamMap) => {
          this.postService.getSavedPosts(Number(params.get('id'))).subscribe((response) => {
            this.title.setTitle(`@${response[0].user.username} | Saved Posts`);
            this.saved = true;
            for (let index = 0; index < response.length; index++) {
              this.posts.push(response[index].post)
            }
          })
        })
      }
    });

  };


}
