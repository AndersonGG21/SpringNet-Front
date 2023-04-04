import { Component, Injectable, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Button } from 'primeng/button';
import { Follow, Post, User } from 'src/app/models/types';
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
  flag = false;
  checkFollow = false;
  follow : Follow = {
    follower : {
      id: Number(this.cookie.get('uuid'))
    },
    following : {
      id: this.userId
    }
  }

  constructor( private postService : PostService, private followService : FollowService, private userService : UserService, private title : Title, private route : ActivatedRoute, private cookie : CookieService){}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params : ParamMap) => {

      this.userId = Number(params.get('id'));
      this.follow.following.id = this.userId;

      Number(this.cookie.get('uuid')) == this.userId ? this.flag = false : this.flag = true;

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

    this.followService.checkFollow(this.follow).subscribe((response) => {
      response >= 1 ? this.checkFollow = true : this.checkFollow = false;
    });
  }

  setFollow() : void {
    this.followService.setFollow(this.follow).subscribe();
    this.checkFollow = !this.checkFollow;
  }

  deleteText() : void {
    const button = document.querySelector('.follow-btn') as HTMLButtonElement;
    button.textContent = '';
  }

  addText() : void {
    const button = document.querySelector('.follow-btn') as HTMLButtonElement;
    button.textContent = 'Following';
  }
}
