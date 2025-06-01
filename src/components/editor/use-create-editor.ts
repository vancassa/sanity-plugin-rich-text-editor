'use client'

import {withProps} from '@udecode/cn'
import {
  type CreatePlateEditorOptions,
  ParagraphPlugin,
  PlateLeaf,
  usePlateEditor,
} from '@udecode/plate/react'
import {
  BoldPlugin,
  ItalicPlugin,
  StrikethroughPlugin,
  SubscriptPlugin,
  SuperscriptPlugin,
  UnderlinePlugin,
} from '@udecode/plate-basic-marks/react'
import {BlockquotePlugin} from '@udecode/plate-block-quote/react'
import {HEADING_KEYS} from '@udecode/plate-heading'
import {HorizontalRulePlugin} from '@udecode/plate-horizontal-rule/react'
import {KbdPlugin} from '@udecode/plate-kbd/react'
import {LinkPlugin} from '@udecode/plate-link/react'
import {ImagePlugin} from '@udecode/plate-media/react'
import {
  TableCellHeaderPlugin,
  TableCellPlugin,
  TablePlugin,
  TableRowPlugin,
} from '@udecode/plate-table/react'

import {editorPlugins} from '../../components/editor/plugins/editor-plugins'
import {FixedToolbarPlugin} from '../../components/editor/plugins/fixed-toolbar-plugin'
import {FloatingToolbarPlugin} from '../../components/editor/plugins/floating-toolbar-plugin'
import {BlockquoteElement} from '../../components/plate-ui/blockquote-element'
import {HeadingElement} from '../../components/plate-ui/heading-element'
import {HrElement} from '../../components/plate-ui/hr-element'
import {ImageElement} from '../../components/plate-ui/image-element'
import {KbdLeaf} from '../../components/plate-ui/kbd-leaf'
import {LinkElement} from '../../components/plate-ui/link-element'
import {ParagraphElement} from '../../components/plate-ui/paragraph-element'
import {withPlaceholders} from '../../components/plate-ui/placeholder'
import {
  TableCellElement,
  TableCellHeaderElement,
} from '../../components/plate-ui/table-cell-element'
import {TableElement} from '../../components/plate-ui/table-element'
import {TableRowElement} from '../../components/plate-ui/table-row-element'

export const viewComponents = {
  [BlockquotePlugin.key]: BlockquoteElement,
  [BoldPlugin.key]: withProps(PlateLeaf, {as: 'strong'}),
  [HorizontalRulePlugin.key]: HrElement,
  [ImagePlugin.key]: ImageElement,
  [ItalicPlugin.key]: withProps(PlateLeaf, {as: 'em'}),
  [KbdPlugin.key]: KbdLeaf,
  [LinkPlugin.key]: LinkElement,
  [ParagraphPlugin.key]: ParagraphElement,
  [StrikethroughPlugin.key]: withProps(PlateLeaf, {as: 's'}),
  [SubscriptPlugin.key]: withProps(PlateLeaf, {as: 'sub'}),
  [SuperscriptPlugin.key]: withProps(PlateLeaf, {as: 'sup'}),
  [TableCellHeaderPlugin.key]: TableCellHeaderElement,
  [TableCellPlugin.key]: TableCellElement,
  [TablePlugin.key]: TableElement,
  [TableRowPlugin.key]: TableRowElement,
  [UnderlinePlugin.key]: withProps(PlateLeaf, {as: 'u'}),
  [HEADING_KEYS.h1]: withProps(HeadingElement, {variant: 'h1'}),
  [HEADING_KEYS.h2]: withProps(HeadingElement, {variant: 'h2'}),
  [HEADING_KEYS.h3]: withProps(HeadingElement, {variant: 'h3'}),
  [HEADING_KEYS.h4]: withProps(HeadingElement, {variant: 'h4'}),
  [HEADING_KEYS.h5]: withProps(HeadingElement, {variant: 'h5'}),
  [HEADING_KEYS.h6]: withProps(HeadingElement, {variant: 'h6'}),
}

export const editorComponents = {
  ...viewComponents,
}

export const useCreateEditor = (
  {
    components,
    override,
    readOnly,
    initialValue,
    ...options
  }: {
    components?: Record<string, any>
    plugins?: any[]
    readOnly?: boolean
    initialValue?: any
  } & Omit<CreatePlateEditorOptions, 'plugins'> = {},
  deps: any[] = [],
) => {
  return usePlateEditor({
    override: {
      components: {
        ...(readOnly ? viewComponents : withPlaceholders(editorComponents)),
        ...components,
      },
    },
    plugins: [...editorPlugins, FixedToolbarPlugin, FloatingToolbarPlugin],
    value:
      initialValue ||
      [
        // {
        //   children: [{ text: 'Basic Editor' }],
        //   type: 'h1',
        // },
        // {
        //   children: [{ text: 'Heading 2' }],
        //   type: 'h2',
        // },
        // {
        //   children: [{ text: 'Heading 3' }],
        //   type: 'h3',
        // },
        // {
        //   children: [{ text: 'This is a blockquote element' }],
        //   type: 'blockquote',
        // },
        // {
        //   children: [
        //     { text: 'Basic marks: ' },
        //     { bold: true, text: 'bold' },
        //     { text: ', ' },
        //     { italic: true, text: 'italic' },
        //     { text: ', ' },
        //     { text: 'underline', underline: true },
        //     { text: ', ' },
        //     { strikethrough: true, text: 'strikethrough' },
        //     { text: '.' },
        //   ],
        //   type: ParagraphPlugin.key,
        // },
      ],
  })
}
