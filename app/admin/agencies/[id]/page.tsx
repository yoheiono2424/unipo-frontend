"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { ArrowLeft, Edit, Building, User, Phone, Mail, Calendar, Store, TrendingUp, DollarSign, Users } from "lucide-react";
import Link from "next/link";
import { mockAgencies, mockStores } from "@/lib/mock-data";
import { use } from "react";

export default function AgencyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // paramsをアンラップ
  const resolvedParams = use(params);
  const agency = mockAgencies.find(a => a.id === resolvedParams.id) || mockAgencies[0];

  const managedStores = mockStores.filter(s => s.agency === agency.name);

  const stats = {
    totalStores: managedStores.length,
    activeStores: managedStores.filter(s => s.status === '営業中').length,
    totalRevenue: agency.stores * 50000,
    monthlyCommission: Math.floor(agency.stores * 50000 * agency.commissionRate / 100),
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/agencies"
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">代理店詳細</h1>
              <p className="text-sm text-gray-600 mt-1">代理店ID: {agency.id}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link
              href={`/admin/agencies/${agency.id}/edit`}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2"
            >
              <Edit className="h-4 w-4" />
              編集
            </Link>
          </div>
        </div>

        {/* 基本情報 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">基本情報</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <Building className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">代理店名</p>
                <p className="font-medium">{agency.name}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <User className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">担当者名</p>
                <p className="font-medium">{agency.contactName}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">電話番号</p>
                <p className="font-medium">{agency.phone}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">メールアドレス</p>
                <p className="font-medium">{agency.email}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <DollarSign className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">手数料率</p>
                <p className="font-medium">{agency.commissionRate}%</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">登録日</p>
                <p className="font-medium">{agency.registeredDate}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">ステータス</p>
              <span className={`inline-flex px-2 text-xs leading-5 font-semibold rounded-full ${
                agency.status === 'active'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {agency.status === 'active' ? '有効' : '無効'}
              </span>
            </div>
          </div>
        </div>

        {/* 統計情報 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <Store className="h-8 w-8 text-indigo-500" />
            </div>
            <p className="text-2xl font-bold">{stats.totalStores}</p>
            <p className="text-sm text-gray-600">管理店舗数</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
            <p className="text-2xl font-bold">{stats.activeStores}</p>
            <p className="text-sm text-gray-600">営業中店舗</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="h-8 w-8 text-blue-500" />
            </div>
            <p className="text-2xl font-bold">¥{stats.totalRevenue.toLocaleString()}</p>
            <p className="text-sm text-gray-600">月間取扱高</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="h-8 w-8 text-purple-500" />
            </div>
            <p className="text-2xl font-bold">¥{stats.monthlyCommission.toLocaleString()}</p>
            <p className="text-sm text-gray-600">月間手数料</p>
          </div>
        </div>

        {/* 管理店舗一覧 */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">管理店舗一覧</h2>
            <Link
              href="/admin/stores"
              className="text-sm text-indigo-600 hover:text-indigo-700"
            >
              すべて見る →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 text-sm font-medium text-gray-700">店舗ID</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-700">店舗名</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-700">エリア</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-700">カテゴリ</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-700">ステータス</th>
                </tr>
              </thead>
              <tbody>
                {managedStores.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-4 text-center text-gray-500">
                      管理店舗がありません
                    </td>
                  </tr>
                ) : (
                  managedStores.slice(0, 5).map((store) => (
                    <tr key={store.id} className="border-b">
                      <td className="py-2 text-sm text-gray-600">
                        <Link href={`/admin/stores/${store.id}`} className="hover:text-indigo-600">
                          {store.id}
                        </Link>
                      </td>
                      <td className="py-2 text-sm text-gray-600">
                        <Link href={`/admin/stores/${store.id}`} className="hover:text-indigo-600">
                          {store.name}
                        </Link>
                      </td>
                      <td className="py-2 text-sm text-gray-600">{store.area}</td>
                      <td className="py-2 text-sm text-gray-600">{store.category}</td>
                      <td className="py-2">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          store.status === '営業中'
                            ? 'bg-green-100 text-green-800'
                            : store.status === '準備中'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {store.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* 手数料履歴 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">手数料履歴（直近3ヶ月）</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">2025年1月</span>
              <span className="font-medium">¥{stats.monthlyCommission.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">2024年12月</span>
              <span className="font-medium">¥{(stats.monthlyCommission * 0.95).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">2024年11月</span>
              <span className="font-medium">¥{(stats.monthlyCommission * 0.9).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}