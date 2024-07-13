import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {RouterModule} from '@angular/router';
import { LoginButtonComponent } from "./login-button/login-button.component";
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, RouterModule, LoginButtonComponent, MatToolbarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [AuthService, AuthGuard]
})
export class AppComponent {
  title = 'edu-stake';
}
