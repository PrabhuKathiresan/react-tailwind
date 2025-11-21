import React from 'react'
import { render, screen } from '@testing-library/react'
import { DetailedInformation } from './DetailedInformation'

// Mock HeadingText to avoid importing unrelated styles/components
jest.mock('../HeadingText', () => ({
  HeadingText: {
    SubTitle2: ({ children, className }: any) => (
      <h2 data-testid="title" className={className}>
        {children}
      </h2>
    ),
  },
}))

describe('DetailedInformation Component', () => {
  const details = [
    { label: 'Name', value: 'John Doe' },
    { label: 'Email', value: 'john@example.com' },
  ]

  it('renders title and subtitle', () => {
    render(<DetailedInformation title="User Info" subTitle="Basic details" details={details} />)

    expect(screen.getByTestId('title')).toHaveTextContent('User Info')
    expect(screen.getByText('Basic details')).toBeInTheDocument()
  })

  it('renders all visible details', () => {
    render(<DetailedInformation details={details} />)

    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()

    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('john@example.com')).toBeInTheDocument()
  })

  it('hides items where hidden=true', () => {
    const items = [
      { label: 'Visible', value: 'Yes' },
      { label: 'Secret', value: 'Hidden', hidden: true },
    ]

    render(<DetailedInformation details={items} />)

    expect(screen.getByText('Visible')).toBeInTheDocument()
    expect(screen.queryByText('Secret')).toBeNull()
  })

  it("shows '- -' when value is undefined or empty", () => {
    const items = [{ label: 'Address' }]

    render(<DetailedInformation details={items} />)

    expect(screen.getByText('- -')).toBeInTheDocument()
  })

  it('applies compact spacing when compact=true', () => {
    const items = [{ label: 'Name', value: 'John' }]

    render(<DetailedInformation details={items} compact />)

    const row = screen.getByText('Name').closest('div')!
    expect(row.className).toMatch(/py-1\.5/)
  })

  it('applies normal spacing when compact=false', () => {
    const items = [{ label: 'Name', value: 'John' }]

    render(<DetailedInformation details={items} compact={false} />)

    const row = screen.getByText('Name').closest('div')!
    expect(row.className).toMatch(/py-2\.5/)
  })

  it('applies titleClass correctly', () => {
    render(<DetailedInformation title="Info" titleClass="custom-title" details={details} />)

    expect(screen.getByTestId('title')).toHaveClass('custom-title')
  })

  it('applies detailsClass to details wrapper', () => {
    render(<DetailedInformation details={details} detailsClass="section-box" />)

    // Details wrapper = parent of <dl>
    const detailsWrapper = document.querySelector('dl')!.parentElement!

    expect(detailsWrapper.className).toMatch(/section-box/)
  })

  it('applies divider classes when divider=true', () => {
    render(<DetailedInformation details={details} divider />)

    const dl = document.querySelector('dl')!
    expect(dl.className).toMatch(/divide-y/)
  })

  it('removes divider classes when divider=false', () => {
    render(<DetailedInformation details={details} divider={false} />)

    const dl = document.querySelector('dl')!
    expect(dl.className).not.toMatch(/divide-y/)
  })

  it('removes divider classes when divider=false', () => {
    render(<DetailedInformation details={details} divider={false} />)

    const dl = document.querySelector('dl')!
    expect(dl.className).not.toMatch(/divide-y/)
  })

  it('does not render empty details container when all details are hidden', () => {
    const items = [{ label: 'A', value: 'B', hidden: true }]

    render(<DetailedInformation details={items} />)

    expect(document.querySelector('dl')).toBeNull()
  })

  it('renders wrapper className', () => {
    render(<DetailedInformation details={details} className="wrapper-x" />)

    const outer = document.querySelector('div.wrapper-x')

    expect(outer).not.toBeNull()
    expect(outer!.className).toMatch(/wrapper-x/)
  })
})
