'use client'

import {cn} from '@udecode/cn'
import {usePluginOption} from '@udecode/plate/react'
import {DndPlugin} from '@udecode/plate-dnd'
import {useBlockSelected} from '@udecode/plate-selection/react'
import {cva, type VariantProps} from 'class-variance-authority'
import React from 'react'

export const blockSelectionVariants = cva(
  'pointer-events-none absolute inset-0 z-1 bg-brand/[.13] transition-opacity',
  {
    defaultVariants: {
      active: true,
    },
    variants: {
      active: {
        false: 'opacity-0',
        true: 'opacity-100',
      },
    },
  },
)

export function BlockSelection({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof blockSelectionVariants>) {
  const isBlockSelected = useBlockSelected()
  const isDragging = usePluginOption(DndPlugin, 'isDragging')

  if (!isBlockSelected) return null

  return (
    <div
      className={cn(
        blockSelectionVariants({
          active: isBlockSelected && !isDragging,
        }),
        className,
      )}
      data-slot="block-selection"
      {...props}
    />
  )
}
