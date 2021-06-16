import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
@Component({
  selector: 'app-taskview',
  templateUrl: './taskview.component.html',
  styleUrls: ['./taskview.component.css'],
})
export class TaskviewComponent implements OnInit {
  url = 'http://localhost:3000/';

  constructor(private http: HttpClient, private loca: Location) {
    this.getProject();
  }
  tasks: any = [];
  detail: any = [];
  projects: any = [];
  ngOnInit(): void {
    this.getData();
  }

  getProject() {
    this.http.get(this.url + 'projects').subscribe((data) => {
      this.projects = data;
    });
  }
  getData() {
    this.http.get(this.url + 'tasks').subscribe((data) => {
      this.tasks = data;
    });
  }

  getDetail(id) {
    window.localStorage.setItem('id', id);
    let localId = localStorage.id;

    this.http.get(this.url + 'tasks' + '/' + localId).subscribe((data) => {
      this.detail = data;
      console.log(this.detail);
    });
  }

  @ViewChild('name') name: ElementRef;
  @ViewChild('des') des: ElementRef;
  @ViewChild('project') project: ElementRef;
  @ViewChild('status') status: ElementRef;

  edit() {
    let post = {
      name: this.name.nativeElement.value,
      des: this.des.nativeElement.value,
      project: this.project.nativeElement.value,
      status: this.status.nativeElement.value,
    };
    this.actionAdd(post);
    alert('Edit task success !!');
    window.location.reload();
  }
  actionAdd(post) {
    let id = localStorage.id;
    this.http.put(this.url + 'tasks' + '/' + id, post).subscribe(() => {});
  }

  delete(id) {
    this.http.delete(this.url + 'tasks' + '/' + id).subscribe(() => {});
    alert('Delete this task ?');
    window.location.reload();
  }

  back() {
    this.loca.back();
  }
}
