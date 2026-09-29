import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightDetailsComponent } from './flight-details.component';
import { FlightDetailsRoutingModule } from './flight-details-routing.module';



@NgModule({
  declarations: [FlightDetailsComponent],
  imports: [
    CommonModule,
    FlightDetailsRoutingModule
  ]
})
export class FlightDetailsModule { }
