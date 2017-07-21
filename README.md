[![Build Status](https://travis-ci.org/calebeby/sugarfreeify-core.svg?branch=master)](https://travis-ci.org/calebeby/sugarfreeify-core)
[![codecov](https://codecov.io/gh/calebeby/sugarfreeify-core/branch/master/graph/badge.svg)](https://codecov.io/gh/calebeby/sugarfreeify-core)
[![Greenkeeper badge](https://badges.greenkeeper.io/calebeby/sugarfreeify-core.svg)](https://greenkeeper.io/)

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
}).promise.then(console.log('done'))
```
