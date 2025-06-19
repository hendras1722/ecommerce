'use client'

import { cn } from '@/utils/lib'
import { Button } from '@chakra-ui/react'
import { House, LayoutList } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export default function Sidebar() {
  const pathName = usePathname()
  const router = useRouter()
  return (
    <div className="px-2 py-36  fixed min-h-screen border-r border-slate-200 block">
      <div>
        <Button
          className={cn(
            'p-1 rounded-lg mb-3',
            pathName === '/' && 'border border-slate-400 '
          )}
          onClick={() => {
            router.push('/')
          }}
        >
          <Link href={'/'}>
            <House size={24} color="#67676c" />
          </Link>
        </Button>
      </div>
      <div>
        <Button
          className={cn(
            'p-1 rounded-lg',
            pathName === '/category' && 'border border-slate-400 '
          )}
          onClick={() => {
            router.push('/category')
          }}
        >
          <Link href={'/category'}>
            <LayoutList size={24} color="#67676c" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
