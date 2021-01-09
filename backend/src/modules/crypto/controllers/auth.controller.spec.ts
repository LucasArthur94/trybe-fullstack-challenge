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
})

test('should make sign in', async (t) => {
  stub(helpers, 'randomString').withArgs().returns('abcdefghij12345')

  t.context.controller.readUserFile = stub().withArgs().returns({
    email: 'email@mail.com',
    password: '135982',
    lastValidToken: '',
  })

  t.context.controller.updateUserFile = stub()
    .withArgs({
      email: 'email@mail.com',
      password: '135982',
      lastValidToken: 'abcdefghij12345',
    })
    .resolves()

  t.deepEqual(
    await t.context.controller.signIn({
      email: 'email@mail.com',
      password: '135982',
    }),
    { token: 'abcdefghij12345' }
  )
})

test('should throw error', async (t) => {
  t.context.controller.readUserFile = stub().withArgs().returns({
    email: 'email@mail.com',
    password: '135982',
    lastValidToken: '',
  })

  await t.throwsAsync(
    t.context.controller.signIn({
      email: 'email@mail.com',
      password: '123456',
    })
  )
})
