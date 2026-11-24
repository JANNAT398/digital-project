import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import Container from '../components/layout/Container'
import { selectCartItems, selectCartTotal, clearCart } from '../slices/cartSlice'
import { addOrder } from '../slices/orderSlice'
import { useFormatPrice } from '../hooks/useFormatPrice'
import { resolveProductImage } from '../utils/productImage'
import { site } from '../config/site'
import { toast } from 'react-toastify'

const PAYMENT_METHODS = [
  { value: 'cod', label: 'Cash on Delivery', note: 'Pay when your order arrives.' },
  { value: 'bkash', label: 'bKash', note: 'Send money to our merchant number.' },
  { value: 'nagad', label: 'Nagad', note: 'Send money to our merchant number.' },
  { value: 'card', label: 'Card / Bank', note: 'Visa, Mastercard & bank transfer.' },
]

const INITIAL_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  area: '',
  notes: '',
  payment: 'cod',
}

const Checkout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const formatPrice = useFormatPrice()
  const items = useSelector(selectCartItems)
  const total = useSelector(selectCartTotal)

  const shipping = total >= site.shipping.freeThreshold ? 0 : site.shipping.flatRate
  const grandTotal = total + shipping

  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})

  if (items.length === 0) {
    return (
      <Container className="py-20 text-center">
        <h1 className="font-pop text-2xl font-bold mb-4">Nothing to checkout</h1>
        <p className="font-pop text-gray-500 mb-8">Add products to your cart before checking out.</p>
        <Link to="/shop" className="inline-block bg-primary text-white px-8 py-3 rounded-full font-pop text-sm font-semibold hover:bg-primary-dark transition-colors">
          Go to Shop
        </Link>
      </Container>
    )
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const next = {}
    if (!form.firstName.trim()) next.firstName = 'First name is required'
    if (!form.lastName.trim()) next.lastName = 'Last name is required'
    if (!form.email.trim()) next.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email address'
    if (!form.phone.trim()) next.phone = 'Phone number is required'
    else if (!/^(\+?880|0)1[3-9]\d{8}$/.test(form.phone.replace(/\s|-/g, ''))) next.phone = 'Enter a valid Bangladeshi number'
    if (!form.address.trim()) next.address = 'Street address is required'
    if (!form.city.trim()) next.city = 'City is required'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) {
      toast.error('Please fix the highlighted fields')
      return
    }
    const order = {
      id: `ORD-${Date.now()}`,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'Processing',
      items: items.map((i) => ({ ...i })),
      subtotal: total,
      shipping,
      total: grandTotal,
      payment: form.payment,
      shipping: form,
    }
    dispatch(addOrder(order))
    dispatch(clearCart())
    toast.success('Order placed successfully!')
    navigate(`/dashboard/orders/${order.id}`)
  }

  const fieldClass = (name) => `${errors[name] ? 'fromInput !border-red-400' : 'fromInput'}`

  return (
    <Container className="py-8 sm:py-12">
      <h1 className="font-pop text-2xl font-bold mb-6 sm:mb-8">Checkout</h1>
      <form onSubmit={handleSubmit} noValidate className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-4">
          <h3 className="font-pop font-semibold text-lg">Shipping Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <input name="firstName" value={form.firstName} placeholder="First Name" onChange={handleChange} className={fieldClass('firstName')} />
              {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
            </div>
            <div>
              <input name="lastName" value={form.lastName} placeholder="Last Name" onChange={handleChange} className={fieldClass('lastName')} />
              {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>}
            </div>
          </div>
          <div>
            <input name="email" type="email" value={form.email} placeholder="Email" onChange={handleChange} className={fieldClass('email')} />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>
          <div>
            <input name="phone" value={form.phone} placeholder="Phone (e.g. 01712345678)" onChange={handleChange} className={fieldClass('phone')} />
            {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
          </div>
          <div>
            <input name="address" value={form.address} placeholder="Street Address" onChange={handleChange} className={fieldClass('address')} />
            {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <input name="city" value={form.city} placeholder="City" onChange={handleChange} className={fieldClass('city')} />
              {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
            </div>
            <input name="area" value={form.area} placeholder="Area / Thana (optional)" onChange={handleChange} className="fromInput" />
          </div>
          <textarea name="notes" value={form.notes} rows={3} placeholder="Order notes (optional)" onChange={handleChange} className="fromInput resize-none" />

          <h3 className="font-pop font-semibold text-lg pt-4">Payment Method</h3>
          <div className="space-y-3">
            {PAYMENT_METHODS.map((method) => (
              <label
                key={method.value}
                className={`flex items-start gap-3 border rounded-xl p-3.5 cursor-pointer transition-colors ${
                  form.payment === method.value ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value={method.value}
                  checked={form.payment === method.value}
                  onChange={handleChange}
                  className="mt-1 accent-primary"
                />
                <span className="font-pop">
                  <span className="block text-sm font-semibold text-gray-800">{method.label}</span>
                  <span className="block text-xs text-gray-500">{method.note}</span>
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-96 shrink-0">
          <div className="border border-gray-200 rounded-xl p-6 bg-gry lg:sticky lg:top-4">
            <h3 className="font-pop font-bold text-lg mb-4">Order Summary</h3>
            <div className="space-y-3 mb-4 max-h-64 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 font-pop text-sm">
                  <img src={resolveProductImage(item)} alt={item.name} className="w-11 h-11 object-contain bg-white rounded border border-gray-100" />
                  <div className="flex-1 min-w-0">
                    <p className="line-clamp-1 text-gray-700">{item.name}</p>
                    <p className="text-xs text-gray-400">Qty: {item.qty}</p>
                  </div>
                  <span className="shrink-0 font-medium">{formatPrice(item.price * item.qty)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-300 pt-3 space-y-2 font-pop text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between font-bold text-base border-t border-gray-300 pt-3">
                <span>Total</span>
                <span className="text-primary">{formatPrice(grandTotal)}</span>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-full font-pop text-sm font-semibold mt-6 hover:bg-primary-dark transition-colors"
            >
              Place Order
            </button>
            <p className="text-xs text-gray-400 text-center mt-3">Secure checkout · Your data is protected</p>
          </div>
        </div>
      </form>
    </Container>
  )
}

export default Checkout
