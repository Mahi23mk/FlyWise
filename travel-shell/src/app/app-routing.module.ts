import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loadRemoteModule }
  from '@angular-architects/module-federation';
import { AuthGuard } from './core/guards/auth.guard';
import { TestComponent } from './features/test/test.component';

const remoteEntry =   'http://localhost:4201/remoteEntry.js';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'flights',
    pathMatch: 'full'
  },
  {
      path: 'test',
      pathMatch: 'full',
      component: TestComponent
  },
  {
    path: 'flights',

    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry,
        exposedModule:
          './FlightSearchModule'

      }).then(m => m.FlightSearchPageModule)
  },
   {
    path: 'results',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry,
        exposedModule: './FlightResultsModule'
      }).then(m => m.FlightResultsModule)
  },
  {
    path: 'flight-details/:id',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry,
        exposedModule: './FlightDetailsModule'
      }).then(m => m.FlightDetailsModule)
  },
  {
    path: 'booking/:id',
    canActivate: [AuthGuard],
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry,
        exposedModule: './BookingModule'
      }).then(m => m.BookingModule)
  },
  {
    path: 'payment',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        exposedModule: './PaymentModule'
      }).then(m => m.PaymentModule)
  },
  {
    path: 'confirmation',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        exposedModule: './ConfirmationModule'
      }).then(m => m.ConfirmationModule)
  },
  {
    path: 'my-bookings',
    canActivate: [AuthGuard],
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        exposedModule: './MyBookingsModule'
      }).then(m => m.MyBookingsModule)
  },
  {
    path: 'login',
    loadChildren: () => 
      loadRemoteModule({
        type: 'module',
        remoteEntry,
        exposedModule: './LoginModule'
      }).then(m => m.LoginModule)
  },
  {
    path: 'signup',
    loadChildren: ()=> 
      loadRemoteModule({
        type: 'module',
        remoteEntry,
        exposedModule: './SignUpModule'
      }).then(m => m.SignUpModule)
  },
  {
  path: 'profile',
  loadChildren: () =>
    loadRemoteModule({
      type: 'module',
      remoteEntry: 'http://localhost:4201/remoteEntry.js',
      exposedModule: './ProfileModule'
    }).then(m => m.ProfileModule)
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
