import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { Post } from '../models/types';
import { PostService } from './post.service';

@Injectable({
  providedIn: 'root',
})
export class PostDataBehaviorSubjectService {
  private _posts = new BehaviorSubject<Post[]>([]);

  constructor(
    private postService: PostService,
    private messageService: MessageService,
    private cookie : CookieService
  ) {
    this.loadPosts();
  }

  get posts() {
    return this._posts.asObservable();
  }

  loadPosts() {
    this.postService.getPost(Number(this.cookie.get("uuid"))).subscribe((posts) => {
      this._posts.next(posts);
    });
  }

  addPost(post: Post) {
    this.postService.createPost(post).subscribe((resp) => {
      if (resp.status == 200) {
        const posts = this._posts.getValue();
        posts.push(post);
        this._posts.next(posts);
        this.messageService.add({
          key: 'tc',
          severity: 'success',
          summary: 'Post created',
        });
      }
    });
  }
}
