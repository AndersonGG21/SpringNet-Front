import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/types';
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
  followers : number = 0;
  following : number = 0;
  userDescription? : string = '';
  userName? : string = '';

  constructor( private postService : PostService, private followService : FollowService, private userService : UserService){}

  ngOnInit(): void {
    this.postService.getPostByUser(12).subscribe((response) => {
      this.userPosts = response
    })

    this.followService.getCountOfFollowers().subscribe((response) => {
      this.followers = response;
    });

    this.followService.getCountOfFollowing().subscribe((response) => {
      this.following = response;
    });

    this.userService.getUserProfile().subscribe((response) => {
      this.userDescription = response.description;
      this.userName = response.username;
    })
  };



}
