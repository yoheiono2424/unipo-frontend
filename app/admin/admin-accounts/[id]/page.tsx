"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { ArrowLeft, Edit, User, Mail, Shield, Building, Calendar, Clock, Hash } from "lucide-react";
import Link from "next/link";
import { use } from "react";

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

export default function AdminAccountDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const account = mockAdminAccounts.find(a => a.id === resolvedParams.id) || mockAdminAccounts[0];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/admin-accounts"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">運営アカウント詳細</h1>
              <p className="text-sm text-gray-600 mt-1">アカウントID: {account.id}</p>
            </div>
          </div>
          <Link
            href={`/admin/admin-accounts/${account.id}/edit`}
            className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 flex items-center gap-2 transition-colors"
          >
            <Edit className="h-4 w-4" />
            編集
          </Link>
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
                <div className="h-16 w-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white">
                  <User className="h-8 w-8" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">{account.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{account.role} · {account.department}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${
                      account.status === '有効'
                        ? 'bg-green-50 text-green-700 ring-1 ring-green-600/20'
                        : 'bg-gray-50 text-gray-700 ring-1 ring-gray-600/20'
                    }`}>
                      <Shield className="h-3 w-3 mr-1" />
                      {account.status}
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
                    <User className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">氏名</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{account.name}</p>
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
                    <p className="mt-1 text-sm font-medium text-gray-900 break-all">{account.email}</p>
                  </div>
                </div>
              </div>

              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <Shield className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">役割</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{account.role}</p>
                  </div>
                </div>
              </div>

              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <Building className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">部署</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{account.department}</p>
                  </div>
                </div>
              </div>

              {account.phone && (
                <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                      <Hash className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">電話番号</p>
                      <p className="mt-1 text-sm font-medium text-gray-900">{account.phone}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <Clock className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">最終ログイン</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{account.lastLogin}</p>
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
                    <p className="mt-1 text-sm font-medium text-gray-900">{account.registeredDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}