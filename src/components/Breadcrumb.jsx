import { useLocation, Link } from 'react-router'
import Container from './layout/Container'
import { MdHome } from 'react-icons/md'

const Breadcrumb = () => {
  const { pathname } = useLocation()
  const segments = pathname.split('/').filter(Boolean)

  const formatLabel = (segment) =>
    segment.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

  return (
    <div className="bg-primary-dark relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #FFC928 1px, transparent 0)', backgroundSize: '26px 26px' }}
      />
      <Container>
        <div className="relative z-10 py-8 sm:py-10">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center flex-wrap gap-2.5 text-sm text-white/70 font-pop">
              <li>
                <Link to="/" className="flex items-center gap-1.5 hover:text-accent transition-colors">
                  <MdHome className="text-lg" />
                  <span>Home</span>
                </Link>
              </li>
              {segments.map((segment, index) => {
                const isLast = index === segments.length - 1
                return (
                  <li key={index} className="flex items-center gap-2.5">
                    <span className="text-white/30">/</span>
                    {isLast ? (
                      <span className="text-accent font-medium">{formatLabel(segment)}</span>
                    ) : (
                      <Link to={`/${segments.slice(0, index + 1).join('/')}`} className="hover:text-accent transition-colors">
                        {formatLabel(segment)}
                      </Link>
                    )}
                  </li>
                )
              })}
            </ol>
          </nav>
        </div>
      </Container>
    </div>
  )
}

export default Breadcrumb
