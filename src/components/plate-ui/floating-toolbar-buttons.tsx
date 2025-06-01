'use client'

import {useEditorReadOnly} from '@udecode/plate/react'
import {
  BoldPlugin,
  ItalicPlugin,
  StrikethroughPlugin,
  UnderlinePlugin,
} from '@udecode/plate-basic-marks/react'
import {BoldIcon, ItalicIcon, StrikethroughIcon, UnderlineIcon} from 'lucide-react'
import React from 'react'

import {LinkToolbarButton} from './link-toolbar-button'
import {MarkToolbarButton} from './mark-toolbar-button'
import {ToolbarGroup} from './toolbar'

export function FloatingToolbarButtons() {
  const readOnly = useEditorReadOnly()

  return (
    <>
      {!readOnly && (
        <>
          <ToolbarGroup>
            <MarkToolbarButton nodeType={BoldPlugin.key} tooltip="Bold (⌘+B)">
              <BoldIcon />
            </MarkToolbarButton>

            <MarkToolbarButton nodeType={ItalicPlugin.key} tooltip="Italic (⌘+I)">
              <ItalicIcon />
            </MarkToolbarButton>

            <MarkToolbarButton nodeType={UnderlinePlugin.key} tooltip="Underline (⌘+U)">
              <UnderlineIcon />
            </MarkToolbarButton>

            <MarkToolbarButton nodeType={StrikethroughPlugin.key} tooltip="Strikethrough (⌘+⇧+M)">
              <StrikethroughIcon />
            </MarkToolbarButton>

            <LinkToolbarButton />
          </ToolbarGroup>
        </>
      )}
    </>
  )
}
