import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { DataDialog } from 'src/app/interfaces/data-dialog';
import { Student } from 'src/app/interfaces/students';

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
    this.createFormStudent(data.data)
   }

   dialogClose(){
      this.dialogRef.close()
   }

   createFormStudent(student: Student){
    
    if(student){
      this.formStudent = this.fb.group({
        firstName: [student.firstName, [Validators.required]],
        lastName: [student.lastName, [Validators.required]],
        age: [student.age, [Validators.required]],
        email: [student.email, [Validators.required, Validators.email]],
        address: [student.address, [Validators.required]],
        phone: [student.phone, [Validators.required]],
        status: [student.status, [Validators.required]]
      })
    }else{
      this.formStudent = this.fb.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        age: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        address: ['', [Validators.required]],
        phone: ['', [Validators.required]],
        status: ['', [Validators.required]]
      })
    }
    
   }

   onSubmit() {
    let obj: Student = {
      firstName: this.formStudent.value.firstName,
      lastName: this.formStudent.value.lastName,
      age: this.formStudent.value.age,
      email: this.formStudent.value.email,
      address: this.formStudent.value.address,
      phone: this.formStudent.value.phone,
      status: this.formStudent.value.status
    }
    
    this.dialogRef.close({id: this.data.data.id,data: obj})
    
   }

}
