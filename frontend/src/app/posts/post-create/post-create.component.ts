import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Student } from '../student.model';
import { StudentsService } from '../student.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent {


  constructor(public studentsService: StudentsService) {}

  onAddStudent(form: NgForm) {
    if (form.invalid) {
      return;
    }
   this.studentsService.addStudent(form.value.id, form.value.name, form.value.age);
   form.resetForm();
  }
}
