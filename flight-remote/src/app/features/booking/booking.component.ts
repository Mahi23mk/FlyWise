import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Flight } from '../../models/flight.model';
import { FlightService } from '../../core/services/flight.service';
import { AuthService, User } from 'src/app/core/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  flight: Flight | null = null;
  currentUser: User | null = null;

  passengerForm!: FormGroup;
  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private flightService: FlightService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    const flightId = this.route.snapshot.paramMap.get('id');

    if (!flightId) {
      return;
    }

    this.flight = this.flightService.getFlightById(flightId) ?? null;

    this.currentUser =
      this.authService.getCurrentUser();

    this.passengerForm = this.fb.group({
      firstName: [
        this.currentUser?.firstName || '',
        Validators.required
      ],

      lastName: [
        this.currentUser?.lastName || '',
        Validators.required
      ],

      email: [
        this.currentUser?.email || '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]{10}$/)
        ]
      ]
    });
  }

   continueToPayment(): void {

    this.submitted = true;

    if (this.passengerForm.invalid) {
      this.passengerForm.markAllAsTouched();
      return;
    }
    
    const passengerDetails = this.passengerForm.value;
    
    this.router.navigate(['/payment'], {
      state: {
        flight: this.flight,
        passenger: passengerDetails
      }
    });
  }
}