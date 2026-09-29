import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { FlightService } from '../../core/services/flight.service'
import { FlightSearchRequest }  from '../../models/flight.model'
import { AIRPORTS, Airport } from '../../data/airports';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent {

  searchForm: FormGroup;
  airports: Airport[] = AIRPORTS;
  today = this.getToday();


  private getToday(): string {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  private differentLocationsValidator(
    control: AbstractControl
  ): ValidationErrors | null {

    const from = control.get('from')?.value;
    const to = control.get('to')?.value;

    const errors: ValidationErrors = {};


    if (from && to && from === to) {
      return {'sameLocation':true}
    }
   
    return null;
  }

  private dateRangeValidator(
  control: AbstractControl
): ValidationErrors | null {

  const departureDate = control.get('departureDate')?.value;
  const returnDate = control.get('returnDate')?.value;

  if (
    departureDate &&
    returnDate &&
    departureDate > returnDate
  ) {
    return {
      invalidDateRange: true
    };
  }

  return null;
}


  private returnDateValidator(
  control: AbstractControl
): ValidationErrors | null {

  const departureDate =
    this.searchForm?.get('departureDate')?.value;

  const returnDate = control.value;

  if (
    departureDate &&
    returnDate &&
    returnDate < departureDate
  ) {
    return {
      invalidReturnDate: true
    };
  }

  return null;
}

 private departureDateValidator(
  control: AbstractControl
): ValidationErrors | null {

  const returnDate =
    this.searchForm?.get('returnDate')?.value;

  const departureDate = control.value;

  if (
    departureDate &&
    returnDate &&
    returnDate < departureDate
  ) {
    return {
      invalidReturnDate: true
    };
  }

  return null;
}

private flightSearchValidator(
  control: AbstractControl
): ValidationErrors | null {

  const tripType = control.get('tripType')?.value;
  const returnDate = control.get('returnDate')?.value;

  if (tripType === 'roundTrip' && !returnDate) {
    return { returnDateRequired: true };
  }

  return null;
}

  constructor(private fb: FormBuilder, private flightService: FlightService, private router: Router, private route: ActivatedRoute

) {
    this.searchForm = this.fb.group({
      tripType: ['roundTrip', Validators.required],

      from: ['', Validators.required],
      to: ['', Validators.required],

      departureDate: [this.getToday(), [Validators.required, this.departureDateValidator.bind(this), this.returnDateValidator.bind(this)]],
      returnDate: ['', [this.returnDateValidator.bind(this),  this.departureDateValidator.bind(this)]],

      passengers: [1, [Validators.required, Validators.min(1)]],

      cabinClass: ['economy', Validators.required]
    }, {
      validators:[ 
        this.differentLocationsValidator.bind(this),
        this.dateRangeValidator.bind(this),
        this.flightSearchValidator.bind(this)
      ]
    });
  }

  ngOnInit(): void {
  // Your existing form creation code

  this.route.queryParams.subscribe(params => {
    if (!params['from'] || !params['to']) {
      return;
    }

    const returnDate = params['returnDate'] || '';

    this.searchForm.patchValue({
      from: params['from'],
      to: params['to'],
      departureDate: params['departureDate'],
      returnDate: returnDate,
      passengers: Number(params['passengers']) || 1,
      cabinClass: params['cabinClass'] || 'Economy',
      tripType: returnDate ? 'roundTrip' : 'oneWay'
    });
  });
}

  selectRoundTrip(): void {
    const tripType = this.searchForm.get('tripType')?.value;

    if (tripType === 'oneWay') {
      this.searchForm.patchValue({
        tripType: 'roundTrip'
      });
    }
  }

  
  swapLocations(): void {
    const from = this.searchForm.get('from')?.value;
    const to = this.searchForm.get('to')?.value;

    this.searchForm.patchValue({
      from: to,
      to: from
    });
  }

 searchFlights(): void {
  if (this.searchForm.invalid) {
    this.searchForm.markAllAsTouched();
    return;
  }

  const tripType = this.searchForm.get('tripType')?.value;
  
  const searchRequest: FlightSearchRequest = {
    from: this.searchForm.get('from')?.value,
    to: this.searchForm.get('to')?.value,
    departureDate: this.searchForm.get('departureDate')?.value,
    passengers: this.searchForm.get('passengers')?.value,
    cabinClass: this.searchForm.get('cabinClass')?.value
  };

  this.flightService.searchFlights(searchRequest).subscribe({
    next: (response) => {
      console.log('Flight API response:', response);
      const queryParams = {
          from: searchRequest.from,
          to: searchRequest.to,
          departureDate: searchRequest.departureDate,
          passengers: searchRequest.passengers,
          cabinClass: searchRequest.cabinClass,
         returnDate: tripType === 'roundTrip'
      ? searchRequest.returnDate
      : null,
      }
      if (searchRequest.returnDate) {
       queryParams.returnDate = searchRequest.returnDate;
      }

      this.router.navigate(['/results'], {
        queryParams
      });
    },
    error: (error) => {
      console.error('Flight search failed:', error);
    }
  });

  console.log('Flight Search:', this.searchForm.value);
}
}