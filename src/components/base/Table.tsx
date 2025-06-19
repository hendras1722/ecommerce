import { Flex, Skeleton, Table } from '@chakra-ui/react'
import BasePagination from './Pagination'
import { Meta } from '@/type/BaseReponseAPI'
import React from 'react'

type Field = {
  key: string
  name: string
  style?: any
}

type BaseTableProps = {
  readonly items: readonly any[]
  readonly fields: readonly Field[]
  readonly children?: {
    readonly [key: string]: (item: any) => React.ReactNode
  }
  readonly pagination?: {
    readonly total: number
    readonly page: number
    readonly limit: number
    readonly totalPages: number
  }
  readonly setMeta: React.Dispatch<React.SetStateAction<Meta>>
  readonly refetch?: () => void
  readonly loading?: boolean
}

export default function BaseTable({
  items,
  fields,
  children = {},
  pagination = {
    total: 1,
    page: 10,
    limit: 10,
    totalPages: 10,
  },
  setMeta,
  loading = false,
}: BaseTableProps) {
  return (
    <>
      <Table.ScrollArea borderWidth="1px" rounded="md">
        <Table.Root size="sm" stickyHeader interactive>
          <Table.Header>
            <Table.Row bg="bg.subtle">
              {fields.map((field) => (
                <Table.ColumnHeader key={field.key} {...field.style}>
                  {field.name}
                </Table.ColumnHeader>
              ))}
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {loading &&
              Array.from({ length: 5 }).map((_, i) => (
                <Table.Row key={i}>
                  {fields.map((field) => (
                    <Table.Cell key={field.key}>
                      <Skeleton height="24px" width="80%" />
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))}
            {!loading &&
              items?.map((item) => (
                <Table.Row key={item.id}>
                  {fields.map((field) => (
                    <Table.Cell key={field.key} {...field.style}>
                      {children?.[field.key]
                        ? children[field.key](item)
                        : item[field.key]}
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))}
            {!loading && items.length === 0 && (
              <Table.Row>
                <Table.Cell
                  colSpan={fields.length}
                  textAlign="center"
                  py={6}
                  color="gray.500"
                  fontStyle="italic"
                >
                  No data available
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>

      <Flex justify="center" mt="4">
        {loading && <Skeleton height="24px" width="80%" />}
        {!loading && (
          <BasePagination
            total={pagination.total}
            page={pagination.page}
            limit={pagination.limit}
            totalPages={pagination.totalPages}
            setMeta={setMeta}
          />
        )}
      </Flex>
    </>
  )
}
