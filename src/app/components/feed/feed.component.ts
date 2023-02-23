import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { MediaService } from 'src/app/services/media.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent {
  cities: City[];
  items: MenuItem[] = [];
  displayModal: boolean | undefined;
  uploadedFiles: any[] = [];
  url: string = '';

  selectedCity: City | undefined;
  font: any;
  post !: Post;
  content : string = '';

  constructor(private mediaService: MediaService) {
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
    ];

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
    this.post.content = this.content;
    this.post.image = this.url;
    this.post.user.id = 12;
  }
}

interface City {
  name: string;
  code: string;
}

interface Post {
  content: string;
  image: string;
  user: {
    id: number
  }
}
