import {ChangeDetectionStrategy, Component, inject, model, signal, OnInit, Output, EventEmitter, ChangeDetectorRef} from '@angular/core';
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
import { LoginPopupComponent } from '../login-popup/login-popup.component';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-login-button',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, CommonModule],
  templateUrl: './login-button.component.html',
  styleUrl: './login-button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginButtonComponent implements OnInit {
  isLoggedIn = false;
  readonly animal = signal('');
  readonly name = model('');
  readonly dialog = inject(MatDialog);
  @Output() paymentConfirmed = new EventEmitter<boolean>();
  
  constructor(private authService: AuthService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      this.cdr.detectChanges();
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginPopupComponent, {
      data: { username: '', password: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Check:', result);
      this.paymentConfirmed.emit(true);
      if (result) {
        this.authService.login(result.username, result.password).subscribe(success => {
          if (success) {
            console.log('Logged in successfully');
            this.isLoggedIn = true;
          }
        });
      }
    });
  }

  logout(): void {
    console.log('Logout');
    this.authService.logout();
  }

  async submitRegister() {
    const username = 'ciao';
    const email = 'ciao';
    const password = 'ciao';
  
    const bodyText = `username=${username}&email=${email}&password=${password}`;
  
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain'
      },
      body: bodyText
    };
  
    try {
      console.log('Invio della richiesta a http://127.0.0.1:4200/register');
      console.log('Passo a HomePage');
      
     } catch (error) {
       console.error('Errore durante la registrazione:', error);
       alert(`Errore durante la registrazione:`);
     }
  }
  
  async connectWallet() {
    if ((window as any).solana && (window as any).solana.isPhantom) {
      try {
        const response = await (window as any).solana.connect();
        const walletPublicKey = response.publicKey.toString();
        (document.getElementById('register-wallet') as HTMLInputElement).value = walletPublicKey;
        alert(`Wallet collegato: ${walletPublicKey}`);
      } catch (err) {
        console.error('Failed to connect to wallet:', err);
      }
    } else {
      alert('Phantom Wallet non trovato. Assicurati di averlo installato.');
    }
  }

  async submitLogin() {
    const username = (document.getElementById('login-username') as HTMLInputElement).value;
    const password = (document.getElementById('login-password') as HTMLInputElement).value;
    if (this.validateLogin(username, password)) {
      try {
        const response = await fetch('/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
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

  validateLogin(username: string, password: string): boolean {
    if (username === '' || password === '') {
      alert('Per favore, compila tutti i campi.');
      return false;
    }
    return true;
  }
}
