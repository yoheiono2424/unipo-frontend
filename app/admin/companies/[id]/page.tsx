"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { ArrowLeft, Edit, Building2, User, Phone, Mail, Calendar, MapPin, Store, CheckCircle, XCircle, Shield } from "lucide-react";
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

export default function CompanyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const company = mockCompanies.find(c => c.id === resolvedParams.id) || mockCompanies[0];

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