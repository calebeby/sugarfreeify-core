[![Build Status](https://travis-ci.org/calebeby/sugarfreeify-core.svg?branch=master)](https://travis-ci.org/calebeby/sugarfreeify-core)

# Sugarfreeify-core

API for [sugarfreeify](https://github.com/calebeby/sugarfreeify)

## Usage

```js
const sugarfreeify = require('sugarfreeify-core')

sugarfreeify({
  inputExt: 'sml',
  outputExt: 'html',
  transform: text =>
    reshape(reshapeConfig).process(text).then(res => res.output())
}).then(console.log('done'))
```
