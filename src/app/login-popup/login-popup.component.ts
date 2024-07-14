import { CommonModule } from '@angular/common';
import {ChangeDetectionStrategy, Component, Inject, model, signal} from '@angular/core';
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
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {WalletService} from '../auth/wallet.service';
export interface DialogData {
  name: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.scss'],
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
    CommonModule
  ],
})

export class LoginPopupComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    public dialogRef: MatDialogRef<LoginPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private walletService: WalletService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }


  onLoginClick(): void {
    if (this.username === 'admin' && this.password === 'admin') {
      this.dialogRef.close({ username: this.username, password: this.password });
    } else {
      this.errorMessage = 'Invalid username or password';
    }
  }

  async connectWalletLogin(): Promise<void> {
    try {
      await this.walletService.connectWallet();
      this.dialogRef.close({ status: 'success', wallet: this.walletService.publicKey });
    } catch (error) {
      this.errorMessage = 'Wallet connection failed';
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
