import { Author, Course } from "./components";

export interface onDeleteResponse {
    successful: boolean;
    result: string;
}

export interface AuthorsResponseAll {
    successful: boolean;
    result: Author[]
}

export interface AuthorsResponse {
    successful: boolean;
    result: Author
}

export interface User {
    password: string;
    email: string;
    name?: string;
}

export interface UserObject {
    password: string;
    email: string;
    name: string;
    role: string;
    id: string;
}

export interface LoginResponse {
    successful: boolean;
    result: string;
    user: User;
}

export interface UserResponse {
    successful: boolean;
    result: UserObject
}

export interface CoursesResponse {
    result: Course[],
    successful: boolean
}

export interface CourseResponse {
    result: Course,
    successful: boolean
}

export interface CourseDeleteResponse {
    result: string,
    successful: boolean
}

export interface CreateCourse {
    title: string,
    description: string,
    duration: number,
    authors: string[]
}