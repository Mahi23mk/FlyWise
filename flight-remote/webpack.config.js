const {
  withModuleFederationPlugin,
  shareAll
} = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'flightRemote',

  exposes: {
    './FlightSearchModule':
      './src/app/features/flight-search/flight-search-page.module.ts',

      './FlightResultsModule': 
      './src/app/features/flight-results/flight-results.module.ts',

      './FlightDetailsModule':
      './src/app/features/flight-details/flight-details.module.ts',

      './BookingModule':
      './src/app/features/booking/booking.module.ts',

       './PaymentModule':
      './src/app/features/payment/payment.module.ts',

      './LoginModule':
      './src/app/features/login/login.module.ts',

      './SignUpModule':
      './src/app/features/signup/signup.module.ts',

      './ProfileModule':
      './src/app/features/profile/profile.module.ts',

      './ConfirmationModule':
      './src/app/features/confirmation/confirmation.module.ts',

      './MyBookingsModule':
      './src/app/features/my-bookings/my-bookings.module.ts',
  },

  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto'
    })
  }

});
