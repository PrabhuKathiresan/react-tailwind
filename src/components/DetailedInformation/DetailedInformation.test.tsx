import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
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

  it('renders action element in header', () => {
    render(
      <DetailedInformation
        title="User Info"
        action={<button data-testid="edit-btn">Edit</button>}
        details={details}
      />,
    )

    expect(screen.getByTestId('edit-btn')).toBeInTheDocument()
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

  it("shows default '- -' when value is undefined or empty", () => {
    const items = [{ label: 'Address' }]

    render(<DetailedInformation details={items} />)

    expect(screen.getByText('- -')).toBeInTheDocument()
  })

  it('supports custom emptyValue prop', () => {
    const items = [{ label: 'Address' }]

    render(<DetailedInformation details={items} emptyValue="N/A" />)

    expect(screen.getByText('N/A')).toBeInTheDocument()
  })

  it('supports item level emptyValue override', () => {
    const items = [{ label: 'Address', emptyValue: 'Not Specified' }]

    render(<DetailedInformation details={items} emptyValue="N/A" />)

    expect(screen.getByText('Not Specified')).toBeInTheDocument()
  })

  it('applies compact spacing when compact=true', () => {
    const items = [{ label: 'Name', value: 'John' }]

    render(<DetailedInformation details={items} compact />)

    const row = screen.getByText('Name').closest('div')!
    expect(row.className).toMatch(/py-1\.5/)
  })

  it('applies multi-column grid classes when columns > 1', () => {
    render(<DetailedInformation details={details} columns={2} />)

    const dl = document.querySelector('dl')!
    expect(dl.className).toMatch(/md:grid-cols-2/)
  })

  it('applies vertical layout classes when layout=vertical', () => {
    render(<DetailedInformation details={details} layout="vertical" />)

    const row = screen.getByText('Name').closest('div')!
    expect(row.className).toMatch(/flex flex-col/)
  })

  it('renders copy button when detail is copyable', () => {
    const items = [{ label: 'API Key', value: 'secret-key-123', copyable: true }]

    render(<DetailedInformation details={items} />)

    expect(screen.getByTitle('Copy to clipboard')).toBeInTheDocument()
  })

  it('copies text to clipboard when copy button is clicked', async () => {
    const writeTextMock = jest.fn().mockResolvedValue(undefined)
    Object.assign(navigator, {
      clipboard: { writeText: writeTextMock },
    })

    const items = [{ label: 'API Key', value: 'secret-key-123', copyable: true }]

    render(<DetailedInformation details={items} />)

    const copyBtn = screen.getByTitle('Copy to clipboard')
    await React.act(async () => {
      fireEvent.click(copyBtn)
    })

    expect(writeTextMock).toHaveBeenCalledWith('secret-key-123')
  })

  it('applies card variant styling', () => {
    render(<DetailedInformation details={details} variant="card" />)

    const outer =
      document.querySelector('dl')!.closest('div.p-2') ||
      document.querySelector('div.bg-gray-50\\/60')
    expect(outer).not.toBeNull()
  })

  it('applies titleClass correctly', () => {
    render(<DetailedInformation title="Info" titleClass="custom-title" details={details} />)

    expect(screen.getByTestId('title')).toHaveClass('custom-title')
  })

  it('applies detailsClass to details wrapper', () => {
    render(<DetailedInformation details={details} detailsClass="section-box" />)

    const detailsWrapper = document.querySelector('dl')!.parentElement!
    expect(detailsWrapper.className).toMatch(/section-box/)
  })

  it('applies divider classes when divider=true and columns=1', () => {
    render(<DetailedInformation details={details} divider />)

    const dl = document.querySelector('dl')!
    expect(dl.className).toMatch(/divide-y/)
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
})
