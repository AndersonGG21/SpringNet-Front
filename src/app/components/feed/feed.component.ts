import { Component } from '@angular/core';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})

export class FeedComponent {

  cities: City[];

  selectedCity: City | undefined;

  constructor() {
      this.cities = [
          {name: 'New York', code: 'NY'},
          {name: 'Rome', code: 'RM'},
          {name: 'London', code: 'LDN'},
          {name: 'Istanbul', code: 'IST'},
          {name: 'Paris', code: 'PRS'}
      ];
  }

  changeColumns = (numColumns: number): void => {
    const section = document.querySelector("section") as HTMLElement;
    section.style.gridTemplateColumns = `repeat(${numColumns}, 1fr)`;
    section.style.transition = "all 20s ease-in-out 20s";
  };

  show2Colums() :void{
    this.changeColumns(2);
  }

  show3Columns() :void{
    this.changeColumns(3);
  }
}

interface City {
  name: string,
  code: string
}