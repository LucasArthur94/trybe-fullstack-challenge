export const getLocalStorage = (key: string) => {
  if (typeof window === 'undefined') return null
  try {
    return window.localStorage.getItem(key)
  } catch (error) {
    console.error(error, { fingerprint: 'Storage getItem not working!' })
    return null
  }
}

export const setLocalStorage = (key: string, value: string) => {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.setItem(key, value)
  } catch (error) {
    console.error(error, { fingerprint: 'Storage setItem not working!' })
  }
}

export const removeLocalStorage = (key: string) => {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.removeItem(key)
  } catch (error) {
    console.error(error, { fingerprint: 'Storage removeItem not working!' })
  }
}
