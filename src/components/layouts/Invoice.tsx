import { cn } from '@/utils/lib'
import ArrayMap from '../ArrayMap'
import BaseInput from '../base/Input'
import { X } from 'lucide-react'
import { Button } from '@chakra-ui/react'

type InvoiceProps = {
  invoice: {
    products?: any[]
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
  invoice: { products = [], invoiceId = '', name_customer = '' } = {},
  setInvoice,
  show,
  setShow,
}: Readonly<InvoiceProps>) {
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
          <p className="text-sm text-slate-500 mt-2">No. Invoice : 123456</p>
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
          <div>
            <ArrayMap
              of={products}
              render={(item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center mt-2"
                >
                  <span>{item.name_product}</span>
                  <span>{item.price}</span>
                </div>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
