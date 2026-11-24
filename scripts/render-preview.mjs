import { readFileSync, writeFileSync } from 'node:fs';

import { Resvg } from '@resvg/resvg-js';

const source = readFileSync('public/social/preview.svg', 'utf8');
const canvas = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="600">
  <rect width="1200" height="600" fill="#fbfaf9"/>
  <g transform="translate(0 2) scale(${1200 / 1808})">${source}</g>
</svg>`;
writeFileSync('dist/social/preview.png', new Resvg(canvas).render().asPng());
