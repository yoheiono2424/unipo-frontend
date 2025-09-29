"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { ArrowLeft, Edit, Calendar, Building2, TrendingUp, Gift, Clock, Shield, PlayCircle, PauseCircle, Image, MapPin, CreditCard, Hash, Package, FileText } from "lucide-react";
import Link from "next/link";
import { use, useState } from "react";
import { mockCampaigns } from "@/lib/mock-data";

export default function CampaignDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const campaign = mockCampaigns.find(c => c.id === resolvedParams.id) || mockCampaigns[0];

  const [showStatusModal, setShowStatusModal] = useState(false);
  const [statusAction, setStatusAction] = useState<'start' | 'pause' | 'complete' | null>(null);

  const handleStatusChange = () => {
    // ステータス変更処理（実際にはAPIコール）
    console.log("ステータス変更:", statusAction);
    setShowStatusModal(false);
    setStatusAction(null);
  };

  const openStatusModal = (action: 'start' | 'pause' | 'complete') => {
    setStatusAction(action);
    setShowStatusModal(true);
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return 'bg-green-50 text-green-700 ring-1 ring-green-600/20';
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 ring-1 ring-yellow-600/20';
      case 'completed':
        return 'bg-gray-50 text-gray-700 ring-1 ring-gray-600/20';
      default:
        return 'bg-gray-50 text-gray-700 ring-1 ring-gray-600/20';
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'active':
        return '実施中';
      case 'pending':
        return '予定';
      case 'completed':
        return '終了';
      default:
        return status;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/campaigns"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">キャンペーン詳細</h1>
              <p className="text-sm text-gray-600 mt-1">キャンペーンID: {campaign.id} | キャンペーンNO: {campaign.campaignNo}</p>
            </div>
          </div>
          <div className="flex gap-3">
            {campaign.status === 'pending' && (
              <button
                onClick={() => openStatusModal('start')}
                className="bg-green-600 text-white px-5 py-2.5 rounded-lg hover:bg-green-700 flex items-center gap-2 transition-colors"
              >
                <PlayCircle className="h-4 w-4" />
                開始
              </button>
            )}
            {campaign.status === 'active' && (
              <>
                <button
                  onClick={() => openStatusModal('pause')}
                  className="bg-yellow-600 text-white px-5 py-2.5 rounded-lg hover:bg-yellow-700 flex items-center gap-2 transition-colors"
                >
                  <PauseCircle className="h-4 w-4" />
                  一時停止
                </button>
                <button
                  onClick={() => openStatusModal('complete')}
                  className="bg-gray-600 text-white px-5 py-2.5 rounded-lg hover:bg-gray-700 flex items-center gap-2 transition-colors"
                >
                  <Clock className="h-4 w-4" />
                  終了
                </button>
              </>
            )}
            <Link
              href={`/admin/campaigns/${campaign.id}/edit`}
              className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 flex items-center gap-2 transition-colors"
            >
              <Edit className="h-4 w-4" />
              編集
            </Link>
          </div>
        </div>

        {/* ステータスヘッダー */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white">
                <Gift className="h-8 w-8" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">{campaign.campaignName}</h3>
                <p className="text-sm text-gray-600 mt-1">{campaign.campaignPlanName} | {campaign.advertiserName}</p>
                <div className="flex items-center gap-3 mt-3">
                  <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${getStatusBadge(campaign.status)}`}>
                    <Shield className="h-3 w-3 mr-1" />
                    {getStatusText(campaign.status)}
                  </span>
                  <span className="text-xs text-gray-500">
                    期間: {campaign.startDate?.replace(/(\d{4})(\d{2})(\d{2})/, '$1/$2/$3')} - {campaign.endDate?.replace(/(\d{4})(\d{2})(\d{2})/, '$1/$2/$3')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 配布状況セクション */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              <h2 className="text-lg font-semibold text-gray-900">配布状況</h2>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-xs font-medium text-blue-600 uppercase tracking-wider">総発行枚数</p>
                <p className="mt-2 text-2xl font-bold text-blue-900">{campaign.totalCards?.toLocaleString()}枚</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-xs font-medium text-green-600 uppercase tracking-wider">配布済み</p>
                <p className="mt-2 text-2xl font-bold text-green-900">{campaign.distributedCards?.toLocaleString()}枚</p>
              </div>
              <div className="bg-orange-50 rounded-lg p-4">
                <p className="text-xs font-medium text-orange-600 uppercase tracking-wider">残枚数</p>
                <p className="mt-2 text-2xl font-bold text-orange-900">{campaign.remainingCards?.toLocaleString()}枚</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">配布進捗</span>
                <span className="font-medium text-gray-900">
                  {Math.round((campaign.distributedCards / campaign.totalCards) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${Math.round((campaign.distributedCards / campaign.totalCards) * 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 基本情報セクション */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Hash className="h-5 w-5 text-green-500" />
              <h2 className="text-lg font-semibold text-gray-900">基本情報</h2>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <Hash className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">キャンペーンNO</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{campaign.campaignNo}</p>
                  </div>
                </div>
              </div>

              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <Package className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">プラン</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{campaign.campaignPlanName}</p>
                  </div>
                </div>
              </div>

              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <Building2 className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">広告主</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{campaign.advertiserName}</p>
                  </div>
                </div>
              </div>

              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <Calendar className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">実施期間</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">
                      {campaign.startDate?.replace(/(\d{4})(\d{2})(\d{2})/, '$1/$2/$3')} - {campaign.endDate?.replace(/(\d{4})(\d{2})(\d{2})/, '$1/$2/$3')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <CreditCard className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">ギフトカード金額</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">¥{campaign.giftCardAmount?.toLocaleString()}</p>
                  </div>
                </div>
              </div>

            </div>

            {/* キャンペーン説明 */}
            {campaign.campaignDescription && (
              <div className="mt-6 group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <FileText className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">キャンペーン説明</p>
                    <p className="mt-1 text-sm text-gray-900 leading-relaxed">{campaign.campaignDescription}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 対象店舗セクション */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-purple-500" />
              <h2 className="text-lg font-semibold text-gray-900">対象店舗</h2>
              <span className="ml-2 text-sm text-gray-500">({campaign.targetStoreNames?.length}店舗)</span>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {campaign.targetStoreNames?.map((storeName: string, index: number) => (
                <div key={index} className="flex items-center gap-2 bg-gray-50 rounded-lg px-4 py-3">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-700">{storeName}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* キャンペーン画像セクション */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Image className="h-5 w-5 text-orange-500" />
              <h2 className="text-lg font-semibold text-gray-900">キャンペーン画像</h2>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[1, 2, 3, 4, 5].map((num) => {
                const imageUrl = campaign[`campaignImage${num}` as keyof typeof campaign] as string;
                return (
                  <div key={num} className="group">
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={`キャンペーン画像${num}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                          <Image className="h-8 w-8 mb-2" />
                          <span className="text-xs">画像{num}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 登録情報セクション */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-gray-500" />
              <h2 className="text-lg font-semibold text-gray-900">登録情報</h2>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <Calendar className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">登録日時</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">
                      {campaign.registeredDate ? new Date(campaign.registeredDate).toLocaleString('ja-JP') : "—"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <Calendar className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">最終更新</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">
                      {campaign.lastUpdatedDate ? new Date(campaign.lastUpdatedDate).toLocaleString('ja-JP') : "—"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ステータス変更モーダル */}
      {showStatusModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">
              {
                statusAction === 'start' ? 'キャンペーン開始' :
                statusAction === 'pause' ? 'キャンペーン一時停止' :
                'キャンペーン終了'
              }
            </h3>
            <div className="space-y-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">キャンペーン名</p>
                <p className="font-medium">{campaign.campaignName}</p>
              </div>
              <p className="text-sm text-gray-600">
                {
                  statusAction === 'start' ? 'このキャンペーンを開始しますか？' :
                  statusAction === 'pause' ? 'このキャンペーンを一時停止しますか？' :
                  'このキャンペーンを終了しますか？終了後は再開できません。'
                }
              </p>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowStatusModal(false);
                  setStatusAction(null);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                キャンセル
              </button>
              <button
                onClick={handleStatusChange}
                className={`flex-1 px-4 py-2 text-white rounded-lg ${
                  statusAction === 'start' ? 'bg-green-600 hover:bg-green-700' :
                  statusAction === 'pause' ? 'bg-yellow-600 hover:bg-yellow-700' :
                  'bg-gray-600 hover:bg-gray-700'
                }`}
              >
                {
                  statusAction === 'start' ? '開始する' :
                  statusAction === 'pause' ? '一時停止する' :
                  '終了する'
                }
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}