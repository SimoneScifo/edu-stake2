import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../course.service';
import { PaymentDialogComponent } from '../payment-dialog/payment-dialog.component';
import { Course } from '../course';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SafeUrlPipeModule } from '../safe-url/safe-url.pipe.module';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SafeUrlPipeModule, PaymentDialogComponent],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.css'
})
export class CourseDetailComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  courseService = inject(CourseService);
  course: Course | undefined;
  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });

  paymentConfirmed: boolean = false;
  paymentError: boolean = false;
  showPaymentModal: boolean = false;
  showStakeProposalModal: boolean = false;

  constructor() {
    const courseId = parseInt(this.route.snapshot.params['id'], 10);
    this.courseService.getCourseById(courseId).then((course) => {
      this.course = course;
    });
  }

  submitApplication() {
    this.courseService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? '',
    );
  }
  processPayment() {
    if (this.course) {
      this.courseService.processPayment(this.course.id).then((success) => {
        if (success) {
          this.paymentConfirmed = true;
          this.paymentError = false;
          this.showPaymentModal = true;
        } else {
          this.paymentConfirmed = false;
          this.paymentError = true;
          this.showPaymentModal = false;
        }
      });
    }
  }

  handlePaymentConfirmation(success: boolean) {
    this.showPaymentModal = false;
    if (success) {
      this.showStakeProposalModal = true;
      this.paymentConfirmed = true;
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

