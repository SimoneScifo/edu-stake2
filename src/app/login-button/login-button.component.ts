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
}
