import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  AuthService,
  User
} from '../../core/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: User | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
  }

  logout(): void {
    this.authService.logout();

    // this.currentUser = null;

    this.notificationService.success(
      'You have been logged out successfully.'
    );

    this.router.navigate(['/login']);
  }
}