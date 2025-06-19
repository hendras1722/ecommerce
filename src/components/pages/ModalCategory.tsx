import {
  Button,
  CloseButton,
  Dialog,
  Field,
  HStack,
  Portal,
} from '@chakra-ui/react'
import BaseInput from '../base/Input'

export default function BaseModal({
  open,
  setOpen,
  setPayload,
  payload,
  action,
  title = 'Add',
  children,
}: {
  readonly open: boolean
  readonly setOpen: (open: boolean) => void
  readonly setPayload: React.Dispatch<React.SetStateAction<any>>
  readonly payload: any
  readonly action: () => Promise<void>
  readonly title: string
  readonly children?: React.ReactNode
}) {
  return (
    <>
      {children}
      {!children && (
        <Button
          onClick={action}
          marginBottom={'0'}
          background={'blue.500'}
          size={'sm'}
          color={'white'}
          padding={'10px'}
          _hover={{ bg: 'bg.blue.600' }}
        >
          Add Category
        </Button>
      )}
      <HStack wrap="wrap" gap="4">
        <Dialog.Root
          placement={'center'}
          motionPreset="slide-in-bottom"
          open={open}
          onOpenChange={(e) => setOpen(e.open)}
        >
          <Portal>
            <Dialog.Backdrop className="bg-black/25" />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>{title} Category</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                  <Field.Root required>
                    <Field.Label>
                      Name Category
                      <Field.RequiredIndicator />
                    </Field.Label>
                    <BaseInput
                      value={payload.name_category}
                      onOpenChange={(e) =>
                        setPayload({ name_category: e.target.value })
                      }
                      placeholder="name category"
                    />
                  </Field.Root>
                </Dialog.Body>
                <Dialog.Footer>
                  <Dialog.ActionTrigger asChild>
                    <Button variant="outline">Cancel</Button>
                  </Dialog.ActionTrigger>
                  <Button
                    background={'green.500'}
                    color={'white'}
                    width={'80px'}
                    onClick={() => action()}
                  >
                    Save
                  </Button>
                </Dialog.Footer>
                <Dialog.CloseTrigger asChild>
                  <CloseButton size="sm" />
                </Dialog.CloseTrigger>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
      </HStack>
    </>
  )
}
