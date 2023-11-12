import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { TeachersService } from 'src/app/core/services/teachers.service';
import { Course } from 'src/app/interfaces/courses';
import { DataDialog } from 'src/app/interfaces/data-dialog';
import { Teacher } from 'src/app/interfaces/teachers';

@Component({
  selector: 'app-dialog-courses',
  templateUrl: './dialog-courses.component.html',
  styleUrls: ['./dialog-courses.component.scss']
})
export class DialogCoursesComponent {

  teachers$: Observable<Teacher[]>;

  formCourse!: FormGroup


  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogCoursesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataDialog,
    ) {
      this.teachers$ = data.data.teacher
      
    this.createFormStudent(data.data.course)
   }

   dialogClose(){
      this.dialogRef.close()
   }

   createFormStudent(course: Course){
    this.formCourse = this.fb.group({
      name: [course.name, [Validators.required]],
      date: [course.date, [Validators.required]],
      hour: [course.hour, [Validators.required]],
      teacher: [course.teacher_id, [Validators.required]]
    })
   }

   onSubmit() {
    let obj: Course = {
      name: this.formCourse.value.name,
      date: this.formCourse.value.date,
      hour: this.formCourse.value.hour,
      teacher_id: this.formCourse.value.teacher
    }
    
    this.dialogRef.close({id: this.data.data.id, data: obj})
    
   }
  

}
