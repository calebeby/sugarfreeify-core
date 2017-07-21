#!/usr/bin/env node

const fs = require('then-fs')
const globby = require('globby')
const path = require('path')
const mitt = require('mitt')

/**
 * @typedef {Object} PromiseEventEmitter
 * @property {Promise} promise
 * @property {mitt.Emitter} emitter
 */

/**
 * @param {Object} opts
 * @param {String} opts.inputExt - Input files extension
 * @param {String} opts.outputExt - Output files extension
 * @param {Function} opts.transform - Transform to sugarfreeify the files
 *
 * @fires emitter#finishedFile
 * @fires emitter#finishedAll
 *
 * @returns {PromiseEventEmitter}
 */
const processFiles = opts => {
  const emitter = mitt()
  const promise = globby([
    `**/*.${opts.inputExt}`,
    '!node_modules'
  ]).then(files =>
    Promise.all(
      files.map(inputFile => {
        const outputFile = path.join(
          path.dirname(inputFile),
          path.basename(inputFile, opts.inputExt) + opts.outputExt
        )
        return fs
          .readFile(inputFile, 'utf-8')
          .then(opts.transform)
          .then(newText => fs.writeFile(outputFile, newText))
          .then(() => emitter.emit('finishedFile', {inputFile, outputFile}))
      })
    ).then(() => emitter.emit('finishedAll'))
  )
  return {emitter, promise}
}

module.exports = processFiles
