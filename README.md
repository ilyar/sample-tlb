# TL-B Runtime Sample

The demo uses runtime `1.0.0-alpha.5` built from [commit b640498](https://github.com/ilyar/tlb-runtime/commit/b6404983b689d1184bab6e7d2ec22281b4342416).

Paste a BoC to decode it against the schema. A unique match opens automatically. If several types fit the cell, choose one under **Decode as**. When a numeric argument is missing from the wire, the editor asks for that argument. To encode JSON, set its `kind` to the type or constructor name.

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
