'use client'

import { Home, CreditCard, QrCode, Settings } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function StoreFooter() {
  const pathname = usePathname()

  const navItems = [
    {
      name: 'ホーム',
      path: '/store',
      icon: Home
    },
    {
      name: 'ギフトカード',
      path: '/store/giftcards',
      icon: CreditCard
    },
    {
      name: 'QRコード',
      path: '/store/qr',
      icon: QrCode
    },
    {
      name: '設定',
      path: '/store/settings',
      icon: Settings
    }
  ]

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 h-16 z-50">
      <div className="max-w-[428px] mx-auto h-full">
        <div className="grid grid-cols-4 h-full">
          {navItems.map((item) => {
            const Icon = item.icon
            // ホームタブは完全一致、他は前方一致
            const isActive = item.path === '/store'
              ? pathname === '/store'
              : pathname?.startsWith(item.path)

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                  isActive ? 'bg-gray-100' : 'hover:bg-gray-50'
                }`}
              >
                <Icon
                  size={20}
                  className={isActive ? 'text-gray-900' : 'text-gray-600'}
                />
                <span
                  className={`text-xs ${
                    isActive ? 'text-gray-900 font-medium' : 'text-gray-600'
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </footer>
  )
}
