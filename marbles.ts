/**
 * Marble Syntax
 * -  Time: 10 "frames" of time passage
 * | Data flow complete!
 * # Error
 * a a value emitted by the observable
 * () sync groupings
 * ^ subscription point (hot observable only!)
 */

/**
 * - Represents 10 frames.
 * A frame is 1ms
 */

/**
 * Hot Observables - Are creating values before the subscription has started. For Eg: Mouse click.
 * A subject that behaves as though it's already running when the subscription begins!
 * 
 * 
 * Cold Observables - A subject that start "running" when the subscription begins.
 * Much more predictive.!
 */

/**
 * Test Schedulers
 * getTestSchedulers()
 * 
 */

import {of} from 'rxjs';
import {map} from 'rxjs/operators';

export function multiplyByTen() {
  return of(1,2,10).pipe(
    map(x => x*10)
  )
}