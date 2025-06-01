import React from 'react'
import {InputProps} from 'sanity'

import {PlateEditor} from '../../components/editor/plate-editor'

const CustomRichTextEditor = (props: InputProps) => {
  return <PlateEditor {...props} />
}

export default CustomRichTextEditor
