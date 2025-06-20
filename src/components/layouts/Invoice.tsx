import { cn } from '@/utils/lib'
import ArrayMap from '../ArrayMap'
import BaseInput from '../base/Input'
import { X } from 'lucide-react'
import { Button, Flex } from '@chakra-ui/react'
import { useEffect, useMemo, useState } from 'react'
import { ListProduct } from '@/type/Product'
import { mergeDuplicates } from '@/utils/helper'
import { set } from 'date-fns'
import { moneyRupiah } from '@/utils/convertMoney'

type InvoiceProps = {
  invoice: {
    products?: ListProduct[]
    invoiceId?: string
    name_customer?: string
  }
  setInvoice: React.Dispatch<
    React.SetStateAction<{
      products: any[]
      invoiceId?: string
      name_customer?: string
    }>
  >
  show?: boolean
  setShow?: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Invoice({
  invoice: { products = [], name_customer = '' } = {},
  setInvoice,
  show,
  setShow,
}: Readonly<InvoiceProps>) {
  const invoiceIdItems = useMemo(() => {
    return Math.floor(new Date().getTime() / 1000).toString()
  }, [])
  const productItems = useMemo(() => {
    if (products.length > 0) {
      return mergeDuplicates(products)
    }
    return []
  }, [products])

  const totalPrice = useMemo(() => {
    return productItems.reduce((acc, item) => {
      if (!item.price) return acc
      return acc + Number(item.price.replace('.', '')) * (item.total ?? 1)
    }, 0)
  }, [productItems])

  function DeleteProducts(e: ListProduct) {
    setInvoice((prevState) => ({
      ...prevState,
      products: prevState.products.filter((item) => item.id !== e.id),
    }))
  }

  async function handleSaveInvoice() {
    const res = await fetch('/api/invoice', {
      method: 'POST',
      body: JSON.stringify({
        name_customer: name_customer,
        products: productItems.map((item) => {
          return {
            ...item,
            category: undefined,
          }
        }),
        invoiceId: invoiceIdItems,
      }),
    })
    await res.json()
    if (res.ok) {
      setInvoice({
        products: [],
        invoiceId: '',
        name_customer: '',
      })
      setShow && setShow(false)
    }
  }
  return (
    <div
      className={cn(
        'max-w-[400px] min-w-[376px] border-l border-slate-200 min-h-screen fixed top-0 right-0 bg-white z-10 shadow-lg',
        !show && 'translate-x-full ease-in-out duration-300',
        show && 'translate-x-0 ease-out duration-300'
      )}
    >
      <div className="p-5">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Invoice</h1>
          <Button onClick={() => setShow && setShow(!show)} className="p-2">
            <X />
          </Button>
        </div>
        <p className="text-sm text-slate-500 mt-2">
          Tanggal :{' '}
          {new Date().toLocaleDateString('id-ID', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })}
        </p>
        <div className="mt-5">
          <p className="text-sm text-slate-500 mt-2">
            No. Invoice : {invoiceIdItems}
          </p>
          <div className="text-sm mt-2">
            Nama Pelanggan :{' '}
            <BaseInput
              value={name_customer}
              onOpenChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setInvoice((prevState) => ({
                  ...prevState,
                  name_customer: e.target.value,
                }))
              }
            />
          </div>
          <div className="min-h-[300px] mt-5 p-3 rounded-lg overflow-auto">
            <ArrayMap
              of={productItems}
              render={(item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center mt-2"
                >
                  <span>{item.name_product}</span>
                  <Flex gap={2}>
                    <span>&#40;{item.total}x&#41;</span>
                    <span>{item.price}</span>
                    <button onClick={() => DeleteProducts(item)}>
                      <X className="text-red-500 w-3 h-3" />
                    </button>
                  </Flex>
                </div>
              )}
            />
          </div>
          <div>
            Total Price: Rp. {new Number(totalPrice).toLocaleString('id-ID')}
          </div>
          <div>Diskon</div>
          <Flex gap={2} className="mt-2">
            <BaseInput type="number"  onOpenChange={(e: React.ChangeEvent<HTMLInputElement>) => ()} /> <span>%</span>
          </Flex>
          <div>
            <Button
              className="fixed bottom-5 right-0 left-0 mx-auto"
              background={'blue.500'}
              padding={'15px'}
              width={'150px'}
              color={'white'}
              onClick={handleSaveInvoice}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
