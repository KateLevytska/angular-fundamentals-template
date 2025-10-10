export interface Course {
    title: string,
    description: string,
    creationDate: string,
    duration: number,
    authors: string[],
    id: string
}

export interface Author {
    name: string,
    id: string,
}

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

export interface Authors {
    authors: Author[];
}

export interface Courses {
    courses: Course[],
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
  result: Course[],successful: boolean
}

export interface CourseResponse {
  result: Course,
  successful: boolean
}

export interface CreateEditCourse {
  title: string,
  description: string,
  duration: number,
  authors: string[]
}
