import {  Component, OnInit, inject } from '@angular/core';
import { StoryService } from 'src/app/services/story.service';
import Swiper, { SwiperOptions } from 'swiper';
import {FilePondFile, FilePondOptions} from "filepond";
import {MediaService} from "../../services/media.service";
import { Story } from 'src/app/models/types';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})
export class StoriesComponent implements OnInit {

  stories : Story[] = [];
  private storieService = inject(StoryService);
  private mediaService = inject(MediaService);
  private cookieService = inject(CookieService);
  private messageService = inject(MessageService);
  visible = false;
  swiper : any;
  storiesSwiper : any;
  sidebarVisible = false;
  story !: Story;
  enableButton = false;
  gropuedStories : any = [];


  ngOnInit(): void {
    this.storieService.getStories().subscribe(response => {
      this.stories = response;
      const groupedStories = this.groupBy(this.stories, s => s.user.id);

      const array = Object.values(groupedStories);
      this.gropuedStories = array;


    })
  }

  groupBy = <T, K extends keyof any>(list: T[], getKey: (item: T) => K) =>
  list.reduce((previous, currentItem) => {
    const group = getKey(currentItem);
    if (!previous[group]) previous[group] = [];
    previous[group].push(currentItem);
    return previous;
  }, {} as Record<K, T[]>);

  showDialog() : void {
    this.visible = true;
    setTimeout(() => {
      var swiper = new Swiper(".mySwiper", {
        spaceBetween: 50,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        centeredSlides: true,
        slidesPerView: 2,
        effect: 'coverflow',
        coverflowEffect: {
          rotate: 10,
          stretch: 0,
          depth: 300,
          modifier: 1,
          slideShadows: false
        },
        grabCursor: true
      });
      var swiper2 = new Swiper(".mySwiper2", {
        direction: "vertical",
        spaceBetween: 50,
        slidesPerView: 1,
        centeredSlides: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        grabCursor: true,
      });
    }, 200);
  }

  slideTo(i : number) : void{
    this.showDialog();
    setTimeout(() => {
      this.swiper.slideTo(i, 100, false);
    }, 200);

  }

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
        user : {
          id: Number(this.cookieService.get("uuid")),
        },
      }

      this.storieService.createStory(this.story).subscribe(() => {
        this.sidebarVisible = false;
        this.messageService.add({key: 'tc', severity: 'success', detail: 'Story created', life: 1000});
      })

    });


  }
}
