'use client'

import ArrayMap from '@/components/ArrayMap'
import BaseContainer from '@/components/base/Container'
import BasePagination from '@/components/base/Pagination'
import Invoice from '@/components/layouts/Invoice'
import FilterModule from '@/components/pages/FilterModule'
import Product from '@/components/pages/Product'
import { BaseReponseAPI, Meta } from '@/type/BaseReponseAPI'
import { Category } from '@/type/Category'
import { ListProduct, PayloadProduct } from '@/type/Product'
import { Button, Flex, Grid, GridItem, Skeleton } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

export default function Home() {
  const [products, setProducts] = useState<ListProduct[]>([])
  const [meta, setMeta] = useState<Meta>({
    total: 1,
    page: 1,
    limit: 10,
    totalPages: 0,
  })

  const [payload, setPayload] = useState<PayloadProduct>({
    name_product: '',
    price: '',
    description: '',
    category_id: '',
    stock: '',
  })

  const [openProductModal, setOpenProductModal] = useState(false)

  const [payloadFilter, setPayloadFilter] = useState({
    name_product: '',
    category_id: '',
  })

  const [open, setOpen] = useState(false)
  const [category, setCategory] = useState<Category[]>([])
  const [openDelete, setOpenDelete] = useState(false)
  const [openInvoice, setOpenInvoice] = useState(false)
  const [invoice, setInvoice] = useState<{
    products: any[]
    invoiceId?: string
    name_customer?: string
  }>({
    products: [],
    invoiceId: '',
    name_customer: '',
  })

  const [loading, setLoading] = useState(false)

  async function getData() {
    setLoading(true)
    const data = await fetch(
      `/api/product?page=${meta.page}&limit=10&name_product=${payloadFilter.name_product}&category_id=${payloadFilter.category_id}`
    )
    const posts = await data.json()
    setLoading(false)
    setMeta(posts.meta)
    setProducts(posts.data)
  }

  async function CreateProduct() {
    const data = await fetch(`/api/product`, {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    await data.json()
    if (data.ok) {
      getData()
      setOpen(false)
      setPayload({
        name_product: '',
        price: '',
        description: '',
        category_id: '',
        stock: '',
      })
    }
  }

  async function getCategory() {
    const data = await fetch(`/api/category`)
    const posts: BaseReponseAPI<Category[]> = await data.json()
    setCategory(posts.data)
  }
  useEffect(() => {
    getCategory()
  }, [])

  const actionDelete = async (e) => {
    const response = await fetch(`/api/product/${e}`, {
      method: 'DELETE',
    })
    if (response.ok) {
      setOpenDelete(false)
      getData()
    } else {
      console.error('Failed to delete product')
    }
  }

  const actionUpdate = async (e) => {
    const params = new URLSearchParams(window.location.search)
    const id = params.get('id')
    const response = await fetch(`/api/product/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    })
    if (response.ok) {
      setOpenProductModal(false)
      getData()
      setPayload({
        name_product: '',
        price: '',
        description: '',
        category_id: '',
        stock: '',
      })
    } else {
      console.error('Failed to update product')
    }
  }

  useEffect(() => {
    getData()
  }, [payloadFilter, meta.page])
  useEffect(() => {
    if (open) {
      setPayload({
        name_product: '',
        price: '',
        description: '',
        category_id: '',
        stock: '',
      })
    }
  }, [open])
  return (
    <BaseContainer>
      {loading && (
        <Flex
          gap={3}
          alignItems={'center'}
          justify={'space-between'}
          marginBottom={'20px'}
        >
          <Flex gap={3} alignItems={'center'}>
            <Skeleton height="40px" width={'140px'} marginTop={'30px'} />
            <Skeleton height="40px" width={'140px'} marginTop={'30px'} />
          </Flex>
          <Skeleton height="40px" width={'40px'} marginTop={'30px'} />
        </Flex>
      )}
      {!loading && (
        <FilterModule
          setPayload={setPayload}
          payload={payload}
          actionCreate={CreateProduct}
          setOpen={setOpen}
          itemsCategory={category}
          open={open}
          setPayloadFilter={setPayloadFilter}
          payloadFilter={payloadFilter}
        />
      )}

      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        {loading && (
          <>
            <Skeleton height="150px" width={'full'} marginTop={'30px'} />
            <Skeleton height="150px" width={'full'} marginTop={'30px'} />{' '}
            <Skeleton height="150px" width={'full'} marginTop={'30px'} />
          </>
        )}

        {!loading && (
          <ArrayMap
            of={products}
            render={(item, index) => (
              <GridItem key={index} rowSpan={2}>
                <Product
                  item={item}
                  actionDelete={actionDelete}
                  openDelete={openDelete}
                  setOpenDelete={setOpenDelete}
                  actionUpdateProductModal={actionUpdate}
                  itemsCategory={category}
                  setPayload={setPayload}
                  openProductModal={openProductModal}
                  setOpenProductModal={setOpenProductModal}
                  setInvoice={setInvoice}
                />
              </GridItem>
            )}
          />
        )}
      </Grid>
      <div className="flex justify-center fixed bottom-5 right-2/4 left-[40%] transform -translate-x-1/2 -translate-y-1/2">
        <BasePagination
          total={meta.total}
          page={meta.page}
          setMeta={setMeta}
          limit={meta.limit}
          totalPages={meta.totalPages}
        />
      </div>
      {invoice.products.length > 0 && (
        <Button
          background={'blue.600'}
          _hover={{ bg: 'blue.700' }}
          onClick={() => setOpenInvoice(!openInvoice)}
          color="white"
          padding={'10px'}
          className="absolute bottom-6 left-24"
        >
          Checkout
        </Button>
      )}

      <Invoice
        invoice={invoice}
        setInvoice={setInvoice}
        show={openInvoice}
        setShow={setOpenInvoice}
      />
    </BaseContainer>
  )
}
