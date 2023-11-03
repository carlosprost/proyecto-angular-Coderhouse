import { Course } from './courses';
import { Student } from './students';
import { Teacher } from './teachers';

export interface DataDialog {
  message: string;
  data: Student | Teacher | Course | any;
  isUpdate: boolean;
}
