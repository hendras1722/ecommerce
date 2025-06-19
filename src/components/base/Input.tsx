import { Input, InputProps } from '@chakra-ui/react'
import React from 'react'

type BaseInputProps = {
  readonly onOpenChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  readonly placeholder?: string
  readonly value?: string | number
  readonly type?: string
} & InputProps

export default function BaseInput({
  onOpenChange,
  placeholder = 'Input placeholder',
  value,
  type = 'text',
  ...props
}: BaseInputProps) {
  return (
    <Input
      type={type}
      {...props}
      value={value}
      placeholder={placeholder}
      className="border border-slate-300 px-3 max-w-[500px] min-w-[300px]"
      onChange={onOpenChange}
    />
  )
}
