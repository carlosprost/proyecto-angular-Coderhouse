import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataDialog } from 'src/app/interfaces/data-dialog';
import { Teacher } from 'src/app/interfaces/teachers';

@Component({
  selector: 'app-dialog-teachers',
  templateUrl: './dialog-teachers.component.html',
  styleUrls: ['./dialog-teachers.component.scss']
})
export class DialogTeachersComponent {
  formTeacher!: FormGroup


  constructor(
    private fb: FormBuilder, 
    public dialogRef: MatDialogRef<DialogTeachersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataDialog,
    ) {
      
    this.createFormTeacher(data.data)
   }

   dialogClose(){
      this.dialogRef.close()
   }

   createFormTeacher(teacher: Teacher){
    
    this.formTeacher = this.fb.group({
      firstName: [teacher.firstName, [Validators.required]],
      lastName: [teacher.lastName, [Validators.required]],
    })
    
   }

   onSubmit() {
    let obj: Teacher = {
      firstName: this.formTeacher.value.firstName,
      lastName: this.formTeacher.value.lastName,
    }
    
    this.dialogRef.close({id: this.data.data.id,data: obj})
    
   }
}
