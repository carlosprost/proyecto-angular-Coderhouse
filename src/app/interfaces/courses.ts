export interface Course {
    id: number;
    name: string;
    teacherId: number;
}

export interface CourseCreated {
    name: string;
    teacherId: number;
}
