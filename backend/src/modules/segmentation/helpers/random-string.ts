const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

export const randomString = (length = 16): string =>
  Array(length).reduce(
    (acc) => `${acc}${CHARS.charAt(Math.floor(Math.random() * CHARS.length))}`,
    ''
  )
