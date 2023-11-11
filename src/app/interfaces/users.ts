export interface User {
    id?: number | null;
    name: string;
    email: string;
    password: string;
}

export interface UserActive {
    name: string;
    email: string;
}

