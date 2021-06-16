import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  OnInit,
  VERSION,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  private url = ' http://localhost:3000/projects';
  projects: any = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.sess();
    this.getData();
  }
  sess() {
    if (!sessionStorage.user) {
      window.location.assign('http://localhost:4200/');
    }
  }
  getData() {
    this.http.get(this.url).subscribe((data) => {
      this.projects = data;
    });
  }

  @ViewChild('nameP') nameP: ElementRef;
  @ViewChild('dateP') dateP: ElementRef;
  @ViewChild('sizeP') sizeP: ElementRef;
  addNew() {
    let post = {
      name: this.nameP.nativeElement.value,
      date: this.dateP.nativeElement.value,
      teamsize: this.sizeP.nativeElement.value,
    };
    this.actionAdd(post);
  }
  actionAdd(post) {
    this.http.post(this.url, post).subscribe(() => {
      this.getData();
    });
  }

  delete(id) {
    alert('Delete project ?');
    this.http.delete(this.url + '/' + id).subscribe(() => {
      this.getData();
    });
  }

  viewDetail(id) {
    localStorage.id = id;
  }
}
