"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { ArrowLeft, Edit, User, Phone, Mail, Calendar, CreditCard, PlusCircle, MapPin, FileText, Crown, UserCheck } from "lucide-react";
import Link from "next/link";
import { mockMembers } from "@/lib/mock-data";
import { use, useState } from "react";

export default function MemberDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // paramsをアンラップ
  const resolvedParams = use(params);
  // モックデータから該当会員を取得
  const member = mockMembers.find(m => m.id === resolvedParams.id) || mockMembers[0];

  const [showPointModal, setShowPointModal] = useState(false);
  const [pointAmount, setPointAmount] = useState("");
  const [pointReason, setPointReason] = useState("");

  const handlePointGrant = () => {
    // ポイント付与処理（実際にはAPIコール）
    console.log("ポイント付与:", { amount: pointAmount, reason: pointReason });
    setShowPointModal(false);
    setPointAmount("");
    setPointReason("");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/members"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">会員詳細</h1>
              <p className="text-sm text-gray-600 mt-1">会員ID: {member.id}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowPointModal(true)}
              className="bg-green-600 text-white px-5 py-2.5 rounded-lg hover:bg-green-700 flex items-center gap-2 transition-colors"
            >
              <PlusCircle className="h-4 w-4" />
              ポイント付与
            </button>
            <Link
              href={`/admin/members/${member.id}/edit`}
              className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 flex items-center gap-2 transition-colors"
            >
              <Edit className="h-4 w-4" />
              編集
            </Link>
          </div>
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
                <div className="h-20 w-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  {member.lastName?.charAt(0) || member.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {member.lastName && member.firstName ? `${member.lastName} ${member.firstName}` : member.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">会員NO: {member.memberNo}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${
                      member.memberStatus === '本登録'
                        ? 'bg-green-50 text-green-700 ring-1 ring-green-600/20'
                        : member.memberStatus === '休止'
                        ? 'bg-yellow-50 text-yellow-700 ring-1 ring-yellow-600/20'
                        : member.memberStatus === '自主退会' || member.memberStatus === '強制退会'
                        ? 'bg-red-50 text-red-700 ring-1 ring-red-600/20'
                        : 'bg-blue-50 text-blue-700 ring-1 ring-blue-600/20'
                    }`}>
                      <UserCheck className="h-3 w-3 mr-1" />
                      {member.memberStatus}
                    </span>
                    <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${
                      member.memberRank === 'ゴールド'
                        ? 'bg-yellow-50 text-yellow-700 ring-1 ring-yellow-600/20'
                        : member.memberRank === 'シルバー'
                        ? 'bg-gray-50 text-gray-700 ring-1 ring-gray-600/20'
                        : 'bg-orange-50 text-orange-700 ring-1 ring-orange-600/20'
                    }`}>
                      <Crown className="h-3 w-3 mr-1" />
                      {member.memberRank}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-indigo-50 text-indigo-700 ring-1 ring-indigo-600/20">
                      <CreditCard className="h-3 w-3 mr-1" />
                      {member.points} ポイント
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 情報グリッド */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 氏名（姓） */}
              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <User className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">氏名（姓）</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{member.lastName || "—"}</p>
                  </div>
                </div>
              </div>

              {/* 氏名（名） */}
              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <User className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">氏名（名）</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{member.firstName || "—"}</p>
                  </div>
                </div>
              </div>

              {/* 生年月日 */}
              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <Calendar className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">生年月日</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{member.birthDate || member.birthdate || "—"}</p>
                  </div>
                </div>
              </div>

              {/* 性別 */}
              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <User className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">性別</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{member.gender || "—"}</p>
                  </div>
                </div>
              </div>

              {/* メールアドレス */}
              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <Mail className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">メールアドレス</p>
                    <p className="mt-1 text-sm font-medium text-gray-900 break-all">{member.email || "—"}</p>
                  </div>
                </div>
              </div>

              {/* 携帯電話番号 */}
              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <Phone className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">携帯電話番号</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">
                      {member.phone ? member.phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3') : "—"}
                    </p>
                  </div>
                </div>
              </div>

              {/* 郵便番号 */}
              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <MapPin className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">郵便番号</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">
                      {member.postalCode ? `〒${member.postalCode.replace(/(\d{3})(\d{4})/, '$1-$2')}` : "—"}
                    </p>
                  </div>
                </div>
              </div>

              {/* 都道府県 */}
              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <MapPin className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">都道府県</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{member.prefecture || "—"}</p>
                  </div>
                </div>
              </div>

              {/* 市区町村 */}
              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <MapPin className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">市区町村</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{member.city || "—"}</p>
                  </div>
                </div>
              </div>

              {/* 町名・丁目・番地 */}
              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <MapPin className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">町名・丁目・番地</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{member.streetAddress || "—"}</p>
                  </div>
                </div>
              </div>

              {/* 建物名・部屋番号 */}
              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <MapPin className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">建物名・部屋番号</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{member.buildingName || "—"}</p>
                  </div>
                </div>
              </div>

              {/* 登録日時 */}
              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <Calendar className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">登録日時</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">
                      {member.registeredDate ? new Date(member.registeredDate).toLocaleString('ja-JP') : "—"}
                    </p>
                  </div>
                </div>
              </div>

              {/* 最終更新日時 */}
              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <Calendar className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">最終更新日時</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">
                      {member.lastUpdatedDate ? new Date(member.lastUpdatedDate).toLocaleString('ja-JP') : "—"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 会員メモ（運営のみ閲覧） */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <FileText className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-yellow-800 mb-2">会員メモ（運営専用）</h3>
                    <p className="text-sm text-yellow-700">
                      {member.memberMemo || "メモはありません"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ポイント付与モーダル */}
      {showPointModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">ポイント付与</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  付与ポイント数
                </label>
                <input
                  type="number"
                  value={pointAmount}
                  onChange={(e) => setPointAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="例: 100"
                  min="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  付与理由
                </label>
                <textarea
                  value={pointReason}
                  onChange={(e) => setPointReason(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="例: キャンペーン特典、サービス補償等"
                  rows={3}
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowPointModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                キャンセル
              </button>
              <button
                onClick={handlePointGrant}
                disabled={!pointAmount || !pointReason}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                付与する
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}