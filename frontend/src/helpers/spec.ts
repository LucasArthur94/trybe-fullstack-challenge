import { emailValidator } from './emailValidator'

describe('Email validator', () => {
  it('should validate email', () => {
    expect(emailValidator('email@mail.com')).toBeTruthy()
  })

  it('should refuse string without email patterns', () => {
    expect(emailValidator('DORIME')).toBeFalsy()
  })
})
