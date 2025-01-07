import { ReactNode } from 'react'

type MyProps = {
  children: ReactNode
}

export default function MyLayout({ children }: MyProps) {
  return (
    <div className="relative overflow-hidden bg-green-200">
      <div className="h-screen p-4">{children}</div>
    </div>
  )
}
