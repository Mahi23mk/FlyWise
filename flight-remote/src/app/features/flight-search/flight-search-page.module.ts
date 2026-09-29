import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { FlightSearchModule } from './flight-search.module';
import { FlightSearchComponent } from './flight-search.component';

const routes: Routes = [
  {
    path: '',
    component: FlightSearchComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FlightSearchModule,
    RouterModule.forChild(routes)
  ]
})
export class FlightSearchPageModule {}