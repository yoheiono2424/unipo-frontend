"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { ArrowLeft, Edit, User, Phone, Mail, Calendar, CreditCard, PlusCircle, MinusCircle, MapPin, FileText, Crown, UserCheck, UserX, History, Gift } from "lucide-react";
import Link from "next/link";
import { mockMembers } from "@/lib/mock-data";
import { use, useState } from "react";

export default function MemberDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // paramsをアンラップ
  const resolvedParams = use(params);
  // モックデータから該当会員を取得
  const member = mockMembers.find(m => m.id === resolvedParams.id) || mockMembers[0];

  const [showPointModal, setShowPointModal] = useState(false);
  const [operationType, setOperationType] = useState<'grant' | 'deduct'>('grant');
  const [pointAmount, setPointAmount] = useState("");

  // 年齢を計算する関数
  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    return age;
  };

  // モーダルを開く時の初期化
  const handleOpenModal = () => {
    setShowPointModal(true);
    setOperationType('grant');
    setPointAmount("");
  };

  // ポイント操作の実行
  const handlePointOperation = () => {
    const amount = parseInt(pointAmount);
    if (operationType === 'grant') {
      console.log("ポイント付与:", { amount });
    } else {
      console.log("ポイント減算:", { amount });
    }
    setShowPointModal(false);
    setOperationType('grant');
    setPointAmount("");
  };

  // 計算後のポイント数
  const calculatedPoints = () => {
    const amount = parseInt(pointAmount) || 0;
    if (operationType === 'grant') {
      return member.points + amount;
    } else {
      return member.points - amount;
    }
  };

  // 減算時の残高不足チェック
  const isInsufficientBalance = () => {
    if (operationType === 'deduct') {
      const amount = parseInt(pointAmount) || 0;
      return amount > member.points;
    }
    return false;
  };

  // 実行ボタンの有効/無効判定
  const isExecuteDisabled = () => {
    if (!pointAmount || parseInt(pointAmount) <= 0) return true;
    if (isInsufficientBalance()) return true;
    return false;
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
            <Link
              href={`/admin/members/${member.id}/point-history`}
              className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors"
            >
              <History className="h-4 w-4" />
              ポイント獲得履歴
            </Link>
            <Link
              href={`/admin/members/${member.id}/gift-history`}
              className="bg-purple-600 text-white px-5 py-2.5 rounded-lg hover:bg-purple-700 flex items-center gap-2 transition-colors"
            >
              <Gift className="h-4 w-4" />
              ギフトカード受取履歴
            </Link>
            <button
              onClick={handleOpenModal}
              className="bg-green-600 text-white px-5 py-2.5 rounded-lg hover:bg-green-700 flex items-center gap-2 transition-colors"
            >
              <PlusCircle className="h-4 w-4" />
              ポイント操作
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
                  {member.nickname && (
                    <p className="text-sm text-gray-600">ニックネーム: {member.nickname}</p>
                  )}
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
                      {member.memberStatus === '自主退会' || member.memberStatus === '強制退会' ? (
                        <UserX className="h-3 w-3 mr-1" />
                      ) : (
                        <UserCheck className="h-3 w-3 mr-1" />
                      )}
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

              {/* 生年月日・年齢 */}
              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <Calendar className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">生年月日・年齢</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">
                      {member.birthDate || member.birthdate ? (
                        <>
                          {member.birthDate || member.birthdate}
                          <span className="ml-2 text-indigo-600 font-semibold">
                            （{calculateAge(member.birthDate || member.birthdate)}歳）
                          </span>
                        </>
                      ) : (
                        "—"
                      )}
                    </p>
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

              {/* 番地・建物名 */}
              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <MapPin className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">番地・建物名</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{member.address || "—"}</p>
                  </div>
                </div>
              </div>

              {/* 入会日 */}
              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <Calendar className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">入会日</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{member.joinDate || "—"}</p>
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

              {/* 退会日 */}
              {member.withdrawalDate && (
                <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-red-100 rounded-lg group-hover:bg-white transition-colors">
                      <UserX className="h-5 w-5 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">退会日</p>
                      <p className="mt-1 text-sm font-medium text-gray-900">
                        {new Date(member.withdrawalDate).toLocaleString('ja-JP')}
                      </p>
                      <p className="text-xs text-red-600 mt-1">
                        {member.withdrawalReason}
                      </p>
                    </div>
                  </div>
                </div>
              )}
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

      {/* ポイント操作モーダル */}
      {showPointModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl">
            <h3 className="text-xl font-bold mb-4 text-gray-900">ポイント操作</h3>

            {/* 現在の保有ポイント */}
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-5">
              <p className="text-sm text-indigo-600 font-medium mb-1">現在の保有ポイント</p>
              <p className="text-3xl font-bold text-indigo-900">{member.points.toLocaleString()} pt</p>
            </div>

            {/* 操作選択ボタン */}
            <div className="mb-5">
              <p className="text-sm font-medium text-gray-700 mb-3">操作を選択してください</p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setOperationType('grant')}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                    operationType === 'grant'
                      ? 'border-green-500 bg-green-50 text-green-700 font-semibold'
                      : 'border-gray-300 bg-white text-gray-600 hover:border-gray-400'
                  }`}
                >
                  <PlusCircle className="h-5 w-5" />
                  <span>ポイント付与</span>
                </button>
                <button
                  onClick={() => setOperationType('deduct')}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                    operationType === 'deduct'
                      ? 'border-red-500 bg-red-50 text-red-700 font-semibold'
                      : 'border-gray-300 bg-white text-gray-600 hover:border-gray-400'
                  }`}
                >
                  <MinusCircle className="h-5 w-5" />
                  <span>ポイント減算</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {/* ポイント数入力 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {operationType === 'grant' ? '付与ポイント数' : '減算ポイント数'} <span className="text-red-500">*必須</span>
                </label>
                <input
                  type="number"
                  value={pointAmount}
                  onChange={(e) => setPointAmount(e.target.value)}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 ${
                    isInsufficientBalance()
                      ? 'border-red-300 focus:ring-red-500 bg-red-50'
                      : 'border-gray-300 focus:ring-indigo-500'
                  }`}
                  placeholder="例: 100"
                  min="1"
                />
                {/* 残高不足エラー */}
                {isInsufficientBalance() && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <span>⚠️</span>
                    <span>残高不足です。現在の保有ポイント：{member.points.toLocaleString()}pt</span>
                  </p>
                )}
              </div>

              {/* 計算結果表示 */}
              {pointAmount && parseInt(pointAmount) > 0 && !isInsufficientBalance() && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-2">
                    {operationType === 'grant' ? '付与後のポイント' : '減算後のポイント'}
                  </p>
                  <p className="text-lg font-semibold text-gray-900">
                    {member.points.toLocaleString()}pt → {calculatedPoints().toLocaleString()}pt
                    <span className={`ml-2 ${operationType === 'grant' ? 'text-green-600' : 'text-red-600'}`}>
                      ({operationType === 'grant' ? '+' : '-'}{parseInt(pointAmount).toLocaleString()}pt)
                    </span>
                  </p>
                </div>
              )}
            </div>

            {/* ボタン */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowPointModal(false)}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
              >
                キャンセル
              </button>
              <button
                onClick={handlePointOperation}
                disabled={isExecuteDisabled()}
                className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-colors ${
                  operationType === 'grant'
                    ? 'bg-green-600 text-white hover:bg-green-700 disabled:bg-gray-400'
                    : 'bg-red-600 text-white hover:bg-red-700 disabled:bg-gray-400'
                } disabled:cursor-not-allowed`}
              >
                実行する
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}