import { Component, OnInit } from '@angular/core';
import { Flight } from '../../models/flight.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightService } from '../../core/services/flight.service';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.css']
})
export class FlightDetailsComponent implements OnInit{

    flight: Flight | null = null;

    constructor(private route: ActivatedRoute, private flightService: FlightService, private router: Router, private authService: AuthService){}

    ngOnInit(): void {

      const flightId = this.route.snapshot.paramMap.get('id');

      if (!flightId) {
        return;
      }

      this.flight = this.flightService.getFlightById(flightId) ?? null;
  }

    backToResults(): void {
      this.router.navigate(['/results']);
    }

    selectFlight(): void {
      if (!this.flight) {
        return;
      }

      if(this.authService.isLoggedIn()){
        this.router.navigate(['/booking', this.flight.id]);
        return;
      }
       this.router.navigate(['/login'], {
        queryParams: {
          returnUrl: `/booking/${this.flight.id}`
        }
      });
    }
}
