const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

export const randomString = (length = 16): string =>
  [...Array(length).keys()].reduce(
    (acc) =>
      `${acc}${CHARS.split('')[Math.floor(Math.random() * CHARS.length)]}`,
    ''
  )
