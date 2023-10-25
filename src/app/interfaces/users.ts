export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}

export interface UserCreated {
    name: string;
    email: string;
    password: string;
}
