import { render, screen, fireEvent } from '@testing-library/react'
import { Alert } from './Alert'

describe('Alert Component', () => {
  it('renders message text', () => {
    render(<Alert message="Hello World" />)
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  it('renders children when message is not provided', () => {
    render(
      <Alert>
        <span>Child Text</span>
      </Alert>,
    )
    expect(screen.getByText('Child Text')).toBeInTheDocument()
  })

  it('renders default info icon when no type is provided', () => {
    render(<Alert message="Info message" />)
    expect(screen.getByTestId('alert-info-icon')).toBeInTheDocument()
  })

  it('renders correct icon based on type', () => {
    const types = [
      { type: 'success', icon: 'alert-success-icon' },
      { type: 'danger', icon: 'alert-danger-icon' },
      { type: 'warning', icon: 'alert-warning-icon' },
      { type: 'info', icon: 'alert-info-icon' },
    ]

    types.forEach(({ type, icon }) => {
      render(<Alert type={type as any} message={`${type}-msg`} />)
      expect(screen.getByTestId(icon)).toBeInTheDocument()
    })
  })

  it('applies custom className', () => {
    render(<Alert message="Test" className="custom-alert" />)
    const wrapper = screen.getByText('Test').closest('div')
    expect(wrapper).toHaveClass('custom-alert')
  })

  it('does not render remove button when removable=false', () => {
    render(<Alert message="Test" removable={false} />)
    expect(screen.queryByTestId('alert-remove-btn')).not.toBeInTheDocument()
  })

  it('renders remove button when removable=true', () => {
    render(<Alert message="Test" removable />)
    expect(screen.queryByTestId('alert-remove-btn')).toBeInTheDocument()
  })

  it('calls onRemove when remove button is clicked', () => {
    const onRemove = jest.fn()
    render(<Alert message="Test" removable onRemove={onRemove} />)
    fireEvent.click(screen.getByTestId('alert-remove-btn'))
    expect(onRemove).toHaveBeenCalledTimes(1)
  })
})
