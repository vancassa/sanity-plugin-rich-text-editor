'use client'

import {withRef} from '@udecode/cn'
import {useMarkToolbarButton, useMarkToolbarButtonState} from '@udecode/plate/react'
import React from 'react'

import {ToolbarButton} from './toolbar'

export const MarkToolbarButton = withRef<
  typeof ToolbarButton,
  {
    nodeType: string
    clear?: string[] | string
  }
>(({clear, nodeType, ...rest}, ref) => {
  const state = useMarkToolbarButtonState({clear, nodeType: nodeType})
  const {props} = useMarkToolbarButton(state)

  return <ToolbarButton ref={ref} {...props} {...rest} />
})
