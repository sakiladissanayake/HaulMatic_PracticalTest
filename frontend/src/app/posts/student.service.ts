import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Student } from './student.model';


@Injectable({providedIn: 'root'})
export class StudentsService {
 private students: Student[] = [];
 private studentsUpdated = new Subject<Student[]>();

 getStudents() {
   return [...this.students];
 }

 getStudentUpdateListener() {
   return this.studentsUpdated.asObservable();
 }

 addStudent(id: string, name: string, age: string) {
    const student: Student = { id: id, name: name, age: age };
    this.students.push(student);
    this.studentsUpdated.next([...this.students]);
 }
}

