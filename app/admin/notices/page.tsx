"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { useState } from "react";
import { Plus, Eye, Edit, Trash2, Bell, Users, Calendar } from "lucide-react";
import Link from "next/link";
import { mockNotices } from "@/lib/mock-data";

export default function AdminNoticesPage() {
  const notices = mockNotices;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">お知らせ管理</h1>
            <p className="text-sm text-gray-600 mt-1">お知らせの作成と配信管理</p>
          </div>
          <Link
            href="/admin/notices/create"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            新規お知らせ作成
          </Link>
        </div>

        {/* フィルタタブ */}
        <div className="bg-white rounded-lg shadow p-1 inline-flex">
          <button className="px-4 py-2 rounded-md bg-indigo-100 text-indigo-600 font-medium">
            すべて
          </button>
          <button className="px-4 py-2 rounded-md text-gray-600 hover:bg-gray-50">
            公開中
          </button>
          <button className="px-4 py-2 rounded-md text-gray-600 hover:bg-gray-50">
            予約
          </button>
          <button className="px-4 py-2 rounded-md text-gray-600 hover:bg-gray-50">
            下書き
          </button>
        </div>

        {/* お知らせ一覧 */}
        <div className="space-y-4">
          {notices.map((notice) => (
            <div key={notice.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{notice.title}</h3>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      notice.status === '公開中'
                        ? 'bg-green-100 text-green-800'
                        : notice.status === '予約'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {notice.status}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4">{notice.content}</p>

                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>配信対象: {notice.targetType}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>公開日: {notice.publishDate}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 ml-4">
                  <Link
                    href={`/admin/notices/${notice.id}`}
                    className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg"
                  >
                    <Eye className="h-4 w-4" />
                  </Link>
                  <Link
                    href={`/admin/notices/${notice.id}/edit`}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    <Edit className="h-4 w-4" />
                  </Link>
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* 空の状態 */}
          {notices.length === 0 && (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">お知らせはまだありません</p>
              <Link
                href="/admin/notices/create"
                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                最初のお知らせを作成
              </Link>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}