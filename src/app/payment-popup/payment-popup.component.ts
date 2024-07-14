import {
  ChangeDetectionStrategy,
  ModelSignal,
  Component,
  inject,
  model,
  signal,
  Inject,
} from '@angular/core';
import { FormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

import { Course } from '../course';
import { CourseService } from '../course.service';
import { ActivatedRoute, Route } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SafeUrlPipeModule } from '../safe-url/safe-url.pipe.module';
import { MatSliderModule } from '@angular/material/slider';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
export interface DialogData {
  publickey: string;
  email: string;
}

@Component({
  selector: 'app-payment-popup',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    SafeUrlPipeModule,
    MatSliderModule,
    CommonModule
  ],
  templateUrl: './payment-popup.component.html',
  styleUrl: './payment-popup.component.css',
})
export class PaymentPopupComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  courseService = inject(CourseService);
  course: Course | undefined;
  selectedTokenAmount: number = 50;
  isPaymentCompleted: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<PaymentPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { course: Course },
    private router: Router
  ) {
    this.course = data.course;
  }

  onPayClick() {
    setTimeout(() => {
      if (this.course) {
        this.courseService.processPayment(this.course.id).then((success) => {
          if (success) {
            this.isPaymentCompleted = true;
            // this.dialogRef.close({status: 'success'});
            // if (this.course !== undefined) {
            //   this.router.navigate(['/app-thank-you-page'], {queryParams: {id: this.course.id}});
            // }
          }
        });
      }
    }, 1000);
  }

  onStakeClick() {
    this.dialogRef.close({
      status: 'success',
      tokenAmount: this.selectedTokenAmount,
    });
  }

  async connectWalletLogin() {
    if ((window as any).solana && (window as any).solana.isPhantom) {
      try {
        const response = await (window as any).solana.connect();
        const walletPublicKey = response.publicKey.toString();
        (document.getElementById('login-wallet') as HTMLInputElement).value =
          walletPublicKey;
        alert(`Wallet collegato: ${walletPublicKey}`);
        this.submitWalletLogin(walletPublicKey);
        console.log('Wallet connected:', walletPublicKey);
      } catch (err) {
        console.error('Failed to connect to wallet:', err);
      }
    } else {
      alert(
        'Phantom Wallet non trovato. Assicurati di averlo plugin installato.'
      );
    }
  }

  async submitWalletLogin(walletPublicKey: string) {
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ walletPublicKey }),
      });

      const data = await response.json();
      if (data.success) {
        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
}
