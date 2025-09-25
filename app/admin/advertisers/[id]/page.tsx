"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { ArrowLeft, Edit, Building2, User, Phone, Mail, Calendar, Shield, Hash, MapPin, CheckCircle, XCircle, Globe, CreditCard, FileText, AlertCircle } from "lucide-react";
import Link from "next/link";
import { mockAdvertisers } from "@/lib/mock-data";
import { use, useState } from "react";

export default function AdvertiserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // paramsをアンラップ
  const resolvedParams = use(params);
  const advertiser = mockAdvertisers.find(a => a.id === resolvedParams.id) || mockAdvertisers[0];

  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [approvalAction, setApprovalAction] = useState<'approve' | 'reject' | null>(null);
  const [approvalReason, setApprovalReason] = useState("");

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
              href="/admin/advertisers"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">広告主詳細</h1>
              <p className="text-sm text-gray-600 mt-1">広告主ID: {advertiser.id} | 広告主NO: {advertiser.advertiserNo}</p>
            </div>
          </div>
          <div className="flex gap-3">
            {advertiser.status === '審査中' && (
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
              href={`/admin/advertisers/${advertiser.id}/edit`}
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
                <div className="h-16 w-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white">
                  <Building2 className="h-8 w-8" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">{advertiser.companyName}</h3>
                  <p className="text-sm text-gray-600 mt-1">{advertiser.companyNameKana}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${
                      advertiser.status === '承認済み'
                        ? 'bg-green-50 text-green-700 ring-1 ring-green-600/20'
                        : advertiser.status === '審査中'
                        ? 'bg-yellow-50 text-yellow-700 ring-1 ring-yellow-600/20'
                        : 'bg-red-50 text-red-700 ring-1 ring-red-600/20'
                    }`}>
                      <Shield className="h-3 w-3 mr-1" />
                      {advertiser.status}
                    </span>
                    <span className="text-xs text-gray-500">
                      利用期間: {advertiser.serviceStartDate?.replace(/(\d{4})(\d{2})(\d{2})/, '$1/$2/$3')} - {advertiser.serviceEndDate?.replace(/(\d{4})(\d{2})(\d{2})/, '$1/$2/$3')}
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
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">広告主NO</p>
                      <p className="mt-1 text-sm font-medium text-gray-900">{advertiser.advertiserNo}</p>
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
                      <p className="mt-1 text-sm font-medium text-gray-900">{advertiser.industry}</p>
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
                        {advertiser.registeredDate ? new Date(advertiser.registeredDate).toLocaleString('ja-JP') : "—"}
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
                        {advertiser.lastUpdatedDate ? new Date(advertiser.lastUpdatedDate).toLocaleString('ja-JP') : "—"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 企業情報セクション */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">企業情報</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                      <Building2 className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">企業名</p>
                      <p className="mt-1 text-sm font-medium text-gray-900">{advertiser.companyName}</p>
                    </div>
                  </div>
                </div>

                <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                      <Building2 className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">企業名（カナ）</p>
                      <p className="mt-1 text-sm font-medium text-gray-900">{advertiser.companyNameKana}</p>
                    </div>
                  </div>
                </div>

                <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors md:col-span-2">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                      <MapPin className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">企業住所</p>
                      <p className="mt-1 text-sm font-medium text-gray-900">
                        〒{advertiser.postalCode?.replace(/(\d{3})(\d{4})/, '$1-$2')} {advertiser.prefecture}{advertiser.city}{advertiser.streetAddress} {advertiser.buildingName}
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
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">電話番号</p>
                      <p className="mt-1 text-sm font-medium text-gray-900">
                        {advertiser.phone?.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')}
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
                        {advertiser.fax?.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors md:col-span-2">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                      <Globe className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">企業URL</p>
                      <a href={advertiser.companyUrl} target="_blank" rel="noopener noreferrer" className="mt-1 text-sm font-medium text-blue-600 hover:text-blue-800 break-all">
                        {advertiser.companyUrl}
                      </a>
                    </div>
                  </div>
                </div>
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
                      <User className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">担当者名</p>
                      <p className="mt-1 text-sm font-medium text-gray-900">{advertiser.contactName}</p>
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
                        {advertiser.contactPhone?.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors md:col-span-2">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                      <Mail className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">メールアドレス</p>
                      <p className="mt-1 text-sm font-medium text-gray-900 break-all">{advertiser.email}</p>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                      <Building2 className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">請求先部署名</p>
                      <p className="mt-1 text-sm font-medium text-gray-900">{advertiser.billingDepartment}</p>
                    </div>
                  </div>
                </div>

                <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                      <User className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">請求先担当者名</p>
                      <p className="mt-1 text-sm font-medium text-gray-900">{advertiser.billingContactName}</p>
                    </div>
                  </div>
                </div>

                <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors md:col-span-2">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                      <Mail className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">請求先メールアドレス</p>
                      <p className="mt-1 text-sm font-medium text-gray-900 break-all">{advertiser.billingEmail}</p>
                    </div>
                  </div>
                </div>

                <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors md:col-span-2">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                      <MapPin className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">請求先住所</p>
                      <p className="mt-1 text-sm font-medium text-gray-900">
                        〒{advertiser.billingPostalCode?.replace(/(\d{3})(\d{4})/, '$1-$2')} {advertiser.billingPrefecture}{advertiser.billingCity}{advertiser.billingStreetAddress} {advertiser.billingBuildingName}
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
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">請求先電話番号</p>
                      <p className="mt-1 text-sm font-medium text-gray-900">
                        {advertiser.billingPhone?.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')}
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
                        {advertiser.billingFax?.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 契約情報セクション */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">契約情報</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                      <CreditCard className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">支払条件</p>
                      <p className="mt-1 text-sm font-medium text-gray-900">{advertiser.paymentTerms}</p>
                    </div>
                  </div>
                </div>

                <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                      <Calendar className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">利用開始日</p>
                      <p className="mt-1 text-sm font-medium text-gray-900">
                        {advertiser.serviceStartDate?.replace(/(\d{4})(\d{2})(\d{2})/, '$1/$2/$3')}
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
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">利用終了日</p>
                      <p className="mt-1 text-sm font-medium text-gray-900">
                        {advertiser.serviceEndDate?.replace(/(\d{4})(\d{2})(\d{2})/, '$1/$2/$3')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                      <Building2 className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">実施中キャンペーン数</p>
                      <p className="mt-1 text-sm font-medium text-gray-900">{advertiser.campaigns}件</p>
                    </div>
                  </div>
                </div>

                <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors md:col-span-2">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                      <CreditCard className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">総予算</p>
                      <p className="mt-1 text-sm font-medium text-gray-900">¥{advertiser.totalBudget?.toLocaleString()}</p>
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
                  const memoValue = advertiser[`memo${num}` as keyof typeof advertiser] as string;
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
                {![1, 2, 3, 4, 5].some(num => advertiser[`memo${num}` as keyof typeof advertiser]) && (
                  <p className="text-sm text-gray-500 text-center py-4">運営メモはありません</p>
                )}
              </div>
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
                <p className="font-medium">{advertiser.companyName}</p>
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