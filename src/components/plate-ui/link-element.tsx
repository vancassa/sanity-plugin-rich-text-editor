'use client'

import {cn, withRef} from '@udecode/cn'
import {PlateElement} from '@udecode/plate/react'
import type {TLinkElement} from '@udecode/plate-link'
import {useLink} from '@udecode/plate-link/react'
import React from 'react'

export const LinkElement = withRef<typeof PlateElement>(({children, className, ...props}, ref) => {
  const element = props.element as TLinkElement
  const {props: linkProps} = useLink({element})

  return (
    <PlateElement
      ref={ref}
      as="a"
      className={cn(
        className,
        'font-medium text-primary underline decoration-primary underline-offset-4',
      )}
      {...(linkProps as any)}
      {...props}
    >
      {children}
    </PlateElement>
  )
})
