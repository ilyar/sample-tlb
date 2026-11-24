# TL-B Runtime Sample

The demo uses the bundled runtime built from [commit 1a06686](https://github.com/ilyar/tlb-runtime/commit/1a06686526d4f4b5f9282d718b8214bcde4c9a15).

For parameterized roots, enter the type and its numeric arguments in declaration order, for example `ParamConstructor 4`. Leave the field empty for automatic root selection.

The JSON editor represents a cell as `{"$cell":"<base64 BoC>"}`, a raw bit string as `{"$bits":"<TON hex>"}`, and an external address as `{"$external":[48,"5623048054"]}`. Dictionary properties are the decimal keys.

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
