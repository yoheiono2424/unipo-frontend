"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { ArrowLeft, Calendar, Gift, MapPin, Tag, CreditCard, User, Hash } from "lucide-react";
import Link from "next/link";
import { use } from "react";

// モックデータ - ギフトカード受取詳細
const mockGiftHistoryDetail = {
  id: "GH001",
  memberId: "MEM001",
  memberName: "田中 太郎",
  receiptDate: "2025-01-28T14:30:00",
  storeName: "東京駅前店",
  storeId: "STR001",
  storeAddress: "東京都千代田区丸の内1-9-1",
  campaignName: "新春ギフトキャンペーン",
  campaignId: "CAM001",
  giftCardAmount: 1000,
  giftCardCode: "ABC123456",
  serialNumber: "1234-5678-9012-3456",
  status: "使用済",
  usedDate: "2025-01-29T10:15:00",
  expiryDate: "2025-12-31",
  issueMethod: "QRコード読み取り",
  deviceInfo: "iOS 17.2 / Safari",
  memo: "新春キャンペーン初日の配布"
};

export default function GiftHistoryDetailPage({ params }: { params: Promise<{ id: string; historyId: string }> }) {
  const resolvedParams = use(params);
  const detail = mockGiftHistoryDetail;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* ヘッダー */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href={`/admin/members/${resolvedParams.id}/gift-history`}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">ギフトカード受取履歴詳細</h1>
              <p className="text-sm text-gray-600 mt-1">履歴ID: {detail.id}</p>
            </div>
          </div>
        </div>

        {/* ギフトカード情報カード */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">ギフトカード情報</h2>
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                detail.status === '有効'
                  ? 'bg-green-100 text-green-700'
                  : detail.status === '使用済'
                  ? 'bg-gray-100 text-gray-700'
                  : 'bg-red-100 text-red-700'
              }`}>
                {detail.status}
              </span>
            </div>
          </div>

          <div className="p-6">
            {/* 金額表示 */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-2">ギフトカード金額</p>
                  <p className="text-4xl font-bold text-purple-600">¥{detail.giftCardAmount.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-white rounded-full">
                  <Gift className="h-8 w-8 text-purple-600" />
                </div>
              </div>
            </div>

            {/* 詳細情報グリッド */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 受取日時 */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Calendar className="h-5 w-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">受取日時</p>
                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {new Date(detail.receiptDate).toLocaleString('ja-JP')}
                  </p>
                </div>
              </div>

              {/* ギフトカードコード */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Hash className="h-5 w-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">ギフトカードコード</p>
                  <p className="mt-1 text-sm font-medium text-gray-900 font-mono">{detail.giftCardCode}</p>
                </div>
              </div>

              {/* シリアル番号 */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <CreditCard className="h-5 w-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">シリアル番号</p>
                  <p className="mt-1 text-sm font-medium text-gray-900 font-mono">{detail.serialNumber}</p>
                </div>
              </div>

              {/* 有効期限 */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Calendar className="h-5 w-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">有効期限</p>
                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {new Date(detail.expiryDate).toLocaleDateString('ja-JP')}
                  </p>
                </div>
              </div>

              {/* 使用日時 */}
              {detail.usedDate && (
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Calendar className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">使用日時</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">
                      {new Date(detail.usedDate).toLocaleString('ja-JP')}
                    </p>
                  </div>
                </div>
              )}

              {/* 会員情報 */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <User className="h-5 w-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">会員</p>
                  <p className="mt-1 text-sm font-medium text-gray-900">{detail.memberName}</p>
                  <p className="text-xs text-gray-500">ID: {detail.memberId}</p>
                </div>
              </div>

              {/* 受取方法 */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Tag className="h-5 w-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">受取方法</p>
                  <p className="mt-1 text-sm font-medium text-gray-900">{detail.issueMethod}</p>
                </div>
              </div>

              {/* デバイス情報 */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Tag className="h-5 w-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">デバイス情報</p>
                  <p className="mt-1 text-sm font-medium text-gray-900">{detail.deviceInfo}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 関連情報 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">関連情報</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 店舗情報 */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <MapPin className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">受取店舗</p>
                  <Link
                    href={`/admin/stores/${detail.storeId}`}
                    className="mt-1 text-sm font-medium text-blue-600 hover:text-blue-700"
                  >
                    {detail.storeName}
                  </Link>
                  <p className="text-xs text-gray-500">ID: {detail.storeId}</p>
                  <p className="text-xs text-gray-500 mt-1">{detail.storeAddress}</p>
                </div>
              </div>

              {/* キャンペーン情報 */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Gift className="h-5 w-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">キャンペーン</p>
                  <Link
                    href={`/admin/campaigns/${detail.campaignId}`}
                    className="mt-1 text-sm font-medium text-purple-600 hover:text-purple-700"
                  >
                    {detail.campaignName}
                  </Link>
                  <p className="text-xs text-gray-500">ID: {detail.campaignId}</p>
                </div>
              </div>
            </div>

            {/* メモ */}
            {detail.memo && (
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm font-medium text-yellow-800 mb-1">メモ</p>
                  <p className="text-sm text-yellow-700">{detail.memo}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}