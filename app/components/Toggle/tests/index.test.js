import React from 'react';
import { shallow } from 'enzyme';
import { IntlProvider, defineMessages } from 'react-intl';

import Toggle from '../index';

describe('<Toggle />', () => {
  it('should contain default text', () => {
    const defaultEnMessage = 'someContent';
    const defaultDeMessage = 'someOtherContent';
    const messages = defineMessages({
      en: {
        id: 'unitedapp.containers.LocaleToggle.en',
        defaultMessage: defaultEnMessage,
      },
      de: {
        id: 'unitedapp.containers.LocaleToggle.en',
        defaultMessage: defaultDeMessage,
      },
    });
    const renderedComponent = shallow(
      <IntlProvider locale="en">
        <Toggle values={['en', 'de']} messages={messages} />
      </IntlProvider>
    );
    expect(renderedComponent.contains(<Toggle values={['en', 'de']} messages={messages} />)).toBe(true);
  });

  it('should default to options', () => {
    const defaultEnMessage = 'someContent';
    const defaultDeMessage = 'someOtherContent';
    const messages = defineMessages({
      en: {
        id: 'unitedapp.containers.LocaleToggle.en',
        defaultMessage: defaultEnMessage,
      },
      de: {
        id: 'unitedapp.containers.LocaleToggle.en',
        defaultMessage: defaultDeMessage,
      },
    });
    const renderedEmptyComponent = shallow(
      <Toggle messages={messages} />
    );

    expect(renderedEmptyComponent.contains(<option>--</option>)).toBe(true);
  });
});
