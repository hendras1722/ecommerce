import { cn } from '@/utils/lib'

export default function BaseContainer({
  children,
  className,
}: Readonly<{ children: React.ReactNode; className?: string }>) {
  return (
    <main className={cn('p-10 overflow-auto h-[calc(100vh-123px)]', className)}>
      {children}
    </main>
  )
}
