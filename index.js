#!/usr/bin/env node

const fs = require('then-fs')
const globby = require('globby')
const path = require('path')

const processFiles = opts =>
  globby([`**/*.${opts.inputExt}`, '!node_modules']).then(files =>
    Promise.all(
      files.map(file => {
        const newFile = path.join(
          path.dirname(file),
          path.basename(file, opts.inputExt) + opts.outputExt
        )
        return fs
          .readFile(file, 'utf-8')
          .then(opts.transform)
          .then(newText => fs.writeFile(newFile, newText))
      })
    )
  )

module.exports = processFiles
