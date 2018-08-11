/**
 * Test the validator functions
 */

import {
  isSubmittableInput,
  isSubmittablePassword,
  isValidMPnumber,
  isValidPassword,
} from '../validators';

describe('Validator functions', () => {
  /**
   * A correct MileagePlus number is ?
   */
  describe('MileagePlus number', () => {
    it('validates empty mileagePlus number', () => {
      const globalMPusername = null;

      const wrongMPnumber = 'CE0';
      const nullMPnumber = null;

      const emptyMPnumber = '';
      expect(
        isValidMPnumber(nullMPnumber, globalMPusername)
      ).toBe(false);
      expect(
        isValidMPnumber(wrongMPnumber, globalMPusername)
      ).toBe(false);

      expect(
        isValidMPnumber(emptyMPnumber, globalMPusername)
      ).toBe(true);
    });

    it('validates submittable mileagePlus number', () => {
      const globalMPusername = null;
      const correctMPnumber = 'CE017293';
      const wrongMPnumber = 'CE0';

      expect(
        isSubmittableInput(wrongMPnumber, globalMPusername)
      ).toBe(false);
      expect(
        isSubmittableInput(correctMPnumber, globalMPusername)
      ).toBe(true);
    });
    it('validates globalMPusername', () => {
      const wrongMPusername = null;
      const maskedMPnumber = '*****293';

      expect(
        isSubmittableInput(wrongMPusername)
      ).toBe(false);
      expect(
        isSubmittableInput(maskedMPnumber)
      ).toBe(true);
    });

    it('treats empty/null values as unSubmittable mileagePlus numbers', () => {
      const globalMPusername = null;
      const emptyMPnumber = '';
      const nullMPnumber = null;

      expect(
        isSubmittableInput(emptyMPnumber, globalMPusername)
      ).toBe(false);
      expect(
        isSubmittableInput(nullMPnumber, globalMPusername)
      ).toBe(false);
    });
  });

  /**
   * A correct password is any string with at least 8 chars in it
   */
  describe('Password', () => {
    it('validates empty password', () => {
      const wrongPassword = 'easy';
      const emptyPassword = '';
      const correctPassword = 'unhackable123';

      expect(
        isValidPassword(wrongPassword)
      ).toBe(false);
      expect(
        isValidPassword(emptyPassword)
      ).toBe(true);
      expect(
        isValidPassword(correctPassword)
      ).toBe(true);
    });

    it('validates submittable password', () => {
      const wrongPassword = 'easy';
      const correctPassword = 'unhackable123';

      expect(
        isSubmittablePassword(wrongPassword)
      ).toBe(false);

      expect(
        isSubmittablePassword(correctPassword)
      ).toBe(true);
    });

    it('treats empty/null values as unSubmittable passwords', () => {
      const emptyPassword = '';
      const undefinedPassword = undefined;
      const nullPassword = null;

      expect(
        isSubmittablePassword(emptyPassword)
      ).toBe(false);
      expect(
        isSubmittablePassword(undefinedPassword)
      ).toBe(false);
      expect(
        isSubmittablePassword(nullPassword)
      ).toBe(false);
    });
  });
});
