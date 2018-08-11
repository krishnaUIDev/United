import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducer from 'containers/App/reducer';
import LoginButton from '../index';
import createReducer from '../../../reducers';

describe('<LoginButton />', () => {
  const user = {
    AirportCode: '',
    AirportNameLong: '',
    AirportNameShort: '',
    POSCode: 'US ',
    Travelers: [
      {
        CustomerId: '132335798',
        MileagePlusId: 'NY606337',
        ProfileOwnerId: '132335798',
        ProfileId: '50940904',
        Title: 'Mr.',
        CustomerName: 'Mr. Jim Beam',
        FirstName: 'Jim',
        MiddleName: '',
        LastName: 'Beam',
        GenderCode: 'M',
        MileagePlus: {
          AccountBalance: 10320,
          MileagePlusId: 'NY606337',
          IsFlexPQM: 'false',
          FlexPQMBalance: '6,832',
          TravelBankBalance: 610.00,
          MileageExpirationDate: 'March 17, 2018',
          CurrentPremierLevel: 'Premier Platinum',
          CurrentPremierLevelDescription: null,
          PremierMileageBalance: null,
          PremierSegmentBalance: null,
          CurrentYearMoneySpent: 14100,
          CurrentYearMoneySpentThreshold: 14000,
          LifetimePremierMileageBalance: null,
          PrimaryEmailAddress: null,
          LangPreference: null,
          EliteMileageBalance: 10000,
          EliteSegmentBalance: 6,
          PremierUpgrades: [
            {
              UpgradeType: 'RPU',
              Credit: 2,
              ExpirationDate: '10/01/18',
            },
            {
              UpgradeType: 'GPU',
              Credit: 6,
              ExpirationDate: '11/22/18',
            },
          ],
        },
      },
    ],
    CorporateData: null,
  };

  const store = createStore(
    createReducer({ reducer }),
  );

  const renderedComponent = mount(
    <Provider store={store}>
      <IntlProvider locale="en">
        <LoginButton
          isLoggedIn
          mpUserProfile={user}
        />
      </IntlProvider>
    </Provider>
  );

  it('should render buttons', () => {
    expect(renderedComponent.find('button').length).toEqual(1);
  });
  it('should render divs', () => {
    expect(renderedComponent.find('div').length).toEqual(1);
  });
  it('should render imgs', () => {
    expect(renderedComponent.find('img').length).toEqual(1);
  });
  it('should handle button click', () => {
    renderedComponent.find('#loginButton').simulate('click');
  });
  it('should render \'loading\' rather than \'sign in\' or \'sign out\' when system is loading', () => {
    const rendered = mount(
      <Provider store={store}>
        <IntlProvider locale="en">
          <LoginButton
            isLoading
          />
        </IntlProvider>
      </Provider>
    );
    expect(rendered.find('#loadingHeader').length).toEqual(1);
  });
});
