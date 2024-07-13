import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../course.service';
import { Course } from '../course';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SafeUrlPipeModule } from '../safe-url/safe-url.pipe.module';
import { MatDialog } from '@angular/material/dialog';
import { PaymentPopupComponent } from '../payment-popup/payment-popup.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SafeUrlPipeModule,
    PaymentPopupComponent,
    MatButtonModule
  ],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.css',
})
export class CourseDetailComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  courseService = inject(CourseService);
  course: Course | undefined;

  isPaymentConfirmed: boolean = false;
  paymentError: boolean = false;
  showPaymentModal: boolean = false;
  showStakeProposalModal: boolean = false;

  constructor(public dialog: MatDialog) {
  }

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
      console.log('The dialog was closed');
    });
  }

  processPayment(paymentConfirmationReceived:boolean) {
    this.isPaymentConfirmed = (paymentConfirmationReceived)
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
}
