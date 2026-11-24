import { createSlice } from '@reduxjs/toolkit'

// Product prices in this project are stored in BDT (base currency).
const BDT_TO_USD = 1 / 119.5

export const currencies = {
  BDT: { code: 'BDT', symbol: '৳', rate: 1 },
  USD: { code: 'USD', symbol: '$', rate: BDT_TO_USD },
}

export const languages = {
  en: { code: 'en', label: 'Eng' },
  bn: { code: 'bn', label: 'বাং' },
}

const initialState = {
  currency: 'BDT',
  language: 'en',
}

const appSettingsSlice = createSlice({
  name: 'appSettings',
  initialState,
  reducers: {
    setCurrency: (state, action) => {
      if (currencies[action.payload]) {
        state.currency = action.payload
      }
    },
    setLanguage: (state, action) => {
      if (languages[action.payload]) {
        state.language = action.payload
      }
    },
  },
})

export const { setCurrency, setLanguage } = appSettingsSlice.actions

export const selectCurrency = (state) => state.appSettings?.currency || 'BDT'
export const selectLanguage = (state) => state.appSettings?.language || 'en'

export const selectCurrencyInfo = (state) => currencies[selectCurrency(state)] || currencies.BDT

/** Format an amount (stored in BDT) into the currently selected currency. */
export const formatCurrency = (amount, code = 'BDT') => {
  const info = currencies[code] || currencies.BDT
  const value = Number(amount || 0) * info.rate
  const decimals = info.code === 'BDT' ? 0 : 2
  const formatted = value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
  return `${info.symbol}${formatted}`
}

export const formatPrice = (amountInBDT, state) =>
  formatCurrency(amountInBDT, state?.appSettings?.currency || 'BDT')

export default appSettingsSlice.reducer
