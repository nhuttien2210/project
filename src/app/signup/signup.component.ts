import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as bcrypt from 'bcryptjs';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  url = 'http://localhost:3000';
  constructor(private loca: Location, private http: HttpClient) {}
  @ViewChild('email') email: ElementRef;
  @ViewChild('name') name: ElementRef;
  @ViewChild('pass') pass: ElementRef;
  salt = bcrypt.genSaltSync(10);

  ngOnInit(): void {}

  signUp() {
    let post = {
      email: this.email.nativeElement.value,
      name: this.name.nativeElement.value,
      pass: bcrypt.hashSync(this.pass.nativeElement.value, this.salt),
      type: 0,
    };
    this.post(post);
    alert('Sign up success');
    window.location.assign('http://localhost:4200/');
  }
  post(post) {
    this.http.post(this.url + '/' + 'users', post).subscribe(() => {});
  }
  back() {
    this.loca.back();
  }
}
