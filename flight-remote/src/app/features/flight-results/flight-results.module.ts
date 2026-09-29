import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightResultsComponent } from './flight-results.component';
import { RouterModule, Routes } from '@angular/router';
import { FlightSearchModule } from '../flight-search/flight-search.module';
import { FlightResultCardComponent } from './flight-result-card/flight-result-card.component';

const routes: Routes = [
  {
    path: '',
    component: FlightResultsComponent
  }
];


@NgModule({
  declarations: [
    FlightResultsComponent,
    FlightResultCardComponent
  ],
  imports: [
    CommonModule,
     RouterModule.forChild(routes),
     FlightSearchModule,
  ]
})
export class FlightResultsModule { }
