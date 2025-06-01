'use client'

import type {DropdownMenuProps} from '@radix-ui/react-dropdown-menu'
import {ParagraphPlugin, type PlateEditor, useEditorRef} from '@udecode/plate/react'
import {BlockquotePlugin} from '@udecode/plate-block-quote/react'
import {HEADING_KEYS} from '@udecode/plate-heading'
import {HorizontalRulePlugin} from '@udecode/plate-horizontal-rule/react'
import {ListStyleType} from '@udecode/plate-indent-list'
import {LinkPlugin} from '@udecode/plate-link/react'
import {ImagePlugin} from '@udecode/plate-media/react'
import {TablePlugin} from '@udecode/plate-table/react'
import {
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  Heading5Icon,
  Heading6Icon,
  ImageIcon,
  Link2Icon,
  ListIcon,
  ListOrderedIcon,
  MinusIcon,
  PilcrowIcon,
  PlusIcon,
  QuoteIcon,
  TableIcon,
} from 'lucide-react'
import React from 'react'

import {insertBlock, insertInlineElement} from '../../components/editor/transforms'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  useOpenState,
} from './dropdown-menu'
import {ToolbarButton} from './toolbar'

type Group = {
  group: string
  items: Item[]
}

interface Item {
  icon: React.ReactNode
  value: string
  onSelect: (editor: PlateEditor, value: string) => void
  focusEditor?: boolean
  label?: string
}

const groups: Group[] = [
  {
    group: 'Basic blocks',
    items: [
      {
        icon: <PilcrowIcon />,
        label: 'Paragraph',
        value: ParagraphPlugin.key,
      },
      {
        icon: <Heading1Icon />,
        label: 'Heading 1',
        value: HEADING_KEYS.h1,
      },
      {
        icon: <Heading2Icon />,
        label: 'Heading 2',
        value: HEADING_KEYS.h2,
      },
      {
        icon: <Heading3Icon />,
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
        icon: <TableIcon />,
        label: 'Table',
        value: TablePlugin.key,
      },
      {
        icon: <QuoteIcon />,
        label: 'Quote',
        value: BlockquotePlugin.key,
      },
      {
        icon: <MinusIcon />,
        label: 'Divider',
        value: HorizontalRulePlugin.key,
      },
    ].map((item) => ({
      ...item,
      onSelect: (editor, value) => {
        insertBlock(editor, value)
      },
    })),
  },
  {
    group: 'Lists',
    items: [
      {
        icon: <ListIcon />,
        label: 'Bulleted list',
        value: ListStyleType.Disc,
      },
      {
        icon: <ListOrderedIcon />,
        label: 'Numbered list',
        value: ListStyleType.Decimal,
      },
    ].map((item) => ({
      ...item,
      onSelect: (editor, value) => {
        insertBlock(editor, value)
      },
    })),
  },
  {
    group: 'Media',
    items: [
      {
        icon: <ImageIcon />,
        label: 'Image',
        value: ImagePlugin.key,
      },
    ].map((item) => ({
      ...item,
      onSelect: (editor, value) => {
        insertBlock(editor, value)
      },
    })),
  },

  {
    group: 'Inline',
    items: [
      {
        icon: <Link2Icon />,
        label: 'Link',
        value: LinkPlugin.key,
      },
    ].map((item) => ({
      ...item,
      onSelect: (editor, value) => {
        insertInlineElement(editor, value)
      },
    })),
  },
]

export function InsertDropdownMenu(props: DropdownMenuProps) {
  const editor = useEditorRef()
  const openState = useOpenState()

  return (
    <DropdownMenu modal {...openState} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton pressed={openState.open} tooltip="Insert" isDropdown>
          <PlusIcon />
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="flex max-h-[500px] min-w-0 flex-col overflow-y-auto"
        align="start"
      >
        {groups.map(({group, items: nestedItems}) => (
          <DropdownMenuGroup key={group} label={group}>
            {nestedItems.map(({icon, label, value, onSelect}) => (
              <DropdownMenuItem
                key={value}
                className="min-w-[180px]"
                onSelect={() => {
                  onSelect(editor, value)
                  editor.tf.focus()
                }}
              >
                {icon}
                {label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
