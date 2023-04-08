import { Component, Inject, OnInit, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StoryService } from 'src/app/services/story.service';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})

export class StoriesComponent implements OnInit {
  stories : any;
  private storieService = inject(StoryService)


  ngOnInit(): void {
    this.storieService.getStories().subscribe(response => {
      this.stories = response;
      console.log(this.stories);
    })
  }

}
