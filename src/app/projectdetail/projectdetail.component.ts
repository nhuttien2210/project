import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';

declare const hi: any;
@Component({
  selector: 'app-projectdetail',
  templateUrl: './projectdetail.component.html',
  styleUrls: ['./projectdetail.component.css'],
})
export class ProjectdetailComponent implements OnInit {
  url = 'http://localhost:3000/projects';
  id = localStorage.id;
  details: any = [];
  @ViewChild('namep') namep: ElementRef;
  @ViewChild('datep') datep: ElementRef;
  @ViewChild('sizep') sizep: ElementRef;

  sess() {
    if (!sessionStorage.user) {
      window.location.assign('http://localhost:4200/');
    }
  }
  getData() {
    this.http.get(this.url + '/' + this.id).subscribe((data) => {
      this.details = data;
      console.log(data);
    });
  }
  constructor(private http: HttpClient, private loca: Location) {}
  detail: any;
  ngOnInit(): void {
    this.sess();
    this.getData();
  }
  back() {
    this.loca.back();
  }

  update() {
    let post = {
      name: this.namep.nativeElement.value,
      date: this.datep.nativeElement.value,
      teamsize: this.sizep.nativeElement.value,
    };
    this.action(post);
    alert('Update success');
    window.location.assign('http://localhost:4200/projects');
  }
  action(post) {
    this.http.put(this.url + '/' + this.id, post).subscribe(() => {
      this.getData();
    });
  }
}
