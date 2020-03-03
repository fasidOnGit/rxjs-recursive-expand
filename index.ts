import { iif, from, of, timer, Subject, EMPTY } from 'rxjs'; 
import { mergeMap, finalize , skipWhile, take, takeUntil, takeWhile, scan, expand, map, concatMap,tap} from 'rxjs/operators';
console.clear();

function getPagedData(index: number) {
  return timer(500).pipe(
    map(() => ({
      pageIndex: index,
      data: Array.from({length: 10}, (_, i) => ({
        id: (index * 10) + i,
        data: Math.random()
      })),
      nextPageIndex: index < 10 ? index + 1 : undefined
    }))
  )
}

/**
 * Rx Subject way for Recusrive data.
 * subject --> getPageData -> [is next?] --> results
 *   <------------------------------|
 */

const rquestIndex = new Subject<number>();

//When a new index arrives
const source = rquestIndex.pipe(
  // request the data for that index
  concatMap(index => getPagedData(index)),
  // if there's a next page , pump it into the top
  tap(({nextPageIndex}) => nextPageIndex !== undefined && rquestIndex.next(nextPageIndex))
)

// source.subscribe(x => console.log(x));

// prime it with a starting index.
rquestIndex.next(0);

/**
 * Recursive with expand
 */
const expandSrc = of({nextPageIndex: 0}).pipe(
  expand(({nextPageIndex}) => {
    if (nextPageIndex !== undefined) {
      return getPagedData(nextPageIndex)
    } else {
      return EMPTY;
    }
  })
)
// expandSrc.subscribe(x => console.log(x));

//Concat all the incoming data
const expandS = expandSrc.pipe(
  scan((allData, {data}) => {
    if (!data) return allData;
    return [...allData, ...data]
  }, [])
)
// .subscribe(x => console.log(x))

let count = 0;
function getRandom() {
  count++;
  return of(count > 3 ? 22 : null)
}

const end$ = new Subject();
let what = 0;

const recursiveFinal = getRandom().pipe(
  expand(numericVal => {
    what++;
    return numericVal === null ? getRandom() : EMPTY;
  }),
  take(4),
  tap(x => console.log(x,what)),
  skipWhile(result => result === null && what < 3),
)

of(true).pipe(
  mergeMap(x => iif(() => x, recursiveFinal, expandS))
)

.subscribe(x => console.log('Yes', x), null, () => console.log('complete'));

of(null).pipe(
  expand((status) => {
    return status === true ? EMPTY : getMachineStatus()
  }),
  take(4),
  finalize(() => console.log('Done'))
).subscribe();

let s = 0;
function getMachineStatus() {
  s++;
  return timer(500).pipe(
    map(() => s > 4)
  )
}
