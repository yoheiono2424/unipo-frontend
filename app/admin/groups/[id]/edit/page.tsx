"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { ArrowLeft, Save, X } from "lucide-react";
import Link from "next/link";
import { use, useState } from "react";
import { useRouter } from "next/navigation";

type Group = {
  id: string;
  name: string;
  companyName: string;
  address: string;
  memberCount: number;
  storeCount: number;
  status: string;
  registeredDate: string;
  description?: string;
};

const mockGroups: Group[] = [
  {
    id: "GRP001",
    name: "東京グループA",
    companyName: "株式会社ABC商事",
    address: "東京都渋谷区道玄坂1-2-3",
    memberCount: 125,
    storeCount: 8,
    status: "承認済み",
    registeredDate: "2024-01-20",
    description: "東京都内の店舗を管理するグループ"
  },
  {
    id: "GRP002",
    name: "関西エリアグループ",
    companyName: "XYZ株式会社",
    address: "大阪府大阪市北区梅田2-3-4",
    memberCount: 78,
    storeCount: 5,
    status: "審査中",
    registeredDate: "2024-02-15",
    description: "関西地域の店舗を管理するグループ"
  },
  {
    id: "GRP003",
    name: "中部地区グループ",
    companyName: "グローバルフーズ株式会社",
    address: "名古屋市中区栄3-4-5",
    memberCount: 45,
    storeCount: 3,
    status: "承認済み",
    registeredDate: "2024-03-01",
    description: "中部地方の店舗を管理するグループ"
  },
];

export default function GroupEditPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const group = mockGroups.find(g => g.id === resolvedParams.id) || mockGroups[0];

  const [formData, setFormData] = useState({
    name: group.name,
    companyName: group.companyName,
    address: group.address,
    description: group.description || "",
    status: group.status,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ここで保存処理を行う（実際にはAPIコール等）
    console.log("保存データ:", formData);
    // 詳細ページに戻る
    router.push(`/admin/groups/${resolvedParams.id}`);
  };

  const handleCancel = () => {
    router.push(`/admin/groups/${resolvedParams.id}`);
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Link
            href={`/admin/groups/${resolvedParams.id}`}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">グループ情報編集</h1>
            <p className="text-sm text-gray-600 mt-1">グループID: {group.id}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">基本情報</h2>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    グループ名 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    所属企業 <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    required
                  >
                    <option value="株式会社ABC商事">株式会社ABC商事</option>
                    <option value="XYZ株式会社">XYZ株式会社</option>
                    <option value="グローバルフーズ株式会社">グローバルフーズ株式会社</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    住所 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    説明
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    placeholder="グループの説明を入力してください"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ステータス
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                  >
                    <option value="承認済み">承認済み</option>
                    <option value="審査中">審査中</option>
                    <option value="却下">却下</option>
                  </select>
                </div>
              </div>

              <div className="border-t pt-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    登録日: {group.registeredDate} · メンバー数: {group.memberCount}人 · 店舗数: {group.storeCount}店舗
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
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}