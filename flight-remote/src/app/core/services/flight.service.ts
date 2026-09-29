import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { FLIGHTS } from '../../data/flights';

import {
  FlightSearchRequest,
  FlightSearchResponse,
  Flight
} from '../../models/flight.model';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  private readonly apiUrl = 'http://localhost:3000/api/flights';

  constructor(private http: HttpClient) {}

  // searchFlights(
  //   searchRequest: FlightSearchRequest
  // ): Observable<FlightSearchResponse> {

  //   let params = new HttpParams()
  //     .set('from', searchRequest.from)
  //     .set('to', searchRequest.to)
  //     .set('departureDate', searchRequest.departureDate)
  //     .set('passengers', searchRequest.passengers)
  //     .set('cabinClass', searchRequest.cabinClass);

  //   if (searchRequest.returnDate) {
  //     params = params.set(
  //       'returnDate',
  //       searchRequest.returnDate
  //     );
  //   }

  //   return this.http.get<FlightSearchResponse>(
  //     this.apiUrl,
  //     { params }
  //   );
  // }

  private searchResultsSubject =  new BehaviorSubject<FlightSearchResponse | null>(null);
  searchResults$ = this.searchResultsSubject.asObservable();


   searchFlights(
    searchRequest: FlightSearchRequest
  ): Observable<FlightSearchResponse> {

    console.log('FlightService received:', searchRequest);

    const results = FLIGHTS.filter(flight =>
      flight.from.toLowerCase() === searchRequest.from.toLowerCase() &&
      flight.to.toLowerCase() === searchRequest.to.toLowerCase()
    );

    const response: FlightSearchResponse = {
      search: searchRequest,
      count: results.length,
      flights: results
    };

    this.searchResultsSubject.next(response);

    return of(response);
  }

  getFlightById(id: string): Flight | undefined {
    return FLIGHTS.find(flight => flight.id === id);
  }
}