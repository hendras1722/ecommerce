import { Button, CloseButton, Dialog, Field, Portal } from '@chakra-ui/react'
import { Plus } from 'lucide-react'
import BaseInput from '../base/Input'
import { Category } from '@/type/Category'
import BaseSelect from '../base/Select'
import { PayloadProduct } from '@/type/Product'
import { moneyRupiah } from '@/utils/convertMoney'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AddProduct({
  open,
  setOpen,
  setPayload,
  payload,
  action,
  itemsCategory,
}: {
  readonly open: boolean
  readonly setOpen: (open: boolean) => void
  readonly setPayload: React.Dispatch<React.SetStateAction<PayloadProduct>>
  readonly payload: any
  readonly action: (e?: string) => Promise<void>
  readonly itemsCategory: Category[]
}) {
  const [select, setSelect] = React.useState<string>('')
  const [input, setInput] = React.useState<PayloadProduct>({
    category_id: '',
    name_product: '',
    stock: '',
    description: '',
    price: '',
  })
  const router = useRouter()
  useEffect(() => {
    if (payload?.category_id) {
      setSelect(payload.category_id)
    }
    setInput(payload)
  }, [payload])

  useEffect(() => {
    if (
      input.name_product !== payload.name_product ||
      input.stock !== payload.stock ||
      input.description !== payload.description ||
      input.price !== payload.price ||
      select !== payload.category_id
    ) {
      setPayload({
        ...payload,
        ...input,
        category: undefined,
        category_id: select,
      })
    }
  }, [input, select])
  const handleOpenModal = () => {
    router.push('?id=' + payload?.id)
    setOpen(!open)
  }
  return (
    <>
      <Button
        onClick={handleOpenModal}
        background={'green.600'}
        color={'white'}
        size={'xs'}
        rounded={'lg'}
      >
        <Plus />
      </Button>
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
              <Dialog.Header>
                <Dialog.Title>Add Product</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Field.Root required className="mb-3">
                  <Field.Label>
                    Name Product
                    <Field.RequiredIndicator />
                  </Field.Label>
                  <BaseInput
                    defaultValue={payload.name_product}
                    onOpenChange={(e) =>
                      setInput((prevState) => ({
                        ...prevState,
                        name_product: e.target.value,
                      }))
                    }
                  />
                </Field.Root>

                <Field.Root required className="mb-3">
                  <Field.Label>
                    Category Product
                    <Field.RequiredIndicator />
                  </Field.Label>
                  <BaseSelect
                    className="w-full"
                    items={itemsCategory}
                    collection={itemsCategory}
                    setItems={(e) => {
                      setSelect(e.category_id)
                    }}
                    value={[select]}
                  />
                </Field.Root>
                <Field.Root required className="mb-3">
                  <Field.Label>
                    Stock Product
                    <Field.RequiredIndicator />
                  </Field.Label>
                  <BaseInput
                    onKeyDown={(e) => {
                      const allowedKeys = [
                        'Backspace',
                        'Delete',
                        'ArrowLeft',
                        'ArrowRight',
                        'Tab',
                      ]
                      if (
                        !/[0-9]/.test(e.key) &&
                        !allowedKeys.includes(e.key)
                      ) {
                        e.preventDefault()
                      }
                    }}
                    placeholder="Stock product"
                    onOpenChange={(e) =>
                      setInput((prevState) => ({
                        ...prevState,
                        stock: e.target.value,
                      }))
                    }
                    defaultValue={payload.stock}
                  />
                </Field.Root>
                <Field.Root required className="mb-3">
                  <Field.Label>
                    Description Product
                    <Field.RequiredIndicator />
                  </Field.Label>
                  <BaseInput
                    placeholder="Description product"
                    onOpenChange={(e) =>
                      setInput((prevState) => ({
                        ...prevState,
                        description: e.target.value,
                      }))
                    }
                    defaultValue={payload.description}
                  />
                </Field.Root>
                <Field.Root required className="mb-3">
                  <Field.Label>
                    Price Product
                    <Field.RequiredIndicator />
                  </Field.Label>
                  <BaseInput
                    type="telp"
                    onInput={(e) => {
                      const input = e.target as HTMLInputElement
                      const value = moneyRupiah(input.value)
                      if (value === '') return (input.value = '')
                      input.value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                    }}
                    onKeyDown={(e) => {
                      const allowedKeys = [
                        'Backspace',
                        'Delete',
                        'ArrowLeft',
                        'ArrowRight',
                        'Tab',
                      ]
                      if (
                        !/[0-9]/.test(e.key) &&
                        !allowedKeys.includes(e.key)
                      ) {
                        e.preventDefault()
                      }
                    }}
                    placeholder="Price"
                    onOpenChange={(e) =>
                      setInput((prevState) => ({
                        ...prevState,
                        price: e.target.value,
                      }))
                    }
                    defaultValue={payload.price ?? ''}
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
                  onClick={() => action(payload?.id)}
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
    </>
  )
}
