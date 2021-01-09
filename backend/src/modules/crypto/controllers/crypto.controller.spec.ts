import { SinonStub, stub } from 'sinon'
import { Test, TestingModule } from '@nestjs/testing'
import { CryptoController } from './crypto.controller'
import { getMockProviders, makeTest } from '../test-helpers'
import { CoindeskService } from '../services/coindesk.service'

const DEFAULT_BPI = {
  USD: {
    code: 'USD',
    rate: '40,466.1317',
    description: 'United States Dollar',
    rate_float: 40466.1317,
  },
  BTC: {
    code: 'BTC',
    rate: '1.0000',
    description: 'Bitcoin',
    rate_float: 1,
  },
}

const EXPECTED_BPI = {
  USD: {
    code: 'USD',
    rate: '40,466.1317',
    description: 'United States Dollar',
    rate_float: 40466.1317,
  },
  BRL: {
    code: 'BRL',
    rate: '218,517.111',
    description: 'Brazilian Real',
    rate_float: 218517.11118,
  },
  EUR: {
    code: 'EUR',
    rate: '37,228.841',
    description: 'Euro',
    rate_float: 37228.841164,
  },
  CAD: {
    code: 'CAD',
    rate: '58,271.23',
    description: 'Canadian Dollar',
    rate_float: 58271.22964799999,
  },
  BTC: {
    code: 'BTC',
    rate: '1.0000',
    description: 'Bitcoin',
    rate_float: 1,
  },
}

const COINDESK_DEFAULT = {
  time: {
    updated: 'Jan 9, 2021 20:11:00 UTC',
    updatedISO: '2021-01-09T20:11:00+00:00',
    updateduk: 'Jan 9, 2021 at 20:11 GMT',
  },
  disclaimer:
    'This data was produced from the CoinDesk Bitcoin Price Index (USD). Non-USD currency data converted using hourly conversion rate from openexchangerates.org',
}

const COINDESK_SERVICE_MOCK = {
  ...COINDESK_DEFAULT,
  bpi: DEFAULT_BPI,
}

const EXPECTED_CRYPTO_RESULT = {
  ...COINDESK_DEFAULT,
  bpi: EXPECTED_BPI,
}

const test = makeTest<{
  controller: CryptoController
  coindeskServiceMock: {
    getCoindeskData: SinonStub
  }
}>()

test.beforeEach(async (t) => {
  t.context.coindeskServiceMock = {
    getCoindeskData: stub(),
  }

  const app: TestingModule = await Test.createTestingModule({
    controllers: [CryptoController],
    providers: [
      ...getMockProviders(),
      {
        provide: CoindeskService,
        useValue: t.context.coindeskServiceMock,
      },
    ],
  }).compile()

  t.context.controller = app.get<CryptoController>(CryptoController)

  t.context.controller.updateCurrencyFile = stub().resolves()
})

test('should get crypto information', async (t) => {
  t.context.controller.readCurrencyFile = stub().withArgs().returns({
    USD: '1.000',
    BRL: '5.400',
    EUR: '0.920',
    CAD: '1.440',
    BTC: '6,506.6717',
  })

  t.context.coindeskServiceMock.getCoindeskData = stub()
    .withArgs()
    .resolves(COINDESK_SERVICE_MOCK)

  t.deepEqual(
    await t.context.controller.getAllCurrencies(),
    EXPECTED_CRYPTO_RESULT as any
  )
})

test('should update crypto information', async (t) => {
  t.context.controller.readCurrencyFile = stub().withArgs().returns({
    USD: '1.000',
    BRL: '5.400',
    EUR: '0.920',
    CAD: '1.440',
    BTC: '6,506.6717',
  })

  t.context.controller.updateCurrencyFile = stub()
    .withArgs({
      USD: '1.000',
      EUR: '0.920',
      CAD: '1.440',
      BTC: '6,506.6717',
      BRL: '5.300',
    })
    .resolves()

  t.context.coindeskServiceMock.getCoindeskData = stub()
    .withArgs()
    .resolves(COINDESK_SERVICE_MOCK)

  t.deepEqual(
    await t.context.controller.updateCurrency({ currency: 'BRL', value: 5.3 }),
    {
      message: 'Valor alterado com sucesso!',
    }
  )
})
