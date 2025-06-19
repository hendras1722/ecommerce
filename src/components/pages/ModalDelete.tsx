import { Button, CloseButton, Dialog, Portal } from '@chakra-ui/react'

export default function ModalDelete({
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
        onClick={() => setOpen(!open)}
        marginBottom={'0'}
        background={'transparent'}
        size={'sm'}
        color={'red.500'}
        padding={'10px'}
        _hover={{ bg: 'bg.red.600' }}
      >
        Delete
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
