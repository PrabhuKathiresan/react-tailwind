import type { SortIconKey, Sorting } from './DataTable.types'
import type { ReactNode } from 'react'
/* Icons */
import ArrowDownWideNarrow from '../Icons/ArrowDownWideNarrow.svg'
import ArrowDownNarrowWide from '../Icons/ArrowDownNarrowWide.svg'
import ArrowDownAZ from '../Icons/ArrowDownAZ.svg'
import ArrowDownZA from '../Icons/ArrowDownZA.svg'
import ArrowUpDown from '../Icons/ArrowUpDown.svg'

export const SortIconMap: Record<SortIconKey, ReactNode> = {
  '1': (
    <ArrowDownNarrowWide className="size-4 text-gray-400 shrink-0 group-hover:text-gray-800 dark:group-hover:text-white" />
  ),
  asc: (
    <ArrowDownAZ className="size-4 text-gray-400 shrink-0 group-hover:text-gray-800 dark:group-hover:text-white" />
  ),
  '-1': (
    <ArrowDownWideNarrow className="size-4 text-gray-400 shrink-0 group-hover:text-gray-800 dark:group-hover:text-white" />
  ),
  desc: (
    <ArrowDownZA className="size-4 text-gray-400 shrink-0 group-hover:text-gray-800 dark:group-hover:text-white" />
  ),
}

export const getSortIcon = (sort?: Sorting) =>
  sort ? (
    SortIconMap[sort as SortIconKey]
  ) : (
    <ArrowUpDown className="size-4 text-gray-400 shrink-0 group-hover:text-gray-800 dark:group-hover:text-white" />
  )
