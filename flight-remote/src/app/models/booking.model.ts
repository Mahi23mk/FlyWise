import { Flight } from './flight.model';

export interface BookingPassenger {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface Booking {
  id: string;
  userId: string;

  flight: Flight;
  passenger: BookingPassenger;

  paymentMethod: string;
  amount: number;
  currency: string;

  status: 'CONFIRMED';

  createdAt: string;
}