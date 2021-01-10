import React, { createContext, useContext, FC, useState } from 'react'

type ContextData = {
  usdRate?: number
  brlRate?: number
  eurRate?: number
  cadRate?: number
}

type ContextFunctions = {
  setUsdRate: (usdRate: number) => void
  setBrlRate: (brlRate: number) => void
  setEurRate: (eurRate: number) => void
  setCadRate: (cadRate: number) => void
}

type ContextValue = ContextData & ContextFunctions

const Context = createContext<ContextValue>({} as any)

export const ContextProvider: FC<ContextData> = (props) => {
  const [data, setData] = useState<ContextData>(props)

  const setUsdRate = (usdRate: number) =>
    setData((prev) => ({ ...prev, usdRate }))
  const setBrlRate = (brlRate: number) =>
    setData((prev) => ({ ...prev, brlRate }))
  const setEurRate = (eurRate: number) =>
    setData((prev) => ({ ...prev, eurRate }))
  const setCadRate = (cadRate: number) =>
    setData((prev) => ({ ...prev, cadRate }))

  return (
    <Context.Provider
      value={{
        ...data,
        setUsdRate,
        setBrlRate,
        setEurRate,
        setCadRate,
      }}
      {...props}
    />
  )
}

export const useCryptoContext = (): ContextValue => {
  return useContext(Context)
}
