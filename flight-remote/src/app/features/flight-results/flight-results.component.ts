import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlightService } from 'src/app/core/services/flight.service';
import { Flight, FlightSearchRequest } from 'src/app/models/flight.model';

@Component({
  selector: 'app-flight-results',
  templateUrl: './flight-results.component.html',
  styleUrls: ['./flight-results.component.css']
})
export class FlightResultsComponent implements OnInit {

  flights: Flight[] = []
  search: FlightSearchRequest | null = null

  constructor(private flightService: FlightService, private route: ActivatedRoute){
    
  }

  ngOnInit(): void {
    console.log('🔥 FlightResultsComponent ngOnInit FIRED');

    this.route.queryParams.subscribe(params => {
      const searchRequest: FlightSearchRequest = {
        from: params['from'],
        to: params['to'],
        departureDate: params['departureDate'],
        returnDate: params['returnDate'] || undefined,
        passengers: Number(params['passengers']),
        cabinClass: params['cabinClass']
      };

      console.log('Search params from URL:', searchRequest);

      this.flightService.searchFlights(searchRequest).subscribe({
        next: (response) => {
          this.flights = response.flights;
          this.search = response.search;

          console.log('Results loaded:', response);
        },
        error: (error) => {
          console.error('Failed to load flight results:', error);
        }
      });
    });
  }
}
