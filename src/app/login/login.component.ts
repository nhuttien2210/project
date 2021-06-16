import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as bcrypt from 'bcryptjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  url = 'http://localhost:3000/';
  users: any = [];
  constructor(private http: HttpClient) {}
  @ViewChild('name') name: ElementRef;
  @ViewChild('pass') pass: ElementRef;

  na;
  pa;
  ngOnInit(): void {
    this.getData();
    this.logged();
  }
  tocken: string = null;

  getData() {
    this.http.get(this.url + 'users').subscribe((data) => {
      this.users = data;
    });
  }

  onSubmit() {
    let namelg = this.name.nativeElement.value;
    let passlg = this.pass.nativeElement.value;
    if (!namelg) {
      alert('Bạn chưa nhập username');
    } else if (!passlg) {
      alert('Bạn chưa nhập password');
    } else {
      this.users.forEach((e) => {
        var passdb = e.pass;
        var kq = bcrypt.compareSync(passlg, passdb);
        if (namelg === e.name && kq && e.type == 1) {
          sessionStorage.setItem('user', namelg);
          sessionStorage.setItem('type', e.type);

          window.location.assign('http://localhost:4200/dashboard');
        } else if (namelg === e.name && kq && e.type == 0) {
          sessionStorage.setItem('user', namelg);
          sessionStorage.setItem('type', e.type);

          window.location.assign('http://localhost:4200/tasks');
        }
      });
    }
  }

  logged() {
    var a = window.sessionStorage.getItem('type');
    if (a == '1') {
      window.location.assign('http://localhost:4200/dashboard');
    } else if (a == '0') {
      window.location.assign('http://localhost:4200/tasks');
    }
  }

  setTocken(tocken: string) {
    this.tocken = tocken;
  }
  getTocken() {
    return this.tocken;
  }
}
