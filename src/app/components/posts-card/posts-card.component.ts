import { Component } from '@angular/core';
import { Post } from 'src/app/models/login.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-posts-card',
  templateUrl: './posts-card.component.html',
  styleUrls: ['./posts-card.component.css']
})
export class PostsCardComponent {
  items : number[] = [1,2,3,4,5,6,7,8 ];
  posts : Post[] = [];

  constructor(private postService : PostService){
    postService.getPost(12).subscribe((response) => {
      this.posts = response;
      console.log(this.posts);
    })
  };

}
