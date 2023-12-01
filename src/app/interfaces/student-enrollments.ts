import { Course } from "./courses";
import { Student } from "./students";

export interface StudentEnrollments {
    id?: number;
    studentsId: number;
    coursesId: number;
    students?: Student;
    courses?: Course
}

