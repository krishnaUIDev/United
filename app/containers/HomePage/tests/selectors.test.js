import { fromJS } from 'immutable';

import {
  selectHome,
  makeSelectAirportsData,
  makeSelectAirportsSearchString,
  makeSelectAirportsRetryCount,
  makeSelectExpanded,
  makeSelectActiveSubTab,
  makeSelectAwardTravelChecked,
  makeSelectBookWithMilesChecked,
  makeSelectCarLocationsData,
  makeSelectCarLocationsSearchString,
  makeSelectCarLocationsRetryCount,
  makeSelectHotelLocationsData,
  makeSelectMyTripsData,
  makeSelectMyTripsError,
  makeSelectMyTripsLoading,
  makeSelectMyTripsRetryCount,
  makeSelectMyTripsFlightData,
} from '../selectors';

describe('selectHome', () => {
  it('should select the home state', () => {
    const homeState = fromJS({});
    const mockedState = fromJS({
      home: homeState,
    });
    expect(selectHome(mockedState)).toEqual(homeState);
  });
});

describe('makeSelectAirportsData', () => {
  const airportsSelector = makeSelectAirportsData();
  it('should select the airportData', () => {
    const data = fromJS({ some: 'data' });
    const mockedState = fromJS({
      home: {
        airports: {
          data,
        },
      },
    });
    expect(airportsSelector(mockedState)).toEqual(data);
  });
});

describe('makeSelectAirportsSearchString', () => {
  const selector = makeSelectAirportsSearchString();
  it('should select the airport search string', () => {
    const searchString = 'new york';
    const mockedState = fromJS({
      home: {
        airports: {
          searchString,
        },
      },
    });
    expect(selector(mockedState)).toEqual(searchString);
  });
});

describe('makeSelectAirportsRetryCount', () => {
  const selector = makeSelectAirportsRetryCount();
  it('should select the airport service retry count', () => {
    const retryCount = 5;
    const mockedState = fromJS({
      home: {
        airports: {
          retryCount,
        },
      },
    });
    expect(selector(mockedState)).toEqual(retryCount);
  });
});

describe('makeSelectCarLocationsData', () => {
  const selector = makeSelectCarLocationsData();
  it('should select the carLocationsData', () => {
    const data = fromJS({ some: 'data' });
    const mockedState = fromJS({
      home: {
        carLocations: {
          data,
        },
      },
    });
    expect(selector(mockedState)).toEqual(data);
  });
});

describe('makeSelectCarLocationsSearchString', () => {
  const selector = makeSelectCarLocationsSearchString();
  it('should select the carLocations search string', () => {
    const searchString = 'new york';
    const mockedState = fromJS({
      home: {
        carLocations: {
          searchString,
        },
      },
    });
    expect(selector(mockedState)).toEqual(searchString);
  });
});

describe('makeSelectCarLocationsRetryCount', () => {
  const selector = makeSelectCarLocationsRetryCount();
  it('should select the car locations service retry count', () => {
    const retryCount = 5;
    const mockedState = fromJS({
      home: {
        carLocations: {
          retryCount,
        },
      },
    });
    expect(selector(mockedState)).toEqual(retryCount);
  });
});

describe('makeSelectHotelLocationsData', () => {
  const selector = makeSelectHotelLocationsData();
  it('should select the hotelLocations Data', () => {
    const data = fromJS({ some: 'data' });
    const mockedState = fromJS({
      home: {
        hotelLocations: {
          data,
        },
      },
    });
    expect(selector(mockedState)).toEqual(data);
  });
});

describe('makeSelectExpanded', () => {
  const selector = makeSelectExpanded();
  it('should select the expanded Data', () => {
    const expanded = 'expanded';
    const mockedState = fromJS({
      home: {
        expanded,
      },
    });
    expect(selector(mockedState)).toEqual(expanded);
  });
});

describe('makeSelectActiveSubTab', () => {
  const selector = makeSelectActiveSubTab();
  it('should select the data', () => {
    const activeSubTab = 'something!';
    const mockedState = fromJS({
      home: {
        activeSubTab,
      },
    });
    expect(selector(mockedState)).toEqual(activeSubTab);
  });
});

describe('makeSelectAwardTravelChecked', () => {
  const selector = makeSelectAwardTravelChecked();
  it('should select the data', () => {
    const awardTravel = 'something!';
    const mockedState = fromJS({
      home: {
        awardTravel,
      },
    });
    expect(selector(mockedState)).toEqual(awardTravel);
  });
});

describe('makeSelectBookWithMilesChecked', () => {
  const selector = makeSelectBookWithMilesChecked();
  it('should select the data', () => {
    const bookWithMiles = 'something!';
    const mockedState = fromJS({
      home: {
        bookWithMiles,
      },
    });
    expect(selector(mockedState)).toEqual(bookWithMiles);
  });
});

describe('makeSelectMyTripsData', () => {
  const selector = makeSelectMyTripsData();
  it('should fetch the data', () => {
    const data = 'something!';
    const mockedState = fromJS({
      home: {
        myTrips: {
          data,
        },
      },
    });
    expect(selector(mockedState)).toEqual(data);
  });
});

describe('makeSelectMyTripsError', () => {
  const selector = makeSelectMyTripsError();
  it('should fetch the Error', () => {
    const error = 'something!';
    const mockedState = fromJS({
      home: {
        myTrips: {
          error,
        },
      },
    });
    expect(selector(mockedState)).toEqual(error);
  });
});

describe('makeSelectMyTripsLoading', () => {
  const selector = makeSelectMyTripsLoading();
  it('should fetch the data', () => {
    const loading = 'something!';
    const mockedState = fromJS({
      home: {
        myTrips: {
          loading,
        },
      },
    });
    expect(selector(mockedState)).toEqual(loading);
  });
});

describe('makeSelectMyTripsRetryCount', () => {
  const selector = makeSelectMyTripsRetryCount();
  it('should fetch the data', () => {
    const retryCount = 'something!';
    const mockedState = fromJS({
      home: {
        myTrips: {
          retryCount,
        },
      },
    });
    expect(selector(mockedState)).toEqual(retryCount);
  });
});

describe('makeSelectMyTripsFlightData', () => {
  const selector = makeSelectMyTripsFlightData();
  it('should fetch the data', () => {
    const data = [];
    const mockedState = fromJS({
      home: {
        myTrips: {
          data,
        },
      },
    });
    expect(selector(mockedState)).toEqual(data);
  });
});
