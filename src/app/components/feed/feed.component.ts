import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
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
  imgUrl = '';
  font: any;
  post !: Post;
  content  = '';
  value = 0;

  constructor(private mediaService: MediaService, private postService : PostService, private messageService : MessageService) {
    this.items = [
      { label: 'Post', icon: 'pi pi-fw pi-hashtag' },
      { label: 'Story', icon: 'pi pi-fw pi-history' },
    ];
  }

  upload(event: any) {
    let interval = setInterval(() => {
      this.value = this.value + Math.floor(Math.random() * 10) + 1;
      if (this.value >= 100) {
          this.value = 100;
          clearInterval(interval);
      }
    }, 100);

    const file = event.files[0];

    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      this.mediaService.uploadFile(formData).subscribe((res) => {
        this.imgUrl = res.url;
        console.log(this.imgUrl);
      });
    }
  }

  showModalDialog() {
    this.displayModal = true;
  }

  async createPost(){
    this.post = {
      content : this.content,
      image : this.imgUrl,
      user : {
        id: 12
      }
    }

    this.postService.createPost(this.post).subscribe((resp) => {
      if (resp.status == 200) {
        this.messageService.add({key: 'tc',severity:'success', summary:'Service Message', detail:'Via MessageService'});
      }
    });;

  }
}


