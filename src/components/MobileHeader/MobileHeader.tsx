import React, { useState } from 'react'
import type { MobileHeaderProps, MobileHeaderAction } from './MobileHeader.types'
import { buildClassName } from '../../utils/build-classname'

function ChevronLeftIcon() {
  return (
    <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg className="size-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  )
}

function ClearIcon() {
  return (
    <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

export function MobileHeader({
  title,
  subtitle,
  titleAlign = 'center',
  onBack,
  backLabel = 'Back',
  leading,
  actions,
  searchable = false,
  searchValue: externalSearchValue,
  onSearchChange,
  searchPlaceholder = 'Search...',
  sticky = true,
  transparent = false,
  bottomSlot,
  className = '',
}: MobileHeaderProps) {
  const [isSearchActive, setIsSearchActive] = useState(false)
  const [internalSearchValue, setInternalSearchValue] = useState('')

  const searchValue = externalSearchValue !== undefined ? externalSearchValue : internalSearchValue

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setInternalSearchValue(val)
    onSearchChange?.(val)
  }

  const handleClearSearch = () => {
    setInternalSearchValue('')
    onSearchChange?.('')
  }

  return (
    <header
      className={buildClassName(
        'w-full transition-colors select-none z-30',
        sticky && 'sticky top-0',
        transparent
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-[var(--ui-border-muted)]'
          : 'bg-white dark:bg-gray-900 border-b border-[var(--ui-border)] shadow-xs',
        'pt-[env(safe-area-inset-top,0px)]',
        className,
      )}
      data-testid="mobile-header"
    >
      {/* Main Header Row */}
      <div className="h-14 px-3.5 flex items-center justify-between gap-3 relative">
        {/* Search Mode Header View */}
        {searchable && isSearchActive ? (
          <div
            className="flex-1 flex items-center gap-2"
            data-testid="mobile-header-search-container"
          >
            <div className="relative flex-1 flex items-center">
              <span className="absolute left-3 pointer-events-none">
                <SearchIcon />
              </span>
              <input
                type="text"
                value={searchValue}
                onChange={handleSearchInput}
                placeholder={searchPlaceholder}
                autoFocus
                className="w-full pl-9 pr-8 py-1.5 text-xs bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-full border border-transparent focus:border-blue-500 focus:outline-hidden transition-all"
                data-testid="mobile-header-search-input"
              />
              {searchValue && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  aria-label="Clear search"
                  className="absolute right-2.5 p-0.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
                >
                  <ClearIcon />
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={() => setIsSearchActive(false)}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 px-2 py-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/40 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        ) : (
          <>
            {/* Left Leading / Back Section */}
            <div className="flex items-center gap-1 min-w-[40px] shrink-0 z-10">
              {onBack ? (
                <button
                  type="button"
                  onClick={onBack}
                  aria-label={backLabel}
                  className="flex items-center gap-0.5 text-blue-600 dark:text-blue-400 hover:text-blue-700 p-1 -ml-1 rounded-xl transition-colors cursor-pointer"
                  data-testid="mobile-header-back-btn"
                >
                  <ChevronLeftIcon />
                  <span className="text-xs font-semibold hidden sm:inline">{backLabel}</span>
                </button>
              ) : (
                leading
              )}
            </div>

            {/* Title & Subtitle Section */}
            <div
              className={buildClassName(
                'flex-1 min-w-0 px-2',
                titleAlign === 'center'
                  ? 'absolute inset-x-12 text-center pointer-events-none flex flex-col items-center justify-center'
                  : 'text-left',
              )}
            >
              {title && (
                <div
                  className="text-sm font-bold text-gray-900 dark:text-white truncate pointer-events-auto"
                  data-testid="mobile-header-title"
                >
                  {title}
                </div>
              )}
              {subtitle && (
                <div
                  className="text-[11px] text-gray-500 dark:text-gray-400 truncate pointer-events-auto"
                  data-testid="mobile-header-subtitle"
                >
                  {subtitle}
                </div>
              )}
            </div>

            {/* Right Actions Section */}
            <div className="flex items-center gap-1 min-w-[40px] shrink-0 justify-end z-10">
              {searchable && (
                <button
                  type="button"
                  onClick={() => setIsSearchActive(true)}
                  aria-label="Search"
                  className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors cursor-pointer"
                  data-testid="mobile-header-search-toggle"
                >
                  <SearchIcon />
                </button>
              )}

              {actions?.map((action: MobileHeaderAction) => {
                const badgeColor = {
                  danger: 'bg-red-500 text-white',
                  info: 'bg-blue-500 text-white',
                  success: 'bg-emerald-500 text-white',
                }[action.badgeVariant || 'danger']

                return (
                  <button
                    key={action.id}
                    type="button"
                    disabled={action.disabled}
                    onClick={action.onClick}
                    aria-label={action.label}
                    className={buildClassName(
                      'p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors relative cursor-pointer',
                      action.disabled && 'opacity-40 cursor-not-allowed pointer-events-none',
                    )}
                    data-testid={`mobile-header-action-${action.id}`}
                  >
                    <span className="text-base">{action.icon}</span>
                    {action.badge !== undefined && action.badge !== null && (
                      <span
                        className={buildClassName(
                          'absolute top-1 right-1 min-w-[14px] h-3.5 px-0.5 rounded-full text-[9px] font-bold flex items-center justify-center shadow-xs',
                          badgeColor,
                        )}
                        data-testid={`mobile-header-badge-${action.id}`}
                      >
                        {action.badge}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </>
        )}
      </div>

      {/* Optional Bottom Sub-Header Slot (e.g. Category tabs or filter bar) */}
      {bottomSlot && (
        <div
          className="px-3 py-2 border-t border-[var(--ui-border-muted)]"
          data-testid="mobile-header-bottom-slot"
        >
          {bottomSlot}
        </div>
      )}
    </header>
  )
}

MobileHeader.displayName = 'MobileHeader'
