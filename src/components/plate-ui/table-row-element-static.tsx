import {cn} from '@udecode/cn'
import type {SlateElementProps} from '@udecode/plate'
import {SlateElement} from '@udecode/plate'
import React from 'react'

export function TableRowElementStatic({children, className, ...props}: SlateElementProps) {
  return (
    <SlateElement as="tr" className={cn(className, 'h-full')} {...props}>
      {children}
    </SlateElement>
  )
}
