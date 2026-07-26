import React from 'react'
import { render, screen } from '@testing-library/react'
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

  it('lets a child override the group theme/variant/size', () => {
    render(
      <ButtonGroup theme="secondary">
        <Button theme="primary">One</Button>
      </ButtonGroup>,
    )
    const btn = screen.getByRole('button')
    expect(btn.className).toMatch(/bg-\[var\(--ui-primary\)\]/)
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

  it('does not touch rounding for a single child', () => {
    render(
      <ButtonGroup>
        <Button>Only</Button>
      </ButtonGroup>,
    )
    expect(screen.getByRole('button').className).not.toMatch(/rounded-none/)
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
