"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { ArrowLeft, Save, X } from "lucide-react";
import Link from "next/link";
import { use, useState } from "react";
import { useRouter } from "next/navigation";

type AdminAccount = {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  lastLogin: string;
  status: string;
  registeredDate: string;
  phone?: string;
};

const mockAdminAccounts: AdminAccount[] = [
  {
    id: "ADM001",
    name: "管理者 太郎",
    email: "admin@unipo.jp",
    role: "スーパー管理者",
    department: "システム管理部",
    lastLogin: "2024-03-15 10:30",
    status: "有効",
    registeredDate: "2023-12-01",
    phone: "03-1111-2222"
  },
  {
    id: "ADM002",
    name: "運営 花子",
    email: "operator1@unipo.jp",
    role: "運営担当者",
    department: "カスタマーサポート",
    lastLogin: "2024-03-14 15:45",
    status: "有効",
    registeredDate: "2024-01-15",
    phone: "03-3333-4444"
  },
  {
    id: "ADM003",
    name: "審査 次郎",
    email: "review@unipo.jp",
    role: "審査担当者",
    department: "審査部",
    lastLogin: "2024-03-10 09:00",
    status: "無効",
    registeredDate: "2024-02-01",
    phone: "03-5555-6666"
  },
];

export default function AdminAccountEditPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const account = mockAdminAccounts.find(a => a.id === resolvedParams.id) || mockAdminAccounts[0];

  const [formData, setFormData] = useState({
    name: account.name,
    email: account.email,
    role: account.role,
    department: account.department,
    phone: account.phone || "",
    status: account.status,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ここで保存処理を行う（実際にはAPIコール等）
    console.log("保存データ:", formData);
    // 詳細ページに戻る
    router.push(`/admin/admin-accounts/${resolvedParams.id}`);
  };

  const handleCancel = () => {
    router.push(`/admin/admin-accounts/${resolvedParams.id}`);
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Link
            href={`/admin/admin-accounts/${resolvedParams.id}`}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">運営アカウント情報編集</h1>
            <p className="text-sm text-gray-600 mt-1">アカウントID: {account.id}</p>
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
                    氏名 <span className="text-red-500">*</span>
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
                    役割 <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    required
                  >
                    <option value="スーパー管理者">スーパー管理者</option>
                    <option value="運営担当者">運営担当者</option>
                    <option value="審査担当者">審査担当者</option>
                    <option value="サポート担当者">サポート担当者</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    部署 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    電話番号
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    placeholder="例: 03-1234-5678"
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
                    <option value="有効">有効</option>
                    <option value="無効">無効</option>
                  </select>
                </div>
              </div>

              <div className="border-t pt-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    登録日: {account.registeredDate} · 最終ログイン: {account.lastLogin}
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