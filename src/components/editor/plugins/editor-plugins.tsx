'use client'

import {FontBackgroundColorPlugin, FontColorPlugin, FontSizePlugin} from '@udecode/plate-font/react'
import {HorizontalRulePlugin} from '@udecode/plate-horizontal-rule/react'
import {JuicePlugin} from '@udecode/plate-juice'
import {KbdPlugin} from '@udecode/plate-kbd/react'

import {FixedToolbarPlugin} from '../../../components/editor/plugins/fixed-toolbar-plugin'
import {FloatingToolbarPlugin} from '../../../components/editor/plugins/floating-toolbar-plugin'
import {alignPlugin} from './align-plugin'
import {basicNodesPlugins} from './basic-nodes-plugins'
import {deletePlugins} from './delete-plugins'
import {dndPlugins} from './dnd-plugins'
import {indentListPlugins} from './indent-list-plugins'
import {linkPlugin} from './link-plugin'
import {mediaPlugins} from './media-plugins'
import {tablePlugin} from './table-plugin'

export const viewPlugins = [
  ...basicNodesPlugins,
  HorizontalRulePlugin,
  linkPlugin,
  tablePlugin,
  ...mediaPlugins,

  // Marks
  FontColorPlugin,
  FontBackgroundColorPlugin,
  FontSizePlugin,
  KbdPlugin,
  // skipMarkPlugin,

  // Block Style
  alignPlugin,
  ...indentListPlugins,
] as const

export const editorPlugins = [
  // Nodes
  ...viewPlugins,

  // Functionality
  ...dndPlugins,
  ...deletePlugins,
  // softBreakPlugin,

  // Deserialization
  JuicePlugin,

  // UI
  FixedToolbarPlugin,
  FloatingToolbarPlugin,
]
