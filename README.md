# TL-B Runtime Sample

The demo installs `@ton-community/tlb-runtime` from a GitHub Release in the [runtime fork](https://github.com/ilyar/tlb-runtime/releases). The asset URL in [package.json](package.json) pins the runtime commit.

Paste a BoC to decode it against the schema. A unique match opens automatically. If several types fit the cell, choose one under **Decode as**. When a numeric argument is missing from the wire, the editor asks for that argument. To encode JSON, set its `kind` to the type or constructor name.

TL-B and JSON use matching syntax colors for field names and types. In JSON, fold a nested object with its gutter arrow. Use **Inspect cells** to see the bits and references in a BoC, including when its schema is incomplete.

The JSON editor represents a cell as `{"$cell":"<base64 BoC>"}`, a raw bit string as `{"$bits":"<TON hex>"}`, and an external address as `{"$external":[48,"5623048054"]}`. Dictionary properties are the decimal keys.

## Share links

**Share** copies a `#share=<base64url>` link with the schema and the contents of the corresponding BoC or Data editor. An explicit type selection is stored in `&as=`. A single-root BoC reopens in standard Base64. Empty input stays empty, and incomplete or multi-root input keeps its original text. Data links preserve the JSON text, including incomplete edits.

Share uses TL-B Runtime to encode and decode the envelope. Open [Sample schemas → Usecase → TL-B Share](https://ilyar.github.io/sample-tlb/#tlb-share) for the schema, a prepared cell and the implementation. For a raw link, paste the value of `share` into **BoC** to inspect the envelope.

Each snake holds up to 2048 chunks of 127 bytes. Schema and Data contain UTF-8 text. The entire BoC is limited to 1 MiB. Links use `#share=deflate.<base64url>` when raw DEFLATE makes the URL shorter, including the eight-character prefix.

## Sample schemas

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
