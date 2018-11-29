import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Student } from '../student.model';
import { StudentsService } from '../student.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']

})
export class PostListComponent implements OnInit, OnDestroy {

  students: Student[] = [];
  private studentsSub: Subscription;

  constructor(public studentsService: StudentsService) {}

  ngOnInit() {
    this.students = this.studentsService.getStudents();
    this.studentsSub = this.studentsService.getStudentUpdateListener().subscribe((students: Student[]) => {
      this.students = students;
    });
  }

  ngOnDestroy() {
    this.studentsSub.unsubscribe();
  }
}
