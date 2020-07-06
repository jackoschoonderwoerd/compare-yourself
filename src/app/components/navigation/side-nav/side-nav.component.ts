import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  mobileNavStatus: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggle() {
    console.log('toggle');
    this.mobileNavStatus = !this.mobileNavStatus;
  }
}
