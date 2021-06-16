import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  url = 'http://localhost:3000/';
  users: any = [];
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.sess();
    this.getUsers();

    var a = window.sessionStorage.getItem('type');
    if (a == '0') {
      alert('Bạn không phải leader !!');
      window.location.assign('http://localhost:4200/tasks');
    }
  }
  getUsers() {
    this.http.get(this.url + 'users').subscribe((data) => {
      this.users = data;
    });
  }
  sess() {
    if (!sessionStorage.user) {
      window.location.assign('http://localhost:4200/');
    }
  }
}
