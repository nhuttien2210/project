import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  url = 'http://localhost:3000/';
  url2 = 'http://localhost:4200/';

  constructor(private http: HttpClient) {}
  projects: any = [];
  ngOnInit(): void {
    this.sess();
    this.getProject();
    var a = window.sessionStorage.getItem('type');
    if (a == '1') {
      alert('Bạn không phải employee !!');
      window.location.assign('http://localhost:4200/dashboard');
    }
  }
  getProject() {
    this.http.get(this.url + 'projects').subscribe((data) => {
      this.projects = data;
    });
  }

  @ViewChild('name') name: ElementRef;
  @ViewChild('des') des: ElementRef;
  @ViewChild('project') project: ElementRef;
  @ViewChild('status') status: ElementRef;

  addNew() {
    let post = {
      name: this.name.nativeElement.value,
      des: this.des.nativeElement.value,
      project: this.project.nativeElement.value,
      status: this.status.nativeElement.value,
    };
    this.actionAdd(post);
    alert('Create task success !!');
  }
  actionAdd(post) {
    this.http.post(this.url + 'tasks', post).subscribe(() => {});
  }

  toTaskView() {
    window.location.assign(this.url2 + 'taskview');
  }
  sess() {
    if (!sessionStorage.user) {
      window.location.assign('http://localhost:4200/');
    }
  }
}
