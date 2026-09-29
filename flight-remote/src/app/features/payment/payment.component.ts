import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import { Flight } from '../../models/flight.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { BookingService } from 'src/app/core/services/booking.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  flight: Flight | null = null;
  passenger: any = null;

  paymentForm!: FormGroup;
  upiForm!: FormGroup;

  submitted = false;
  upiSubmitted = false;

  netBankingForm!: FormGroup;
  netBankingSubmitted = false;

  walletForm!: FormGroup;
  walletSubmitted = false;

  selectedPaymentMethod = 'card';

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private bookingService: BookingService, private notificationService: NotificationService) {}

  ngOnInit(): void {

    const navigation = window.history.state;

    this.flight = navigation.flight ?? null;
    this.passenger = navigation.passenger ?? null;

    // Card form
    this.paymentForm = this.fb.group({
      cardholderName: [
        '',
        Validators.required
      ],

      cardNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]{16}$/)
        ]
      ],

      expiryDate: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(0[1-9]|1[0-2])\/[0-9]{2}$/)
        ]
      ],

      cvv: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]{3}$/)
        ]
      ],
    });

    // UPI form
    this.upiForm = this.fb.group({
      upiId: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+$/)
        ]
      ]
    });

    // net banking form
    this.netBankingForm = this.fb.group({
      bank: [
        '',
        Validators.required
      ]
    });

    // wallet form
    this.walletForm = this.fb.group({
      wallet: ['', Validators.required]
    });
  }

  selectPaymentMethod(method: string): void {
    this.selectedPaymentMethod = method;

    this.submitted = false;
    this.upiSubmitted = false;
    this.netBankingSubmitted = false;
  }

  payNow(): void {

    if (this.selectedPaymentMethod === 'card') {

      this.submitted = true;

      if (this.paymentForm.invalid) {
        this.paymentForm.markAllAsTouched();
        return;
      }

      console.log('Card payment:', this.paymentForm.value);
        this.paymentSuccessful();

    }

    if (this.selectedPaymentMethod === 'upi') {

      this.upiSubmitted = true;

      if (this.upiForm.invalid) {
        this.upiForm.markAllAsTouched();
        return;
      }

      console.log('UPI payment:', this.upiForm.value);
      this.paymentSuccessful();
    }

     if (this.selectedPaymentMethod === 'netbanking') {

        this.netBankingSubmitted = true;

        if (this.netBankingForm.invalid) {
          this.netBankingForm.markAllAsTouched();
          return;
        }

        console.log(
          'Net Banking payment:',
          this.netBankingForm.value
        );
          this.paymentSuccessful();

      }

    if (this.selectedPaymentMethod === 'wallet') {
      this.walletSubmitted = true;

      if (this.walletForm.invalid) {
        this.walletForm.markAllAsTouched();
        return;
      }

      console.log('Wallet payment:', this.walletForm.value);
        this.paymentSuccessful();

    }
  }

  paymentSuccessful(): void {

    if (!this.flight || !this.passenger) {

      this.notificationService.error(
        'Unable to continue with payment. Please restart your booking.'
      );
      return;
    }

    const currentUser = this.authService.getCurrentUser();

    if (!currentUser) {
      this.router.navigate(['/login']);
      return;
    }

    const booking = this.bookingService.createBooking(
      currentUser.id,
      this.flight,
      this.passenger,
      this.selectedPaymentMethod
    );

    this.notificationService.success(
      'Booking confirmed successfully!'
    );
    this.router.navigate(['/confirmation'], {
      state: {
        bookingId: booking.id
      }
    });
  }
}