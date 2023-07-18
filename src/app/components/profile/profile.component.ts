import { Component, Injectable, OnInit, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Button } from 'primeng/button';
import { Follow, Post, User } from 'src/app/models/types';
import { FollowService } from 'src/app/services/follow.service';
import { LoginService } from 'src/app/services/login.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  userPosts : Post[] = [];
  followersList : User[] = [];
  followedList : User[] = [];
  userId = 0;
  user !: User;
  flag = false;
  checkFollow = false;
  displayFollowersModal = false;
  displayFollowingsModal = false;
  showPlaceholder = false;
  private router = inject(Router);
  private loginService = inject(LoginService);
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

    this.loginService.isLoggedIn();

    this.route.paramMap.subscribe((params : ParamMap) => {

      this.userId = Number(params.get('id'));
      this.follow.following.id = this.userId;

      Number(this.cookie.get('uuid')) == this.userId ? this.flag = false : this.flag = true;

      this.userService.getUserProfile(this.userId).subscribe((response) => {
        this.user = response;
        this.title.setTitle(`@${this.user.username} | Pics and Videos`);
        this.followService.checkFollow(this.follow).subscribe((response) => {
          response >= 1 ? this.checkFollow = true : this.checkFollow = false;
        });
      })

      this.postService.getPostByUser(this.userId).subscribe((response) => {
        this.userPosts = response

        this.userPosts.length > 0 ? this.showPlaceholder = false : this.showPlaceholder = true;
      })

      this.followService.getFollowings(this.userId).subscribe((followings) => {
        this.followedList = followings;
      });

      this.followService.getFollowers(this.userId).subscribe((followers) => {
        this.followersList = followers;
      });
    })
  }

  setFollow() : void {
    this.followService.setFollow(this.follow).subscribe();
    this.checkFollow = !this.checkFollow;
  }

  showFollowersModal() : void {
    this.displayFollowersModal = true;
  }

  showFollowingsModal() : void {
    this.displayFollowingsModal = true;
  }

  redirectToProfile(id : number) : void {
    this.displayFollowersModal = false;
    this.router.navigateByUrl(`/profile/${id}`);
    this.displayFollowersModal = false;
    this.displayFollowingsModal = false;
  }

}
