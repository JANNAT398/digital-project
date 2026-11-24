import React, { useMemo } from 'react'
import { Link } from 'react-router'
import Container from '../layout/Container'
import useCountdown from '../../hooks/useCountdown'
import { FaBolt, FaArrowRight } from 'react-icons/fa'

const img = (prompt, size = 'square') =>
  `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodeURIComponent(prompt)}&image_size=${size}`

const PromoBanner = () => {
  const target = useMemo(() => {
    const d = new Date()
    d.setDate(d.getDate() + 7)
    d.setHours(23, 59, 0, 0)
    return d.toISOString()
  }, [])

  const { days, hours, minutes, seconds } = useCountdown(target)
  const units = [
    { label: 'Days', value: days },
    { label: 'Hours', value: hours },
    { label: 'Minutes', value: minutes },
    { label: 'Seconds', value: seconds },
  ]

  return (
    <Container className="py-10 sm:py-14">
      <div className="relative overflow-hidden rounded-2xl bg-primary text-white">
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #FFC928 1px, transparent 0)', backgroundSize: '26px 26px' }}
        />
        <div className="absolute -right-16 -top-16 w-72 h-72 rounded-full bg-accent/10 blur-3xl" />

        <div className="relative z-10 grid md:grid-cols-2 items-center gap-8 p-6 sm:p-10 lg:p-12">
          <div className="order-2 md:order-1">
            <span className="inline-flex items-center gap-2 bg-accent text-primary rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider">
              <FaBolt /> Deal of the week
            </span>
            <h2 className="font-pop font-extrabold text-2xl sm:text-3xl lg:text-4xl mt-5 text-white leading-tight">
              Up to <span className="text-accent">45% off</span> on top-rated gear
            </h2>
            <p className="font-pop text-white/70 text-sm sm:text-base mt-3 max-w-md">
              Grab genuine headphones, smart watches and chargers at unbeatable prices — offer ends soon.
            </p>

            {/* Countdown */}
            <div className="flex gap-2.5 sm:gap-3 mt-6">
              {units.map((u) => (
                <div key={u.label} className="bg-white/10 backdrop-blur rounded-xl px-3 sm:px-4 py-2.5 text-center min-w-[62px]">
                  <div className="font-pop font-bold text-xl sm:text-2xl text-accent leading-none">
                    {String(u.value ?? 0).padStart(2, '0')}
                  </div>
                  <div className="font-pop text-[10px] sm:text-xs text-white/60 mt-1 uppercase tracking-wide">{u.label}</div>
                </div>
              ))}
            </div>

            <Link
              to="/shop?sale=true"
              className="btn-accent px-7 py-3 text-sm mt-7 shadow-lg shadow-accent/20"
            >
              Shop the deals <FaArrowRight className="text-xs" />
            </Link>
          </div>

          <div className="order-1 md:order-2 flex justify-center">
            <img
              src={img('premium wireless headphones and smartwatch on navy background, dramatic studio lighting, sale promo', 'square')}
              alt="Deal of the week products"
              className="w-64 sm:w-80 lg:w-96 object-contain animate-[float_5s_ease-in-out_infinite]"
            />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default PromoBanner
