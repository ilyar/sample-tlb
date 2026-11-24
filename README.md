# TL-B Runtime Sample

The demo uses runtime `1.0.0-alpha.5` built from [commit 5cf275d](https://github.com/ilyar/tlb-runtime/commit/5cf275de742b33777ceb87ddbf4e0d5f41e8f3ca).

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
