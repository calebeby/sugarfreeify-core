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

test(async t => {
  const input = await fs.readFile('test/input.sml', 'utf-8')
  const expected = await fs.readFile('test/expected.html', 'utf-8')

  await rmfr('test/input.html')

  await sugarfreeify({
    inputExt: 'sml',
    outputExt: 'html',
    transform: text =>
      reshape(reshapeConfig).process(text).then(res => res.output())
  })

  const actual = await fs.readFile('test/input.html', 'utf-8')

  t.deepEqual(expected, actual)
})
