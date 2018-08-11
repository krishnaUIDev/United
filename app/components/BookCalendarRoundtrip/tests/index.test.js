import React from 'react';
import { mount } from 'enzyme';
import { spy } from 'sinon';
import 'react-dates/initialize';
import moment from 'moment';

import { mapDispatchToProps } from 'containers/BookFlightFormContainer/index';
import { onSetDepartDate, onSetReturnDate } from 'containers/BookCalendar/actions';
import { BookCalendarRoundtrip } from '../index';

moment.now = function () {
  return +new Date('2018-02-21');
};

describe('<BookCalendarRoundtrip />', () => {
  const bookCalendarRoundtripSpy = spy();
  const renderedComponent = mount(
    <BookCalendarRoundtrip
      onClick={bookCalendarRoundtripSpy}
      startDate={null}
      startDateId="foo"
      endDate={null}
      endDateId="bar"
      departModel="fooModel.foo"
      returnModel="fooModel.bar"
      startDatePlaceholderText="foo"
      endDatePlaceholderText="bar"
      screenReaderInputMessage="foo"
      infoPanelText="info"
      errorMessage="error"
      stayLengthErrorMsg="stay error"
      displayFormat="MMM D, YYYY"
      maximumStayLength={28}
      startDateErrorLabel="foo"
      endDateErrorLabel="bar"
    />
  );
  it('should render DateRangePicker', () => {
    expect(renderedComponent.find('DateRangePicker').length).toEqual(1);
  });
  it('should render divs', () => {
    expect(renderedComponent.find('input').length).toEqual(2);
  });
  it('should render input', () => {
    expect(renderedComponent.find('input').length).toEqual(2);
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
  it('should call setReturnDate action', () => {
    const dispatchSpy = spy();
    const { setReturn } = mapDispatchToProps(dispatchSpy);
    setReturn('2018-08-01');
    const expectedAction = onSetReturnDate('2018-08-01');
    const spyLastCall = dispatchSpy.args[0][0];
    expect(spyLastCall.type).toEqual(expectedAction.type);
    expect(spyLastCall.returnDate).toEqual(expectedAction.returnDate);
  });
  it('shouldnt allow dates > 337 days', () => {
    const futureDate = moment().add('338', 'days');
    const isInvalid = renderedComponent.instance().dateChecker(futureDate);
    expect(isInvalid).toEqual(true);
  });
  it('shouldnt allow invalid dates', () => {
    const invalidDate = 'aaaaxhjjhb';
    const isInvalid = renderedComponent.instance().dateChecker(invalidDate, null);
    expect(isInvalid).toEqual(false);
  });
  it('shouldnt allow leap year dates on non-leap years', () => {
    const invalidDate = moment('02-29-2018');
    const isInvalid = renderedComponent.instance().dateChecker(invalidDate, null);
    expect(isInvalid).toEqual(true);
  });
  it('shouldnt allow end date before start date', () => {
    const startDate = moment('02-15-2018');
    const endDate = moment('02-14-2018');
    const isInvalid = renderedComponent.instance().dateChecker(startDate, endDate);
    expect(isInvalid).toEqual(false);
  });
  it('should check for stay length', () => {
    const startDate = moment('02-01-2018');
    const endDate = moment('04-15-2018');
    const length = '28';
    const stayLengthCheck = renderedComponent.instance().stayLengthCheck(startDate, endDate, length);
    expect(stayLengthCheck).toEqual(false);
  });
  /**
   * user story: When i delete the date, it should become empty than defaulting to Current date
   */
  it('shouldnt set empty/null date to Current date', () => {
    // @NOTE we are modifying internal state so we should not use outer mounted component
    const wrapper = mount(<BookCalendarRoundtrip
      onClick={bookCalendarRoundtripSpy}
      startDateId="DepartDate"
      endDateId="ReturnDate"
      departModel="fooModel.foo"
      returnModel="fooModel.bar"
      startDatePlaceholderText="foo"
      endDatePlaceholderText="bar"
      screenReaderInputMessage="foo"
      infoPanelText="info"
      errorMessage="error"
      stayLengthErrorMsg="stay error"
      maximumStayLength={28}
      startDateErrorLabel="foo"
      endDateErrorLabel="bar"

      startDate="02-10-2018"
      endDate="02-15-2018"
      onChangeModel={spy()}
      setCalendarError={spy()}
      setDepart={spy()}
      setReturn={spy()}
    />);
    wrapper.instance().setErrors = spy();
    expect(wrapper.find('input#DepartDate').props().value).toEqual('Feb 10, 2018');
    expect(wrapper.find('input#ReturnDate').props().value).toEqual('Feb 15, 2018');

    wrapper.instance().onDatesChange({ startDate: null });
    wrapper.setProps({ startDate: null });
    expect(wrapper.find('input#DepartDate').props().value).toEqual('');
    wrapper.instance().onDatesChange({ endDate: null });
    wrapper.setProps({ endDate: null });
    expect(wrapper.find('input#ReturnDate').props().value).toEqual('');
  });
});
