# TL-B Runtime: encode and decode TON cells

Open the [playground](https://ilyar.github.io/sample-tlb/) and choose a sample schema or paste your own

- Paste a BoC to decode it as JSON, or edit JSON in Data to encode it back into a BoC
- The runtime tries the last declared type first, and Decode as lets you choose another matching root
- Press `Ctrl+Space` in Data for fields and constructors from the selected root
- Export types shows JSON Schema, TypeScript, Tolk, Python, Go and Kotlin declarations

## Share links

Share copies the schema and the contents of the selected editor, including unfinished input

Inspect a prepared link payload in the [TL-B Share example](https://ilyar.github.io/sample-tlb/#tlb-share) or read its [schema and implementation](src/share/)

Example generate type declarations by schema [scripts/type-by-schema.mjs](scripts/type-by-schema.mjs)

## Local development

```bash
yarn
yarn dev
```

Run `yarn lint`, `yarn test` and `yarn test:e2e` to check changes, then `yarn build` for a production build

To add a preset, provide `title`, `schema` and `boc` in the [sample catalog](src/samples.json)
