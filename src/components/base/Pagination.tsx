'use client'

import { Meta } from '@/type/BaseReponseAPI'
import { cn } from '@/utils/lib'
import { ButtonGroup, IconButton, Pagination } from '@chakra-ui/react'
import { LuChevronsLeft, LuChevronsRight } from 'react-icons/lu'

export default function BasePagination({
  total,
  page,
  setMeta,
  totalPages,
  limit,
}: {
  readonly total: number
  readonly page: number
  readonly setMeta: React.Dispatch<React.SetStateAction<Meta>>
  readonly totalPages: number
  readonly limit: number
}) {
  return (
    <Pagination.Root count={total} pageSize={10} defaultPage={1}>
      <ButtonGroup variant="ghost" size={'xs'}>
        <Pagination.PrevTrigger
          asChild
          onClick={() =>
            setMeta((prevState) => ({
              ...prevState,
              page: (prevState as Meta).page - 1,
            }))
          }
          disabled={page === 1}
        >
          <IconButton>
            <LuChevronsLeft />
          </IconButton>
        </Pagination.PrevTrigger>

        <Pagination.Items
          render={(item) => (
            <div
              className={cn(
                'hover:bg-slate-200/90 bg-slate-50 rounded-lg',
                item.value === Number(page) && '!bg-slate-200'
              )}
            >
              <IconButton
                variant={{ base: 'ghost', _selected: 'outline' }}
                onClick={() => {
                  setMeta((prevState) => ({
                    ...prevState,
                    page: item.value,
                  }))
                }}
              >
                {item.value}
              </IconButton>
            </div>
          )}
        />

        <Pagination.NextTrigger asChild>
          <IconButton>
            <LuChevronsRight />
          </IconButton>
        </Pagination.NextTrigger>
      </ButtonGroup>
    </Pagination.Root>
  )
}
