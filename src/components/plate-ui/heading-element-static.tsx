import {cn} from '@udecode/cn'
import type {SlateElementProps} from '@udecode/plate'
import {SlateElement} from '@udecode/plate'
import {cva} from 'class-variance-authority'
import * as React from 'react'
import speakingurl from 'speakingurl'

interface HeadingElementViewProps extends SlateElementProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

const headingVariants = cva('relative mb-1', {
  variants: {
    variant: {
      h1: 'mt-8 mb-4 scroll-mt-24',
      h2: 'mt-6 mb-3 scroll-mt-24',
      h3: 'mt-5 mb-2 scroll-mt-24',
      h4: 'mt-4 mb-1 scroll-mt-24',
      h5: 'mt-3 mb-1 scroll-mt-24',
      h6: 'mt-2 mb-1 scroll-mt-24',
    },
  },
})

function extractText(nodeOrNodes: any): string {
  if (Array.isArray(nodeOrNodes)) {
    return nodeOrNodes.map(extractText).join('')
  }
  if (nodeOrNodes && typeof nodeOrNodes === 'object') {
    if (typeof nodeOrNodes.text === 'string') {
      return nodeOrNodes.text
    }
    if (nodeOrNodes.props.children) {
      return extractText(nodeOrNodes.props.children)
    }
  }
  return ''
}

export const HeadingElementStatic = ({
  children,
  className,
  variant = 'h1',
  ...props
}: HeadingElementViewProps) => {
  const textContent = extractText(children)
  const id = speakingurl(textContent)

  return (
    <SlateElement
      as={variant}
      className={cn(className, headingVariants({variant}))}
      id={id}
      {...props}
    >
      {children}
    </SlateElement>
  )
}
