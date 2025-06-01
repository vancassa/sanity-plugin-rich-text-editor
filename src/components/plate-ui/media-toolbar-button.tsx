'use client'

import type {DropdownMenuProps} from '@radix-ui/react-dropdown-menu'
import imageUrlBuilder from '@sanity/image-url'
import {SanityAsset} from '@sanity/image-url/lib/types/types'
import {useEditorRef} from '@udecode/plate/react'
import {FilePlugin, ImagePlugin} from '@udecode/plate-media/react'
import {ImageIcon, LinkIcon} from 'lucide-react'
import React, {useCallback, useState} from 'react'
import {useClient} from 'sanity'
import {useFilePicker} from 'use-file-picker'

import AssetSelectorDialog from './asset-selector-dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  useOpenState,
} from './dropdown-menu'
import {ToolbarSplitButton, ToolbarSplitButtonPrimary, ToolbarSplitButtonSecondary} from './toolbar'

const MEDIA_CONFIG: Record<
  string,
  {
    accept: string[]
    icon: React.ReactNode
    title: string
    tooltip: string
  }
> = {
  [ImagePlugin.key]: {
    accept: ['image/*'],
    icon: <ImageIcon className="size-4" />,
    title: 'Insert Image',
    tooltip: 'Image',
  },
}

export function MediaToolbarButton({
  children,
  nodeType,
  ...props
}: DropdownMenuProps & {nodeType: string}) {
  const currentConfig = MEDIA_CONFIG[nodeType]

  const client = useClient({apiVersion: '2024-10-24'})
  const imageBuilder = imageUrlBuilder(client)

  const editor = useEditorRef()
  const openState = useOpenState()
  const [assets, setAssets] = useState([])
  const [isUploading, setIsUploading] = useState(false)
  const [showAssetSelector, setShowAssetSelector] = useState(false)

  const {openFilePicker} = useFilePicker({
    accept: currentConfig.accept,
    // @ts-ignore
    onFilesSelected: async ({plainFiles: files}: {plainFiles: any}) => {
      if (!files || !files.length) return

      try {
        // Show some loading state
        setIsUploading(true)

        // Upload the file to Sanity
        const file = files[0]
        const asset = await client.assets.upload('image', file, {
          filename: file.name,
        })

        // Once we have the asset document, we can use it in our editor
        if (asset && asset._id) {
          // Format the image for insertion in the editor
          const imageUrl = imageBuilder.image(asset).url()

          // Insert the image into the editor
          editor.tf.insertNodes({
            children: [{text: ''}],
            name: nodeType === FilePlugin.key ? imageUrl.split('/').pop() : undefined,
            type: nodeType,
            url: imageUrl,
          })
        }
      } catch (error) {
        console.error('Upload failed:', error)
      } finally {
        setIsUploading(false)
      }
    },
  })

  const selectAsset = useCallback(
    (asset: SanityAsset) => {
      if (asset && asset._id) {
        const imageBuilder = imageUrlBuilder(client)
        const imageUrl = imageBuilder.image(asset).url()

        editor.tf.insertNodes({
          children: [{text: ''}],
          name: nodeType === FilePlugin.key ? imageUrl.split('/').pop() : undefined,
          type: nodeType,
          url: imageUrl,
        })

        setShowAssetSelector(false)
      }
    },
    [client, editor],
  )

  // Function to handle selecting an existing asset
  const handleChooseExistingImage = useCallback(async () => {
    client
      .fetch(`*[_type == "sanity.imageAsset"][0...100]{ _id, url, metadata }`)
      .then((assets) => {
        setAssets(assets)
        setShowAssetSelector(true)
      })
  }, [client])

  return (
    <>
      <ToolbarSplitButton
        onClick={() => {
          openFilePicker()
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') {
            e.preventDefault()
            openState.onOpenChange(true)
          }
        }}
        pressed={openState.open}
      >
        <ToolbarSplitButtonPrimary tooltip={currentConfig.tooltip}>
          {currentConfig.icon}
        </ToolbarSplitButtonPrimary>

        <DropdownMenu {...openState} modal={false} {...props}>
          <DropdownMenuTrigger asChild>
            <ToolbarSplitButtonSecondary />
          </DropdownMenuTrigger>

          <DropdownMenuContent onClick={(e) => e.stopPropagation()} align="start" alignOffset={-32}>
            <DropdownMenuGroup>
              <DropdownMenuItem onSelect={() => openFilePicker()}>
                {currentConfig.icon}
                Upload from computer
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={handleChooseExistingImage}>
                <LinkIcon />
                Choose Existing Image
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </ToolbarSplitButton>

      {showAssetSelector && (
        <AssetSelectorDialog
          isOpen={showAssetSelector}
          onClose={() => setShowAssetSelector(false)}
          onSelect={selectAsset}
          assets={assets}
        />
      )}
    </>
  )
}
