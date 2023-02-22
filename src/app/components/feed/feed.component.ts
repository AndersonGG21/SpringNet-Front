import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})

export class FeedComponent {

  cities: City[];
  items: MenuItem[] = [];
  displayModal: boolean | undefined;

  selectedCity: City | undefined;

  constructor() {
      this.cities = [
          {name: 'New York', code: 'NY'},
          {name: 'Rome', code: 'RM'},
          {name: 'London', code: 'LDN'},
          {name: 'Istanbul', code: 'IST'},
          {name: 'Paris', code: 'PRS'}
      ];

      this.items = [
        {label: 'Post', icon: 'pi pi-fw pi-hashtag'},
        {label: 'Story', icon: 'pi pi-fw pi-history'}
    ];
  }

  changeColumns = (numColumns: number): void => {
    const section = document.querySelector("section") as HTMLElement;
    section.style.gridTemplateColumns = `repeat(${numColumns}, 1fr)`;
  };

  show2Columns() :void{
    this.changeColumns(2);
  }

  show3Columns() :void{
    this.changeColumns(3);

  }

  show1Column() : void {
    this.changeColumns(1);
    const section = document.querySelector("section") as HTMLElement;
    section.style.width = '500px';
    section.style.transition = "all 20s ease-in-out 20s";
  }

  showModalDialog() {
    this.displayModal = true;
  }
}

interface City {
  name: string,
  code: string
}
