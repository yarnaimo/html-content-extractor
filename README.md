# html-content-extractor

Extract main text content from web page

> This library only works on **rendered HTML document** since it extracts contents based on the visual size of the elements.

## Install

```sh
npm i -S html-content-extractor
# or
yarn add html-content-extractor
```

## Usage

```ts
import { extractMainContent } from 'html-content-extractor'

extractMainContent() // => string | undefined
```
