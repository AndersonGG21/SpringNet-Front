import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
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
  followers  = 0;
  following  = 0;
  userDescription? : string = '';
  userName? : string = '';
  userId : number = this.route.snapshot.params['id'];

  constructor( private postService : PostService, private followService : FollowService, private userService : UserService, private title : Title, private route : ActivatedRoute){}

  ngOnInit(): void {
    this.postService.getPostByUser(this.userId).subscribe((response) => {
      this.userPosts = response
    })

    this.followService.getCountOfFollowers(this.userId).subscribe((response) => {
      this.followers = response;
    });

    this.followService.getCountOfFollowing(this.userId).subscribe((response) => {
      this.following = response;
    });

    this.userService.getUserProfile(this.userId).subscribe((response) => {
      this.userDescription = response.description;
      this.userName = response.username;
      this.title.setTitle(`@${this.userName} | Pics and Videos`);
    })

  }



}
