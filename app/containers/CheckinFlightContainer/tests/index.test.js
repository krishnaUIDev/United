import { spy } from 'sinon';

import { onResetFlightCheckinData } from '../../App/actions';
import {
  onOpenRightPanelModal,
  updateCheckinDetailsIndex,
  toFocusFlightCheckinNumber,
} from '../../HomePage/actions';
import { mapDispatchToProps } from '../index';


describe('CheckinFlightContainer', () => {
  it('should call onOpenRightPanelModal action', () => {
    const dispatchSpy = spy();
    const { openRightPanelModal } = mapDispatchToProps(dispatchSpy);
    openRightPanelModal(true);
    const expectedAction = onOpenRightPanelModal(true);
    const spyLastCall = dispatchSpy.args[0][0];
    expect(spyLastCall.type).toEqual(expectedAction.type);
    expect(spyLastCall.toOpen).toEqual(expectedAction.toOpen);
  });
  it('should call updateCheckinDetailsIndex action', () => {
    const dispatchSpy = spy();
    const { onUpdateCheckinDetailsIndex } = mapDispatchToProps(dispatchSpy);
    onUpdateCheckinDetailsIndex(0);
    const expectedAction = updateCheckinDetailsIndex(0);
    const expectedActionB = toFocusFlightCheckinNumber(true);
    const spyLastCall = dispatchSpy.args[0][0];
    const spyLastCallB = dispatchSpy.args[1][0];
    expect(spyLastCall.type).toEqual(expectedAction.type);
    expect(spyLastCall.index).toEqual(expectedAction.index);
    expect(spyLastCallB.type).toEqual(expectedActionB.type);
    expect(spyLastCallB.toFocus).toEqual(expectedActionB.toFocus);
  });
  it('should call onResetFlightCheckinData action', () => {
    const dispatchSpy = spy();
    const { resetFlightCheckinData } = mapDispatchToProps(dispatchSpy);
    resetFlightCheckinData();
    const expectedAction = onResetFlightCheckinData();
    const spyLastCall = dispatchSpy.args[0][0];
    expect(spyLastCall.type).toEqual(expectedAction.type);
  });
});
