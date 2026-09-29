import { Injectable } from '@angular/core';

import { Booking, BookingPassenger } from '../../models/booking.model';
import { Flight } from '../../models/flight.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private readonly bookingsKey = 'flightPlannerBookings';

  createBooking(
    userId: string,
    flight: Flight,
    passenger: BookingPassenger,
    paymentMethod: string
  ): Booking {

    const booking: Booking = {
      id: this.generateBookingId(),
      userId,
      flight,
      passenger,
      paymentMethod,
      amount: flight.price,
      currency: flight.currency,
      status: 'CONFIRMED',
      createdAt: new Date().toISOString()
    };

    const bookings = this.getAllBookings();

    bookings.push(booking);

    localStorage.setItem(
      this.bookingsKey,
      JSON.stringify(bookings)
    );

    return booking;
  }

  getBookingById(id: string): Booking | null {

    const bookings = this.getAllBookings();

    return bookings.find(
      booking => booking.id === id
    ) ?? null;
  }

  getUserBookings(userId: string): Booking[] {

    const bookings = this.getAllBookings();

    return bookings.filter(
      booking => booking.userId === userId
    );
  }

  private getAllBookings(): Booking[] {

    const storedBookings =
      localStorage.getItem(this.bookingsKey);

    if (!storedBookings) {
      return [];
    }

    return JSON.parse(storedBookings);
  }

  private generateBookingId(): string {

    return `FP-${Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase()}`;
  }
}