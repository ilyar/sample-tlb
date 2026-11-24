# TL-B Runtime Sample

The demo uses a bundled build of `@ton-community/tlb-runtime`. The archive name in [package.json](package.json) includes the runtime commit.

Paste a BoC to decode it against the schema. A unique match opens automatically. If several types fit the cell, choose one under **Decode as**. When a numeric argument is missing from the wire, the editor asks for that argument. To encode JSON, set its `kind` to the type or constructor name.

TL-B and JSON use matching syntax colors for field names and types. In JSON, fold a nested object with its gutter arrow. Use **Inspect cells** to see the bits and references in a BoC, including when its schema is incomplete.

The JSON editor represents a cell as `{"$cell":"<base64 BoC>"}`, a raw bit string as `{"$bits":"<TON hex>"}`, and an external address as `{"$external":[48,"5623048054"]}`. Dictionary properties are the decimal keys.

## Share links

**Share** copies a `#tlb=<base64url>` link with the schema, BoC and selected **Decode as** type. A single-root BoC reopens in standard Base64. Empty input stays empty, and incomplete or multi-root input keeps its original text. Older `#schema=...&boc=...` links and documentation sample links still open.

To inspect a share link, paste the value after `#tlb=` into **BoC** and use this schema:

```tlb
bool_false$0 = Bool;
bool_true$1 = Bool;
nothing$0 {X:Type} = Maybe X;
just$1 {X:Type} value:X = Maybe X;

snake_bytes#_ len:(## 10) data:(bits len) next:(Maybe ^SnakeBytes) = SnakeBytes;
boc_none$00 = BocInput;
boc_cell$01 cell:^Cell = BocInput;
boc_raw$10 raw:^SnakeBytes = BocInput;
share_v1#01 compressed:Bool schema:^SnakeBytes boc:BocInput decode_as:(Maybe ^SnakeBytes) = SharePayload;
```

Each snake holds up to 2048 chunks of 126 bytes. The schema contains UTF-8 bytes, compressed with raw DEFLATE only when that saves space. The decompressed schema limit is 1 MiB.

## Documentation samples

Edit [src/samples.json](src/samples.json) and rebuild to change the picker. Each entry requires `title`, `schema`, and `boc` (base64 or hex). Optional fields are `documentation` for a section URL, `documentationTitle` for its link text (defaults to “Open &lt;sample title&gt; in TON Docs”), `group` for a menu heading, and `kind` to select the intended decoded constructor when the sample is ambiguous. Generic examples include a concrete root in their schema.

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

## Favicon

The [TL-B file icon](https://github.com/ton-blockchain/intellij-ton/blob/de8d39a64ad33f1170d615f7e7f97a02e2d33beb/modules/tlb/resources/icons/tlb.svg) comes from intellij-ton. The demo uses opaque lettering and an opaque amber label for contrast at tab size. The icon is distributed under the [GNU GPL v3](public/licenses/tlb-icon.txt).
