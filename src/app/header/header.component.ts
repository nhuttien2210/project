import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
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
