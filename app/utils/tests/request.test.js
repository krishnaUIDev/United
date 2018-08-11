/**
 * Test the request function
 */

import axios from 'axios';
import request from '../request';

jest.mock('axios');

describe('request', () => {
  // Before each test, stub the fetch function
  beforeEach(() => {
    axios.CancelToken = { source: jest.fn() };
    axios.CancelToken.source.mockReturnValue({ token: '1234' });
  });

  describe('stubbing successful response', () => {
    // Before each test, pretend we got a successful response
    beforeEach(() => {
      const res = {
        data: { hello: 'world' },
        status: 200,
        headers: {
          'Content-type': 'application/json',
        },
      };
      axios.mockReturnValue(Promise.resolve(res));
    });

    it('should format the response correctly', (done) => {
      request('/thisurliscorrect')
        .then((json) => {
          expect(json.hello).toBe('world');
          done();
        });
    });
  });

  describe('stubbing error response unrejected', () => {
    // Before each test, pretend we got an unsuccessful response
    beforeEach(() => {
      const res = {
        status: 404,
        statusText: 'Not Found',
        headers: {
          'Content-type': 'application/json',
        },
      };

      axios.mockReturnValue(Promise.resolve(res));
    });

    it('should catch errors', (done) => {
      request('/thisdoesntexist')
        .catch((err) => {
          expect(err.response.status).toBe(404);
          expect(err.response.statusText).toBe('Not Found');
          done();
        });
    });
  });
  describe('stubbing error response rejected', () => {
    // Before each test, pretend we got an unsuccessful response
    beforeEach(() => {
      const res = {
        response: {
          status: 404,
          statusText: 'Not Found',
          headers: {
            'Content-type': 'application/json',
          },
        },
      };

      axios.mockReturnValue(Promise.reject(res));
    });

    it('should catch errors', (done) => {
      request('/thisdoesntexist')
        .catch((err) => {
          expect(err.response.status).toBe(404);
          expect(err.response.statusText).toBe('Not Found');
          done();
        });
    });
  });
});
