"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { Plus, Trash2, Package, Star } from "lucide-react";
import Link from "next/link";
import { mockPointItems } from "@/lib/mock-data";

export default function AdminPointItemsPage() {
  const items = mockPointItems;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">ポイント交換商品管理</h1>
            <p className="text-sm text-gray-600 mt-1">ポイント交換商品の登録と管理</p>
          </div>
          <Link
            href="/admin/point-items/create"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            新規商品登録
          </Link>
        </div>

        {/* カテゴリフィルタ */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-indigo-100 text-indigo-600 rounded-lg font-medium">
              すべて
            </button>
            <button className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
              ギフト券
            </button>
            <button className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
              クーポン
            </button>
            <button className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
              商品
            </button>
          </div>
        </div>

        {/* 商品グリッド */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden">
              {/* 商品画像 */}
              <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <Package className="h-16 w-16 text-gray-400" />
              </div>

              {/* 商品情報 */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  <span className="px-2 py-1 text-xs bg-indigo-100 text-indigo-800 rounded">
                    {item.category}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-3">{item.description}</p>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-lg font-bold text-indigo-600">
                      {item.requiredPoints} pt
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    在庫: <span className="font-medium">{item.stock}</span>
                  </div>
                </div>

                {/* 操作ボタン */}
                <div className="flex gap-2 pt-3 border-t">
                  <Link
                    href={`/admin/point-items/${item.id}/edit`}
                    className="flex-1 py-2 px-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-center text-sm font-medium"
                  >
                    編集
                  </Link>
                  <button className="py-2 px-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* 新規追加カード */}
          <Link
            href="/admin/point-items/create"
            className="bg-white rounded-lg shadow overflow-hidden border-2 border-dashed border-gray-300 hover:border-indigo-400 transition-colors"
          >
            <div className="h-full flex flex-col items-center justify-center p-8 text-gray-400 hover:text-indigo-600">
              <Plus className="h-12 w-12 mb-3" />
              <p className="font-medium">新規商品を追加</p>
            </div>
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
}