"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { ArrowLeft, Edit, Building2, User, Phone, Mail, Calendar, MapPin, Store, CheckCircle, XCircle, Shield, Search } from "lucide-react";
import Link from "next/link";
import { use, useState } from "react";

type Company = {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  contactName: string;
  status: string;
  stores: number;
  registeredDate: string;
};

const mockCompanies: Company[] = [
  {
    id: "CMP001",
    name: "株式会社ABC商事",
    address: "東京都渋谷区道玄坂1-2-3",
    phone: "03-1234-5678",
    email: "contact@abc.co.jp",
    contactName: "山田太郎",
    status: "承認済み",
    stores: 15,
    registeredDate: "2024-01-15",
  },
  {
    id: "CMP002",
    name: "XYZ株式会社",
    address: "大阪府大阪市北区梅田2-3-4",
    phone: "06-8765-4321",
    email: "info@xyz.jp",
    contactName: "佐藤花子",
    status: "審査中",
    stores: 8,
    registeredDate: "2024-02-20",
  },
  {
    id: "CMP003",
    name: "グローバルフーズ株式会社",
    address: "東京都新宿区西新宿3-4-5",
    phone: "03-9876-5432",
    email: "admin@globalfoods.jp",
    contactName: "田中一郎",
    status: "承認済み",
    stores: 23,
    registeredDate: "2024-01-10",
  },
];

// モック店舗データ
const mockStores = [
  {
    storeId: "STR001",
    storeName: "カフェ モカ 渋谷店",
    agencyId: "AGN001",
    agencyName: "株式会社マーケティングプロ",
    category: "飲食店",
    area: "渋谷",
  },
  {
    storeId: "STR002",
    storeName: "レストラン サクラ 新宿店",
    agencyId: "AGN002",
    agencyName: "広告代理店XYZ",
    category: "飲食店",
    area: "新宿",
  },
  {
    storeId: "STR003",
    storeName: "ブティック ローズ 表参道店",
    agencyId: "AGN001",
    agencyName: "株式会社マーケティングプロ",
    category: "アパレル",
    area: "表参道",
  },
  {
    storeId: "STR004",
    storeName: "パン屋 クロワッサン 吉祥寺店",
    agencyId: "AGN003",
    agencyName: "デジタル広告社",
    category: "飲食店",
    area: "吉祥寺",
  },
  {
    storeId: "STR005",
    storeName: "美容室 シャイン 銀座店",
    agencyId: "AGN002",
    agencyName: "広告代理店XYZ",
    category: "美容",
    area: "銀座",
  },
];

// ドロップダウン用のマスターデータ
const areas = ["全て", "渋谷", "新宿", "表参道", "吉祥寺", "銀座", "原宿", "池袋"];
const categories = ["全て", "飲食店", "アパレル", "美容", "雑貨", "その他"];

export default function CompanyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const company = mockCompanies.find(c => c.id === resolvedParams.id) || mockCompanies[0];

  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [approvalAction, setApprovalAction] = useState<'approve' | 'reject' | null>(null);
  const [approvalReason, setApprovalReason] = useState("");

  // 担当店舗の検索フィルター
  const [storeNameFilter, setStoreNameFilter] = useState("");
  const [agencyNameFilter, setAgencyNameFilter] = useState("");
  const [areaFilter, setAreaFilter] = useState("全て");
  const [categoryFilter, setCategoryFilter] = useState("全て");

  // フィルタリングされた店舗リスト
  const filteredStores = mockStores.filter(store => {
    const matchesStoreName = !storeNameFilter || store.storeName.toLowerCase().includes(storeNameFilter.toLowerCase());
    const matchesAgencyName = !agencyNameFilter || store.agencyName.toLowerCase().includes(agencyNameFilter.toLowerCase());
    const matchesArea = areaFilter === "全て" || store.area === areaFilter;
    const matchesCategory = categoryFilter === "全て" || store.category === categoryFilter;

    return matchesStoreName && matchesAgencyName && matchesArea && matchesCategory;
  });

  const handleApprovalAction = () => {
    // 審査承認/却下処理（実際にはAPIコール）
    console.log("審査アクション:", { action: approvalAction, reason: approvalReason });
    setShowApprovalModal(false);
    setApprovalReason("");
    setApprovalAction(null);
  };

  const openApprovalModal = (action: 'approve' | 'reject') => {
    setApprovalAction(action);
    setShowApprovalModal(true);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/companies"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">企業詳細</h1>
              <p className="text-sm text-gray-600 mt-1">企業ID: {company.id}</p>
            </div>
          </div>
          <div className="flex gap-3">
            {company.status === '審査中' && (
              <>
                <button
                  onClick={() => openApprovalModal('approve')}
                  className="bg-green-600 text-white px-5 py-2.5 rounded-lg hover:bg-green-700 flex items-center gap-2 transition-colors"
                >
                  <CheckCircle className="h-4 w-4" />
                  承認
                </button>
                <button
                  onClick={() => openApprovalModal('reject')}
                  className="bg-red-600 text-white px-5 py-2.5 rounded-lg hover:bg-red-700 flex items-center gap-2 transition-colors"
                >
                  <XCircle className="h-4 w-4" />
                  却下
                </button>
              </>
            )}
            <Link
              href={`/admin/companies/${company.id}/edit`}
              className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 flex items-center gap-2 transition-colors"
            >
              <Edit className="h-4 w-4" />
              編集
            </Link>
          </div>
        </div>

        {/* 基本情報 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">基本情報</h2>
          </div>

          <div className="p-6">
            {/* ステータスバッジ */}
            <div className="mb-6 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white">
                  <Building2 className="h-8 w-8" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">{company.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">管理店舗数: {company.stores}店舗</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${
                      company.status === '承認済み'
                        ? 'bg-green-50 text-green-700 ring-1 ring-green-600/20'
                        : company.status === '審査中'
                        ? 'bg-yellow-50 text-yellow-700 ring-1 ring-yellow-600/20'
                        : 'bg-red-50 text-red-700 ring-1 ring-red-600/20'
                    }`}>
                      <Shield className="h-3 w-3 mr-1" />
                      {company.status}
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
                    <Building2 className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">企業名</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{company.name}</p>
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
                    <p className="mt-1 text-sm font-medium text-gray-900">{company.contactName}</p>
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
                    <p className="mt-1 text-sm font-medium text-gray-900">{company.phone}</p>
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
                    <p className="mt-1 text-sm font-medium text-gray-900 break-all">{company.email}</p>
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
                    <p className="mt-1 text-sm font-medium text-gray-900">{company.address}</p>
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
                    <p className="mt-1 text-sm font-medium text-gray-900">{company.stores} 店舗</p>
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
                    <p className="mt-1 text-sm font-medium text-gray-900">{company.registeredDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 担当店舗セクション */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Store className="h-5 w-5 text-blue-500" />
              <h2 className="text-lg font-semibold text-gray-900">担当店舗</h2>
              <span className="ml-2 text-sm text-gray-500">({filteredStores.length}店舗)</span>
            </div>
          </div>

          {/* 検索フィルター */}
          <div className="p-6 bg-gray-50 border-b border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  店舗名
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    value={storeNameFilter}
                    onChange={(e) => setStoreNameFilter(e.target.value)}
                    placeholder="店舗名を検索"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  代理店名
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    value={agencyNameFilter}
                    onChange={(e) => setAgencyNameFilter(e.target.value)}
                    placeholder="代理店名を検索"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  エリア
                </label>
                <select
                  value={areaFilter}
                  onChange={(e) => setAreaFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                >
                  {areas.map(area => (
                    <option key={area} value={area}>{area}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  カテゴリ
                </label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* 店舗一覧テーブル */}
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">店舗ID</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">店舗名</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">代理店ID</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">代理店名</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">カテゴリ</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">エリア</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStores.length > 0 ? (
                    filteredStores.map((store, index) => (
                      <tr key={store.storeId} className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                      }`}>
                        <td className="py-3 px-4 text-sm text-gray-600">{store.storeId}</td>
                        <td className="py-3 px-4">
                          <Link
                            href={`/admin/stores/${store.storeId}`}
                            className="text-sm font-medium text-indigo-600 hover:text-indigo-800 hover:underline"
                          >
                            {store.storeName}
                          </Link>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">{store.agencyId}</td>
                        <td className="py-3 px-4">
                          <Link
                            href={`/admin/agencies/${store.agencyId}`}
                            className="text-sm text-indigo-600 hover:text-indigo-800 hover:underline"
                          >
                            {store.agencyName}
                          </Link>
                        </td>
                        <td className="py-3 px-4 text-sm">
                          <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                            {store.category}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm">
                          <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                            {store.area}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-gray-500">
                        該当する店舗が見つかりません
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* 審査承認/却下モーダル */}
      {showApprovalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">
              {approvalAction === 'approve' ? '審査承認' : '審査却下'}
            </h3>
            <div className="space-y-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">企業名</p>
                <p className="font-medium">{company.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {approvalAction === 'approve' ? '承認理由（任意）' : '却下理由'}
                </label>
                <textarea
                  value={approvalReason}
                  onChange={(e) => setApprovalReason(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder={approvalAction === 'approve'
                    ? "例: 審査基準をすべて満たしています"
                    : "例: 必要書類が不足しています"}
                  rows={3}
                  required={approvalAction === 'reject'}
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowApprovalModal(false);
                  setApprovalReason("");
                  setApprovalAction(null);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                キャンセル
              </button>
              <button
                onClick={handleApprovalAction}
                disabled={approvalAction === 'reject' && !approvalReason}
                className={`flex-1 px-4 py-2 text-white rounded-lg ${
                  approvalAction === 'approve'
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-red-600 hover:bg-red-700'
                } disabled:bg-gray-400 disabled:cursor-not-allowed`}
              >
                {approvalAction === 'approve' ? '承認する' : '却下する'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}