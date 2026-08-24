import React from 'react'
import type { BottomNavigationProps, BottomNavigationItem } from './BottomNavigation.types'
import { buildClassName } from '../../utils/build-classname'

export function BottomNavigation({
  items,
  activeId,
  onChange,
  fixed = true,
  showLabels = 'always',
  theme = 'light',
  activeIndicatorStyle = 'line',
  containerClass = '',
  itemClass = '',
}: BottomNavigationProps) {
  const handleTabClick = (item: BottomNavigationItem) => {
    if (item.disabled) return
    item.onClick?.()
    onChange(item.id)
  }

  const themeStyles = {
    light:
      'bg-white dark:bg-gray-900 border-t border-[var(--ui-border)] text-gray-600 dark:text-gray-400',
    dark: 'bg-gray-900 text-gray-400 border-t border-gray-800',
    primary: 'bg-blue-600 text-blue-100 border-t border-blue-700',
  }[theme]

  return (
    <nav
      aria-label="Bottom Navigation"
      className={buildClassName(
        'w-full flex items-center justify-around select-none shadow-lg transition-colors relative',
        fixed && 'fixed bottom-0 left-0 right-0 z-40',
        'pb-[env(safe-area-inset-bottom,6px)] px-2',
        themeStyles,
        containerClass,
      )}
      data-testid="bottom-navigation"
    >
      {items.map((item) => {
        const isActive = item.id === activeId
        const showLabelText = showLabels === 'always' || (showLabels === 'active' && isActive)

        const activeItemColor = {
          light: 'text-blue-600 dark:text-blue-400 font-bold',
          dark: 'text-white font-bold',
          primary: 'text-white font-bold',
        }[theme]

        const inactiveItemColor = {
          light:
            'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 font-medium',
          dark: 'text-gray-400 hover:text-gray-200 font-medium',
          primary: 'text-blue-200 hover:text-white font-medium',
        }[theme]

        const pillActiveStyles = {
          light:
            'bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 shadow-xs scale-105',
          dark: 'bg-gray-800 text-white ring-1 ring-gray-700 shadow-xs scale-105',
          primary: 'bg-white/25 text-white shadow-xs scale-105',
        }[theme]

        const badgeColor = {
          danger: 'bg-red-500 text-white',
          info: 'bg-blue-500 text-white',
          success: 'bg-emerald-500 text-white',
        }[item.badgeVariant || 'danger']

        return (
          <button
            key={item.id}
            type="button"
            disabled={item.disabled}
            onClick={() => handleTabClick(item)}
            className={buildClassName(
              'flex-1 flex flex-col items-center justify-center pt-2 pb-1.5 px-1 transition-all duration-200 relative cursor-pointer group',
              item.disabled && 'opacity-40 cursor-not-allowed pointer-events-none',
              isActive ? activeItemColor : inactiveItemColor,
              itemClass,
            )}
            data-testid={`bottom-nav-item-${item.id}`}
            aria-selected={isActive}
          >
            {/* Active Indicator Bar on Top Border */}
            {activeIndicatorStyle === 'line' && isActive && (
              <span
                className={buildClassName(
                  'absolute -top-[1px] h-0.75 w-9 rounded-full transition-all duration-200 z-10',
                  theme === 'primary' ? 'bg-white' : 'bg-blue-600 dark:bg-blue-400',
                )}
              />
            )}

            {/* Icon & Badge Container */}
            <div
              className={buildClassName(
                'relative inline-flex items-center justify-center transition-all duration-200',
                activeIndicatorStyle === 'pill'
                  ? buildClassName(
                      'px-4 py-1 rounded-full',
                      isActive
                        ? pillActiveStyles
                        : 'group-hover:bg-gray-100/50 dark:group-hover:bg-gray-800/40',
                    )
                  : 'px-1 py-0.5',
              )}
            >
              <span className="text-xl transition-transform duration-150 group-active:scale-95">
                {isActive && item.activeIcon ? item.activeIcon : item.icon}
              </span>

              {/* Notification Badge */}
              {item.badge !== undefined && item.badge !== null && (
                <span
                  className={buildClassName(
                    'absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full text-[10px] font-bold flex items-center justify-center shadow-xs z-10',
                    badgeColor,
                  )}
                  data-testid={`bottom-nav-badge-${item.id}`}
                >
                  {item.badge}
                </span>
              )}
            </div>

            {/* Label */}
            {showLabelText && (
              <span
                className={buildClassName(
                  'text-[11px] leading-tight mt-1 truncate max-w-full transition-colors duration-150',
                  isActive ? 'font-bold' : 'font-medium opacity-90',
                )}
              >
                {item.label}
              </span>
            )}

            {/* Active Dot Indicator */}
            {activeIndicatorStyle === 'dot' && isActive && (
              <span
                className={buildClassName(
                  'size-1.5 rounded-full mt-1 transition-all duration-200',
                  theme === 'primary' ? 'bg-white' : 'bg-blue-600 dark:bg-blue-400',
                )}
              />
            )}
          </button>
        )
      })}
    </nav>
  )
}

BottomNavigation.displayName = 'BottomNavigation'
