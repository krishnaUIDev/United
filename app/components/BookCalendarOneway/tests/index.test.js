import React from 'react';
import { mount } from 'enzyme';
import { spy } from 'sinon';
import 'react-dates/initialize';
import moment from 'moment';

import { mapDispatchToProps } from 'containers/BookFlightFormContainer/index';
import { onSetDepartDate } from 'containers/BookCalendar/actions';
import { BookCalendarOneway } from '../index';

moment.now = function () {
  return +new Date('2018-02-21');
};

describe('<BookCalendarOneway />', () => {
  const onBlur = spy();
  const changeModelSpy = spy();
  const renderedComponent = mount(
    <BookCalendarOneway
      onChangeModel={changeModelSpy}
      onDateChange={onBlur}
    />
  );
  it('should render SingleDatePicker', () => {
    expect(renderedComponent.find('SingleDatePicker').length).toEqual(1);
  });
  it('should render input', () => {
    expect(renderedComponent.find('input').length).toEqual(1);
  });
  it('should call onSetDepartDate action', () => {
    const dispatchSpy = spy();
    const { setDepart } = mapDispatchToProps(dispatchSpy);
    setDepart('2018-08-01');
    const expectedAction = onSetDepartDate('2018-08-01');
    const spyLastCall = dispatchSpy.args[0][0];
    expect(spyLastCall.type).toEqual(expectedAction.type);
    expect(spyLastCall.departDate).toEqual(expectedAction.departDate);
  });
  it('shouldnt allow dates > 337 days', () => {
    const futureDate = moment().add('338', 'days');
    const isInvalid = renderedComponent.instance().dateChecker(futureDate);
    expect(isInvalid).toEqual(true);
  });
  it('shouldnt allow invalid dates', () => {
    const invalidDate = 'aaaaxhjjhb';
    const isInvalid = renderedComponent.instance().dateChecker(invalidDate);
    expect(isInvalid).toEqual(false);
  });
  it('shouldnt allow leap year dates on non-leap years', () => {
    const invalidDate = moment('02-29-2018');
    const isInvalid = renderedComponent.instance().dateChecker(invalidDate);
    expect(isInvalid).toEqual(true);
  });
  /**
   * user story: When i delete the date, it should become empty than defaulting to Current date
   */
  it('shouldnt set empty/null date to Current date', () => {
    // @NOTE we are modifying internal state so we should not use outer mounted component
    const wrapper = mount(<BookCalendarOneway
      startDate="02-27-2018"
      onChangeModel={changeModelSpy}
      onDateChange={onBlur}
      setCalendarError={spy()}
      setDepart={spy()}
      displayFormat={() => moment.localeData().longDateFormat('ll')}
    />);
    expect(wrapper.find('input').props().value).toEqual('Feb 27, 2018');
    wrapper.instance().onDateChange(null);
    expect(wrapper.find('input').props().value).toEqual('');
  });
});
