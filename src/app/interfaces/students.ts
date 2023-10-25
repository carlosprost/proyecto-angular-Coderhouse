import { Person } from "./person";

export interface Student extends Person {
    id: number;
    age: string;
    status: boolean;
}

export interface StudentCreated extends Person {
    age: string;
    status: boolean;
}
