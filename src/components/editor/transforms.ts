'use client'

import {type NodeEntry, type Path, PathApi, type TElement} from '@udecode/plate'
import type {PlateEditor} from '@udecode/plate/react'
import {insertToc} from '@udecode/plate-heading'
import {TocPlugin} from '@udecode/plate-heading/react'
import {INDENT_LIST_KEYS, ListStyleType} from '@udecode/plate-indent-list'
import {IndentListPlugin} from '@udecode/plate-indent-list/react'
import {LinkPlugin, triggerFloatingLink} from '@udecode/plate-link/react'
import {insertMedia} from '@udecode/plate-media'
import {ImagePlugin, MediaEmbedPlugin} from '@udecode/plate-media/react'
import {TableCellPlugin, TablePlugin, TableRowPlugin} from '@udecode/plate-table/react'

export const STRUCTURAL_TYPES: string[] = [TablePlugin.key, TableRowPlugin.key, TableCellPlugin.key]

const insertList = (editor: PlateEditor, type: string) => {
  editor.tf.insertNodes(
    editor.api.create.block({
      indent: 1,
      listStyleType: type,
    }),
    {select: true},
  )
}

const insertBlockMap: Record<string, (editor: PlateEditor, type: string) => void> = {
  [INDENT_LIST_KEYS.todo]: insertList,
  [ListStyleType.Decimal]: insertList,
  [ListStyleType.Disc]: insertList,
  [ImagePlugin.key]: (editor) =>
    insertMedia(editor, {
      select: true,
      type: ImagePlugin.key,
    }),
  [MediaEmbedPlugin.key]: (editor) =>
    insertMedia(editor, {
      select: true,
      type: MediaEmbedPlugin.key,
    }),
  [TablePlugin.key]: (editor) => editor.getTransforms(TablePlugin).insert.table({}, {select: true}),
  [TocPlugin.key]: (editor) => insertToc(editor, {select: true}),
}

const insertInlineMap: Record<string, (editor: PlateEditor, type: string) => void> = {
  [LinkPlugin.key]: (editor) => triggerFloatingLink(editor, {focused: true}),
}

export const insertBlock = (editor: PlateEditor, type: string) => {
  editor.tf.withoutNormalizing(() => {
    const block = editor.api.block()

    if (!block) return
    if (type in insertBlockMap) {
      insertBlockMap[type](editor, type)
    } else {
      editor.tf.insertNodes(editor.api.create.block({type}), {
        at: PathApi.next(block[1]),
        select: true,
      })
    }
  })
}

export const insertInlineElement = (editor: PlateEditor, type: string) => {
  if (insertInlineMap[type]) {
    insertInlineMap[type](editor, type)
  }
}

const setList = (editor: PlateEditor, type: string, entry: NodeEntry<TElement>) => {
  editor.tf.setNodes(
    editor.api.create.block({
      indent: 1,
      listStyleType: type,
    }),
    {
      at: entry[1],
    },
  )
}

const setBlockMap: Record<
  string,
  (editor: PlateEditor, type: string, entry: NodeEntry<TElement>) => void
> = {
  [INDENT_LIST_KEYS.todo]: setList,
  [ListStyleType.Decimal]: setList,
  [ListStyleType.Disc]: setList,
}

export const setBlockType = (editor: PlateEditor, type: string, {at}: {at?: Path} = {}) => {
  editor.tf.withoutNormalizing(() => {
    const setEntry = (entry: NodeEntry<TElement>) => {
      const [node, path] = entry

      if (node[IndentListPlugin.key]) {
        editor.tf.unsetNodes([IndentListPlugin.key, 'indent'], {at: path})
      }
      if (type in setBlockMap) {
        return setBlockMap[type](editor, type, entry)
      }
      if (node.type !== type) {
        editor.tf.setNodes({type}, {at: path})
      }
    }

    if (at) {
      const entry = editor.api.node<TElement>(at)

      if (entry) {
        setEntry(entry)

        return
      }
    }

    const entries = editor.api.blocks({mode: 'lowest'})

    entries.forEach((entry) => setEntry(entry))
  })
}

export const getBlockType = (block: TElement) => {
  if (block[IndentListPlugin.key]) {
    if (block[IndentListPlugin.key] === ListStyleType.Decimal) {
      return ListStyleType.Decimal
    } else if (block[IndentListPlugin.key] === INDENT_LIST_KEYS.todo) {
      return INDENT_LIST_KEYS.todo
    }
    return ListStyleType.Disc
  }

  return block.type
}
