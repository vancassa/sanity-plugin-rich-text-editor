'use client'

import {useEditorReadOnly} from '@udecode/plate/react'
import {
  BoldPlugin,
  ItalicPlugin,
  StrikethroughPlugin,
  UnderlinePlugin,
} from '@udecode/plate-basic-marks/react'
import {FontColorPlugin} from '@udecode/plate-font/react'
import {ImagePlugin} from '@udecode/plate-media/react'
import {BaselineIcon, BoldIcon, ItalicIcon, StrikethroughIcon, UnderlineIcon} from 'lucide-react'
import React from 'react'

import {AlignDropdownMenu} from './align-dropdown-menu'
import {ColorDropdownMenu} from './color-dropdown-menu'
import {InsertDropdownMenu} from './insert-dropdown-menu'
import {LinkToolbarButton} from './link-toolbar-button'
import {MarkToolbarButton} from './mark-toolbar-button'
import {MediaToolbarButton} from './media-toolbar-button'
import {TableDropdownMenu} from './table-dropdown-menu'
import {ToolbarGroup} from './toolbar'
import {TurnIntoDropdownMenu} from './turn-into-dropdown-menu'

export function FixedToolbarButtons() {
  const readOnly = useEditorReadOnly()

  return (
    <div className="flex w-full">
      {!readOnly && (
        <>
          <ToolbarGroup>
            <InsertDropdownMenu />
            <TurnIntoDropdownMenu />
          </ToolbarGroup>

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

            <ColorDropdownMenu nodeType={FontColorPlugin.key} tooltip="Text color">
              <BaselineIcon />
            </ColorDropdownMenu>
          </ToolbarGroup>

          <ToolbarGroup>
            <AlignDropdownMenu />
          </ToolbarGroup>

          <ToolbarGroup>
            <LinkToolbarButton />
            <TableDropdownMenu />
          </ToolbarGroup>

          <ToolbarGroup>
            <MediaToolbarButton nodeType={ImagePlugin.key} />
          </ToolbarGroup>
        </>
      )}

      <div className="grow" />
    </div>
  )
}
