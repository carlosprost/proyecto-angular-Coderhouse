import { Student } from './students';

export interface DataDialog {
  message: string;
  student: Student;
  isUpdate: boolean;
}
