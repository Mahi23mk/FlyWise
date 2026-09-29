export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;

  from: string;
  to: string;

  departureTime: string;
  arrivalTime: string;

  duration: string;
  stops: number;

  price: number;
  currency: string;
}

export interface FlightSearchRequest {
  from: string;
  to: string;
  departureDate: string;
  returnDate?: string;
  passengers: number;
  cabinClass: string;
}

export interface FlightSearchResponse {
  search: FlightSearchRequest;
  count: number;
  flights: Flight[];
}

