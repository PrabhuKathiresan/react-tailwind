import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { ButtonGroup } from './ButtonGroup'
import { Button } from '../Button'

describe('ButtonGroup Component', () => {
  it('renders all button children', () => {
    render(
      <ButtonGroup>
        <Button>One</Button>
        <Button>Two</Button>
      </ButtonGroup>,
    )
    expect(screen.getByText('One')).toBeInTheDocument()
    expect(screen.getByText('Two')).toBeInTheDocument()
  })

  it('exposes role="group" with an accessible label', () => {
    render(
      <ButtonGroup label="Actions">
        <Button>One</Button>
      </ButtonGroup>,
    )
    expect(screen.getByRole('group', { name: 'Actions' })).toBeInTheDocument()
  })

  it('applies fallback theme/variant/size to children that do not set their own', () => {
    render(
      <ButtonGroup theme="danger" variant="outlined" size="lg">
        <Button>One</Button>
      </ButtonGroup>,
    )
    const btn = screen.getByRole('button')
    expect(btn.className).toMatch(/border-\[var\(--ui-danger\)\]/)
    expect(btn.className).toMatch(/text-base/)
  })

  it('supports toggle selection mode via value and onChange', () => {
    const handleChange = jest.fn()

    render(
      <ButtonGroup value="week" onChange={handleChange}>
        <Button value="day">Day</Button>
        <Button value="week">Week</Button>
        <Button value="month">Month</Button>
      </ButtonGroup>,
    )

    const [dayBtn, weekBtn] = screen.getAllByRole('button')
    expect(weekBtn).toHaveAttribute('aria-pressed', 'true')
    expect(dayBtn).toHaveAttribute('aria-pressed', 'false')

    fireEvent.click(dayBtn)
    expect(handleChange).toHaveBeenCalledWith('day')
  })

  it('supports multi-select array value in toggle mode', () => {
    render(
      <ButtonGroup value={['bold', 'italic']}>
        <Button value="bold">B</Button>
        <Button value="italic">I</Button>
        <Button value="underline">U</Button>
      </ButtonGroup>,
    )

    const [boldBtn, italicBtn, underlineBtn] = screen.getAllByRole('button')
    expect(boldBtn).toHaveAttribute('aria-pressed', 'true')
    expect(italicBtn).toHaveAttribute('aria-pressed', 'true')
    expect(underlineBtn).toHaveAttribute('aria-pressed', 'false')
  })

  it('propagates disabled prop to all child buttons', () => {
    render(
      <ButtonGroup disabled>
        <Button>One</Button>
        <Button>Two</Button>
      </ButtonGroup>,
    )

    for (const btn of screen.getAllByRole('button')) {
      expect(btn).toBeDisabled()
    }
  })

  it('rounds only the outer corners for horizontal groups', () => {
    render(
      <ButtonGroup>
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>,
    )
    const [first, middle, last] = screen.getAllByRole('button')
    expect(first.className).toMatch(/rounded-l-md/)
    expect(first.className).toMatch(/rounded-r-none/)
    expect(middle.className).toMatch(/rounded-none/)
    expect(last.className).toMatch(/rounded-r-md/)
    expect(last.className).toMatch(/rounded-l-none/)
  })

  it('applies pill rounding to outer edges when rounded=true', () => {
    render(
      <ButtonGroup rounded>
        <Button>One</Button>
        <Button>Two</Button>
      </ButtonGroup>,
    )
    const [first, last] = screen.getAllByRole('button')
    expect(first.className).toMatch(/rounded-l-full/)
    expect(last.className).toMatch(/rounded-r-full/)
  })

  it('stacks vertically and uses vertical overlap margins when orientation="vertical"', () => {
    render(
      <ButtonGroup orientation="vertical">
        <Button>One</Button>
        <Button>Two</Button>
      </ButtonGroup>,
    )
    const group = screen.getByRole('group')
    expect(group.className).toMatch(/flex-col/)
    const [, second] = screen.getAllByRole('button')
    expect(second.className).toMatch(/-mt-px/)
  })

  it('applies flex-1 to children when fullWidth=true', () => {
    render(
      <ButtonGroup fullWidth>
        <Button>One</Button>
        <Button>Two</Button>
      </ButtonGroup>,
    )
    for (const btn of screen.getAllByRole('button')) {
      expect(btn.className).toMatch(/flex-1/)
    }
  })

  it('ignores non-element children', () => {
    render(
      <ButtonGroup>
        {null}
        <Button>One</Button>
        {false}
      </ButtonGroup>,
    )
    expect(screen.getAllByRole('button')).toHaveLength(1)
  })
})
