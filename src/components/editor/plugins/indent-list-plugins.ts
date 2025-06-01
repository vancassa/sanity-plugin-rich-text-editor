'use client'

import {ParagraphPlugin} from '@udecode/plate/react'
import {BlockquotePlugin} from '@udecode/plate-block-quote/react'
import {HEADING_LEVELS} from '@udecode/plate-heading'
import {IndentPlugin} from '@udecode/plate-indent/react'
import {IndentListPlugin} from '@udecode/plate-indent-list/react'

import {FireLiComponent, FireMarker} from '../../../components/plate-ui/indent-fire-marker'

export const indentListPlugins = [
  IndentPlugin.extend({
    inject: {
      targetPlugins: [ParagraphPlugin.key, ...HEADING_LEVELS, BlockquotePlugin.key],
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
]
