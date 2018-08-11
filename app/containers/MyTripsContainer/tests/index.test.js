import { spy } from 'sinon';

import { onResetMyTripsData } from '../../App/actions';
import { mapDispatchToProps } from '../index';
import { onSetAriaLiveMessage } from '../../HomePage/actions';

describe('CheckinFlightContainer', () => {
  it('should call onSetAriaLiveMessage action', () => {
    const dispatchSpy = spy();
    const { setAriaLiveMessage } = mapDispatchToProps(dispatchSpy);
    setAriaLiveMessage('Hello this is announced');
    const expectedAction = onSetAriaLiveMessage('Hello this is announced');
    const spyLastCall = dispatchSpy.args[0][0];
    expect(spyLastCall.type).toEqual(expectedAction.type);
    expect(spyLastCall.index).toEqual(expectedAction.index);
  });
  it('should call onResetMyTripsData action', () => {
    const dispatchSpy = spy();
    const { resetMyTripsData } = mapDispatchToProps(dispatchSpy);
    resetMyTripsData();
    const expectedAction = onResetMyTripsData();
    const spyLastCall = dispatchSpy.args[0][0];
    expect(spyLastCall.type).toEqual(expectedAction.type);
  });
});
