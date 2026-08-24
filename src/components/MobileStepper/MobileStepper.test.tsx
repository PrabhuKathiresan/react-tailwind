import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MobileStepper } from './MobileStepper'

describe('MobileStepper', () => {
  test('renders active step dot indicators', () => {
    render(<MobileStepper steps={4} activeStep={1} variant="dots" />)

    expect(screen.getByTestId('mobile-stepper')).toBeInTheDocument()
    expect(screen.getByTestId('mobile-stepper-dots')).toBeInTheDocument()
    expect(screen.getByTestId('mobile-stepper-dot-1')).toBeInTheDocument()
  })

  test('triggers onNext and onBack callbacks when clicked', () => {
    const onNextMock = jest.fn()
    const onBackMock = jest.fn()

    render(<MobileStepper steps={4} activeStep={1} onNext={onNextMock} onBack={onBackMock} />)

    fireEvent.click(screen.getByTestId('mobile-stepper-next-btn'))
    expect(onNextMock).toHaveBeenCalled()

    fireEvent.click(screen.getByTestId('mobile-stepper-back-btn'))
    expect(onBackMock).toHaveBeenCalled()
  })

  test('disables back button on first step', () => {
    render(<MobileStepper steps={4} activeStep={0} />)

    const backBtn = screen.getByTestId('mobile-stepper-back-btn')
    expect(backBtn).toBeDisabled()
  })

  test('renders progress bar variant correctly', () => {
    render(<MobileStepper steps={4} activeStep={2} variant="progress" />)

    expect(screen.getByTestId('mobile-stepper-progress')).toBeInTheDocument()
  })

  test('renders text variant correctly', () => {
    render(<MobileStepper steps={4} activeStep={2} variant="text" />)

    expect(screen.getByTestId('mobile-stepper-text')).toHaveTextContent('Step 3 of 4')
  })
})
