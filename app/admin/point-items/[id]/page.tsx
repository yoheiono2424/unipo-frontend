"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { ArrowLeft, Edit, Package, Star, Tag, Layers, Clock, BarChart3, AlertCircle } from "lucide-react";
import Link from "next/link";
import { use } from "react";
import { useRouter } from "next/navigation";

const mockPointItems = [
  {
    id: "PI001",
    name: "Amazonギフト券 500円",
    category: "ギフト券",
    requiredPoints: 500,
    stock: 100,
    description: "Amazonで利用可能な500円分のギフト券",
    validityPeriod: "発行から6ヶ月",
    status: "有効",
    exchangeCount: 1234,
    createdDate: "2024-01-01",
    updatedDate: "2025-01-15",
    imageUrl: null,
    terms: "• 本ギフト券は現金との交換はできません\n• 有効期限内にご利用ください\n• 一度交換したポイントは返却できません",
  },
  {
    id: "PI002",
    name: "スターバックスカード 1000円",
    category: "ギフト券",
    requiredPoints: 1000,
    stock: 50,
    description: "スターバックスで利用可能な1000円分のカード",
    validityPeriod: "発行から12ヶ月",
    status: "有効",
    exchangeCount: 892,
    createdDate: "2024-01-01",
    updatedDate: "2025-01-10",
    imageUrl: null,
    terms: "• スターバックス店舗でご利用いただけます\n• オンラインストアでは使用できません\n• 残高の払い戻しはできません",
  },
];

export default function PointItemDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const item = mockPointItems.find(i => i.id === resolvedParams.id) || mockPointItems[0];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case '有効':
        return 'bg-green-50 text-green-700 ring-1 ring-green-600/20';
      case '無効':
        return 'bg-gray-50 text-gray-700 ring-1 ring-gray-600/20';
      case '在庫切れ':
        return 'bg-red-50 text-red-700 ring-1 ring-red-600/20';
      default:
        return 'bg-gray-50 text-gray-700 ring-1 ring-gray-600/20';
    }
  };

  const getStockStatusColor = (stock: number) => {
    if (stock === 0) return 'text-red-600';
    if (stock < 20) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/point-items"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">商品詳細</h1>
              <p className="text-sm text-gray-600 mt-1">商品ID: {item.id}</p>
            </div>
          </div>
          <Link
            href={`/admin/point-items/${item.id}/edit`}
            className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 flex items-center gap-2 transition-colors"
          >
            <Edit className="h-4 w-4" />
            編集
          </Link>
        </div>

        {/* 基本情報 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">基本情報</h2>
          </div>

          <div className="p-6">
            {/* ステータスと商品情報 */}
            <div className="mb-6 pb-6 border-b border-gray-100">
              <div className="flex items-start gap-4">
                <div className="h-20 w-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
                  <Package className="h-10 w-10" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${getStatusBadge(item.status)}`}>
                      {item.status}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-lg font-bold text-indigo-600">{item.requiredPoints} pt</span>
                    </div>
                    <span className={`text-sm font-medium ${getStockStatusColor(item.stock)}`}>
                      在庫: {item.stock.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 詳細情報グリッド */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <Tag className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">カテゴリ</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{item.category}</p>
                  </div>
                </div>
              </div>

              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <Star className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">必要ポイント</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{item.requiredPoints.toLocaleString()} ポイント</p>
                  </div>
                </div>
              </div>

              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <Layers className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">在庫数</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{item.stock.toLocaleString()} 個</p>
                  </div>
                </div>
              </div>

              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <Clock className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">有効期限</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{item.validityPeriod}</p>
                  </div>
                </div>
              </div>

              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <BarChart3 className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">交換実績</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{item.exchangeCount.toLocaleString()} 回</p>
                  </div>
                </div>
              </div>

              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <Clock className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">最終更新日</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{item.updatedDate}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 利用規約 */}
            {item.terms && (
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-start gap-2 mb-3">
                  <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <h3 className="text-lg font-semibold text-gray-900">利用規約・注意事項</h3>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">
                    {item.terms}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}