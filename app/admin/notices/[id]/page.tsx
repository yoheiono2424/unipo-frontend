"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { ArrowLeft, Edit, Bell, Calendar, User, Eye, AlertCircle } from "lucide-react";
import Link from "next/link";
import { use } from "react";
import { mockNotices } from "@/lib/mock-data";

export default function NoticeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const notice = mockNotices.find(n => n.id === resolvedParams.id) || mockNotices[0];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case '公開中':
        return 'bg-green-50 text-green-700 ring-1 ring-green-600/20';
      case '予約':
        return 'bg-yellow-50 text-yellow-700 ring-1 ring-yellow-600/20';
      case '下書き':
        return 'bg-gray-50 text-gray-700 ring-1 ring-gray-600/20';
      default:
        return 'bg-gray-50 text-gray-700 ring-1 ring-gray-600/20';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch(priority) {
      case '高':
        return 'bg-red-50 text-red-700 ring-1 ring-red-600/20';
      case '中':
        return 'bg-blue-50 text-blue-700 ring-1 ring-blue-600/20';
      case '低':
        return 'bg-gray-50 text-gray-700 ring-1 ring-gray-600/20';
      default:
        return 'bg-gray-50 text-gray-700 ring-1 ring-gray-600/20';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/notices"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">お知らせ詳細</h1>
              <p className="text-sm text-gray-600 mt-1">お知らせID: {notice.id}</p>
            </div>
          </div>
          <Link
            href={`/admin/notices/${notice.id}/edit`}
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
            {/* ステータスとお知らせ情報 */}
            <div className="mb-6 pb-6 border-b border-gray-100">
              <div className="flex items-start gap-4">
                <div className="h-20 w-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
                  <Bell className="h-10 w-10" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">{notice.title}</h3>
                  <div className="flex items-center gap-3 mt-3">
                    <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${getStatusBadge(notice.status)}`}>
                      {notice.status}
                    </span>
                    <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${getPriorityBadge(notice.priority)}`}>
                      優先度: {notice.priority}
                    </span>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium text-gray-700">配信対象: {notice.targetType}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 詳細情報グリッド */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <Calendar className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">公開日</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{notice.publishDate}</p>
                  </div>
                </div>
              </div>

              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <User className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">作成者</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{notice.author}</p>
                  </div>
                </div>
              </div>

              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <Calendar className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">作成日</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{notice.createdDate}</p>
                  </div>
                </div>
              </div>

              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <Calendar className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">最終更新日</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{notice.updatedDate}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* お知らせ内容 */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="flex items-start gap-2 mb-3">
                <AlertCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <h3 className="text-lg font-semibold text-gray-900">お知らせ内容</h3>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {notice.content}
                </p>
              </div>
            </div>

            {/* 配信情報 */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">配信情報</h3>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-900">配信対象</span>
                    <span className="text-sm text-blue-700">{notice.targetType}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-900">公開状況</span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(notice.status)}`}>
                      {notice.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-900">優先度</span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityBadge(notice.priority)}`}>
                      {notice.priority}
                    </span>
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