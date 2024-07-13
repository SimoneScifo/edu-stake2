import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-thank-you-page',
  standalone: true,
  templateUrl: './thank-you-page.component.html',
  styleUrls: ['./thank-you-page.component.scss'],
  imports: [MatSliderModule, FormsModule]
})
export class ThankYouPageComponent {
  selectedTokenAmount: number = 0; // Default value for the slider

  constructor(private router: Router) {}

  onStakeClick(): void {
    // Simulate the staking process
    setTimeout(() => {
      alert(`Successfully staked ${this.selectedTokenAmount} tokens!`);
      this.router.navigate(['/app-course-detail']);
    }, 1000); // Simulate a delay for the staking process
  }
}
