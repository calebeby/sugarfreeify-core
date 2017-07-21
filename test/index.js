import test from 'ava'
import fs from 'then-fs'
import sugarfreeify from '..'

const reshape = require('reshape')
const sugarml = require('sugarml')
const beautify = require('reshape-beautify')

const reshapeConfig = {
  parser: sugarml,
  plugins: [beautify()]
}

test(async t => {
  const input = await fs.readFile('test/input.sml', 'utf-8')
  const expected = await fs.readFile('test/expected.html', 'utf-8')

  await fs.unlinkSync('test/input.html')

  await sugarfreeify({
    inputExt: 'sml',
    outputExt: 'html',
    transform: text =>
      reshape(reshapeConfig).process(text).then(res => res.output())
  })

  const actual = await fs.readFile('test/input.html', 'utf-8')

  t.deepEqual(expected, actual)
})
