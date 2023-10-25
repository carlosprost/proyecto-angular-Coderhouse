import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { DataDialog } from 'src/app/interfaces/data-dialog';
import { Student, StudentCreated } from 'src/app/interfaces/students';

@Component({
  selector: 'app-dialog-student',
  templateUrl: './dialog-student.component.html',
  styleUrls: ['./dialog-student.component.scss']
})
export class DialogStudentComponent {

  formStudent!: FormGroup


  constructor(
    private fb: FormBuilder, 
    public dialogRef: MatDialogRef<DialogStudentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataDialog,
    ) {
    this.createFormStudent(data.student)
   }

   dialogClose(){
      this.dialogRef.close()
   }

   createFormStudent(student: Student){
    this.formStudent = this.fb.group({
      firstName: [student.firstName, [Validators.required]],
      lastName: [student.lastName, [Validators.required]],
      age: [student.age, [Validators.required]],
      status: [student.status, [Validators.required]]
    })
   }

   onSubmit() {
    let obj: StudentCreated = {
      firstName: this.formStudent.value.firstName,
      lastName: this.formStudent.value.lastName,
      age: this.formStudent.value.age,
      status: this.formStudent.value.status
    }
    
    this.dialogRef.close({id: this.data.student.id,data: obj})
    
   }

}
