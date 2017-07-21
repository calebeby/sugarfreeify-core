import test from 'ava'
import fs from 'then-fs'
import sugarfreeify from '..'
import rmfr from 'rmfr'

import reshape from 'reshape'
import sugarml from 'sugarml'
import beautify from 'reshape-beautify'

const reshapeConfig = {
  parser: sugarml,
  plugins: [beautify()]
}

test('creates a new sugarless file', async t => {
  const expected = await fs.readFile('test/expected.html', 'utf-8')

  await rmfr('test/input.html')

  await sugarfreeify({
    inputExt: 'sml',
    outputExt: 'html',
    transform: text =>
      reshape(reshapeConfig).process(text).then(res => res.output())
  }).promise

  const actual = await fs.readFile('test/input.html', 'utf-8')

  t.deepEqual(expected, actual)
})

test.cb('emits proper events', t => {
  t.plan(3)

  const { emitter } = sugarfreeify({
    inputExt: 'sss',
    outputExt: 'css',
    transform: text => text
  })
    
  emitter.on('finishedFile', ({inputFile, outputFile}) => {
    t.deepEqual(inputFile, 'test/foo.sss')
    t.deepEqual(outputFile, 'test/foo.css')
  })

  emitter.on('finishedAll', () => {
    t.pass()
    t.end()
  })
})
