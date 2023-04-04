import { Component, Injectable, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Post, User } from 'src/app/models/types';
import { FollowService } from 'src/app/services/follow.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  userPosts : Post[] = [];
  followers  = 0;
  following  = 0;
  userId = 0;
  user !: User;

  constructor( private postService : PostService, private followService : FollowService, private userService : UserService, private title : Title, private route : ActivatedRoute){}

  ngOnInit(): void {

    this.route.paramMap.subscribe((params : ParamMap) => {
      this.userId = Number(params.get('id'));

      this.userService.getUserProfile(this.userId).subscribe((response) => {
        this.user = response;
        this.title.setTitle(`@${this.user.username} | Pics and Videos`);
      })

      this.postService.getPostByUser(this.userId).subscribe((response) => {
        this.userPosts = response
      })

      this.followService.getCountOfFollowers(this.userId).subscribe((response) => {
        this.followers = response;
      });

      this.followService.getCountOfFollowing(this.userId).subscribe((response) => {
        this.following = response;
      });
    })
  }

}
