import React from 'react'
import type { MobileStepperProps } from './MobileStepper.types'
import { buildClassName } from '../../utils/build-classname'
import { Button } from '../Button'

function ChevronLeftIcon() {
  return (
    <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
    </svg>
  )
}

export function MobileStepper({
  steps,
  activeStep,
  variant = 'dots',
  onBack,
  onNext,
  backLabel = 'Back',
  nextLabel = 'Next',
  stepTitle,
  nextDisabled = false,
  backDisabled = false,
  nextLoading = false,
  className = '',
}: MobileStepperProps) {
  const isFirstStep = activeStep <= 0
  const isLastStep = activeStep >= steps - 1

  const progressPercent = Math.min(Math.max(((activeStep + 1) / steps) * 100, 0), 100)

  return (
    <div
      className={buildClassName(
        'w-full flex flex-col gap-2 p-3 bg-white dark:bg-gray-900 border border-[var(--ui-border)] rounded-2xl shadow-xs select-none',
        className,
      )}
      data-testid="mobile-stepper"
    >
      {/* Optional Step Title Header */}
      {stepTitle && (
        <div className="flex items-center justify-between px-1">
          <span
            className="text-xs font-bold text-gray-900 dark:text-white truncate"
            data-testid="mobile-stepper-title"
          >
            {stepTitle}
          </span>
          <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400 shrink-0 ml-2">
            {activeStep + 1} / {steps}
          </span>
        </div>
      )}

      {/* Main Navigation Controls & Progress Indicator Row */}
      <div className="flex items-center justify-between gap-3">
        {/* Back Button */}
        <Button
          size="xs"
          variant="plain"
          theme="secondary"
          disabled={disabledBack(isFirstStep, backDisabled)}
          onClick={onBack}
          aria-label="Previous step"
          leftIcon={<ChevronLeftIcon />}
          data-testid="mobile-stepper-back-btn"
        >
          {backLabel}
        </Button>

        {/* Center Progress Indicator */}
        <div
          className="flex items-center justify-center flex-1"
          data-testid="mobile-stepper-indicator"
        >
          {variant === 'dots' && (
            <div className="flex items-center gap-1.5" data-testid="mobile-stepper-dots">
              {Array.from({ length: steps }).map((_, index) => {
                const isActive = index === activeStep
                const isCompleted = index < activeStep

                return (
                  <span
                    key={index}
                    className={buildClassName(
                      'h-2 transition-all duration-300 rounded-full',
                      isActive
                        ? 'w-5 bg-blue-600 dark:bg-blue-400'
                        : isCompleted
                          ? 'w-2 bg-blue-300 dark:bg-blue-800'
                          : 'w-2 bg-gray-200 dark:bg-gray-700',
                    )}
                    data-testid={`mobile-stepper-dot-${index}`}
                  />
                )
              })}
            </div>
          )}

          {variant === 'progress' && (
            <div
              className="w-full max-w-[140px] bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden"
              data-testid="mobile-stepper-progress"
            >
              <div
                className="bg-blue-600 dark:bg-blue-400 h-full transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          )}

          {variant === 'text' && (
            <div
              className="text-xs font-semibold text-gray-600 dark:text-gray-300"
              data-testid="mobile-stepper-text"
            >
              Step {activeStep + 1} of {steps}
            </div>
          )}
        </div>

        {/* Next / Finish Button */}
        <Button
          size="xs"
          variant="default"
          theme="primary"
          disabled={nextDisabled}
          loading={nextLoading}
          onClick={onNext}
          aria-label="Next step"
          rightIcon={!isLastStep ? <ChevronRightIcon /> : undefined}
          data-testid="mobile-stepper-next-btn"
        >
          {nextLabel}
        </Button>
      </div>
    </div>
  )
}

function disabledBack(isFirstStep: boolean, backDisabled: boolean): boolean {
  return isFirstStep || backDisabled
}

MobileStepper.displayName = 'MobileStepper'
