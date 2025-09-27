"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { ArrowLeft, Calendar, CreditCard, Gift, MapPin, Tag } from "lucide-react";
import Link from "next/link";
import { use } from "react";

// モックデータ - 詳細情報
const mockPointHistoryDetail = {
  id: "PH001",
  memberId: "MEM001",
  memberName: "田中 太郎",
  acquisitionDate: "2025-01-28T10:30:00",
  acquisitionTrigger: "来店",
  points: 100,
  storeName: "東京駅前店",
  storeId: "STR001",
  campaignName: "新春キャンペーン",
  campaignId: "CAM001",
  expiryDate: "2026-03-31",
  status: "有効",
  memo: "新春キャンペーン特典ポイント"
};

export default function PointHistoryDetailPage({ params }: { params: Promise<{ id: string; historyId: string }> }) {
  const resolvedParams = use(params);
  const detail = mockPointHistoryDetail;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* ヘッダー */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href={`/admin/members/${resolvedParams.id}/point-history`}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">ポイント獲得履歴詳細</h1>
              <p className="text-sm text-gray-600 mt-1">履歴ID: {detail.id}</p>
            </div>
          </div>
        </div>

        {/* ポイント獲得情報カード */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">ポイント獲得情報</h2>
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
            {/* ポイント表示 */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-2">獲得ポイント</p>
                  <p className="text-4xl font-bold text-green-600">+{detail.points} pt</p>
                </div>
                <div className="p-4 bg-white rounded-full">
                  <CreditCard className="h-8 w-8 text-green-600" />
                </div>
              </div>
            </div>

            {/* 詳細情報グリッド */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 獲得日時 */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Calendar className="h-5 w-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">獲得日時</p>
                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {new Date(detail.acquisitionDate).toLocaleString('ja-JP')}
                  </p>
                </div>
              </div>

              {/* 獲得契機 */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Tag className="h-5 w-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">獲得契機</p>
                  <p className="mt-1">
                    <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                      detail.acquisitionTrigger === '来店'
                        ? 'bg-blue-100 text-blue-700'
                        : detail.acquisitionTrigger === 'ギフトカード受取'
                        ? 'bg-purple-100 text-purple-700'
                        : detail.acquisitionTrigger === 'アンケート回答'
                        ? 'bg-green-100 text-green-700'
                        : detail.acquisitionTrigger === '友達紹介'
                        ? 'bg-orange-100 text-orange-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {detail.acquisitionTrigger}
                    </span>
                  </p>
                </div>
              </div>

              {/* 会員情報 */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Tag className="h-5 w-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">会員</p>
                  <p className="mt-1 text-sm font-medium text-gray-900">{detail.memberName}</p>
                  <p className="text-xs text-gray-500">ID: {detail.memberId}</p>
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
            </div>
          </div>
        </div>

        {/* 関連情報 */}
        {(detail.storeName || detail.campaignName) && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">関連情報</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 店舗情報 */}
                {detail.storeName && (
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <MapPin className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">関連店舗</p>
                      <Link
                        href={`/admin/stores/${detail.storeId}`}
                        className="mt-1 text-sm font-medium text-blue-600 hover:text-blue-700"
                      >
                        {detail.storeName}
                      </Link>
                      <p className="text-xs text-gray-500">ID: {detail.storeId}</p>
                    </div>
                  </div>
                )}

                {/* キャンペーン情報 */}
                {detail.campaignName && (
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
                )}
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
        )}
      </div>
    </AdminLayout>
  );
}