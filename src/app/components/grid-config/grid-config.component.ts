import { Component, OnInit, ViewChild } from '@angular/core';
import { FilePondFile, FilePondOptions } from 'filepond';
import { CookieService } from 'ngx-cookie-service';
import { FilePondComponent } from 'ngx-filepond';
import { MessageService } from 'primeng/api';
import { Post } from 'src/app/models/types';
import { MediaService } from 'src/app/services/media.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-grid-config',
  templateUrl: './grid-config.component.html',
  styleUrls: ['./grid-config.component.css'],
})
export class GridConfigComponent{
  imgUrl = '';
  displayModal: boolean | undefined;
  post!: Post;
  content = '';
  enableButton = false;
  @ViewChild('myPond') myPond: FilePondComponent | undefined;

  constructor(
    private mediaService: MediaService,
    private cookie : CookieService,
    private messageService : MessageService,
    private postService : PostService
  ) {}

  changeColumns = (numColumns: number): void => {
    const section = document.querySelector('section') as HTMLElement;
    section.style.gridTemplateColumns = `repeat(${numColumns}, 1fr)`;
  };

  show1Column(): void {
    this.changeColumns(1);
    const section = document.querySelector('section') as HTMLElement;
    section.style.width = '450px';
  }

  show2Columns(): void {
    const section = document.querySelector('section') as HTMLElement;
    section.style.width = '80%';
    this.changeColumns(2);
  }

  show3Columns(): void {
    const section = document.querySelector('section') as HTMLElement;
    section.style.width = '80%';
    this.changeColumns(3);
  }

  showModalDialog() {
    this.displayModal = true;
  }

  createPost() {
    this.post = {
      content: this.content,
      image: this.imgUrl,
      user: {
        id: Number(this.cookie.get("uuid")),
      },
    };

    this.postService.createPost(this.post).subscribe((res) => {
      this.displayModal = false;
      this.messageService.add({key: 'tc', severity: 'success', detail: 'Post created', life: 1000});
    }, error => {
      this.messageService.add({key: 'tc', severity: 'danger', detail: 'Error', life: 1000});
    })

  }


  // FilePond
  imageUrl = '';

  onProcessFile(event: any) {
    const file: FilePondFile = event.file;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageUrl = e.target.result;
    };
    reader.readAsDataURL(file.file);
  }

  pondOptions: FilePondOptions = {
    labelIdle: 'Drag and Drop your files or <span>Browse</span>',
    acceptedFileTypes: ['image/*'],
    allowImagePreview: true,
    imagePreviewHeight: 250,
    maxFileSize: "8MB"
  };

  pondHandleAddFile(event: any) {
    console.log('A file was added', event.file.file);
    const formData = new FormData();
    const file = event.file.file;
    formData.append('file', file);

    this.mediaService.uploadFile(formData).subscribe((res) => {
      this.imgUrl = res.url;
      this.enableButton = true;
    });
  }

}
