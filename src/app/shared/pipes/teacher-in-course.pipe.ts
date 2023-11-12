import { Pipe, PipeTransform } from '@angular/core';
import { Teacher } from 'src/app/interfaces/teachers';

@Pipe({
  name: 'teacherInCourse'
})
export class TeacherInCoursePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {

    const teacher_id = value
    const teachers: Teacher[] = args[0] as Teacher[]

    let teacher = ''
    teachers.forEach((t: Teacher) => {
      if (t.id === teacher_id) {
        teacher = t.firstName + ' ' + t.lastName
      }
    });

    return teacher;
  }

}
