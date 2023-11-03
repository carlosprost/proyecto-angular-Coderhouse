import { Person } from "./person";

export interface Student extends Person {
    id?: number;
    age: string;
    status: boolean;
}

