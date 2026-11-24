import { useSelector } from 'react-redux'
import { selectCurrency, formatCurrency } from '../slices/appSettingsSlice'

/** Returns a `formatPrice(amountInBDT)` function bound to the selected currency. */
export function useFormatPrice() {
  const currency = useSelector(selectCurrency)
  return (amount) => formatCurrency(amount, currency)
}

/** Same as above but also exposes the raw numeric value, symbol and code. */
export function useFormatPriceWithSymbol() {
  const currency = useSelector(selectCurrency)
  return (amount) => {
    const formatted = formatCurrency(amount, currency)
    return {
      formatted,
      code: currency,
      symbol: formatted.replace(/[\d.,]/g, ''),
      value: Number(amount) * (currency === 'USD' ? 1 / 119.5 : 1),
    }
  }
}
