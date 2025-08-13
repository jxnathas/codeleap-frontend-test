export interface User {
    id: number;
    username: string;
}

export interface Post {
    id: number;
    title: string;
    text: string;
    author?: string;
    created_datetime?: string;
}