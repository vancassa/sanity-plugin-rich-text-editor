'use client'

import {withRef, withVariants} from '@udecode/cn'
import {PlateElement} from '@udecode/plate/react'
import {cva} from 'class-variance-authority'
import React from 'react'

const headingVariants = cva('relative mb-1', {
  variants: {
    variant: {
      h1: 'mt-8 mb-4 tracking-tight',
      h2: 'mt-6 mb-3 tracking-tight',
      h3: 'mt-5 mb-2 tracking-tight',
      h4: 'mt-4 mb-1 tracking-tight',
      h5: 'mt-3 mb-1 tracking-tight',
      h6: 'mt-2 mb-1 tracking-tight',
    },
  },
})

const HeadingElementVariants = withVariants(PlateElement, headingVariants, ['variant'])

export const HeadingElement = withRef<typeof HeadingElementVariants>(
  ({children, variant = 'h1', ...props}, ref) => {
    return (
      <HeadingElementVariants ref={ref} as={variant!} variant={variant} {...props}>
        {children}
      </HeadingElementVariants>
    )
  },
)
