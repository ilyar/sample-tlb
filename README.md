# TL-B Runtime Sample

The demo uses a bundled build of `@ton-community/tlb-runtime`. The archive name in [package.json](package.json) includes the runtime commit.

Paste a BoC to decode it against the schema. A unique match opens automatically. If several types fit the cell, choose one under **Decode as**. When a numeric argument is missing from the wire, the editor asks for that argument. To encode JSON, set its `kind` to the type or constructor name.

TL-B and JSON use matching syntax colors for field names and types. In JSON, fold a nested object with its gutter arrow. Use **Inspect cells** to see the bits and references in a BoC, including when its schema is incomplete.

The JSON editor represents a cell as `{"$cell":"<base64 BoC>"}`, a raw bit string as `{"$bits":"<TON hex>"}`, and an external address as `{"$external":[48,"5623048054"]}`. Dictionary properties are the decimal keys.

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
