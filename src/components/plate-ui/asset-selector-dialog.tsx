import imageUrlBuilder from '@sanity/image-url'
import {SanityAsset} from '@sanity/image-url/lib/types/types'
import {Button, Card, Dialog, Flex, Stack} from '@sanity/ui'
import {useClient} from 'sanity'

// Asset Selector Dialog Component
const AssetSelectorDialog = ({
  isOpen,
  onClose,
  onSelect,
  assets,
}: {
  isOpen: boolean
  onClose: () => void
  onSelect: (asset: SanityAsset) => void
  assets: SanityAsset[]
}) => {
  const client = useClient({apiVersion: '2024-10-24'})
  if (!isOpen) return null

  return (
    <Dialog
      id="asset-selector"
      header="Select an image"
      width={2}
      onClose={onClose}
      position="fixed"
      zOffset={25002}
    >
      <Card padding={4}>
        <Stack space={4}>
          <Flex wrap="wrap" gap={2}>
            {assets.map((asset) => (
              <Card
                key={asset._id}
                padding={2}
                radius={2}
                shadow={1}
                style={{cursor: 'pointer', width: '150px'}}
                onClick={() => onSelect(asset)}
              >
                <img
                  src={imageUrlBuilder(client).image(asset).width(150).url()}
                  alt=""
                  style={{width: '100%', height: 'auto'}}
                />
              </Card>
            ))}
          </Flex>
        </Stack>
      </Card>
    </Dialog>
  )
}

export default AssetSelectorDialog
