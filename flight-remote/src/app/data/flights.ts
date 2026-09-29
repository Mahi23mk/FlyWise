import { Flight } from '../models/flight.model';

export const FLIGHTS: Flight[] = [
  {
    id: 'FL001',
    airline: 'IndiGo',
    flightNumber: '6E-2045',
    from: 'DEL',
    to: 'BOM',
    departureTime: '06:15',
    arrivalTime: '08:25',
    duration: '2h 10m',
    stops: 0,
    price: 5200,
    currency: 'INR'
  },
  {
    id: 'FL002',
    airline: 'Air India',
    flightNumber: 'AI-865',
    from: 'DEL',
    to: 'BOM',
    departureTime: '09:00',
    arrivalTime: '11:15',
    duration: '2h 15m',
    stops: 0,
    price: 6100,
    currency: 'INR'
  },
  {
    id: 'FL003',
    airline: 'Vistara',
    flightNumber: 'UK-945',
    from: 'DEL',
    to: 'BOM',
    departureTime: '14:30',
    arrivalTime: '16:40',
    duration: '2h 10m',
    stops: 0,
    price: 6800,
    currency: 'INR'
  },
  {
    id: 'FL004',
    airline: 'IndiGo',
    flightNumber: '6E-2134',
    from: 'DEL',
    to: 'BOM',
    departureTime: '18:45',
    arrivalTime: '21:00',
    duration: '2h 15m',
    stops: 0,
    price: 5700,
    currency: 'INR'
  },
  {
    id: 'FL005',
    airline: 'Air India',
    flightNumber: 'AI-678',
    from: 'DEL',
    to: 'BOM',
    departureTime: '21:30',
    arrivalTime: '23:45',
    duration: '2h 15m',
    stops: 0,
    price: 5900,
    currency: 'INR'
  }
];