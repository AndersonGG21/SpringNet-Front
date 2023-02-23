import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { Post } from 'src/app/models/login.model';
import { MediaService } from 'src/app/services/media.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent {

  items: MenuItem[] = [];
  displayModal: boolean | undefined;
  uploadedFiles: any[] = [];
  url: string = '';
  font: any;
  post !: Post;
  content : string = 'Siuuu';

  constructor(private mediaService: MediaService, private postService : PostService) {
    this.items = [
      { label: 'Post', icon: 'pi pi-fw pi-hashtag' },
      { label: 'Story', icon: 'pi pi-fw pi-history' },
    ];
  }

  upload(event: any) {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      this.mediaService.uploadFile(formData).subscribe((res) => {
        this.url = res.url;
        console.log(this.url);
      });
    }
  }

  changeColumns = (numColumns: number): void => {
    const section = document.querySelector('section') as HTMLElement;
    section.style.gridTemplateColumns = `repeat(${numColumns}, 1fr)`;
  };

  show2Columns(): void {
    this.changeColumns(2);
  }

  show3Columns(): void {
    this.changeColumns(3);
  }

  show1Column(): void {
    this.changeColumns(1);
    const section = document.querySelector('section') as HTMLElement;
    section.style.width = '500px';
    section.style.transition = 'all 20s ease-in-out 20s';
  }

  showModalDialog() {
    this.displayModal = true;
  }

  createPost(){


    this.post = {
      content : this.content,
      image : this.url,
      user : {
        id: 12
      }
    }

    this.postService.createPost(this.post).subscribe({
      next: (v) => console.log(v),
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    })
  }
}


