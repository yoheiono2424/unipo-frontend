'use client'

import AdvertiserLayout from '@/components/advertiser/AdvertiserLayout'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import {
  ArrowLeft,
  Download,
  Printer,
  Clock,
  AlertCircle,
  Building
} from 'lucide-react'

export default function AdvertiserInvoiceDetailPage() {
  const params = useParams()
  const [status, setStatus] = useState('未払い')

  // 請求書詳細データ（モック）
  const invoice = {
    id: params.id,
    invoiceNo: 'INV-2025-001',
    billingMonth: '2025年1月分',
    issueDate: '2025/02/01',
    dueDate: '2025/02/28',
    totalAmount: '¥2,456,000',
    tax: '¥223,273',
    subtotal: '¥2,232,727',
    status: '未払い',
    statusColor: 'bg-yellow-100 text-yellow-800',
    statusIcon: Clock,
    companyName: '株式会社サンプル',
    companyAddress: '東京都千代田区丸の内1-1-1 ビルディング10F',
    companyTel: '03-1234-5678',
    billingAddress: {
      name: '株式会社サンプル 経理部',
      address: '東京都千代田区丸の内1-1-1',
      postalCode: '100-0001'
    },
    campaigns: [
      {
        id: 1,
        name: '春の新生活応援キャンペーン',
        period: '2025/01/01 - 2025/01/31',
        distributions: 3250,
        amount: '¥975,000'
      },
      {
        id: 2,
        name: '母の日感謝キャンペーン',
        period: '2025/01/15 - 2025/01/31',
        distributions: 2688,
        amount: '¥806,400'
      },
      {
        id: 3,
        name: 'ゴールデンウィーク特別企画',
        period: '2025/01/25 - 2025/01/31',
        distributions: 2518,
        amount: '¥674,600'
      }
    ],
    paymentMethod: '銀行振込',
    bankInfo: {
      bankName: 'みずほ銀行',
      branchName: '東京営業部',
      accountType: '普通',
      accountNumber: '1234567',
      accountName: 'カ）ユニーポ'
    }
  }


  return (
    <AdvertiserLayout>
      <div className="p-6">
        {/* ヘッダー */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Link
                href="/advertiser/invoices"
                className="mr-4 p-2 hover:bg-gray-100 rounded-lg"
              >
                <ArrowLeft size={20} />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">請求書詳細</h1>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Printer size={20} className="mr-2" />
                印刷
              </button>
              <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                <Download size={20} className="mr-2" />
                PDFダウンロード
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          {/* 請求書ヘッダー */}
          <div className="p-6 border-b">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">請求書</h2>
                <div className="text-gray-600">
                  <div className="mb-1">請求書番号: {invoice.invoiceNo}</div>
                  <div>請求月: {invoice.billingMonth}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600 mb-2">
                  <div>発行日: {invoice.issueDate}</div>
                  <div className="font-medium text-red-600">支払期限: {invoice.dueDate}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">ステータス:</span>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className={`px-3 py-1 text-sm font-semibold rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      status === '未払い'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    <option value="未払い">未払い</option>
                    <option value="支払い済み">支払い済み</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* 請求先情報 */}
          <div className="p-6 border-b">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-3">請求先</h3>
                <div className="text-gray-900">
                  <div className="font-medium mb-1">{invoice.billingAddress.name}</div>
                  <div className="text-sm">
                    <div>〒{invoice.billingAddress.postalCode}</div>
                    <div>{invoice.billingAddress.address}</div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-3">請求元</h3>
                <div className="text-gray-900">
                  <div className="font-medium mb-1">ユニーポ株式会社</div>
                  <div className="text-sm">
                    <div>〒100-0001</div>
                    <div>東京都千代田区千代田1-1</div>
                    <div>TEL: 03-0000-0000</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 請求金額サマリー */}
          <div className="p-6 border-b bg-gray-50">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">請求金額</h3>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-gray-900">{invoice.totalAmount}</div>
                <div className="text-sm text-gray-600 mt-1">（税込）</div>
              </div>
            </div>
          </div>

          {/* キャンペーン明細 */}
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">キャンペーン明細</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">キャンペーン名</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">期間</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">金額</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {invoice.campaigns.map((campaign) => (
                    <tr key={campaign.id}>
                      <td className="px-4 py-4 text-sm text-gray-900">{campaign.name}</td>
                      <td className="px-4 py-4 text-sm text-gray-600">{campaign.period}</td>
                      <td className="px-4 py-4 text-sm font-medium text-gray-900 text-right">
                        {campaign.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <td colSpan={2} className="px-4 py-3 text-sm font-medium text-gray-900">小計</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                      {invoice.subtotal}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2} className="px-4 py-3 text-sm font-medium text-gray-900">消費税（10%）</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                      {invoice.tax}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2} className="px-4 py-3 text-lg font-bold text-gray-900">合計金額</td>
                    <td className="px-4 py-3 text-lg font-bold text-gray-900 text-right">
                      {invoice.totalAmount}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* 支払い情報 */}
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">お支払い方法</h3>
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-start">
                <Building className="text-blue-600 mt-1 mr-3" size={20} />
                <div className="flex-1">
                  <div className="font-medium text-gray-900 mb-2">{invoice.paymentMethod}</div>
                  <div className="text-sm text-gray-700">
                    <div className="grid grid-cols-2 gap-2">
                      <div>銀行名: {invoice.bankInfo.bankName}</div>
                      <div>支店名: {invoice.bankInfo.branchName}</div>
                      <div>口座種別: {invoice.bankInfo.accountType}</div>
                      <div>口座番号: {invoice.bankInfo.accountNumber}</div>
                    </div>
                    <div className="mt-2">口座名義: {invoice.bankInfo.accountName}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 注意事項 */}
            <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
              <div className="flex items-start">
                <AlertCircle className="text-yellow-600 mt-0.5 mr-2" size={16} />
                <div className="text-sm text-gray-700">
                  <p className="font-medium mb-1">ご注意事項</p>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>振込手数料はお客様のご負担となります</li>
                    <li>支払期限を過ぎた場合、遅延損害金が発生する場合があります</li>
                    <li>お振込の際は、請求書番号を振込名義に含めてください</li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </AdvertiserLayout>
  )
}