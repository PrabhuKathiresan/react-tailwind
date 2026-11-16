import { useEffect, useRef } from 'react'
import { buildClassName } from '@pk-design/react-tailwind'
import { Link, useLocation } from 'react-router'
import { navSections } from './navigation'

export default function NavList() {
  const location = useLocation()
  const activeRef = useRef<HTMLAnchorElement | null>(null)

  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({
        block: 'nearest',
        inline: 'nearest',
        behavior: 'auto',
      })
    }
  }, [location.pathname])

  return (
    <div className="p-4 space-y-6">
      {navSections.map((section) => (
        <div key={section.title} className="space-y-2">
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 px-3">
            {section.title}
          </h3>
          <ul className="space-y-0.5">
            {section.items.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <li key={item.path}>
                  <Link
                    ref={isActive ? activeRef : null}
                    to={item.path}
                    className={buildClassName(
                      'block px-3 py-2 text-xs rounded-xl font-medium transition-all duration-150',
                      isActive
                        ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-semibold shadow-xs'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800/60',
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </div>
  )
}
