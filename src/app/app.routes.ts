import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { AuthGuard } from './auth/auth.guard';

const routeConfig: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'EduStake'
  },
  {
    path: 'course-detail/:id',
    component: CourseDetailComponent,
    title: 'Course details'
    //canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '' }
];

export default routeConfig;
