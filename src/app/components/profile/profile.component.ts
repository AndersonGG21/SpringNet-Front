import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/login.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  userPosts : Post[] = [];

  constructor( private postService : PostService){}

  ngOnInit(): void {
    this.postService.getPostByUser(12).subscribe((response) => {
      this.userPosts = response
    })
  };



}
