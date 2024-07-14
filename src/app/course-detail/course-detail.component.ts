import { Component, inject, OnInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../course.service';
import { Course } from '../course';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SafeUrlPipeModule } from '../safe-url/safe-url.pipe.module';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaymentPopupComponent } from '../payment-popup/payment-popup.component';
import { ThankYouPageComponent } from '../thank-you-page/thank-you-page.component'
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { Inject } from '@angular/core';

declare global {
  interface Window {
    onYouTubeIframeAPIReady: any;
    YT: any;
  }
}

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SafeUrlPipeModule,
    PaymentPopupComponent,
    MatButtonModule,
    MatSliderModule
  ],
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css'],
})
export class CourseDetailComponent implements OnInit {

  
  route: ActivatedRoute = inject(ActivatedRoute);
  courseService = inject(CourseService);
  course: Course | undefined;
  ngZone: NgZone = inject(NgZone);

  isPaymentConfirmed: boolean = false;
  isCompletedEnabled: boolean = false;
  paymentError: boolean = false;
  showPaymentModal: boolean = false;
  showStakeProposalModal: boolean = false;
  stakedTokenAmount: number = 0;
  timeUpdateInterval: any;
  player: any;
  
  relatedCourses = [
    { title: 'Course 1' },
    { title: 'Course 2' },
    { title: 'Course 3' },
    { title: 'Course 4' },
    { title: 'Course 5' },
  ];

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    const courseId = parseInt(this.route.snapshot.params['id'], 10);
    this.courseService.getCourseById(courseId).then((course) => {
      this.course = course;
    });

    // Caricare l'API di YouTube
    this.loadYouTubeAPI();

    // Imposta il callback quando l'API di YouTube è pronta
    window.onYouTubeIframeAPIReady = () => this.onYouTubeIframeAPIReady();
  }

  loadYouTubeAPI() {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      console.log(firstScriptTag);
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      } else {
        document.head.appendChild(tag); // Fallback nel caso non ci siano altri script nel DOM
      }
    }
  }

  onYouTubeIframeAPIReady() {
    this.ngZone.run(() => {
      if (this.isPaymentConfirmed) {
        console.log('payment ok vado con ');
        try {
          this.initializePlayer();
        } catch (error) {
          console.log('Erroreeeee', error);
        }
      }
    });
  }

  initializePlayer() {
    if (window.YT && !this.player && this.course) {
      console.log('ci siamo quasi il player ce il video -->', this.course.videoUrl);
      try {
        this.player = new window.YT.Player('youtube-player', {
          videoId: this.extractVideoId(this.course.videoUrl),
          events: {
            'onReady': this.onPlayerReady.bind(this),
            'onError': this.onPlayerError.bind(this) // Gestione degli errori
          }
        });
      } catch (error) {
        console.log('errore', error);
      }
    } else {
      console.log('qui sono nulli');
    }
  }

  onPlayerReady(event: any) {
    console.log('YouTube Player is ready');
  }

  onPlayerError(event: any) {
    console.error('YouTube Player Error:', event.data);
    alert('An error occurred while trying to play the video. Please try again later.');
  }

  playVideo() {
    if (this.player && typeof this.player.playVideo === 'function') {
      try {
        this.startTimer();
        this.player.playVideo();
      } catch (error) {
        console.log('No, il player non ce', error);
      }
    } else {
      console.error('YouTube Player is not initialized or playVideo function is not available');
    }
  }

  startTimer() {
    // Disabilita il pulsante Completed all'inizio
    this.isCompletedEnabled = false;

    // Avvia un timer di 10 secondi
    setTimeout(() => {
      this.isCompletedEnabled = true;
    }, 10000);
  }

  openPaymentDialog(): void {
    const dialogRef = this.dialog.open(PaymentPopupComponent, {
      width: '400px',
      data: { course: this.course }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.status === 'success') {
        this.isPaymentConfirmed = true;
        this.stakedTokenAmount = result.tokenAmount;

        // Delay initialization to ensure DOM is ready
        setTimeout(() => {
          this.initializePlayer();
        }, 10);
      }
    });
  }

  extractVideoId(url: string | undefined): string {
    if (!url) {
      return '';
    }
    const videoIdMatch = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    const videoId = videoIdMatch ? videoIdMatch[1] : '';
    console.log('Extracted Video ID:', videoId); // Log dell'ID del video
    return videoId;
  }

  processPayment(paymentConfirmationReceived: boolean) {
    this.isPaymentConfirmed = paymentConfirmationReceived;
  }

  handlePaymentConfirmation(success: boolean) {
    this.showPaymentModal = false;
    if (success) {
      this.showStakeProposalModal = true;
      this.isPaymentConfirmed = true;
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

  navigateToOtherComponent() {
    const dialogRef = this.dialog.open(ThankYouPageComponent, {
      width: '400px',
      data: { course: this.course }
    });
  }
}
