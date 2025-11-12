'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Error({
  error,
}: {
  error: Error & { digest?: string }
}) {
  const router = useRouter()

  useEffect(() => {
    // window.ethereum エラーの場合は無視してリロード
    if (error.message.includes('window.ethereum')) {
      router.refresh()
    }
  }, [error, router])

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">⚠️</span>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">エラーが発生しました</h2>
        <p className="text-gray-600 mb-6">ページの読み込み中に問題が発生しました</p>
        <button
          onClick={() => router.push('/user/home')}
          className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-700 transition-colors"
        >
          ホームに戻る
        </button>
      </div>
    </div>
  )
}
