import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {RouterModule} from '@angular/router';
import { LoginDialogComponent } from "./login-dialog/login-dialog.component";
import { LoginDialogDialogComponent } from "./login-dialog/login-dialog.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, RouterModule, LoginDialogComponent, LoginDialogDialogComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'edu-stake';
}
