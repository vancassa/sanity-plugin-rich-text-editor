'use client'

import {cn} from '@udecode/cn'
import {PlateElement, withRef} from '@udecode/plate/react'
import React from 'react'

export const ParagraphElement = withRef<typeof PlateElement>(
  ({children, className, ...props}, ref) => {
    return (
      <PlateElement ref={ref} className={cn(className, 'm-0 px-0 py-1')} {...props}>
        {children}
      </PlateElement>
    )
  },
)
