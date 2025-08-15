# TL-B Runtime Sample

```bash
npm install https://github.com/ton-community/tlb-rest-server.git
```

## Simple

```typescript
import { parseTLB } from 'tlb-rest-server/src/tlb-runtime';

interface Data {
  kind: 'Foo';
  x: number;
}

const runtime = parseTLB<Data>('_ x:# = Foo;')

const pack = runtime.serialize({
  kind: 'Foo',
  x: 73,
})
if (pack.success) {
  console.log({ pack: pack.value.endCell().toBoc().toString('base64')});
} else {
  console.error(pack.error.message);
}
// { pack: 'te6cckEBAQEABgAACAAAAEmTxmY2' }

const unpack = runtime.deserialize('te6cckEBAQEABgAACAAAACoFpvBE')
if (unpack.success) {
  console.log({ unpack: unpack.value});
} else {
  console.error(unpack.error.message);
}
// { unpack: { kind: 'Foo', x: 42 } }
```

## TEP-74 Fungible tokens (Jettons)

```typescript
import { parseTLB } from 'tlb-rest-server/src/tlb-runtime';

const schema = `block.tlb burn#595f07bc query_id:uint64 amount:(VarUInteger 16) response_destination:MsgAddress custom_payload:(Maybe ^Cell) = InternalMsgBody;`
const runtime = parseTLB(schema)
const pack = runtime.serialize({
  kind: 'InternalMsgBody',
  query_id: 0,
  amount: 1n,
  response_destination: 'Ef8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAU',
  custom_payload: { kind: 'Maybe_nothing' }
})
if (pack.success) {
  console.log(pack.value.endCell().toBoc().toString('base64'));
} else {
  console.error(pack.error.message);
}
// te6cckEBAQEAMwAAYVlfB7wAAAAAAAAAAAACAz/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABBx2oNK

const unpack = runtime.deserialize('te6cckEBAQEAMwAAYVlfB7wAAAAAAAAAAAACVT/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAhHmPH')
if (unpack.success) {
  console.log(unpack.value);
} else {
  console.error(unpack.error.message);
}
// { kind: 'InternalMsgBody', query_id: 0n, amount: 42n, response_destination: Ef8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAU, custom_payload: { kind: 'Maybe_nothing' } }
```

## Run

```bash
yarn && yarn dev
```

## Hack

```bash
yarn
yarn lint
yarn test
yarn test:e2e
```
