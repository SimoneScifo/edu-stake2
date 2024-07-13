import { ChangeDetectionStrategy, Component, inject, model, signal, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PaymentPopupComponent } from '../payment-popup/payment-popup.component';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../course.service';
import { Course } from '../course';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SafeUrlPipeModule } from '../safe-url/safe-url.pipe.module';

import {
  getExplorerLink,
  getKeypairFromEnvironment,
} from '@solana-developers/helpers';
import { Connection, PublicKey, clusterApiUrl, Keypair } from '@solana/web3.js';
import { getOrCreateAssociatedTokenAccount, transfer } from '@solana/spl-token';

export interface DialogData {
  publickey: string;
  email: string;
}

@Component({
  selector: 'app-payment-button',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, PaymentPopupComponent, SafeUrlPipeModule],
  templateUrl: './payment-button.component.html',
  styleUrls: ['./payment-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentButtonComponent {
  readonly animal = signal('');
  readonly publickey = model('');
  readonly dialog = inject(MatDialog);

  async retrivePaymentInformation() {
    console.log('retrivePaymentInformation called');

    const wallet = {
      publicKey: "v2ZCufeMqW9FDz2CRtZrmviiNpqeRkLfcuZFqdKAAy5",
      secretKey: [138,  84,  95, 115, 122, 104,  66,  99, 211, 214,  29,
        154, 205,  77,  54,  87, 130, 138,  95, 162, 107, 182,
        94, 216, 141, 232,  78, 111,  59, 186, 169, 180,  13,
        149, 138, 154, 188,  43,  33,  50, 126, 138,  35,   4,
        153, 116, 184, 250,  79, 252, 113, 163,  16,  28,  42,
        54, 223, 199, 124,  27,  52, 216,  87,   0
      ]
    };

    const connection = new Connection(clusterApiUrl("devnet"));
    const recipient = new PublicKey('9phaKbYkuMWXZ2HuMSHFX3PevENiF67Eva7FTx4T9zDk');
    const tokenMintAccount = new PublicKey('4giddJMmCaMCpexu6we3CToPeJwVMhnqKaj8GDQsMKmm');
    const tokenMintATA = new PublicKey('EYy1bex8h4ZCcEqfqkVHjhMVyYHANQATePc8GdGhTdbu');
    const sender = Keypair.fromSecretKey(new Uint8Array(wallet.secretKey));

    console.log(` 🔑 Loaded our keypair securely, using an env file! Our public key is: ${wallet.publicKey}\n🔑 Loaded sender: ${tokenMintAccount}\n🔑 Loaded recipient: ${recipient}`);

    const valToTranfesr = 20;
    const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 3);
    const amount = valToTranfesr * MINOR_UNITS_PER_MAJOR_UNITS;

    console.log(`💸 Attempting to send ${valToTranfesr} token to ${recipient.toBase58()}...`);

    async function retrivePaymentInformation() {
        try {
          console.log('retrivePaymentInformation called');
    
          const wallet = {
            "publicKey": "v2ZCufeMqW9FDz2CRtZrmviiNpqeRkLfcuZFqdKAAy5",
            "secretKey": [138,  84,  95, 115, 122, 104,  66,  99, 211, 214,  29,
                154, 205,  77,  54,  87, 130, 138,  95, 162, 107, 182,
                94, 216, 141, 232,  78, 111,  59, 186, 169, 180,  13,
                149, 138, 154, 188,  43,  33,  50, 126, 138,  35,   4,
                153, 116, 184, 250,  79, 252, 113, 163,  16,  28,  42,
                54, 223, 199, 124,  27,  52, 216,  87,   0
              ]
            } 
    
          const connection = new Connection(clusterApiUrl("devnet"));
          const recipient = new PublicKey('FConvaPabkPXxesGSuyGKUoFdSykC2eDJzFtHWdSQnyF');
          const tokenMintAccount = new PublicKey('4giddJMmCaMCpexu6we3CToPeJwVMhnqKaj8GDQsMKmm');
          const tokenMintATA = new PublicKey('EYy1bex8h4ZCcEqfqkVHjhMVyYHANQATePc8GdGhTdbu');
          const sender = Keypair.fromSecretKey(new Uint8Array(wallet.secretKey));
    
          console.log(
            ` 🔑 Loaded our keypair securely, using an env file! Our public key is: ${wallet.publicKey}\n🔑 Loaded sender: ${tokenMintAccount}\n🔑 Loaded recipient: ${recipient}`
          );
    
          const valToTranfesr = 20;
          const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 3);
          const amount = valToTranfesr * MINOR_UNITS_PER_MAJOR_UNITS;
       
          console.log(`💸 Attempting to send ${valToTranfesr} token to ${recipient.toBase58()}...`);
    
          // const destinationTokenAccount = await getOrCreateAssociatedTokenAccount(
          //   connection,
          //   sender,
          //   tokenMintAccount,
          //   recipient
          // );
    
          // console.log(`🔑 Recipient is: ${destinationTokenAccount.address}\n`);
    
          // const signature = await transfer(
          //   connection,
          //   sender,
          //   tokenMintATA,
          //   destinationTokenAccount.address,
          //   sender,
          //   amount
          // );
    
          // const explorerLink = getExplorerLink("transaction", signature, "devnet");
        
    
        } catch (error) {
          console.error('Error during payment processing:', error);
          console.log('Errore durante il pagamento. Controlla la console per i dettagli.');
        }
      }

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PaymentPopupComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      alert('EFFETTUO IL PAGAMENTO');
      if (result !== undefined) {
        this.animal.set(result);
      }
    });
  }
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
  

}

