import { fromJS } from 'immutable';
import { createForms } from 'react-redux-form/lib/immutable';
import moment from 'moment';

export default function createAppForms() {
  const loginFormModelInitialState = fromJS({
    login: '',
    password: '',
    rememberMe: false,
  });

  const bookFlightModelInitialState = fromJS({
    flightType: 'roundtrip',
    Origin: '',
    Destination: '',
    DepartDate: null,
    ReturnDate: null,
    NumOfAdults: '1',
    NumOfSeniors: '0',
    NumOfChildren04: '0',
    NumOfChildren03: '0',
    NumOfChildren02: '0',
    NumOfChildren01: '0',
    NumOfInfants: '0',
    NumOfLapInfants: '0',
    cabinType: 'econ',
    awardCabinType: 'econ',
    CorporateBooking: false,
    NonStopOnly: false,
    AwardTravel: false,
    Flexible: false,
    flexMonth: moment().date(1).format('YYYY-MM-DD'),
    tripLength: '6',
  });

  const bookCarModelInitialState = fromJS({
    driversAge: '',
    dropoffDate: '',
    dropoffLocation: '',
    dropoffTime: '10|0',
    hideAgeBox: true,
    pickupLocation: '',
    pickupDate: '',
    pickupTime: '10|0',
    showDropOffLocation: true,
  });

  const bookHotelModelInitialState = fromJS({
    destination: '',
    checkInDate: null,
    checkoutDate: null,
    rooms: '1',
    travelers: '1',
  });

  const flightStatusModelModelInitialState = fromJS({
    StatusOrigin: '',
    StatusDestination: '',
    flightNumber: '',
    dates: '',
  });

  const bookCheckinModelInitialState = fromJS({
    confirmationNumber: '',
    lastName: '',
  });

  const myTripsModelInitialState = fromJS({
    confirmationNumber: '',
    lastName: '',
  });

  const aboutMeInitialState = fromJS({
    nationality: '',
    countryOfResidence: '',
  });
  return createForms({
    bookFlightModel: bookFlightModelInitialState,
    loginFormModel: loginFormModelInitialState,
    bookCarModel: bookCarModelInitialState,
    bookHotelModel: bookHotelModelInitialState,
    flightStatusModel: flightStatusModelModelInitialState,
    bookCheckinModel: bookCheckinModelInitialState,
    bookMyTripsModel: myTripsModelInitialState,
    aboutMeModel: aboutMeInitialState,
  });
}
