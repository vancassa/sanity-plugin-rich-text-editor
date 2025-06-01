'use client'

import type {DropdownMenuProps} from '@radix-ui/react-dropdown-menu'
import {ParagraphPlugin, useEditorRef, useSelectionFragmentProp} from '@udecode/plate/react'
import {BlockquotePlugin} from '@udecode/plate-block-quote/react'
import {HEADING_KEYS} from '@udecode/plate-heading'
import {ListStyleType} from '@udecode/plate-indent-list'
import {
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  Heading5Icon,
  Heading6Icon,
  ListIcon,
  ListOrderedIcon,
  PilcrowIcon,
  QuoteIcon,
} from 'lucide-react'
import React from 'react'

import {getBlockType, setBlockType, STRUCTURAL_TYPES} from '../../components/editor/transforms'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  useOpenState,
} from './dropdown-menu'
import {ToolbarButton} from './toolbar'

const turnIntoItems = [
  {
    icon: <PilcrowIcon />,
    keywords: ['paragraph'],
    label: 'Text',
    value: ParagraphPlugin.key,
  },
  {
    icon: <Heading1Icon />,
    keywords: ['title', 'h1'],
    label: 'Heading 1',
    value: HEADING_KEYS.h1,
  },
  {
    icon: <Heading2Icon />,
    keywords: ['subtitle', 'h2'],
    label: 'Heading 2',
    value: HEADING_KEYS.h2,
  },
  {
    icon: <Heading3Icon />,
    keywords: ['subtitle', 'h3'],
    label: 'Heading 3',
    value: HEADING_KEYS.h3,
  },
  {
    icon: <Heading4Icon />,
    keywords: ['subtitle', 'h4'],
    label: 'Heading 4',
    value: HEADING_KEYS.h4,
  },
  {
    icon: <Heading5Icon />,
    keywords: ['subtitle', 'h5'],
    label: 'Heading 5',
    value: HEADING_KEYS.h5,
  },
  {
    icon: <Heading6Icon />,
    keywords: ['subtitle', 'h6'],
    label: 'Heading 6',
    value: HEADING_KEYS.h6,
  },
  {
    icon: <ListIcon />,
    keywords: ['unordered', 'ul', '-'],
    label: 'Bulleted list',
    value: ListStyleType.Disc,
  },
  {
    icon: <ListOrderedIcon />,
    keywords: ['ordered', 'ol', '1'],
    label: 'Numbered list',
    value: ListStyleType.Decimal,
  },
  {
    icon: <QuoteIcon />,
    keywords: ['citation', 'blockquote', '>'],
    label: 'Quote',
    value: BlockquotePlugin.key,
  },
]

export function TurnIntoDropdownMenu(props: DropdownMenuProps) {
  const editor = useEditorRef()
  const openState = useOpenState()

  const value = useSelectionFragmentProp({
    defaultValue: ParagraphPlugin.key,
    structuralTypes: STRUCTURAL_TYPES,
    getProp: (node) => getBlockType(node as any),
  })
  const selectedItem = React.useMemo(
    () =>
      turnIntoItems.find((item) => item.value === (value ?? ParagraphPlugin.key)) ??
      turnIntoItems[0],
    [value],
  )

  return (
    <DropdownMenu modal={false} {...openState} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton
          className="min-w-[125px]"
          pressed={openState.open}
          tooltip="Turn into"
          isDropdown
        >
          {selectedItem.label}
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="ignore-click-outside/toolbar min-w-0"
        onCloseAutoFocus={(e) => {
          e.preventDefault()
          editor.tf.focus()
        }}
        align="start"
      >
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={(type) => {
            setBlockType(editor, type)
          }}
          label="Turn into"
        >
          {turnIntoItems.map(({icon, label, value: itemValue}) => (
            <DropdownMenuRadioItem key={itemValue} className="min-w-[180px]" value={itemValue}>
              {icon}
              {label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
