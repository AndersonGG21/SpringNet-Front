import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Comment, Like, Post } from 'src/app/models/types';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-posts-card',
  templateUrl: './posts-card.component.html',
  styleUrls: ['./posts-card.component.css']
})
export class PostsCardComponent implements OnInit {
  @Input() post !: Post;
  @ViewChild('comment') commentInput: ElementRef | undefined;
  liked  = false;
  displayModal = false;
  comments : Comment[] = [];
  likes = 0;

  constructor(private postService : PostService, private cookie : CookieService, private cdr: ChangeDetectorRef){}

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

    this.getLikes();

  }

  modalShow(post  : number = 0) : void {
    this.displayModal = true;
    this.postService.getComments(post).subscribe((response) => {
      this.comments = response;
    })
  }

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
    const like : Like = {
      user: {
        id: Number(this.cookie.get("uuid"))
      },
      post: {
        id: this.post.id
      }
    }
    this.postService.likePost(like).subscribe();

    this.liked ? this.likes++ : this.likes--;
  }

  commentPost() : void {

    const comment : Comment = {
      comment: this.commentInput?.nativeElement.value,
      post: {
        id: this.post.id
      },
      user : {
        id: Number(this.cookie.get("uuid"))
      },
    }

    this.postService.commentPost(comment).subscribe(response => {
      this.comments.push(comment);
      this.cdr.detectChanges();
    })

  }

  getLikes() : void {
    if (this.post.id != null) {
      this.postService.getPostLikes(this.post.id).subscribe((response) => {
        this.likes = response;
      })
    }
  }
}
