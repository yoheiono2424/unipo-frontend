"use client";

import AdvertiserLayout from "@/components/advertiser/AdvertiserLayout";
import { Bell, Info, AlertCircle, CheckCircle, ChevronRight, Calendar } from "lucide-react";
import { useState } from "react";

type Notice = {
  id: string;
  title: string;
  content: string;
  type: "info" | "warning" | "success";
  date: string;
  isRead: boolean;
  category: string;
};

const mockNotices: Notice[] = [
  {
    id: "N001",
    title: "新機能リリースのお知らせ",
    content: "アンケート分析機能に新しいグラフ表示オプションが追加されました。より詳細な分析が可能になりました。",
    type: "info",
    date: "2025-01-29",
    isRead: false,
    category: "システム"
  },
  {
    id: "N002",
    title: "メンテナンスのお知らせ",
    content: "2025年2月5日(水) 深夜2:00〜4:00にシステムメンテナンスを実施いたします。",
    type: "warning",
    date: "2025-01-28",
    isRead: false,
    category: "メンテナンス"
  },
  {
    id: "N003",
    title: "キャンペーン承認完了",
    content: "「春の新生活応援キャンペーン」が承認されました。配布を開始できます。",
    type: "success",
    date: "2025-01-27",
    isRead: true,
    category: "キャンペーン"
  },
  {
    id: "N004",
    title: "請求書発行のお知らせ",
    content: "2025年1月分の請求書が発行されました。マイページからご確認いただけます。",
    type: "info",
    date: "2025-01-25",
    isRead: true,
    category: "請求"
  },
  {
    id: "N005",
    title: "キャンペーン期限のお知らせ",
    content: "「冬季限定キャンペーン」の終了まであと3日です。",
    type: "warning",
    date: "2025-01-24",
    isRead: true,
    category: "キャンペーン"
  }
];

export default function AdvertiserNoticesPage() {
  const [notices] = useState<Notice[]>(mockNotices);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

  const categories = ["all", "システム", "メンテナンス", "キャンペーン", "請求"];

  const filteredNotices = notices.filter(notice =>
    selectedCategory === "all" || notice.category === selectedCategory
  );

  const getIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getBackgroundColor = (type: string) => {
    switch (type) {
      case "warning":
        return "bg-yellow-50 border-yellow-200";
      case "success":
        return "bg-green-50 border-green-200";
      default:
        return "bg-blue-50 border-blue-200";
    }
  };

  return (
    <AdvertiserLayout>
      <div className="p-6">
        <div className="space-y-6">
          {/* ヘッダー */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">お知らせ</h1>
              <p className="text-sm text-gray-600 mt-1">システムからの重要なお知らせをご確認ください</p>
            </div>
            <div className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <Bell className="h-5 w-5" />
              <span className="text-sm font-medium">未読: {notices.filter(n => !n.isRead).length}件</span>
            </div>
          </div>

          {/* カテゴリフィルタ */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex gap-2 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category === "all" ? "すべて" : category}
                </button>
              ))}
            </div>
          </div>

          {/* お知らせリスト */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="divide-y divide-gray-200">
              {filteredNotices.length === 0 ? (
                <div className="p-12 text-center">
                  <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">お知らせはありません</p>
                </div>
              ) : (
                filteredNotices.map((notice) => (
                  <div
                    key={notice.id}
                    className={`p-6 hover:bg-gray-50 cursor-pointer transition-colors ${
                      !notice.isRead ? "bg-blue-50/30" : ""
                    }`}
                    onClick={() => setSelectedNotice(notice)}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-lg ${getBackgroundColor(notice.type)} border`}>
                        {getIcon(notice.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-gray-900">
                                {notice.title}
                              </h3>
                              {!notice.isRead && (
                                <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                                  未読
                                </span>
                              )}
                              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                {notice.category}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                              {notice.content}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <Calendar className="h-3 w-3" />
                              <span>{notice.date}</span>
                            </div>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-400 mt-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 詳細モーダル */}
      {selectedNotice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-auto">
            <div className={`p-6 border-b ${getBackgroundColor(selectedNotice.type)}`}>
              <div className="flex items-start gap-3">
                {getIcon(selectedNotice.type)}
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-900">{selectedNotice.title}</h2>
                  <p className="text-sm text-gray-600 mt-1">{selectedNotice.date}</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-700 whitespace-pre-wrap">{selectedNotice.content}</p>
            </div>
            <div className="p-6 border-t bg-gray-50">
              <button
                onClick={() => setSelectedNotice(null)}
                className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}
    </AdvertiserLayout>
  );
}