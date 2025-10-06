'use client'

import AdvertiserLayout from '@/components/advertiser/AdvertiserLayout'
import { useState } from 'react'
import Link from 'next/link'
import {
  Search,
  Download,
  Calendar,
  CreditCard,
  FileText,
  AlertCircle,
  CheckCircle,
  Clock,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

export default function AdvertiserInvoicesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [yearFilter, setYearFilter] = useState('2025')
  const [monthFilter, setMonthFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  // 請求データ（モック）
  const invoices = [
    {
      id: 1,
      invoiceNo: 'INV-2025-001',
      billingMonth: '2025年1月分',
      issueDate: '2025/02/01',
      dueDate: '2025/02/28',
      amount: '¥2,456,000',
      status: '未払い',
      statusColor: 'bg-yellow-100 text-yellow-800',
      statusIcon: Clock,
      campaignId: 'CMP001',
      campaignName: '春の新生活応援キャンペーン'
    },
    {
      id: 2,
      invoiceNo: 'INV-2024-012',
      billingMonth: '2024年12月分',
      issueDate: '2025/01/01',
      dueDate: '2025/01/31',
      amount: '¥1,890,000',
      status: '支払済み',
      statusColor: 'bg-green-100 text-green-800',
      statusIcon: CheckCircle,
      campaignId: 'CMP002',
      campaignName: 'ゴールデンウィーク特別企画',
      paidDate: '2025/01/25'
    },
    {
      id: 3,
      invoiceNo: 'INV-2024-011',
      billingMonth: '2024年11月分',
      issueDate: '2024/12/01',
      dueDate: '2024/12/31',
      amount: '¥2,134,000',
      status: '支払済み',
      statusColor: 'bg-green-100 text-green-800',
      statusIcon: CheckCircle,
      campaignId: 'CMP001',
      campaignName: '春の新生活応援キャンペーン',
      paidDate: '2024/12/20'
    },
    {
      id: 4,
      invoiceNo: 'INV-2024-010',
      billingMonth: '2024年10月分',
      issueDate: '2024/11/01',
      dueDate: '2024/11/30',
      amount: '¥1,567,000',
      status: '支払済み',
      statusColor: 'bg-green-100 text-green-800',
      statusIcon: CheckCircle,
      campaignId: 'CMP003',
      campaignName: '母の日感謝キャンペーン',
      paidDate: '2024/11/28'
    },
    {
      id: 5,
      invoiceNo: 'INV-2024-009',
      billingMonth: '2024年9月分',
      issueDate: '2024/10/01',
      dueDate: '2024/10/31',
      amount: '¥980,000',
      status: '期限超過',
      statusColor: 'bg-red-100 text-red-800',
      statusIcon: AlertCircle,
      campaignId: 'CMP002',
      campaignName: 'ゴールデンウィーク特別企画'
    }
  ]

  // 統計データ（モック）
  const statistics = {
    totalUnpaid: '¥2,456,000',
    thisMonth: '¥2,456,000',
    lastMonth: '¥1,890,000',
    yearTotal: '¥8,527,000'
  }

  // フィルタリング
  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.billingMonth.includes(searchTerm)
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter
    const matchesYear = yearFilter === 'all' || invoice.issueDate.startsWith(yearFilter)
    return matchesSearch && matchesStatus && matchesYear
  })

  // ページネーション
  const itemsPerPage = 10
  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const displayedInvoices = filteredInvoices.slice(startIndex, startIndex + itemsPerPage)

  return (
    <AdvertiserLayout>
      <div className="p-6">
        {/* ヘッダー */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">請求管理</h1>
          <p className="text-gray-600 mt-1">利用料金の請求書確認と支払い管理ができます</p>
        </div>

        {/* 統計カード */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between mb-2">
              <AlertCircle className="text-orange-600" size={20} />
              <span className="text-xs text-orange-600 font-medium">要対応</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{statistics.totalUnpaid}</div>
            <div className="text-sm text-gray-600">未払い金額</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between mb-2">
              <Calendar className="text-blue-600" size={20} />
              <span className="text-xs text-gray-600">今月</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{statistics.thisMonth}</div>
            <div className="text-sm text-gray-600">今月の請求</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between mb-2">
              <CreditCard className="text-green-600" size={20} />
              <span className="text-xs text-gray-600">先月</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{statistics.lastMonth}</div>
            <div className="text-sm text-gray-600">先月の請求</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between mb-2">
              <FileText className="text-purple-600" size={20} />
              <span className="text-xs text-gray-600">年間</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{statistics.yearTotal}</div>
            <div className="text-sm text-gray-600">年間総額</div>
          </div>
        </div>

        {/* アラート */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <AlertCircle className="text-yellow-600 mt-0.5 mr-3" size={20} />
            <div>
              <h3 className="font-semibold text-yellow-900">お支払い期限のお知らせ</h3>
              <p className="text-sm text-yellow-700 mt-1">
                2025年1月分の請求書（¥2,456,000）の支払期限は2025年2月28日です。
              </p>
            </div>
          </div>
        </div>

        {/* フィルター */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="請求書番号・請求月で検索"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
              </div>
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            >
              <option value="all">すべてのステータス</option>
              <option value="未払い">未払い</option>
              <option value="支払済み">支払済み</option>
              <option value="期限超過">期限超過</option>
            </select>

            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            >
              <option value="2025">2025年</option>
              <option value="2024">2024年</option>
              <option value="all">すべて</option>
            </select>

            <select
              value={monthFilter}
              onChange={(e) => setMonthFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            >
              <option value="all">すべての月</option>
              <option value="1">1月</option>
              <option value="2">2月</option>
              <option value="3">3月</option>
              <option value="4">4月</option>
              <option value="5">5月</option>
              <option value="6">6月</option>
              <option value="7">7月</option>
              <option value="8">8月</option>
              <option value="9">9月</option>
              <option value="10">10月</option>
              <option value="11">11月</option>
              <option value="12">12月</option>
            </select>
          </div>
        </div>

        {/* 請求書テーブル */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    請求書
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    請求月
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    発行日/期限
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    請求額
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    キャンペーンID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    キャンペーン名
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ステータス
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {displayedInvoices.map((invoice) => (
                  <tr
                    key={invoice.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => window.location.href = `/advertiser/invoices/${invoice.id}`}
                  >
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{invoice.invoiceNo}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{invoice.billingMonth}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        <div>発行: {invoice.issueDate}</div>
                        <div className="text-xs text-gray-500">期限: {invoice.dueDate}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-bold text-gray-900">{invoice.amount}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{invoice.campaignId}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{invoice.campaignName}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${invoice.statusColor}`}>
                        <invoice.statusIcon size={14} className="mr-1" />
                        {invoice.status}
                      </span>
                      {invoice.paidDate && (
                        <div className="text-xs text-gray-500 mt-1">
                          支払日: {invoice.paidDate}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ページネーション */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  全 {filteredInvoices.length} 件中 {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredInvoices.length)} 件を表示
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3 py-1 rounded-lg ${
                        currentPage === i + 1
                          ? 'bg-blue-600 text-white'
                          : 'border hover:bg-gray-50'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdvertiserLayout>
  )
}