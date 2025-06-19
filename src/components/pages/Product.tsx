import { ListProduct, PayloadProduct } from '@/type/Product'
import { moneyRupiah } from '@/utils/convertMoney'
import { Button, Flex, Grid, GridItem } from '@chakra-ui/react'
import ModalDeleteProduct from './ModalDeleteProduct'
import React from 'react'
import AddProduct from './AddProduct'
import { Category } from '@/type/Category'

export default function Product({
  item,
  actionDelete,
  openDelete,
  setOpenDelete,
  actionUpdateProductModal,
  openProductModal,
  setOpenProductModal,
  itemsCategory,
  setPayload,
  setInvoice,
}: {
  readonly item: ListProduct
  readonly actionDelete: (e: string) => Promise<void>
  readonly openDelete: boolean
  readonly setOpenDelete: (open: boolean) => void
  readonly actionUpdateProductModal: (e: string) => Promise<void>
  readonly openProductModal?: boolean
  readonly setOpenProductModal?: (open: boolean) => void
  readonly itemsCategory?: Category[]
  readonly setPayload: React.Dispatch<React.SetStateAction<PayloadProduct>>
  readonly setInvoice?: React.Dispatch<
    React.SetStateAction<{
      products: any[]
      invoiceId?: string
      name_customer?: string
    }>
  >
}) {
  return (
    <div className="mt-8">
      <div className="border border-slate-200 rounded-lg p-3">
        <div className="flex justify-between items-center">
          <h5>{item?.name_product}</h5>
          <Flex gap={3}>
            <AddProduct
              action={(item) => actionUpdateProductModal((item as any)?.id)}
              open={openProductModal || false}
              setOpen={setOpenProductModal || (() => {})}
              itemsCategory={itemsCategory || []}
              payload={item}
              setPayload={setPayload}
            />
            <ModalDeleteProduct
              action={() => actionDelete(item.id)}
              open={openDelete}
              setOpen={setOpenDelete}
            />
          </Flex>
        </div>
        <small>{item.category.name_category}</small>
        <p className="mt-2">{item.description}</p>
        <div className="mt-2 flex justify-between items-center">
          <div className="font-bold">Rp. {moneyRupiah(item.price)}</div>
          <Button
            onClick={() => {
              if (setInvoice) {
                setInvoice((prev) => ({
                  ...prev,
                  products: [...(prev.products || []), item],
                }))
              }
            }}
            padding={2}
            color={'white'}
            size={'xs'}
            background="blue.500"
          >
            Add Product
          </Button>
        </div>
      </div>
    </div>
  )
}
