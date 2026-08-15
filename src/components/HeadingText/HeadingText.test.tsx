import React, { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import { HeadingText } from './HeadingText'

describe('HeadingText Component', () => {
  it('renders level=1 as <h1> by default', () => {
    render(<HeadingText>Main Heading</HeadingText>)
    const el = screen.getByText('Main Heading')
    expect(el.tagName.toLowerCase()).toBe('h1')
    expect(el).toHaveClass('text-3xl', 'font-bold')
  })

  it('renders level=2 as <h2>', () => {
    render(<HeadingText level={2}>Subtitle</HeadingText>)
    const el = screen.getByText('Subtitle')
    expect(el.tagName.toLowerCase()).toBe('h2')
    expect(el).toHaveClass('text-2xl', 'font-semibold')
  })

  it('renders level=3, level=4, level=5, level=6 correctly', () => {
    const { rerender } = render(<HeadingText level={3}>H3 Text</HeadingText>)
    expect(screen.getByText('H3 Text').tagName.toLowerCase()).toBe('h3')

    rerender(<HeadingText level={4}>H4 Text</HeadingText>)
    expect(screen.getByText('H4 Text').tagName.toLowerCase()).toBe('h4')

    rerender(<HeadingText level={5}>H5 Text</HeadingText>)
    expect(screen.getByText('H5 Text').tagName.toLowerCase()).toBe('h5')

    rerender(<HeadingText level={6}>H6 Text</HeadingText>)
    expect(screen.getByText('H6 Text').tagName.toLowerCase()).toBe('h6')
  })

  it('applies custom size and weight overrides', () => {
    render(
      <HeadingText size="5xl" weight="extrabold">
        Giant Heading
      </HeadingText>,
    )
    const el = screen.getByText('Giant Heading')
    expect(el).toHaveClass('text-5xl', 'font-extrabold')
  })

  it('applies color intent props (error, success, warning, info)', () => {
    const { rerender } = render(<HeadingText error>Error Heading</HeadingText>)
    expect(screen.getByText('Error Heading')).toHaveClass('text-[var(--ui-text-danger)]')

    rerender(<HeadingText success>Success Heading</HeadingText>)
    expect(screen.getByText('Success Heading')).toHaveClass('text-[var(--ui-success)]')

    rerender(<HeadingText warning>Warning Heading</HeadingText>)
    expect(screen.getByText('Warning Heading')).toHaveClass('text-[var(--ui-warning)]')

    rerender(<HeadingText info>Info Heading</HeadingText>)
    expect(screen.getByText('Info Heading')).toHaveClass('text-[var(--ui-info)]')
  })

  it('renders static sub-components correctly', () => {
    render(
      <div>
        <HeadingText.Title>Title SubComponent</HeadingText.Title>
        <HeadingText.SubTitle>SubTitle SubComponent</HeadingText.SubTitle>
      </div>,
    )
    expect(screen.getByText('Title SubComponent').tagName.toLowerCase()).toBe('h1')
    expect(screen.getByText('SubTitle SubComponent').tagName.toLowerCase()).toBe('h2')
  })

  it('forwards ref correctly', () => {
    const ref = createRef<HTMLHeadingElement>()
    render(<HeadingText ref={ref}>Ref Heading</HeadingText>)
    expect(ref.current).not.toBeNull()
    expect(ref.current?.tagName.toLowerCase()).toBe('h1')
  })
})
