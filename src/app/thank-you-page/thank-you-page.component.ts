import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-thank-you-page',
  standalone: true,
  templateUrl: './thank-you-page.component.html',
  styleUrls: ['./thank-you-page.component.scss'],
  imports: [MatSliderModule, FormsModule]
})
export class ThankYouPageComponent {
  selectedTokenAmount: number = 0; // Default value for the slider
  constructor(private router: Router, public dialogRef: MatDialogRef<ThankYouPageComponent>,) {}

  reward() {
    return '5 😺'
  }

  onStakeClick(): void {
    this.dialogRef.close({ status: 'success' });
    // Simulate the staking process
    setTimeout(() => {
      this.router.navigate(['/app-course-detail']);
    }, 1000); 
  }

}
