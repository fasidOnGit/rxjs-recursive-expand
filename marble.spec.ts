import {cold, hot} from 'jasmine-marbles';
import {of} from 'rxjs';
import {map} from 'rxjs/operators';

describe("Marble Testing", () => {
  it("should understand marble diagram", () => {
    const source = cold('--');
    const expected = cold('--');
    expect(source).toBeObservable(expected);
  });

  it('should support basic string values', () => {
      const src = cold('-a-|');
      const expected = cold('-a-|');
      expect(src).toBeObservable(expected);
  });

  it('should support basic values provided as params (number)', () => {
      const src = cold('-a-|', {a: 1});
      const expected = cold('-a-|', {a:1});
      expect(src).toBeObservable(expected);
  });

  it('should support basic values provided as params (object)', () => {
      const src = cold('-a-|', {a: {key: 'value'}});
      const expected = cold('-a-|', {a: {key: 'value'}});
      expect(src).toBeObservable(expected);
  });

  it('should support basic errors', () => {
    const source = cold('--#');
    const expected = cold('--#');
    expect(source).toBeObservable(expected);
  });
  
  it('should support custom errors', () => {
    const source = cold('--#', null, new Error('Oops!'));
    const expected = cold('--#', null, new Error('Oops!'));
    expect(source).toBeObservable(expected);
  });
    
  it('should support multiple emission in the same time', () => {
    const source = of(1,2,3);
    const expected = cold('abc|',{a: 1, b:2, c:3});
    expect(source).toBeObservable(expected);
  });

      
  it('should support testing subscriptions', () => {
    const source = hot('-a-^b---c-|');
    const subscription = '^------!';
    const expected = cold('-b---c-|');
    expect(source).toBeObservable(expected);
    expect(source).toHaveSubscriptions(subscription);
  });

  it('should multiply by 10 each value emitted', () => {
    const values = {a: 1, b: 2, c: 3, x: 10, y: 20, z: 30};
    const source = cold('-a-b-c-|', values);
    const expected = cold('-x-y-z-|', values);
    const result = source.pipe(map(x => x*10));
    expect(result).toBeObservable(expected);
  });
});