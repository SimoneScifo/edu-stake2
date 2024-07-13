import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { AuthGuard } from './auth/auth.guard';
import { ThankYouPageComponent } from './thank-you-page/thank-you-page.component';
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
  },
  {
    path: 'app-thank-you-page',
    component: ThankYouPageComponent,
    title: 'Thank You'
    //canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '' }
];

export default routeConfig;
