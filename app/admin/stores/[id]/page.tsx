"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { ArrowLeft, Edit, Store, Phone, Mail, MapPin, Clock, Building2, Hash, Shield, Tag, Users, Globe, Camera, FileText, AlertCircle, Calendar } from "lucide-react";
import Link from "next/link";
import { mockStores } from "@/lib/mock-data";
import { use } from "react";

export default function StoreDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // paramsをアンラップ
  const resolvedParams = use(params);
  // モックデータから該当店舗を取得
  const store = mockStores.find(s => s.id === resolvedParams.id) || mockStores[0];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/stores"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">加盟店詳細</h1>
              <p className="text-sm text-gray-600 mt-1">加盟店ID: {store.id} | 加盟店NO: {store.storeNo}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link
              href={`/admin/stores/${store.id}/edit`}
              className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 flex items-center gap-2 transition-colors"
            >
              <Edit className="h-4 w-4" />
              編集
            </Link>
          </div>
        </div>

        <div className="space-y-6">
          {/* ステータスヘッダー */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white">
                  <Store className="h-8 w-8" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">{store.storeName}</h3>
                  <p className="text-sm text-gray-600 mt-1">{store.storeNameKana}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${
                      store.status === '営業中'
                        ? 'bg-green-50 text-green-700 ring-1 ring-green-600/20'
                        : store.status === '準備中'
                        ? 'bg-yellow-50 text-yellow-700 ring-1 ring-yellow-600/20'
                        : 'bg-red-50 text-red-700 ring-1 ring-red-600/20'
                    }`}>
                      <Shield className="h-3 w-3 mr-1" />
                      {store.status}
                    </span>
                    <span className="text-xs text-gray-500">
                      利用期間: {store.serviceStartDate?.replace(/(\d{4})(\d{2})(\d{2})/, '$1/$2/$3')} - {store.serviceEndDate?.replace(/(\d{4})(\d{2})(\d{2})/, '$1/$2/$3')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 基本情報セクション */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">基本情報</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                      <Hash className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">加盟店NO</p>
                      <p className="mt-1 text-sm font-medium text-gray-900">{store.storeNo}</p>
                    </div>
                  </div>
                </div>

                <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                      <Building2 className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">業種</p>
                      <p className="mt-1 text-sm font-medium text-gray-900">{store.industry}</p>
                    </div>
                  </div>
                </div>

                <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                      <Calendar className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">登録日時</p>
                      <p className="mt-1 text-sm font-medium text-gray-900">
                        {store.registeredDate ? new Date(store.registeredDate).toLocaleString('ja-JP') : "—"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                      <Calendar className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">最終更新</p>
                      <p className="mt-1 text-sm font-medium text-gray-900">
                        {store.lastUpdatedDate ? new Date(store.lastUpdatedDate).toLocaleString('ja-JP') : "—"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 加盟店情報セクション */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">加盟店情報</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 gap-6">
                <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                      <Store className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">加盟店名</p>
                      <p className="mt-1 text-sm font-medium text-gray-900">{store.storeName}</p>
                    </div>
                  </div>
                </div>

                <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                      <Store className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">加盟店名（カナ）</p>
                      <p className="mt-1 text-sm font-medium text-gray-900">{store.storeNameKana}</p>
                    </div>
                  </div>
                </div>

                <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                      <FileText className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">加盟店説明文</p>
                      <p className="mt-1 text-sm text-gray-900 leading-relaxed">{store.storeDescription}</p>
                    </div>
                  </div>
                </div>

                <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                      <MapPin className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">加盟店住所</p>
                      <p className="mt-1 text-sm font-medium text-gray-900">
                        〒{store.postalCode?.replace(/(\d{3})(\d{4})/, '$1-$2')} {store.prefecture}{store.city}{store.streetAddress} {store.buildingName}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                        <Phone className="h-5 w-5 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">電話番号</p>
                        <p className="mt-1 text-sm font-medium text-gray-900">
                          {store.phone?.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                        <Phone className="h-5 w-5 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">FAX番号</p>
                        <p className="mt-1 text-sm font-medium text-gray-900">
                          {store.fax?.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')}
                        </p>
                      </div>
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
                      <p className="mt-1 text-sm font-medium text-gray-900 break-all">{store.email}</p>
                    </div>
                  </div>
                </div>

                <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                      <Globe className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">加盟店URL</p>
                      <a href={store.storeUrl} target="_blank" rel="noopener noreferrer" className="mt-1 text-sm font-medium text-blue-600 hover:text-blue-800 break-all">
                        {store.storeUrl}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 加盟店写真セクション */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-blue-500" />
                <h2 className="text-lg font-semibold text-gray-900">加盟店写真</h2>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[store.storePhoto1, store.storePhoto2, store.storePhoto3].map((photo, index) => (
                  <div key={index} className="group">
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      {photo ? (
                        <img
                          src={photo}
                          alt={`${store.storeName} 写真${index + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <Camera className="h-12 w-12" />
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-2 text-center">写真{index + 1}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 連絡先情報セクション */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">連絡先情報</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                      <Users className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">担当者氏名</p>
                      <p className="mt-1 text-sm font-medium text-gray-900">{store.contactName}</p>
                    </div>
                  </div>
                </div>

                <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                      <Phone className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">担当者電話番号</p>
                      <p className="mt-1 text-sm font-medium text-gray-900">
                        {store.contactPhone?.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 請求先情報セクション */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">請求先情報</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                        <Building2 className="h-5 w-5 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">請求先企業名</p>
                        <p className="mt-1 text-sm font-medium text-gray-900">{store.billingCompanyName}</p>
                      </div>
                    </div>
                  </div>

                  <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                        <Building2 className="h-5 w-5 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">請求先部署名</p>
                        <p className="mt-1 text-sm font-medium text-gray-900">{store.billingDepartment}</p>
                      </div>
                    </div>
                  </div>

                  <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                        <Users className="h-5 w-5 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">請求先担当者名</p>
                        <p className="mt-1 text-sm font-medium text-gray-900">{store.billingContactName}</p>
                      </div>
                    </div>
                  </div>

                  <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                        <Tag className="h-5 w-5 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">支払条件</p>
                        <p className="mt-1 text-sm font-medium text-gray-900">{store.paymentTerms}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                      <Mail className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">請求先メールアドレス</p>
                      <p className="mt-1 text-sm font-medium text-gray-900 break-all">{store.billingEmail}</p>
                    </div>
                  </div>
                </div>

                <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                      <MapPin className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">請求先住所</p>
                      <p className="mt-1 text-sm font-medium text-gray-900">
                        〒{store.billingPostalCode?.replace(/(\d{3})(\d{4})/, '$1-$2')} {store.billingPrefecture}{store.billingCity}{store.billingStreetAddress} {store.billingBuildingName}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                        <Phone className="h-5 w-5 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">請求先電話番号</p>
                        <p className="mt-1 text-sm font-medium text-gray-900">
                          {store.billingPhone?.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                        <Phone className="h-5 w-5 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">請求先FAX番号</p>
                        <p className="mt-1 text-sm font-medium text-gray-900">
                          {store.billingFax?.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 運営メモセクション */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-amber-500" />
                <h2 className="text-lg font-semibold text-gray-900">運営メモ（機密情報）</h2>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((num) => {
                  const memoValue = store[`memo${num}` as keyof typeof store] as string;
                  return memoValue ? (
                    <div key={num} className="bg-red-50 border border-red-100 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-red-100 rounded-lg">
                          <FileText className="h-4 w-4 text-red-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-medium text-red-700 uppercase tracking-wider">メモ{num}</p>
                          <p className="mt-1 text-sm text-red-900">{memoValue}</p>
                        </div>
                      </div>
                    </div>
                  ) : null;
                })}
                {![1, 2, 3, 4, 5].some(num => store[`memo${num}` as keyof typeof store]) && (
                  <p className="text-sm text-gray-500 text-center py-4">運営メモはありません</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}