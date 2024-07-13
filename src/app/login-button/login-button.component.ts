import {ChangeDetectionStrategy, Component, inject, model, signal} from '@angular/core';
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

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-login-button',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
  templateUrl: './login-button.component.html',
  styleUrl: './login-button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginButtonComponent {
  readonly animal = signal('');
  readonly name = model('');
  readonly dialog = inject(MatDialog);
  

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginPopupComponent, {
      data: {name: this.name(), email: this.animal()},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.animal.set(result);
      }
    });
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
      //const response = await fetch('http://127.0.0.1:4200/register', options);
  
      //if (!response.ok) {
      //  throw new Error(`HTTP error! status: ${response.status}`);
      //}
  
      //const contentType = response.headers.get('content-type');
      // console.log('Content-Type:', contentType);
  
      // if (!contentType || !contentType.includes('text/plain')) {
      //   const textResponse = await response.text();
      //   console.error('La risposta non è in formato text/plain:', textResponse);
      //   throw new TypeError("La risposta non è in formato text/plain");
      // }
  
      //const data = await response.text();
      console.log('Passo a HomePage');
      
    //   if (data.includes('success')) { // Supponendo che il server risponda con 'success' in caso di successo
    //     alert('Registrazione completata con successo');
    //     this.popupService.hidePopup();
    //     this.router.navigate(['/homepage']);
    //   } else {
    //     alert('Errore durante la registrazione');
    //   }
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


// @Component({
//   selector: 'app-login-dialog-dialog',
//   templateUrl: './login-dialog-dialog.component.html',
//   standalone: true,
//   imports: [
//     MatFormFieldModule,
//     MatInputModule,
//     FormsModule,
//     MatButtonModule,
//     MatDialogTitle,
//     MatDialogContent,
//     MatDialogActions,
//     MatDialogClose,
//   ],
// })
// export class LoginDialogDialogComponent {
//   readonly dialogRef = inject(MatDialogRef<LoginDialogComponent>);
//   readonly data = inject<DialogData>(MAT_DIALOG_DATA);
//   readonly animal = model(this.data.animal);


//   onNoClick(): void {
//     this.dialogRef.close();
//   }
//   submitLoginForm(): void {
//     this.dialogRef.close();
//     alert('You have successfully logged in!');
//   }
// }
