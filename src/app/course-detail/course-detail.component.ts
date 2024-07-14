import { Component, inject, OnInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../course.service';
import { Course } from '../course';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SafeUrlPipeModule } from '../safe-url/safe-url.pipe.module';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaymentPopupComponent } from '../payment-popup/payment-popup.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { Inject } from '@angular/core';

declare global {
  interface Window {
    onYouTubeIframeAPIReady: any;
    YT: any;
  }
}

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SafeUrlPipeModule,
    PaymentPopupComponent,
    MatButtonModule,
    MatSliderModule
  ],
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css'],
})
export class CourseDetailComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  courseService = inject(CourseService);
  course: Course | undefined;
  ngZone: NgZone = inject(NgZone);

  isPaymentConfirmed: boolean = false;
  isCompletedEnabled: boolean = false;
  paymentError: boolean = false;
  showPaymentModal: boolean = false;
  showStakeProposalModal: boolean = false;
  stakedTokenAmount: number = 0;
  timeUpdateInterval: any;
  player: any;

  relatedCourses = [
    { title: 'Course 1' },
    { title: 'Course 2' },
    { title: 'Course 3' },
    { title: 'Course 4' },
    { title: 'Course 5' },
  ];

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    const courseId = parseInt(this.route.snapshot.params['id'], 10);
    this.courseService.getCourseById(courseId).then((course) => {
      this.course = course;
    });
  }

  openPaymentDialog(): void {
    const dialogRef = this.dialog.open(PaymentPopupComponent, {
      width: '400px',
      data: { course: this.course }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.status === 'success') {
        this.isPaymentConfirmed = true;
        this.stakedTokenAmount = result.tokenAmount;
      }
    });
  }

  processPayment(paymentConfirmationReceived: boolean) {
    this.isPaymentConfirmed = paymentConfirmationReceived;
  }

  handlePaymentConfirmation(success: boolean) {
    this.showPaymentModal = false;
    if (success) {
      this.showStakeProposalModal = true;
      this.isPaymentConfirmed = true;
    } else {
      this.paymentError = true;
    }
  }

  handleStakeConfirmation(amount: number) {
    this.showStakeProposalModal = false;
    if (amount > 0) {
      alert(`Staked ${amount} tokens on Solana blockchain!`);
    }
  }


  completeCourse(): void {
    alert('🎉 Congratulazioni hai completato il corso 🎉');
  }
}
