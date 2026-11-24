import React from 'react'
import { Link } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import Container from '../components/layout/Container'
import { removeFromCart, updateQty, selectCartItems, selectCartTotal } from '../slices/cartSlice'
import { useFormatPrice } from '../hooks/useFormatPrice'
import { useTranslation } from '../hooks/useTranslation'
import { resolveProductImage } from '../utils/productImage'
import { site } from '../config/site'

const Cart = () => {
  const dispatch = useDispatch()
  const formatPrice = useFormatPrice()
  const { t } = useTranslation()
  const items = useSelector(selectCartItems)
  const total = useSelector(selectCartTotal)
  const shipping = total >= site.shipping.freeThreshold ? 0 : site.shipping.flatRate
  const grandTotal = total + shipping

  if (items.length === 0) {
    return (
      <Container className="py-20 text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gry flex items-center justify-center text-primary">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
        </div>
        <h1 className="font-pop text-2xl font-bold mb-3">{t('yourCart')} is {t('empty').toLowerCase()}</h1>
        <p className="font-pop text-gray-500 mb-8">Add products to your cart and they will appear here.</p>
        <Link to="/shop" className="inline-block bg-primary text-white px-8 py-3 rounded-full font-pop text-sm font-semibold hover:bg-primary-dark transition-colors">
          {t('shopNow')}
        </Link>
      </Container>
    )
  }

  return (
    <Container className="py-12">
      <h1 className="font-pop text-2xl font-bold mb-8">{t('shoppingCart')}</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="border border-gray-200 rounded-lg overflow-x-auto">
            <div className="min-w-[500px]">
              <div className="grid grid-cols-[2fr_1fr_1fr_1fr] bg-gry p-4 font-pop text-sm font-semibold">
                <span>{t('product')}</span>
                <span className="text-center">{t('price')}</span>
                <span className="text-center">Quantity</span>
                <span className="text-center">{t('subtotal')}</span>
              </div>
              {items.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[2fr_1fr_1fr_1fr] items-center p-4 border-t border-gray-200"
                >
                  <div className="flex items-center gap-4">
                    <img src={resolveProductImage(item)} alt={item.name} className="w-14 h-14 sm:w-16 sm:h-16 object-contain bg-gray-50 rounded" />
                    <div className="min-w-0">
                      <Link to={`/product/${item.id}`} className="font-pop font-medium text-sm sm:text-base hover:text-primary line-clamp-2">
                        {item.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="block text-red-500 text-xs font-pop mt-1 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <span className="text-center font-pop text-sm">{formatPrice(item.price)}</span>
                  <div className="flex justify-center">
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <button
                        type="button"
                        onClick={() => dispatch(updateQty({ id: item.id, qty: item.qty - 1 }))}
                        className="px-2.5 py-1 text-sm"
                      >
                        −
                      </button>
                      <span className="px-2.5 py-1 border-x border-gray-300 font-pop text-xs sm:text-sm">{item.qty}</span>
                      <button
                        type="button"
                        onClick={() => dispatch(updateQty({ id: item.id, qty: item.qty + 1 }))}
                        className="px-2.5 py-1 text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <span className="text-center font-pop font-semibold text-sm">
                    {formatPrice(item.price * item.qty)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-80 shrink-0">
          <div className="border border-gray-200 rounded-lg p-6 bg-gry">
            <h3 className="font-pop font-bold text-lg mb-4">{t('yourCart')} — {t('total')}</h3>
            <div className="space-y-3 font-pop text-sm">
              <div className="flex justify-between">
                <span>{t('subtotal')}</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between">
                <span>{t('shipping')}</span>
                <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between font-bold text-base border-t border-gray-300 pt-3">
                <span>{t('total')}</span>
                <span className="text-primary">{formatPrice(grandTotal)}</span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-gray-500 pt-1">
                  Add {formatPrice(site.shipping.freeThreshold - total)} more to get free shipping.
                </p>
              )}
            </div>
            <Link
              to="/checkout"
              className="block w-full text-center bg-primary text-white py-3 rounded-full font-pop text-sm font-semibold mt-6 hover:bg-primary-dark transition-colors"
            >
              {t('checkout')}
            </Link>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Cart
