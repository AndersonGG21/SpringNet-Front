import { Component, Input } from '@angular/core';
import { Post } from 'src/app/models/types';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-posts-card',
  templateUrl: './posts-card.component.html',
  styleUrls: ['./posts-card.component.css']
})
export class PostsCardComponent {
  @Input() post !: Post;

  liked : boolean = false;

  constructor(private postService : PostService){};

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
    !this.liked ? this.liked = true : this.liked = false;
    // evento.style.color = "red";
  }

}
