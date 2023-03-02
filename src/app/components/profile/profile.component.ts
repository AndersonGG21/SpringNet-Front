import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/login.model';
import { FollowService } from 'src/app/services/follow.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  userPosts : Post[] = [];
  followers : number = 0;

  constructor( private postService : PostService, private followService : FollowService){}

  ngOnInit(): void {
    this.postService.getPostByUser(12).subscribe((response) => {
      this.userPosts = response
    })

    this.followService.getCountOfFollowers().subscribe((response) => {
      this.followers = response;
    });
  };



}
