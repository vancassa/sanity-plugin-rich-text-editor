import {definePlugin} from 'sanity'

import {richTextContentType} from './rich-text'

/**
 * Usage in `sanity.config.ts` (or .js)
 *
 * ```ts
 * import {defineConfig} from 'sanity'
 * import {myPlugin} from 'sanity-plugin-rich-text-editor'
 *
 * export default defineConfig({
 *   // ...
 *   plugins: [myPlugin()],
 * })
 * ```
 */
export const richTextEditorPlugin = definePlugin(() => {
  return {
    name: 'sanity-plugin-rich-text-editor',
    schema: {
      types: [richTextContentType],
    },
  }
})
