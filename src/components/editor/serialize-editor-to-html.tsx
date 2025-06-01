'use client'

import {withProps} from '@udecode/cn'
import {createSlateEditor, serializeHtml, SlateLeaf} from '@udecode/plate'
import {ParagraphPlugin} from '@udecode/plate/react'
import {AlignPlugin} from '@udecode/plate-alignment/react'
import {
  BoldPlugin,
  CodePlugin,
  ItalicPlugin,
  StrikethroughPlugin,
  SubscriptPlugin,
  SuperscriptPlugin,
  UnderlinePlugin,
} from '@udecode/plate-basic-marks/react'
import {BlockquotePlugin} from '@udecode/plate-block-quote/react'
import {FontColorPlugin, FontSizePlugin} from '@udecode/plate-font/react'
import {HEADING_KEYS, HEADING_LEVELS} from '@udecode/plate-heading'
import {HeadingPlugin} from '@udecode/plate-heading/react'
import {HorizontalRulePlugin} from '@udecode/plate-horizontal-rule/react'
import {IndentPlugin} from '@udecode/plate-indent/react'
import {IndentListPlugin} from '@udecode/plate-indent-list/react'
import {KbdPlugin} from '@udecode/plate-kbd/react'
import {LinkPlugin} from '@udecode/plate-link/react'
import {ImagePlugin, MediaEmbedPlugin} from '@udecode/plate-media/react'
import {
  TableCellHeaderPlugin,
  TableCellPlugin,
  TablePlugin,
  TableRowPlugin,
} from '@udecode/plate-table/react'

import {BlockquoteElementStatic} from '../../components/plate-ui/blockquote-element-static'
import {HeadingElementStatic} from '../../components/plate-ui/heading-element-static'
import {HrElementStatic} from '../../components/plate-ui/hr-element-static'
import {ImageElementStatic} from '../../components/plate-ui/image-element-static'
import {FireLiComponent, FireMarker} from '../../components/plate-ui/indent-fire-marker'
import {KbdLeafStatic} from '../../components/plate-ui/kbd-leaf-static'
import {LinkElementStatic} from '../../components/plate-ui/link-element-static'
import {ParagraphElementStatic} from '../../components/plate-ui/paragraph-element-static'
import {
  TableCellElementStatic,
  TableCellHeaderStaticElement,
} from '../../components/plate-ui/table-cell-element-static'
import {TableElementStatic} from '../../components/plate-ui/table-element-static'
import {TableRowElementStatic} from '../../components/plate-ui/table-row-element-static'

export const serializeEditorToHtml = async (editor: any) => {
  const components = {
    [BlockquotePlugin.key]: BlockquoteElementStatic,
    [BoldPlugin.key]: withProps(SlateLeaf, {as: 'strong'}),
    [HorizontalRulePlugin.key]: HrElementStatic,
    [ImagePlugin.key]: ImageElementStatic,
    [ItalicPlugin.key]: withProps(SlateLeaf, {as: 'em'}),
    [KbdPlugin.key]: KbdLeafStatic,
    [LinkPlugin.key]: LinkElementStatic,
    [ParagraphPlugin.key]: ParagraphElementStatic,
    [StrikethroughPlugin.key]: withProps(SlateLeaf, {as: 'del'}),
    [SubscriptPlugin.key]: withProps(SlateLeaf, {as: 'sub'}),
    [SuperscriptPlugin.key]: withProps(SlateLeaf, {as: 'sup'}),
    [TableCellHeaderPlugin.key]: TableCellHeaderStaticElement,
    [TableCellPlugin.key]: TableCellElementStatic,
    [TablePlugin.key]: TableElementStatic,
    [TableRowPlugin.key]: TableRowElementStatic,
    [UnderlinePlugin.key]: withProps(SlateLeaf, {as: 'u'}),
    [HEADING_KEYS.h1]: withProps(HeadingElementStatic, {variant: 'h1'}),
    [HEADING_KEYS.h2]: withProps(HeadingElementStatic, {variant: 'h2'}),
    [HEADING_KEYS.h3]: withProps(HeadingElementStatic, {variant: 'h3'}),
    [HEADING_KEYS.h4]: withProps(HeadingElementStatic, {variant: 'h4'}),
    [HEADING_KEYS.h5]: withProps(HeadingElementStatic, {variant: 'h5'}),
    [HEADING_KEYS.h6]: withProps(HeadingElementStatic, {variant: 'h6'}),
  }

  const editorStatic = createSlateEditor({
    plugins: [
      ParagraphPlugin,
      HeadingPlugin,
      MediaEmbedPlugin,
      BoldPlugin,
      CodePlugin,
      ItalicPlugin,
      StrikethroughPlugin,
      SubscriptPlugin,
      SuperscriptPlugin,
      UnderlinePlugin,
      BlockquotePlugin,
      IndentPlugin.extend({
        inject: {
          targetPlugins: [ParagraphPlugin.key, BlockquotePlugin.key],
        },
      }),
      IndentListPlugin.extend({
        inject: {
          targetPlugins: [ParagraphPlugin.key, ...HEADING_LEVELS, BlockquotePlugin.key],
        },
        options: {
          listStyleTypes: {
            fire: {
              liComponent: FireLiComponent,
              markerComponent: FireMarker,
              type: 'fire',
            },
          },
        },
      }),
      LinkPlugin,
      TableRowPlugin,
      TablePlugin,
      TableCellPlugin,
      HorizontalRulePlugin,
      FontColorPlugin,
      FontSizePlugin,
      KbdPlugin,
      AlignPlugin.extend({
        inject: {
          targetPlugins: [
            ParagraphPlugin.key,
            MediaEmbedPlugin.key,
            ...HEADING_LEVELS,
            ImagePlugin.key,
          ],
        },
      }),
      ImagePlugin,
    ],
    value: editor.children,
  })

  const editorHtml = await serializeHtml(editorStatic, {
    components,
    props: {style: {}},
  })

  return editorHtml
}
