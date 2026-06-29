declare module 'react-window' {
  import * as React from 'react'

  export interface ListChildComponentProps<T = any> {
    index: number
    style: React.CSSProperties
    data: T
    isScrolling?: boolean
  }

  export interface OnScrollParams {
    scrollDirection: 'forward' | 'backward'
    scrollOffset: number
    scrollUpdateWasRequested: boolean
  }

  export interface FixedSizeListProps<T = any> {
    children: React.ComponentType<ListChildComponentProps<T>>
    height: number | string
    itemCount: number
    itemData?: T
    itemKey?: (index: number, data: T) => string | number
    itemSize: number
    layout?: 'horizontal' | 'vertical'
    onItemsRendered?: (args: {
      overscanStartIndex: number
      overscanStopIndex: number
      visibleStartIndex: number
      visibleStopIndex: number
    }) => void
    onScroll?: (params: OnScrollParams) => void
    outerElementType?: React.ElementType
    outerRef?: React.Ref<any>
    innerElementType?: React.ElementType
    innerRef?: React.Ref<any>
    overscanCount?: number
    style?: React.CSSProperties
    useIsScrolling?: boolean
    width: number | string
    className?: string
  }

  export interface FixedSizeListHandle {
    scrollTo(scrollOffset: number): void
    scrollToItem(index: number, align?: 'auto' | 'start' | 'center' | 'end'): void
  }

  export const FixedSizeList: React.ForwardRefExoticComponent<
    FixedSizeListProps & React.RefAttributes<FixedSizeListHandle>
  >
}
