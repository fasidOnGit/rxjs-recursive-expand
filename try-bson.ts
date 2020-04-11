// import { Long, serialize, deserialize } from 'bson';
// console.log('what?')
// const doc = { long: Long.fromNumber(100) };
// const data = serialize(doc);
// console.log('data:', data);
import('bson').then(
  what => console.log(what)
).catch(err => console.log(err))