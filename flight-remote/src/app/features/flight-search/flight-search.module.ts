import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { FlightSearchComponent } from './flight-search.component';
import { HttpClientModule } from '@angular/common/http';


// const routes: Routes = [
//   {
//     path: '',
//     component: FlightSearchComponent
//   }
// ];

@NgModule({
  declarations: [
    FlightSearchComponent
  ],
  imports: [
    CommonModule,
    // RouterModule.forChild(routes),
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    FlightSearchComponent
  ]
})
export class FlightSearchModule {}