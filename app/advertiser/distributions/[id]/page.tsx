'use client'

import AdvertiserLayout from '@/components/advertiser/AdvertiserLayout'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import {
  ArrowLeft,
  Calendar,
  MapPin,
  CreditCard,
  User,
  FileText,
  Clock,
  CheckCircle
} from 'lucide-react'

export default function AdvertiserDistributionDetailPage() {
  const params = useParams()

  // 配布実績詳細データ（モック）
  const distribution = {
    id: params.id,
    date: '2025/01/29',
    time: '14:30:25',
    storeName: 'イオンモール幕張新都心',
    storeAddress: '千葉県千葉市美浜区豊砂1-1',
    storeId: 'STR-001234',
    campaignName: '春の新生活応援キャンペーン',
    campaignId: 'CP-2025-001',
    cardCount: 1,
    cardAmount: '¥1,000',
    totalAmount: '¥1,000',
    userId: 'USR-12345',
    userName: '田中 太郎',
    userAge: '25-34歳',
    userGender: '男性',
    deviceInfo: 'iPhone 14 Pro / iOS 17.2',
    ipAddress: '192.168.1.1',
    status: '正常完了',
    surveyCompleted: true,
    surveyCompletedDate: '2025/01/30'
  }

  // タイムライン（モック）
  const timeline = [
    { time: '14:30:25', event: 'QRコード読み取り', status: 'completed' },
    { time: '14:30:30', event: 'ユーザー認証完了', status: 'completed' },
    { time: '14:30:35', event: 'ギフトカード選択', status: 'completed' },
    { time: '14:30:40', event: '配布完了画面表示', status: 'completed' },
    { time: '14:30:45', event: '実物手渡し完了', status: 'completed' },
    { time: '翌日 10:15', event: 'アンケート回答完了', status: 'completed' }
  ]

  return (
    <AdvertiserLayout>
      <div className="p-6">
        {/* ヘッダー */}
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <Link
              href="/advertiser/distributions"
              className="mr-4 p-2 hover:bg-gray-100 rounded-lg"
            >
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">配布実績詳細</h1>
          </div>
          <p className="text-gray-600 ml-12">配布ID: DIST-{distribution.id}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左側: 詳細情報 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 基本情報 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">基本情報</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">配布日時</div>
                  <div className="flex items-center text-gray-900">
                    <Calendar size={16} className="mr-2 text-gray-400" />
                    {distribution.date} {distribution.time}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">ステータス</div>
                  <div className="flex items-center">
                    <CheckCircle size={16} className="mr-2 text-green-600" />
                    <span className="text-gray-900">{distribution.status}</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">配布枚数</div>
                  <div className="flex items-center text-gray-900">
                    <CreditCard size={16} className="mr-2 text-gray-400" />
                    {distribution.cardCount} 枚
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">金額</div>
                  <div className="font-medium text-gray-900">{distribution.totalAmount}</div>
                </div>
              </div>
            </div>

            {/* 店舗情報 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">店舗情報</h2>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-600 mb-1">店舗名</div>
                  <div className="font-medium text-gray-900">{distribution.storeName}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">店舗ID</div>
                  <div className="text-gray-900">{distribution.storeId}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">住所</div>
                  <div className="flex items-start text-gray-900">
                    <MapPin size={16} className="mr-2 text-gray-400 mt-0.5" />
                    {distribution.storeAddress}
                  </div>
                </div>
              </div>
            </div>

            {/* キャンペーン情報 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">キャンペーン情報</h2>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-600 mb-1">キャンペーン名</div>
                  <div className="font-medium text-gray-900">{distribution.campaignName}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">キャンペーンID</div>
                  <div className="text-gray-900">{distribution.campaignId}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">ギフトカード額面</div>
                  <div className="text-gray-900">{distribution.cardAmount}</div>
                </div>
              </div>
            </div>

            {/* ユーザー情報 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">ユーザー情報</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">ユーザーID</div>
                  <div className="text-gray-900">{distribution.userId}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">氏名</div>
                  <div className="flex items-center text-gray-900">
                    <User size={16} className="mr-2 text-gray-400" />
                    {distribution.userName}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">年齢層</div>
                  <div className="text-gray-900">{distribution.userAge}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">性別</div>
                  <div className="text-gray-900">{distribution.userGender}</div>
                </div>
              </div>
            </div>

            {/* アンケート状況 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">アンケート状況</h2>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FileText size={20} className="mr-3 text-gray-400" />
                  <div>
                    <div className="font-medium text-gray-900">
                      {distribution.surveyCompleted ? 'アンケート回答済み' : 'アンケート未回答'}
                    </div>
                    {distribution.surveyCompletedDate && (
                      <div className="text-sm text-gray-600">
                        回答日: {distribution.surveyCompletedDate}
                      </div>
                    )}
                  </div>
                </div>
                {distribution.surveyCompleted && (
                  <Link
                    href={`/advertiser/questionnaires/${distribution.id}`}
                    className="text-blue-600 hover:text-blue-700 text-sm"
                  >
                    回答を見る →
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* 右側: タイムライン */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">配布フロー</h2>
              <div className="relative">
                {timeline.map((item, index) => (
                  <div key={index} className="flex items-start mb-6 last:mb-0">
                    <div className="relative">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        item.status === 'completed' ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        {item.status === 'completed' ? (
                          <CheckCircle size={16} className="text-green-600" />
                        ) : (
                          <Clock size={16} className="text-gray-400" />
                        )}
                      </div>
                      {index < timeline.length - 1 && (
                        <div className="absolute top-8 left-4 w-0.5 h-12 bg-gray-200"></div>
                      )}
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="font-medium text-gray-900 text-sm">{item.event}</div>
                      <div className="text-xs text-gray-500 mt-1">{item.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* デバイス情報 */}
            <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">デバイス情報</h2>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-600 mb-1">デバイス</div>
                  <div className="text-sm text-gray-900">{distribution.deviceInfo}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">IPアドレス</div>
                  <div className="text-sm text-gray-900 font-mono">{distribution.ipAddress}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdvertiserLayout>
  )
}