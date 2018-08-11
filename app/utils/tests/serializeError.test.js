/**
 * Test the serialize error function
 */

/* eslint-disable import/no-named-default */
import { default as m } from '../serializeError';

describe('serialize error util', () => {
  it('serialize error object to pojo', () => {
    const serialized = m(new Error('foo'));
    expect(serialized).toHaveProperty('name');
    expect(serialized).toHaveProperty('stack');
    expect(serialized).toHaveProperty('message');
  });

  it('should destroy circular references', () => {
    const obj = {};
    obj.child = { parent: obj };

    const serialized = m(obj);

    expect(typeof serialized).toBe('object');
    expect(serialized.child.parent).toBe('[Circular]');
  });

  it('should not affect the original object', () => {
    const obj = {};
    obj.child = { parent: obj };

    const serialized = m(obj);
    expect(serialized).not.toBe(obj);
    expect(obj.child.parent).toBe(obj);
  });


  it('should only destroy parent references', () => {
    const obj = {};
    const common = { thing: obj };
    obj.one = { firstThing: common };
    obj.two = { secondThing: common };

    const serialized = m(obj);
    expect(typeof serialized.one.firstThing).toBe('object');
    expect(typeof serialized.two.secondThing).toBe('object');
    expect(serialized.one.firstThing.thing).toBe('[Circular]');
    expect(serialized.two.secondThing.thing).toBe('[Circular]');
  });

  it('should work on arrays', () => {
    const obj = {};
    const common = [obj];
    const x = [common];
    const y = [['test'], common];
    y[0][1] = y;
    obj.a = { x };
    obj.b = { y };

    const serialized = m(obj);
    expect(Array.isArray(serialized.a.x)).toBeTruthy();
    expect(serialized.a.x[0][0]).toBe('[Circular]');
    expect(serialized.b.y[0][0]).toBe('test');
    expect(serialized.b.y[1][0]).toBe('[Circular]');
    expect(serialized.b.y[0][1]).toBe('[Circular]');
  });

  it('should discard nested functions', () => {
    function a() {}
    function b() {}
    a.b = b;
    const obj = { a };

    const serialized = m(obj);
    expect(serialized).toEqual({});
  });

  it('should replace top-level functions with a helpful string', () => {
    function a() {}
    function b() {}
    a.b = b;

    const serialized = m(a);
    expect(serialized).toBe('[Function: a]');
  });

  it('should drop functions', () => {
    function a() {}
    a.foo = 'bar;';
    a.b = a;
    const obj = { a };

    const serialized = m(obj);

    expect(serialized).toEqual({});
    expect(Object.prototype.hasOwnProperty.call(serialized, 'a')).toBeFalsy();
  });

  it('should not access deep non-enumerable properties', () => {
    const error = Error('some error');
    const obj = {};
    Object.defineProperty(obj, 'someProp', {
      enumerable: false,
      get() {
        throw new Error('some other error');
      },
    });
    error.obj = obj;
    expect(() => m(error)).not.toThrow();
  });

  it('should serialize nested errors', () => {
    const error = new Error('outer error');
    error.innerError = new Error('inner error');

    const serialized = m(error);
    expect(serialized.message).toBe('outer error');
    expect(serialized.innerError.message).toBe('inner error');
  });
});
