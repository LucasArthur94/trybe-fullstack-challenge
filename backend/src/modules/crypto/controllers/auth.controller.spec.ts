import { stub } from 'sinon'
import { Test, TestingModule } from '@nestjs/testing'
import { AuthController } from './auth.controller'
import { getMockProviders, makeTest } from '../test-helpers'
import * as helpers from '../helpers/random-string'

const test = makeTest<{
  controller: AuthController
}>()

test.beforeEach(async (t) => {
  const app: TestingModule = await Test.createTestingModule({
    controllers: [AuthController],
    providers: getMockProviders(),
  }).compile()

  t.context.controller = app.get<AuthController>(AuthController)

  t.context.controller.updateUserFile = stub().resolves()
})

test('should make sign in', async (t) => {
  stub(helpers, 'randomString').withArgs().returns('abcdefghij12345')

  t.deepEqual(
    await t.context.controller.signIn({
      email: 'email@mail.com',
      password: '135982',
    }),
    { token: 'abcdefghij12345' }
  )
})

test('should throw error', async (t) => {
  await t.throwsAsync(
    t.context.controller.signIn({
      email: 'email@mail.com',
      password: '123456',
    })
  )
})
