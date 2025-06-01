import {defineType} from 'sanity'

import {PlateEditor} from './components/editor/plate-editor'

export const richTextContentType = defineType({
  name: 'richTextHtmlContent',
  title: 'Rich Text HTML Content',
  type: 'array',
  of: [{type: 'block'}],
  components: {
    input: PlateEditor,
  },
})
