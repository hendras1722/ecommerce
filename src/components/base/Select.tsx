'use client'

import { createListCollection, Select, SelectRootProps } from '@chakra-ui/react'
import React, { useMemo } from 'react'

export default function BaseSelect({
  className = 'w-[200px]',
  items = [],
  setItems,
  collection,
  value,
  placeholder,
  ...props
}: Readonly<
  SelectRootProps & {
    className?: string
    items?: any
    setItems: (items: any) => void
    collection: any
    value?: string | string[]
    placeholder?: string
  }
>) {
  const oi = useMemo(() => {
    return createListCollection({
      items: collection ?? [],
      itemToString: (pokemon: any) => pokemon.name_category,
      itemToValue: (pokemon: any) => pokemon.id,
    })
  }, [collection])
  return (
    <Select.Root
      {...props}
      collection={oi}
      className={className}
      onValueChange={(e: any) => {
        setItems({ category_id: e.value[0] })
      }}
      value={value}
    >
      <Select.HiddenSelect />

      <Select.Control>
        <Select.Trigger className="border border-slate-300 pl-3">
          <Select.ValueText placeholder={placeholder ?? 'Select Category'} />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>

      <Select.Positioner>
        <Select.Content>
          {items.map((data) => (
            <Select.Item item={data.id} key={data.id}>
              {data.name_category}
              <Select.ItemIndicator />
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Positioner>
    </Select.Root>
  )
}
