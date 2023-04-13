import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, Inject, OnInit, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StoryService } from 'src/app/services/story.service';
import Swiper, { SwiperOptions } from 'swiper';
import { delay } from 'rxjs';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})

export class StoriesComponent implements OnInit {

  stories : any;
  private storieService = inject(StoryService)
  visible = false;
  swiper : any;


  ngOnInit(): void {
    this.storieService.getStories().subscribe(response => {
      this.stories = response;
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
}
