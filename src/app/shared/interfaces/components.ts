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

export interface Authors {
    authors: Author[];
}

export interface Courses {
    courses: Course[],
}