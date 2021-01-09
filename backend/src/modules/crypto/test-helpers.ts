import ava, { TestInterface } from 'ava'
import * as sinon from 'sinon'

export const getMockProviders = () => {
  return [
    {
      provide: 'Logger',
      useValue: {
        log: sinon.stub(),
        error: sinon.stub(),
        warn: sinon.stub(),
        debug: sinon.stub(),
        verbose: sinon.stub(),
        setContext: sinon.stub(),
      },
    },
  ]
}

type TestContext<Ctx> = TestInterface<Ctx>

export const makeTest = <Ctx = Record<string, unknown>>(): TestContext<Ctx> => {
  const test = ava as TestContext<Ctx>

  return test
}
