import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Post } from 'src/app/models/types';
import { MediaService } from 'src/app/services/media.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-grid-config',
  templateUrl: './grid-config.component.html',
  styleUrls: ['./grid-config.component.css']
})
export class GridConfigComponent {

  value : number = 0;
  imgUrl : string = '';
  displayModal: boolean | undefined;
  post !: Post;
  content  = '';
  uploadedFiles: any[] = [];


  constructor(private mediaService : MediaService, private postService : PostService, private messageService : MessageService){};

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

  upload(event: any) {
    console.log(event.files[0].size)
    let interval = setInterval(() => {
      this.value = this.value + Math.floor(Math.random() * 10) + 1;
      if (this.value >= 100) {
          this.value = 100;
          clearInterval(interval);
      }
    }, event.files[0].size);

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

  createPost(){
    this.post = {
      content : this.content,
      image : this.imgUrl,
      user : {
        id: 13
      }
    }

    this.postService.createPost(this.post).subscribe((resp) => {
      if (resp.status == 200) {
        this.messageService.add({key: 'tc',severity:'success', summary:'Post created'});
      }
    });;

  }
}
