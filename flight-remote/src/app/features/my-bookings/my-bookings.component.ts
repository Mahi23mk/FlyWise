import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Booking } from '../../models/booking.model';
import { BookingService } from '../../core/services/booking.service';
import { AuthService, User } from '../../core/services/auth.service';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit {

  bookings: Booking[] = [];
  currentUser: User | null = null;

  constructor(
    private bookingService: BookingService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();

    if (!this.currentUser) {
      this.router.navigate(['/login']);
      return;
    }

    this.bookings = this.bookingService.getUserBookings(
      this.currentUser.id
    );
  }

  goToFlights(): void {
    this.router.navigate(['/flights']);
  }
}