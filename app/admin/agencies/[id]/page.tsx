"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { ArrowLeft, Edit, Building, User, Phone, Mail, Calendar, Store, DollarSign, Shield, MapPin, Search } from "lucide-react";
import Link from "next/link";
import { mockAgencies, mockStores, mockAdvertisers } from "@/lib/mock-data";
import { use, useState } from "react";

export default function AgencyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // paramsをアンラップ
  const resolvedParams = use(params);
  const agency = mockAgencies.find(a => a.id === resolvedParams.id) || mockAgencies[0];
  const [storeSearchTerm, setStoreSearchTerm] = useState("");

  const managedStores = mockStores.filter(s => s.agency === agency.name);

  // この代理店に紐づく広告主を取得（広告主IDの昇順）
  const managedAdvertisers = mockAdvertisers
    .filter(a => a.agencyId === agency.id)
    .sort((a, b) => a.id.localeCompare(b.id));

  // 検索フィルタリング
  const filteredStores = managedStores.filter(store =>
    storeSearchTerm === "" || store.name.toLowerCase().includes(storeSearchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/agencies"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">代理店詳細</h1>
              <p className="text-sm text-gray-600 mt-1">代理店ID: {agency.id}</p>
            </div>
          </div>
          <Link
            href={`/admin/agencies/${agency.id}/edit`}
            className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 flex items-center gap-2 transition-colors"
          >
            <Edit className="h-4 w-4" />
            編集
          </Link>
        </div>

        {/* 基本情報 - 改善されたデザイン */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">基本情報</h2>
          </div>

          <div className="p-6">
            {/* ステータスバッジ */}
            <div className="mb-6 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white">
                  <Building className="h-8 w-8" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">{agency.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">管理店舗数: {agency.stores}店舗</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${
                      agency.status === 'active'
                        ? 'bg-green-50 text-green-700 ring-1 ring-green-600/20'
                        : 'bg-gray-50 text-gray-700 ring-1 ring-gray-600/20'
                    }`}>
                      <Shield className="h-3 w-3 mr-1" />
                      {agency.status === 'active' ? 'アクティブ' : '無効'}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-indigo-50 text-indigo-700 ring-1 ring-indigo-600/20">
                      手数料率: {agency.commissionRate}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 情報グリッド */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <Building className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">代理店名</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{agency.name}</p>
                  </div>
                </div>
              </div>

              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <User className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">担当者名</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{agency.contactName}</p>
                  </div>
                </div>
              </div>

              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <Phone className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">電話番号</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{agency.phone}</p>
                  </div>
                </div>
              </div>

              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <Mail className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">メールアドレス</p>
                    <p className="mt-1 text-sm font-medium text-gray-900 break-all">{agency.email}</p>
                  </div>
                </div>
              </div>

              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <MapPin className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">住所</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{agency.address || "未登録"}</p>
                  </div>
                </div>
              </div>

              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <DollarSign className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">手数料率</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{agency.commissionRate}%</p>
                  </div>
                </div>
              </div>

              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <Store className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">管理店舗数</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{agency.stores} 店舗</p>
                  </div>
                </div>
              </div>

              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <Calendar className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">登録日</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{agency.registeredDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 管理店舗一覧 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900">管理店舗一覧</h2>
            </div>

            {/* 店舗名検索フィルター */}
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="店舗名で検索..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm text-gray-900"
                  value={storeSearchTerm}
                  onChange={(e) => setStoreSearchTerm(e.target.value)}
                />
              </div>
              {storeSearchTerm && (
                <div className="text-sm text-gray-600">
                  {filteredStores.length}件 / {managedStores.length}件中
                </div>
              )}
            </div>
          </div>
          <div className="p-6">
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
                  {filteredStores.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-4 text-center text-gray-500">
                        {storeSearchTerm ? "検索条件に一致する店舗がありません" : "管理店舗がありません"}
                      </td>
                    </tr>
                  ) : (
                    filteredStores.slice(0, 10).map((store) => (
                      <tr key={store.id} className="border-b hover:bg-gray-50 transition-colors">
                        <td className="py-3 text-sm text-gray-600">
                          <Link href={`/admin/stores/${store.id}`} className="hover:text-indigo-600 font-medium">
                            {store.id}
                          </Link>
                        </td>
                        <td className="py-3 text-sm text-gray-600">
                          <Link href={`/admin/stores/${store.id}`} className="hover:text-indigo-600 font-medium">
                            {store.name}
                          </Link>
                        </td>
                        <td className="py-3 text-sm text-gray-600">{store.area}</td>
                        <td className="py-3 text-sm text-gray-600">{store.category}</td>
                        <td className="py-3">
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

            {/* 検索結果の詳細情報 */}
            {managedStores.length > 0 && (
              <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
                <div>
                  {storeSearchTerm ? (
                    <span>
                      「{storeSearchTerm}」の検索結果: {filteredStores.length}件 / 全{managedStores.length}件
                    </span>
                  ) : (
                    <span>全{managedStores.length}件中 {Math.min(10, filteredStores.length)}件を表示</span>
                  )}
                </div>
                {filteredStores.length > 10 && (
                  <Link
                    href="/admin/stores"
                    className="text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    すべて表示 ({filteredStores.length}件) →
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>

        {/* 広告主一覧 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">広告主一覧</h2>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 text-sm font-medium text-gray-700">広告主ID</th>
                    <th className="text-left py-2 text-sm font-medium text-gray-700">広告主名</th>
                    <th className="text-left py-2 text-sm font-medium text-gray-700">ステータス</th>
                    <th className="text-left py-2 text-sm font-medium text-gray-700">登録日</th>
                  </tr>
                </thead>
                <tbody>
                  {managedAdvertisers.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-4 text-center text-gray-500">
                        管理広告主がありません
                      </td>
                    </tr>
                  ) : (
                    managedAdvertisers.map((advertiser) => (
                      <tr key={advertiser.id} className="border-b hover:bg-gray-50 transition-colors">
                        <td className="py-3 text-sm text-gray-600 font-medium">
                          {advertiser.id}
                        </td>
                        <td className="py-3 text-sm text-gray-600">
                          <Link href={`/admin/advertisers/${advertiser.id}`} className="hover:text-indigo-600 font-medium">
                            {advertiser.companyName}
                          </Link>
                        </td>
                        <td className="py-3">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            advertiser.status === '承認済み'
                              ? 'bg-green-100 text-green-800'
                              : advertiser.status === '審査中'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {advertiser.status}
                          </span>
                        </td>
                        <td className="py-3 text-sm text-gray-600">
                          {advertiser.registeredDate ? new Date(advertiser.registeredDate).toLocaleDateString('ja-JP') : "—"}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* 件数表示 */}
            {managedAdvertisers.length > 0 && (
              <div className="mt-4 text-sm text-gray-600">
                全{managedAdvertisers.length}件
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}