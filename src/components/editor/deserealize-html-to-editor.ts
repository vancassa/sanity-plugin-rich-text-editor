import {createSlateEditor} from '@udecode/plate'

import {editorPlugins} from '../../components/editor/plugins/editor-plugins'

export function deserializeHtmlToEditor(html: string) {
  // Create a temporary editor
  const editor = createSlateEditor({
    plugins: editorPlugins,
  })

  // Deserialize HTML to Slate value
  return editor.api.html.deserialize({element: html})
}
