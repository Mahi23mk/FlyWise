import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Booking } from '../../models/booking.model';
import { BookingService } from '../../core/services/booking.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  booking: Booking | null = null;

  constructor(
    private router: Router,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {

    const bookingId = window.history.state.bookingId;

    if (!bookingId) {
      this.router.navigate(['/flights']);
      return;
    }

    this.booking =
      this.bookingService.getBookingById(bookingId);

    if (!this.booking) {
      this.router.navigate(['/flights']);
    }
  }

  goToFlights(): void {
    this.router.navigate(['/flights']);
  }
}