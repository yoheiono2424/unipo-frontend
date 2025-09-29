"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { ArrowLeft, Save, X, Store, Phone, MapPin, Building2, Hash, Users, Camera, AlertCircle } from "lucide-react";
import Link from "next/link";
import { mockStores } from "@/lib/mock-data";
import { use, useState } from "react";
import { useRouter } from "next/navigation";

export default function StoreEditPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const store = mockStores.find(s => s.id === resolvedParams.id) || mockStores[0];

  const [formData, setFormData] = useState({
    storeNo: store.storeNo,
    status: store.status,
    storeType: store.storeType || '実在店舗',
    serviceStartDate: store.serviceStartDate,
    serviceEndDate: store.serviceEndDate,
    storeName: store.storeName,
    storeNameKana: store.storeNameKana,
    industry: store.industry,
    storeDescription: store.storeDescription,
    postalCode: store.postalCode,
    prefecture: store.prefecture,
    city: store.city,
    streetAddress: store.streetAddress,
    buildingName: store.buildingName,
    phone: store.phone,
    fax: store.fax,
    email: store.email,
    storeUrl: store.storeUrl,
    storePhoto1: store.storePhoto1,
    storePhoto2: store.storePhoto2,
    storePhoto3: store.storePhoto3,
    contactName: store.contactName,
    contactPhone: store.contactPhone,
    billingCompanyName: store.billingCompanyName,
    billingDepartment: store.billingDepartment,
    billingContactName: store.billingContactName,
    billingEmail: store.billingEmail,
    billingPostalCode: store.billingPostalCode,
    billingPrefecture: store.billingPrefecture,
    billingCity: store.billingCity,
    billingStreetAddress: store.billingStreetAddress,
    billingBuildingName: store.billingBuildingName,
    billingPhone: store.billingPhone,
    billingFax: store.billingFax,
    paymentTerms: store.paymentTerms,
    memo1: store.memo1,
    memo2: store.memo2,
    memo3: store.memo3,
    memo4: store.memo4,
    memo5: store.memo5,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ここで保存処理を行う（実際にはAPIコール等）
    console.log("保存データ:", formData);
    // 詳細ページに戻る
    router.push(`/admin/stores/${resolvedParams.id}`);
  };

  const handleCancel = () => {
    router.push(`/admin/stores/${resolvedParams.id}`);
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Link
            href={`/admin/stores/${resolvedParams.id}`}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">店舗情報編集</h1>
            <p className="text-sm text-gray-600 mt-1">店舗ID: {store.id} | 店舗NO: {store.storeNo}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 基本情報セクション */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Hash className="h-5 w-5 text-blue-500" />
                <h2 className="text-lg font-semibold text-gray-900">基本情報</h2>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    店舗NO <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.storeNo}
                    onChange={(e) => setFormData({ ...formData, storeNo: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ステータス <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    required
                  >
                    <option value="営業中">営業中</option>
                    <option value="準備中">準備中</option>
                    <option value="休業中">休業中</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    サービス開始日
                  </label>
                  <input
                    type="date"
                    value={formData.serviceStartDate ? formData.serviceStartDate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3') : ''}
                    onChange={(e) => setFormData({ ...formData, serviceStartDate: e.target.value.replace(/-/g, '') })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    サービス終了日
                  </label>
                  <input
                    type="date"
                    value={formData.serviceEndDate ? formData.serviceEndDate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3') : ''}
                    onChange={(e) => setFormData({ ...formData, serviceEndDate: e.target.value.replace(/-/g, '') })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    業種 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    店舗種別 <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="実在店舗"
                        checked={formData.storeType === '実在店舗'}
                        onChange={(e) => setFormData({ ...formData, storeType: e.target.value })}
                        className="mr-2"
                      />
                      <span className="text-gray-900">実在店舗</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="架空店舗"
                        checked={formData.storeType === '架空店舗'}
                        onChange={(e) => setFormData({ ...formData, storeType: e.target.value })}
                        className="mr-2"
                      />
                      <span className="text-gray-900">架空店舗</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 店舗情報セクション */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Store className="h-5 w-5 text-green-500" />
                <h2 className="text-lg font-semibold text-gray-900">店舗情報</h2>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    店舗名 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.storeName}
                    onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    店舗名（カナ） <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.storeNameKana}
                    onChange={(e) => setFormData({ ...formData, storeNameKana: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    店舗説明文
                  </label>
                  <textarea
                    value={formData.storeDescription}
                    onChange={(e) => setFormData({ ...formData, storeDescription: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    placeholder="店舗の詳細説明を入力してください"
                  />
                </div>
              </div>

              {/* 住所情報 */}
              <div className="border-t pt-6">
                <h3 className="text-md font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  住所情報
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      郵便番号 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                      placeholder="1234567"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      都道府県 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.prefecture}
                      onChange={(e) => setFormData({ ...formData, prefecture: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      市区町村 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      町名・番地 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.streetAddress}
                      onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      建物名・部屋番号
                    </label>
                    <input
                      type="text"
                      value={formData.buildingName}
                      onChange={(e) => setFormData({ ...formData, buildingName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    />
                  </div>
                </div>
              </div>

              {/* 連絡先情報 */}
              <div className="border-t pt-6">
                <h3 className="text-md font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  連絡先情報
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      電話番号 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      FAX番号
                    </label>
                    <input
                      type="tel"
                      value={formData.fax}
                      onChange={(e) => setFormData({ ...formData, fax: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      メールアドレス <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      店舗URL
                    </label>
                    <input
                      type="url"
                      value={formData.storeUrl}
                      onChange={(e) => setFormData({ ...formData, storeUrl: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                      placeholder="https://"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 店舗写真セクション */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-purple-500" />
                <h2 className="text-lg font-semibold text-gray-900">店舗写真</h2>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    写真1
                  </label>
                  <input
                    type="text"
                    value={formData.storePhoto1}
                    onChange={(e) => setFormData({ ...formData, storePhoto1: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    placeholder="画像URLを入力"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    写真2
                  </label>
                  <input
                    type="text"
                    value={formData.storePhoto2}
                    onChange={(e) => setFormData({ ...formData, storePhoto2: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    placeholder="画像URLを入力"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    写真3
                  </label>
                  <input
                    type="text"
                    value={formData.storePhoto3}
                    onChange={(e) => setFormData({ ...formData, storePhoto3: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    placeholder="画像URLを入力"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 担当者情報セクション */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-orange-500" />
                <h2 className="text-lg font-semibold text-gray-900">担当者情報</h2>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    担当者氏名
                  </label>
                  <input
                    type="text"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    担当者電話番号
                  </label>
                  <input
                    type="tel"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 請求先情報セクション */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900">請求先情報</h2>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    請求先企業名
                  </label>
                  <input
                    type="text"
                    value={formData.billingCompanyName}
                    onChange={(e) => setFormData({ ...formData, billingCompanyName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    請求先部署名
                  </label>
                  <input
                    type="text"
                    value={formData.billingDepartment}
                    onChange={(e) => setFormData({ ...formData, billingDepartment: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    請求先担当者名
                  </label>
                  <input
                    type="text"
                    value={formData.billingContactName}
                    onChange={(e) => setFormData({ ...formData, billingContactName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    支払条件
                  </label>
                  <select
                    value={formData.paymentTerms}
                    onChange={(e) => setFormData({ ...formData, paymentTerms: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                  >
                    <option value="翌月末払い">翌月末払い</option>
                    <option value="翌々月末払い">翌々月末払い</option>
                    <option value="当月末払い">当月末払い</option>
                    <option value="その他">その他</option>
                  </select>
                </div>
              </div>

              {/* 請求先メールアドレス */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  請求先メールアドレス
                </label>
                <input
                  type="email"
                  value={formData.billingEmail}
                  onChange={(e) => setFormData({ ...formData, billingEmail: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                />
              </div>

              {/* 請求先住所 */}
              <div className="border-t pt-6">
                <h3 className="text-md font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  請求先住所
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      郵便番号
                    </label>
                    <input
                      type="text"
                      value={formData.billingPostalCode}
                      onChange={(e) => setFormData({ ...formData, billingPostalCode: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                      placeholder="1234567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      都道府県
                    </label>
                    <input
                      type="text"
                      value={formData.billingPrefecture}
                      onChange={(e) => setFormData({ ...formData, billingPrefecture: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      市区町村
                    </label>
                    <input
                      type="text"
                      value={formData.billingCity}
                      onChange={(e) => setFormData({ ...formData, billingCity: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      町名・番地
                    </label>
                    <input
                      type="text"
                      value={formData.billingStreetAddress}
                      onChange={(e) => setFormData({ ...formData, billingStreetAddress: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      建物名・部屋番号
                    </label>
                    <input
                      type="text"
                      value={formData.billingBuildingName}
                      onChange={(e) => setFormData({ ...formData, billingBuildingName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    />
                  </div>
                </div>
              </div>

              {/* 請求先連絡先 */}
              <div className="border-t pt-6">
                <h3 className="text-md font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  請求先連絡先
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      請求先電話番号
                    </label>
                    <input
                      type="tel"
                      value={formData.billingPhone}
                      onChange={(e) => setFormData({ ...formData, billingPhone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      請求先FAX番号
                    </label>
                    <input
                      type="tel"
                      value={formData.billingFax}
                      onChange={(e) => setFormData({ ...formData, billingFax: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 運営メモセクション */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <h2 className="text-lg font-semibold text-gray-900">運営メモ（機密情報）</h2>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {[1, 2, 3, 4, 5].map((num) => (
                <div key={num}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    メモ{num}
                  </label>
                  <textarea
                    value={formData[`memo${num}` as keyof typeof formData] as string}
                    onChange={(e) => setFormData({ ...formData, [`memo${num}`]: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    placeholder={`機密メモ${num}を入力してください`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* 保存ボタン */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 sticky bottom-0">
            <div className="p-6">
              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-colors font-medium"
                >
                  <X className="h-5 w-5" />
                  キャンセル
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2 transition-colors font-medium shadow-lg"
                >
                  <Save className="h-5 w-5" />
                  保存
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}