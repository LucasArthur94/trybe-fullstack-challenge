import { makeTest } from '../test-helpers'
import { randomString } from './random-string'

const test = makeTest()

test('generates a string with 10 chars', (t) => {
  t.is(randomString(10).length, 10)
})
