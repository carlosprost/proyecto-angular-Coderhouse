import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { Course } from 'src/app/interfaces/courses';
import { DataDialog } from 'src/app/interfaces/data-dialog';
import { Teacher } from 'src/app/interfaces/teachers';
import { selectCourses, selectTeachers } from '../../store/courses.selectors';

@Component({
  selector: 'app-dialog-courses',
  templateUrl: './dialog-courses.component.html',
  styleUrls: ['./dialog-courses.component.scss']
})
export class DialogCoursesComponent {
  courses$: Observable<Course[]>;
  teachers$: Observable<Teacher[]>;

  formCourse!: FormGroup


  constructor(
    private store: Store,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogCoursesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataDialog,
    ) {
      this.courses$ = this.store.select(selectCourses)
      this.teachers$ = this.store.select(selectTeachers)
      
    this.createFormStudent(data.data)
   }

   dialogClose(){
      this.dialogRef.close()
   }

   createFormStudent(id: number | null){
    if(id === null){
      this.formCourse = this.fb.group({
        name: ['', [Validators.required]],
        date: ['', [Validators.required]],
        hour: ['', [Validators.required]],
        teacher: ['', [Validators.required]]
      })
    }else{
      this.getCourse(id).subscribe((course: Course[]) => {
        this.formCourse = this.fb.group({
          name: [course[0].name, [Validators.required]],
          date: [course[0].date, [Validators.required]],
          hour: [course[0].hour, [Validators.required]],
          teacher: [course[0].teachersId, [Validators.required]]
        })
        
      })
    }
    
   }

   onSubmit() {
    let obj: Course = {
      name: this.formCourse.value.name,
      date: this.formCourse.value.date,
      hour: this.formCourse.value.hour,
      teachersId: this.formCourse.value.teacher
    }
    
    this.dialogRef.close({id: this.data.data, data: obj})
    
   }

   getCourse(id: number): Observable<Course[]>{
    return this.courses$.pipe(
      map((courses) =>
        courses.filter((s) =>
          s.id === id
        )
      )
    )
   }

}
