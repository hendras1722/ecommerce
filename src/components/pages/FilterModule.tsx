'use client'

import BaseSelect from '../base/Select'
import BaseInput from '../base/Input'
import { Flex } from '@chakra-ui/react'
import AddProduct from './AddProduct'
import { PayloadProduct } from '@/type/Product'
import { debounce } from 'radash'

export default function FilterModule({
  setPayload,
  payload,
  actionCreate,
  itemsCategory,
  setOpen,
  open,
  setPayloadFilter,
  payloadFilter,
}: {
  readonly setPayload: React.Dispatch<React.SetStateAction<PayloadProduct>>
  readonly payload: PayloadProduct
  readonly actionCreate: () => Promise<void>
  readonly itemsCategory: any[]
  readonly setOpen: (open: boolean) => void
  readonly open: boolean
  readonly setPayloadFilter: React.Dispatch<React.SetStateAction<any>>
  readonly payloadFilter: any
}) {
  return (
    <div>
      <Flex gap={3} justifyContent={'space-between'}>
        <Flex gap={3}>
          <BaseSelect
            items={itemsCategory}
            collection={itemsCategory}
            value={payloadFilter.category_id}
            setItems={(e) => {
              setPayloadFilter((prevState) => ({
                ...prevState,
                category_id: e.category_id,
              }))
            }}
          />
          <BaseInput
            onOpenChange={debounce({ delay: 500 }, (e) => {
              setPayloadFilter((prevState) => ({
                ...prevState,
                name_product: e.target.value,
              }))
            })}
          />
        </Flex>
        <AddProduct
          open={open}
          setOpen={setOpen}
          setPayload={setPayload}
          payload={payload}
          action={actionCreate}
          itemsCategory={itemsCategory}
        />
      </Flex>
    </div>
  )
}
