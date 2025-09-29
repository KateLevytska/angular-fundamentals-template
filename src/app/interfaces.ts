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

export interface onDeleteResponce {
    successful: boolean;
    result: string;
}

export interface AuthorsResponceAll {
    successful: boolean;
    result: Author[]
}

export interface AuthorsResponce {
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

export interface CoursesResponce {
  result: Course[],
  succesfull: boolean
}

export interface CourseResponce {
  result: Course,
  succesfull: boolean
}

export interface CourseDeleteResponce {
  result: string,
  succesfull: boolean
}

export interface CreateCourse {
  title: string,
  description: string,
  duration: number,
  authors: string[]
}
