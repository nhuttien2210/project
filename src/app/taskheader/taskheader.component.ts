import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-taskheader',
  templateUrl: './taskheader.component.html',
  styleUrls: ['./taskheader.component.css'],
})
export class TaskheaderComponent implements OnInit {
  nameShow: any = [];
  constructor() {}
  url = 'http://localhost:4200/';
  ngOnInit(): void {
    this.getName();
  }
  getName() {
    let name = sessionStorage.getItem('user');
    this.nameShow = name;
  }

  logout() {
    sessionStorage.clear();
    window.location.assign(this.url);
  }
}
