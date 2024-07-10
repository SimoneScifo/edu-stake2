import { Injectable } from '@angular/core';
import { Course } from './course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  url = 'http://localhost:3000/courses';

  async getAllCourses(): Promise<Course[]> {
    const data = await fetch(this.url);
    return (await data.json()) ?? [];
  }

  async getCourseById(id: number): Promise<Course | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return (await data.json()) ?? {};
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(
      `Course application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`,
    );
  }
}
