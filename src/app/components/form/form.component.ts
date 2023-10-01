import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student, StudentCreated } from 'src/app/interfaces/students';
import { StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  @Output() studentCreated = new EventEmitter<Student>()

  formStudent: FormGroup


  constructor(private fb: FormBuilder, private db: StudentsService ) {
    this.formStudent = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      age: ['', [Validators.required]],
      status: ['', [Validators.required]]
    })
   }

   onSubmit() {
    let obj: StudentCreated = {
      firstName: this.formStudent.value.firstName,
      lastName: this.formStudent.value.lastName,
      age: this.formStudent.value.age,
      status: this.formStudent.value.status
    }
    this.db.createStudent(obj).subscribe((data: any) => data)

    this.formStudent.reset()
    window.location.reload()
   }
}
