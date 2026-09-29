import { Component, Input } from '@angular/core';
import { Flight } from '../../../models/flight.model';
import { Router } from '@angular/router';
import { AIRLINE_LOGOS } from 'src/app/data/airline-logos';


@Component({
  selector: 'app-flight-result-card',
  templateUrl: './flight-result-card.component.html',
  styleUrls: ['./flight-result-card.component.css']
})
export class FlightResultCardComponent {
  @Input() flight!: Flight;
  airlineLogos = AIRLINE_LOGOS;

  constructor(private router: Router){}

   viewDetails(): void {
    this.router.navigate(['/flight-details', this.flight.id]);
  }
}
