import { Component, Input } from '@angular/core';
import {CommonModule} from '@angular/common';
import { Course } from '../course';
import { RouterLink, RouterOutlet} from '@angular/router';


@Component({
  selector: 'app-course-preview',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './course-preview.component.html',
  styleUrl: './course-preview.component.css'
})
export class CoursePreviewComponent {
  @Input() course!: Course;
}
