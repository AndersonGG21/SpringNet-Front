import { ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Comment, Like, Post, SavedPost } from 'src/app/models/types';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-posts-card',
  templateUrl: './posts-card.component.html',
  styleUrls: ['./posts-card.component.css'],
})
export class PostsCardComponent implements OnInit, OnDestroy {
  @Input() post!: Post;
  @ViewChild('comment') commentInput: ElementRef | undefined;
  liked = false;
  displayModal = false;
  comments: Comment[] = [];
  likes = 0;
  saved = false;
  date = new Date();
  userLikedPosts: Post[] = [];
  userSavedPosts: SavedPost[] = [];

  constructor(
    private postService: PostService,
    private cookie: CookieService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    // const like: Like = {
    //   user: {
    //     id: Number(this.cookie.get('uuid')),
    //   },
    //   post: {
    //     id: this.post.id,
    //   },
    // };

    // this.postService.checkLike(like).subscribe((response) => {
    //   if (response >= 1) {
    //     this.liked = true;
    //   }
    // });

    setTimeout(() => {
      this.postService.posts$.subscribe(posts => {
        this.userLikedPosts = posts;
      })

      this.postService.savedPosts$.subscribe(savedPosts => {
        this.userSavedPosts = savedPosts;
      });

      if (this.userLikedPosts.findIndex(post => post.id == this.post.id) >= 0) {
        this.liked = true;
      }

      if (this.userSavedPosts.findIndex(saved => saved.post.id == this.post.id) >= 0) {
        this.saved = true;
      }
    }, 1000);

    // const post = {
    //   user: {
    //     id : Number(this.cookie.get('uuid'))
    //   },
    //   post : {
    //     id : this.post.id
    //   }
    // }
    // this.postService.checkIfSaved(post).subscribe((response) => {
    //   this.saved = response;
    // })

    this.getLikes();
  }

  modalShow(post: number = 0): void {
    this.displayModal = true;
    this.postService.getComments(post).subscribe((response) => {
      this.comments = response;
    });
  }

  toggleShow(element : any): void {
    const textContainer = element.previousElementSibling as HTMLDivElement;
    const btn = element as HTMLButtonElement;

    textContainer.classList.toggle('show-more');

    btn.textContent = textContainer.classList.contains('show-more') ? 'Show less' : 'Show more';
  }

  stringLength(string: any): number {
    const str = new String(string);
    return str.length;
  }

  formatDate(date: any): string {
    const str = new String(date);
    return str.substring(0, 10);
  }

  likePost(): void {
    !this.liked ? (this.liked = true) : (this.liked = false);
    const like: Like = {
      user: {
        id: Number(this.cookie.get('uuid')),
      },
      post: {
        id: this.post.id,
      },
    };
    this.postService.likePost(like).subscribe();

    this.liked ? this.likes++ : this.likes--;
  }

  commentPost(): void {
    const comment: Comment = {
      comment: this.commentInput?.nativeElement.value,
      post: {
        id: this.post.id,
      },
      user: {
        id: Number(this.cookie.get('uuid'))
      },
    };

    this.postService.commentPost(comment).subscribe(() => {
      if (comment.user) {
        comment.user.username = this.cookie.get('username');
        comment.user.profileImg = this.cookie.get('user_profile_picture');
      }
      comment.date = this.date.toLocaleDateString();
      this.comments.push(comment);
      this.cdr.detectChanges();
    });
  }

  getLikes(): void {
    if (this.post.id != null) {
      this.postService.getPostLikes(this.post.id).subscribe((response) => {
        this.likes = response;
      });
    }
  }

  sharePost() : void {
    alert(this.post.id);
  }

  savePost() : void {
    this.saved = !this.saved;

    const post = {
      user: {
        id : Number(this.cookie.get('uuid'))
      },
      post :  {
        id : this.post.id
      }
    }

    this.postService.savePost(post).subscribe();
  }

  ngOnDestroy(): void {
    // this.userLikedPosts = [];
  }
}
