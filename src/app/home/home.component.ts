import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursePreviewComponent } from '../course-preview/course-preview.component';
import { Course } from '../course';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CoursePreviewComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  courseList: Course[] = [];
  filteredCourseList: Course[] = [];
  courseService: CourseService = inject(CourseService);

  constructor() {
    this.courseService.getAllCourses().then((courseList: Course[]) => {
      this.courseList = courseList;
      this.filteredCourseList = courseList;
    });
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredCourseList = this.courseList;
      return;
    }
    this.filteredCourseList = this.courseList.filter((course) =>
      course?.title.toLowerCase().includes(text.toLowerCase()),
    );
  }
}
