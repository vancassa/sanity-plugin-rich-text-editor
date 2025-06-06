# sanity-plugin-rich-text-editor

> This is a **Sanity Studio v3** plugin.

## Installation

Reference: https://www.sanity.io/docs/studio/developing-plugins

Build the plugin
```
pnpm build
```

In this directory, run
```
pnpm link-watch
```

In your project directory, run:
```
npx yalc add sanity-plugin-rich-text-editor && npx yalc link sanity-plugin-rich-text-editor && pnpm install
```

## Usage

Add it as a plugin in `sanity.config.ts` (or .js):

```ts
import {defineConfig} from 'sanity'
import {richTextEditorPlugin} from 'sanity-plugin-rich-text-editor'

export default defineConfig({
  //...
  plugins: [
    richTextEditorPlugin()
  ],
})
```

Use the type in your field:
```ts
defineField({
  name: 'richContent',
  title: 'Content',
  type: 'richTextHtmlContent',
}),
```

## License

[MIT](LICENSE) © Vanessa Cassandra

## Develop & test

This plugin uses [@sanity/plugin-kit](https://github.com/sanity-io/plugin-kit)
with default configuration for build & watch scripts.

See [Testing a plugin in Sanity Studio](https://github.com/sanity-io/plugin-kit#testing-a-plugin-in-sanity-studio)
on how to run this plugin with hotreload in the studio.
