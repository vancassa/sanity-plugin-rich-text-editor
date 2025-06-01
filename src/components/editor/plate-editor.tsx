'use client'

import {nanoid} from '@udecode/plate'
import {Plate} from '@udecode/plate/react'
import React, {useCallback, useEffect} from 'react'
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import {InputProps, PatchEvent, PortableTextBlock, set, unset} from 'sanity'

import {useCreateEditor} from '../../components/editor/use-create-editor'
import {Editor, EditorContainer} from '../../components/plate-ui/editor'
import {deserializeHtmlToEditor} from './deserealize-html-to-editor'
import {serializeEditorToHtml} from './serialize-editor-to-html'

export const debounce = <T extends (...args: any[]) => void>(
  callback: T,
  wait: number,
): ((...args: Parameters<T>) => void) => {
  let timeoutId: number | null = null
  return (...args: Parameters<T>) => {
    if (timeoutId !== null) {
      window.clearTimeout(timeoutId)
    }
    timeoutId = window.setTimeout(() => {
      callback(...args)
    }, wait)
  }
}

const htmlToBlocks = (html: string) => {
  return [
    {
      _key: nanoid(6),
      _type: 'block',
      children: [
        {
          _key: nanoid(6),
          _type: 'span',
          marks: [],
          text: '',
          html: html,
        },
      ],
      markDefs: [],
      style: 'normal',
    },
  ]
}

export function PlateEditor(props: InputProps) {
  const {value, onChange} = props
  const editor = useCreateEditor()

  useEffect(() => {
    const _value = value as PortableTextBlock[]
    if (_value?.length > 0) {
      const firstBlockChildren = _value[0].children as Array<{html?: string}>
      if (firstBlockChildren.length > 0 && typeof firstBlockChildren[0].html === 'string') {
        const html: string = firstBlockChildren[0].html
        const initialValue = deserializeHtmlToEditor(html)
        editor.children = initialValue
      }
    }
  }, [])

  const debouncedVisualChange = useCallback(
    debounce(async (editor) => {
      const html = await serializeEditorToHtml(editor)
      console.log('html', html)
      const htmlBlock = htmlToBlocks(html)
      onChange(PatchEvent.from(htmlBlock.length ? set(htmlBlock) : unset()))
    }, 500),
    [onChange],
  )

  const handleVisualChange = () => {
    debouncedVisualChange(editor)
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Plate editor={editor} onChange={handleVisualChange}>
        <EditorContainer>
          <Editor />
        </EditorContainer>
      </Plate>
    </DndProvider>
  )
}
