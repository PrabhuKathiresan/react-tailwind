import { SortQuery } from './DataTable.types'
import { nextSortDirection, updateSortQuery } from './DataTable.utils'

describe('nextSortDirection()', () => {
  describe('string type', () => {
    it('cycles: undefined → asc → desc → undefined', () => {
      expect(nextSortDirection(undefined, 'string')).toBe('asc')
      expect(nextSortDirection('asc', 'string')).toBe('desc')
      expect(nextSortDirection('desc', 'string')).toBeUndefined()
    })
  })

  describe('number/date type', () => {
    it('cycles: undefined → 1 → -1 → undefined', () => {
      expect(nextSortDirection(undefined, 'number')).toBe('1')
      expect(nextSortDirection('1', 'number')).toBe('-1')
      expect(nextSortDirection('-1', 'number')).toBeUndefined()
    })

    it('works identically for date type', () => {
      expect(nextSortDirection(undefined, 'date')).toBe('1')
      expect(nextSortDirection('1', 'date')).toBe('-1')
      expect(nextSortDirection('-1', 'date')).toBeUndefined()
    })
  })
})

describe('updateSortQuery()', () => {
  it('adds a new sort field when none existed', () => {
    const result = updateSortQuery({}, 'id', 'number')
    expect(result).toEqual({ id: '1' })
  })

  it('updates existing sort field', () => {
    const result = updateSortQuery({ id: '1' }, 'id', 'number')
    expect(result).toEqual({ id: '-1' })
  })

  it('removes key when toggled back to undefined', () => {
    const result = updateSortQuery({ id: '-1' }, 'id', 'number')
    expect(result).toEqual({})
  })

  it('string type cycles correctly', () => {
    expect(updateSortQuery({}, 'name', 'string')).toEqual({ name: 'asc' })
    expect(updateSortQuery({ name: 'asc' }, 'name', 'string')).toEqual({
      name: 'desc',
    })
    expect(updateSortQuery({ name: 'desc' }, 'name', 'string')).toEqual({})
  })

  it('does not mutate the original object', () => {
    const original: SortQuery = { id: '1' }
    const updated = updateSortQuery(original, 'id', 'number')

    expect(updated).not.toBe(original) // new object reference
    expect(original).toEqual({ id: '1' }) // original stays unchanged
  })

  it('works with multiple independent fields', () => {
    const initial: SortQuery = { name: 'asc' }
    const updated = updateSortQuery(initial, 'age', 'number')

    expect(updated).toEqual({
      name: 'asc',
      age: '1',
    })
  })
})
