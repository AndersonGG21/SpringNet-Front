import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, Inject, OnInit, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StoryService } from 'src/app/services/story.service';
import Swiper, { SwiperOptions } from 'swiper';
import { delay } from 'rxjs';
import {FilePondFile, FilePondOptions} from "filepond";
import {MediaService} from "../../services/media.service";
import { Story } from 'src/app/models/types';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})

export class StoriesComponent implements OnInit {

  stories : any;
  private storieService = inject(StoryService);
  private mediaService = inject(MediaService);
  private cookieService = inject(CookieService);
  visible = false;
  swiper : any;
  sidebarVisible = false;
  story !: Story;
  enableButton = false;


  ngOnInit(): void {
    this.storieService.getStories().subscribe(response => {
      this.stories = response;
      console.log(response);
    })
  }

  showDialog() : void {
    this.visible = true;
    setTimeout(() => {
      this.swiper = new Swiper(".swiper-container",{
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        coverflowEffect: {
          rotate: 20,
          stretch: 0,
          depth: 350,
          modifier: 1,
          slideShadows: true
        },
        autoplay: {
          delay: 10000
        }
      })
    }, 200);
  }

  slideTo(i : number) : void{
    this.showDialog();
    setTimeout(() => {
      this.swiper.slideTo(i, 100, false);
    }, 200);

  }

  //FilePond

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


  formData = new FormData();
  pondHandleAddFile(event: any) {
    console.log('A file was added', event.file.file);
    // const formData = new FormData();
    const file = event.file.file;
    this.formData.append('file', file);
    this.enableButton = true;
  }

  showStorySidebar() {
    this.sidebarVisible = true;
  }

  createStory() {

    this.mediaService.uploadFile(this.formData).subscribe((res) => {
      this.imageUrl = res.url;

      this.story = {
        media: this.imageUrl,
        user: {
          id: Number(this.cookieService.get("uuid")),
        }
      }

      this.storieService.createStory(this.story).subscribe(() => {
        console.log("Story created");
      })

    });


  }
}
