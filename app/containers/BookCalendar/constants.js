/*
 * BookCalendar
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const FLIGHT_CALENDAR_START_DATE = 'unitedapp/App/FLIGHT_CALENDAR_START_DATE';
export const FLIGHT_CALENDAR_END_DATE = 'unitedapp/App/FLIGHT_CALENDAR_END_DATE';
export const FLIGHT_CALENDAR_ERROR = 'unitedapp/App/FLIGHT_CALENDAR_ERROR';
export const CALENDAR_FOCUSED_INPUT = 'unitedapp/App/CALENDAR_FOCUSED_INPUT';
export const DATE_PICKER_PHRASES = {
  calendarLabel: 'Calendar',
  closeDatePicker: 'Close',
  clearDates: 'Clear Dates',
  jumpToPrevMonth: 'Move backward to switch to the previous month',
  jumpToNextMonth: 'Move forward to switch to the next month',
  keyboardShortcuts: 'Keyboard Shortcuts',
  showKeyboardShortcutsPanel: 'Open the keyboard shortcuts panel',
  hideKeyboardShortcutsPanel: 'Close the shortcuts panel',
  openThisPanel: 'Open this panel',
  enterKey: 'Enter key',
  leftArrowRightArrow: 'Right and left arrow keys',
  upArrowDownArrow: 'up and down arrow keys',
  pageUpPageDown: 'page up and page down keys',
  homeEnd: 'Home and end keys',
  escape: 'Escape key',
  questionMark: 'Question mark',
  selectFocusedDate: 'Select the date in focus',
  moveFocusByOneDay: 'Move backward (left) and forward (right) by one day',
  moveFocusByOneWeek: 'Move backward (up) and forward (down) by one week',
  moveFocusByOneMonth: 'Switch months',
  moveFocustoStartAndEndOfWeek: 'Go to the first or last day of a week',
  returnFocusToInput: 'Return to the date input field',
  keyboardNavigationInstructions: 'You’re on a date field. Either type in the date you want in the format month/day/year or press the down arrow key to interact with the calendar. Use the arrow keys to navigate between days and weeks. Use page up, page down to move between months and years. Press enter to select the date, and escape to close the calendar and return to the input field.',
  dateIsUnavailable: '',
};
export const DATE_DEFAULT_PROPS = {
  // example props for the demo
  autoFocus: false,

  // input related props
  disabled: false,
  required: false,
  screenReaderInputMessage: '',
  showDefaultInputIcon: false,

  // calendar presentation and interaction related props
  renderMonth: null,
  horizontalMargin: 0,
  withPortal: false,
  withFullScreenPortal: false,
  initialVisibleMonth: null,
  numberOfMonths: 2,
  keepOpenOnDateSelect: false,
  isRTL: false,

  // navigation related props
  navPrev: null,
  navNext: null,
  onPrevMonthClick() {},
  onNextMonthClick() {},

  // day presentation and interaction related props
  renderDay: null,
  enableOutsideDays: false,
  renderCalendarInfo() {},

  // internationalization
  monthFormat: 'MMMM YYYY',
  weekDayFormat: 'dd',
};
export const DATE_FORMAT_ARRAY = [
  'MM-DD-YYYY',
  'MM/DD/YYYY',
  'MM\DD\YYYY', // eslint-disable-line
  'MM.DD.YYYY',
  'MMDDYYYY',
  'MM-DD-YY',
  'MM/DD/YY',
  'MM\DD\YY', // eslint-disable-line
  'MMMMDDYYYY',
];
