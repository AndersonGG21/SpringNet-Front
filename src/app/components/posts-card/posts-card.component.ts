import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Like, Post } from 'src/app/models/types';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-posts-card',
  templateUrl: './posts-card.component.html',
  styleUrls: ['./posts-card.component.css']
})
export class PostsCardComponent implements OnInit {
  @Input() post !: Post;
  liked : boolean = false;

  constructor(private postService : PostService, private cookie : CookieService){}

  ngOnInit(): void {

    const like : Like = {
      user: {
        id: Number(this.cookie.get("uuid"))
      },
      post: {
        id: this.post.id
      }
    }

    this.postService.checkLike(like).subscribe((response) => {
      if(response >= 1){
        this.liked = true;
      }
    })

  };

  toggleShow() : void {
    const textContainer = document.querySelector('.card-desc') as HTMLDivElement;
    const btn = document.querySelector('.show-btn') as HTMLButtonElement;

    textContainer.classList.toggle("show-more");

    btn.textContent == 'Show more' ? btn.textContent = 'Show less' : btn.textContent = 'Show more';
  }

  stringLength(string : any) : number{
    const str = new String(string);
    return str.length;
  }

  formatDate(date : any) : string {
    const str = new String(date);
    return str.substring(0,10);
  }

  likePost() : void {

    const like : Like = {
      user: {
        id: Number(this.cookie.get("uuid"))
      },
      post: {
        id: this.post.id
      }
    }
    this.postService.likePost(like).subscribe();
  }

}
