
import { cn } from '@/utils'
import type { PropsWithChildren } from 'react'

export type Props = {
  className?: string
}

export function InnerLayout({ className, children }: PropsWithChildren<Props>) {
  return (
    <div className="relative flex min-h-[calc(100%-var(--header-height))] w-full flex-col items-center justify-between gap-10">

      <main
        className={cn(
          'md:gap-0 flex !h-screen w-full flex-col items-center justify-between gap-4 md:flex-row md:items-start',
          className
        )}
      >
        {children}
      </main>
    </div>
  )
}
