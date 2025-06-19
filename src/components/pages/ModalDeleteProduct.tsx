import { Button, CloseButton, Dialog, Portal } from '@chakra-ui/react'
import { Trash } from 'lucide-react'

export default function ModalDeleteProduct({
  open,
  setOpen,
  action,
  title = 'Delete',
}: {
  readonly open: boolean
  readonly setOpen: (open: boolean) => void
  readonly action: () => Promise<void>
  readonly title?: string
}) {
  return (
    <>
      <Button
        size={'xs'}
        onClick={() => setOpen(!open)}
        className="rounded-lg  bg-red-500 text-white flex items-center justify-center"
      >
        <Trash className="w-5 h-5" />
      </Button>
      {open && (
        <Dialog.Root
          placement={'center'}
          motionPreset="slide-in-bottom"
          open={open}
          onOpenChange={(e) => setOpen(e.open)}
        >
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.Header className="flex justify-between items-center">
                  <Dialog.Title>{title}</Dialog.Title>
                  <CloseButton onClick={() => setOpen(false)} />
                </Dialog.Header>
                <Dialog.Body>
                  Are you sure you want to delete this item?
                </Dialog.Body>
                <Dialog.Footer>
                  <Button onClick={() => setOpen(false)}>Cancel</Button>
                  <Button
                    background="red.500"
                    color="white"
                    _hover={{ bg: 'red.600' }}
                    padding={'10px'}
                    onClick={action}
                  >
                    Delete
                  </Button>
                </Dialog.Footer>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
      )}
    </>
  )
}
