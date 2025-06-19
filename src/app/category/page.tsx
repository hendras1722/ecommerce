'use client'
import BaseContainer from '@/components/base/Container'
import BaseTable from '@/components/base/Table'
import ModalCategory from '@/components/pages/ModalCategory'
import ModalDelete from '@/components/pages/ModalDelete'
import { BaseReponseAPI, Meta } from '@/type/BaseReponseAPI'
import { Category as TypeCategory } from '@/type/Category'
import { Button, Flex } from '@chakra-ui/react'
import { useDebounce } from '@msa_cli/react-composable'
import { set } from 'date-fns'
import { useEffect, useState } from 'react'

export default function Category() {
  const [items, setItems] = useState<TypeCategory[]>([])
  const [payload, setPayload] = useState({
    name_category: '',
  })
  const [meta, setMeta] = useState<Meta>({
    total: 1,
    page: 1,
    limit: 10,
    totalPages: 0,
  })
  const [open, setOpen] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [loading, setLoading] = useState(false)

  async function getData() {
    setLoading(true)
    const data = await fetch(`/api/category?page=${meta.page}&limit=10`)
    const posts: BaseReponseAPI<TypeCategory[]> = await data.json()
    setLoading(false)
    setItems(posts.data)
    setMeta(posts.meta)
  }
  async function getDataDetail(e) {
    const data = await fetch(`/api/category/${e.id}`)
    const posts: BaseReponseAPI<TypeCategory> = await data.json()
    return posts
  }
  useEffect(() => {
    getData()
  }, [meta.page])

  async function CreateCategory() {
    try {
      const data = await fetch('/api/category', {
        method: 'POST',
        body: JSON.stringify(payload),
      })
      await data.json()
      getData()
      setOpen(false)
    } catch (error) {}
  }

  async function DeleteCategory(e) {
    try {
      const data = await fetch('/api/category/' + e, {
        method: 'DELETE',
      })
      await data.json()
      await getData()
      setOpenDelete(false)
    } catch (error) {}
  }

  async function EditCategory(e) {
    try {
      const data = await fetch('/api/category/' + e, {
        method: 'PUT',
        body: JSON.stringify(payload),
      })
      await data.json()
      setPayload({ name_category: '' })
      getData()
      setOpenEdit(false)
    } catch (error) {}
  }

  useEffect(() => {
    if (!openEdit) {
      setPayload({ name_category: '' })
    }
  }, [openEdit])

  const fields = [
    { key: 'id', name: 'ID Category' },
    { key: 'name_category', name: 'Name' },
    {
      key: 'actions',
      name: '',
      style: { marginBottom: '0', textAlign: 'center' },
    },
  ]
  return (
    <BaseContainer>
      <div className="mb-5 flex justify-end">
        <ModalCategory
          open={open}
          setOpen={setOpen}
          setPayload={setPayload}
          payload={payload}
          title="Add"
          action={CreateCategory}
        >
          <Button
            onClick={() => setOpen(true)}
            marginBottom={'0'}
            background={'blue.500'}
            size={'sm'}
            color={'white'}
            padding={'10px'}
            _hover={{ bg: 'bg.blue.600' }}
          >
            Add Category
          </Button>
        </ModalCategory>
      </div>
      <BaseTable
        loading={loading}
        items={items ?? []}
        fields={fields}
        pagination={meta}
        setMeta={setMeta}
      >
        {{
          actions: (item: any) => {
            return (
              <Flex gap={3}>
                <ModalCategory
                  open={openEdit}
                  setOpen={setOpenEdit}
                  setPayload={setPayload}
                  payload={payload}
                  action={() => EditCategory(item.id)}
                  title="Edit"
                >
                  <Button
                    onClick={async () => {
                      setPayload({ name_category: '' })
                      const res = await getDataDetail(item)
                      setPayload(res.data)
                      setOpenEdit(true)
                    }}
                    marginBottom={'0'}
                    background={'transparent'}
                    size={'sm'}
                    color={'blue.500'}
                    padding={'10px'}
                    _hover={{ bg: 'bg.blue.600' }}
                  >
                    Edit
                  </Button>
                </ModalCategory>

                <ModalDelete
                  setOpen={setOpenDelete}
                  open={openDelete}
                  action={() => DeleteCategory(item.id)}
                />
              </Flex>
            )
          },
        }}
      </BaseTable>
    </BaseContainer>
  )
}
