"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { ArrowLeft, Save, X } from "lucide-react";
import Link from "next/link";
import { mockMembers } from "@/lib/mock-data";
import { use, useState } from "react";
import { useRouter } from "next/navigation";

export default function MemberEditPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const member = mockMembers.find(m => m.id === resolvedParams.id) || mockMembers[0];

  const [formData, setFormData] = useState({
    memberStatus: member.memberStatus || "本登録",
    memberRank: member.memberRank || "ブロンズ",
    nickname: member.nickname || "",
    lastName: member.lastName || "",
    firstName: member.firstName || "",
    birthDate: member.birthDate || "",
    gender: member.gender || "",
    email: member.email || "",
    phone: member.phone || "",
    postalCode: member.postalCode || "",
    prefecture: member.prefecture || "",
    city: member.city || "",
    address: member.address || "",
    joinDate: member.joinDate || "",
    memberMemo: member.memberMemo || "",
    withdrawalDate: member.withdrawalDate || null as string | null,
  });

  const [loadingAddress, setLoadingAddress] = useState(false);

  // 郵便番号から住所を自動取得
  const handlePostalCodeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d-]/g, '');
    setFormData({ ...formData, postalCode: value });

    if (value.replace(/-/g, '').length === 7) {
      setLoadingAddress(true);
      try {
        const response = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${value.replace(/-/g, '')}`);
        const data = await response.json();

        if (data.results) {
          const result = data.results[0];
          setFormData({
            ...formData,
            postalCode: value,
            prefecture: result.address1,
            city: result.address2 + result.address3,
          });
        }
      } catch (error) {
        console.error('住所の取得に失敗しました', error);
      } finally {
        setLoadingAddress(false);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // ステータス変更時の退会日自動設定
    const updatedFormData = { ...formData };

    if (formData.memberStatus === '自主退会' || formData.memberStatus === '強制退会') {
      if (!member.withdrawalDate) {
        // 新たに退会状態になった場合、今日の日付を設定
        updatedFormData.withdrawalDate = new Date().toISOString().split('T')[0];
      }
    } else {
      // 本登録または休止に戻した場合、退会日をクリア
      updatedFormData.withdrawalDate = null;
    }

    console.log("会員情報更新:", updatedFormData);
    router.push(`/admin/members/${resolvedParams.id}`);
  };

  const handleCancel = () => {
    router.push(`/admin/members/${resolvedParams.id}`);
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Link
            href={`/admin/members/${resolvedParams.id}`}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">会員情報編集</h1>
            <p className="text-sm text-gray-600 mt-1">会員ID: {member.id} | 会員NO: {member.memberNo}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* 基本情報セクション */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">基本情報</h2>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* 会員ステータス */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      会員ステータス <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.memberStatus}
                      onChange={(e) => setFormData({ ...formData, memberStatus: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                      required
                    >
                      <option value="本登録">本登録</option>
                      <option value="休止">休止</option>
                      <option value="自主退会">自主退会</option>
                      <option value="強制退会">強制退会</option>
                    </select>
                  </div>

                  {/* 会員ランク */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      会員ランク
                    </label>
                    <select
                      value={formData.memberRank}
                      onChange={(e) => setFormData({ ...formData, memberRank: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    >
                      <option value="ブロンズ">ブロンズ</option>
                      <option value="シルバー">シルバー</option>
                      <option value="ゴールド">ゴールド</option>
                      <option value="プラチナ">プラチナ</option>
                    </select>
                  </div>

                  {/* ニックネーム */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ニックネーム <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.nickname}
                      onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                      placeholder="たろう"
                      maxLength={50}
                      required
                    />
                  </div>

                  {/* 空欄（グリッド調整） */}
                  <div></div>

                  {/* 氏名（姓） */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      氏名（姓） <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                      placeholder="田中"
                      maxLength={50}
                      required
                    />
                  </div>

                  {/* 氏名（名） */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      氏名（名） <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                      placeholder="太郎"
                      maxLength={50}
                      required
                    />
                  </div>

                  {/* 生年月日 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      生年月日
                    </label>
                    <input
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    />
                  </div>

                  {/* 性別 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      性別
                    </label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    >
                      <option value="">選択してください</option>
                      <option value="男性">男性</option>
                      <option value="女性">女性</option>
                      <option value="その他">その他</option>
                      <option value="回答しない">回答しない</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* 連絡先情報セクション */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">連絡先情報</h2>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* メールアドレス */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      メールアドレス <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                      placeholder="example@example.com"
                      maxLength={254}
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">ユニーク項目です</p>
                  </div>

                  {/* 携帯電話番号 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      携帯電話番号 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        setFormData({ ...formData, phone: value });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                      placeholder="09012345678"
                      maxLength={11}
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">ハイフンなしの11桁で入力（ユニーク項目）</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 住所情報セクション */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">住所情報</h2>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* 郵便番号 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      郵便番号 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.postalCode}
                      onChange={handlePostalCodeChange}
                      placeholder="123-4567"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                      required
                      maxLength={8}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {loadingAddress ? '住所を取得中...' : '7桁入力すると自動で住所が入力されます'}
                    </p>
                  </div>

                  {/* 空欄 */}
                  <div></div>

                  {/* 都道府県 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      都道府県 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.prefecture}
                      onChange={(e) => setFormData({ ...formData, prefecture: e.target.value })}
                      placeholder="愛知県"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                      required
                    />
                  </div>

                  {/* 市区町村 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      市区町村 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="名古屋市中区"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                      required
                    />
                  </div>

                  {/* 番地・建物名 */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      番地・建物名 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="錦1-2-3 ○○ビル101"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                      required
                    />
                  </div>

                  {/* 入会日 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      入会日 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={formData.joinDate}
                      onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">申込用紙の日付を入力してください</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 会員メモセクション */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">運営メモ</h2>
              </div>

              <div className="p-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    会員メモ（運営のみ閲覧）
                  </label>
                  <textarea
                    value={formData.memberMemo}
                    onChange={(e) => setFormData({ ...formData, memberMemo: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    placeholder="運営用のメモをこちらに記載してください..."
                    rows={4}
                  />
                  <p className="text-xs text-gray-500 mt-1">このメモは運営者のみが閲覧できます</p>
                </div>
              </div>
            </div>

            {/* 保存・キャンセルボタン */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                登録日: {member.registeredDate ? new Date(member.registeredDate).toLocaleString('ja-JP') : "—"}
              </p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-colors"
                >
                  <X className="h-4 w-4" />
                  キャンセル
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2 transition-colors"
                >
                  <Save className="h-4 w-4" />
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