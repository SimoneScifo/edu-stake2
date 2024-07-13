import {ChangeDetectionStrategy, ModelSignal,Component, inject, model, signal} from '@angular/core';
import {FormsModule,FormGroup, FormControl} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
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

import { ActivatedRoute } from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { P } from '@angular/cdk/keycodes';

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
  ],
  templateUrl: './payment-popup.component.html',
  styleUrl: './payment-popup.component.css'
})

export class PaymentPopupComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  readonly dialogRef = inject(MatDialogRef<PaymentPopupComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly PublicKey = model(this.data.publickey);
  readonly email = model(this.data.email);


  course: Course | undefined;
  courseService = inject(CourseService);

  constructor() {
    const course = this.route
  }  


  getPublicKey() {

  }

  submitPayment() {
    const recipient = 'FConvaPabkPXxesGSuyGKUoFdSykC2eDJzFtHWdSQnyF';
    const tokenMintAccount = '4giddJMmCaMCpexu6we3CToPeJwVMhnqKaj8GDQsMKmm';
    const tokenMintATA = 'EYy1bex8h4ZCcEqfqkVHjhMVyYHANQATePc8GdGhTdbu';

    console.log(
      ` 🔑 Loaded our keypair securely, using an env file! Our public key is: $}\n🔑 Loaded sender: ${tokenMintAccount}\n🔑 Loaded recipient: ${recipient}`
    );

    this.dialogRef.close();
    
  }

  async connectWalletLogin() {
    if ((window as any).solana && (window as any).solana.isPhantom) {
      try {
        const response = await (window as any).solana.connect();
        const walletPublicKey = response.publicKey.toString();
        (document.getElementById('login-wallet') as HTMLInputElement).value = walletPublicKey;
        alert(`Wallet collegato: ${walletPublicKey}`);
        this.submitWalletLogin(walletPublicKey);
        console.log('Wallet connected:', walletPublicKey);
      } catch (err) {
        console.error('Failed to connect to wallet:', err);
      }
    } else {
      alert('Phantom Wallet non trovato. Assicurati di averlo installato.');
    }
  }

  async submitWalletLogin(walletPublicKey: string) {
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ walletPublicKey })
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