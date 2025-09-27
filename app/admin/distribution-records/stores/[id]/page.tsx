"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { mockStoreDistributions } from "@/lib/mock-data";
import {
  ArrowLeft,
  Store,
  MapPin,
  Briefcase,
  Calendar,
  Package,
  TrendingUp,
  Gift
} from "lucide-react";

export default function StoreDistributionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const storeId = params.id as string;

  // モックデータから該当店舗を検索
  const storeData = mockStoreDistributions.find(store => store.storeId === storeId);

  if (!storeData) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500 mb-4">店舗データが見つかりません</p>
            <button
              onClick={() => router.push('/admin/distributions')}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              配布実績管理に戻る
            </button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* ヘッダー */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.push('/admin/distributions')}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              戻る
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">店舗配布実績詳細</h1>
              <p className="text-sm text-gray-600 mt-1">{storeData.storeName}の配布実績詳細</p>
            </div>
          </div>
        </div>

        {/* 基本情報カード */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">基本情報</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <Store className="h-5 w-5 text-gray-400 mt-0.5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">店舗ID</p>
                  <p className="text-base text-gray-900 mt-1">{storeData.storeId}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <Store className="h-5 w-5 text-gray-400 mt-0.5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">店舗名</p>
                  <p className="text-base text-gray-900 mt-1">{storeData.storeName}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">エリア</p>
                  <p className="text-base text-gray-900 mt-1">{storeData.area}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 配布統計カード */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">割り当て枚数</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {storeData.allocatedCount.toLocaleString()}枚
                </p>
              </div>
              <Package className="h-8 w-8 text-indigo-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">配布枚数</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {storeData.distributedCount.toLocaleString()}枚
                </p>
              </div>
              <Gift className="h-8 w-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">在庫数</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {storeData.inventoryCount.toLocaleString()}枚
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-500" />
            </div>
          </div>
        </div>

        {/* 配布進捗 */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">配布進捗</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">配布率</span>
                  <span className="font-medium text-gray-900">
                    {Math.round((storeData.distributedCount / storeData.allocatedCount) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-indigo-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${(storeData.distributedCount / storeData.allocatedCount) * 100}%` }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500">配布済み</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {storeData.distributedCount.toLocaleString()}枚
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500">残り</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {storeData.inventoryCount.toLocaleString()}枚
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* アクションボタン */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => router.push(`/admin/stores/${storeId}`)}
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            店舗詳細を見る
          </button>
          <button
            onClick={() => router.push('/admin/distributions')}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            配布実績一覧に戻る
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}