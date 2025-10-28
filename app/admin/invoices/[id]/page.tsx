"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { ArrowLeft, Edit, Receipt, Building2, Calendar, FileText, DollarSign } from "lucide-react";
import Link from "next/link";
import { use } from "react";

const mockInvoices = [
  {
    id: "INV001",
    invoiceNumber: "INV-2025-001",
    advertiser: "株式会社ABC",
    campaign: "新春キャンペーン2025",
    billingPeriod: "2025年1月",
    issueDate: "2025-02-01",
    dueDate: "2025-02-28",
    amount: 600000,
    tax: 60000,
    totalAmount: 660000,
    status: "未払い",
    paymentMethod: "銀行振込",
    description: "新春キャンペーン配布実績に基づく請求",
    distributedCount: 1200,
    unitPrice: 500,
  },
  {
    id: "INV002",
    invoiceNumber: "INV-2024-012",
    advertiser: "株式会社ABC",
    campaign: "クリスマスキャンペーン2024",
    billingPeriod: "2024年12月",
    issueDate: "2025-01-01",
    dueDate: "2025-01-31",
    paymentDate: "2025-01-25",
    amount: 8500000,
    tax: 850000,
    totalAmount: 9350000,
    status: "支払済み",
    paymentMethod: "銀行振込",
    description: "クリスマスキャンペーン配布実績に基づく請求",
    distributedCount: 8500,
    unitPrice: 1000,
  },
];

export default function InvoiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const invoice = mockInvoices.find(inv => inv.id === resolvedParams.id) || mockInvoices[0];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/invoices"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">請求詳細</h1>
              <p className="text-sm text-gray-600 mt-1">請求番号: {invoice.invoiceNumber}</p>
            </div>
          </div>
          <Link
            href={`/admin/invoices/${invoice.id}/edit`}
            className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 flex items-center gap-2 transition-colors"
          >
            <Edit className="h-4 w-4" />
            編集
          </Link>
        </div>

        {/* 請求情報 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">請求情報</h2>
          </div>

          <div className="p-6">
            {/* ステータスと金額表示 */}
            <div className="mb-6 pb-6 border-b border-gray-100">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white">
                    <Receipt className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{invoice.invoiceNumber}</h3>
                    <p className="text-sm text-gray-600 mt-1">{invoice.advertiser}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-gray-900">￥{invoice.totalAmount.toLocaleString()}</p>
                  <p className="text-sm text-gray-600 mt-1">(税込)</p>
                </div>
              </div>
            </div>

            {/* 情報グリッド */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <Building2 className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">広告主</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{invoice.advertiser}</p>
                  </div>
                </div>
              </div>

              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <FileText className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">キャンペーン</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{invoice.campaign}</p>
                  </div>
                </div>
              </div>

              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <Calendar className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">請求期間</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{invoice.billingPeriod}</p>
                  </div>
                </div>
              </div>

              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <Calendar className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">発行日</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{invoice.issueDate}</p>
                  </div>
                </div>
              </div>

              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <Calendar className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">支払日</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{invoice.dueDate}</p>
                  </div>
                </div>
              </div>

              {invoice.paymentDate && (
                <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                      <Calendar className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">支払日</p>
                      <p className="mt-1 text-sm font-medium text-gray-900">{invoice.paymentDate}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <DollarSign className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">支払方法</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{invoice.paymentMethod}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 金額詳細 */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">金額詳細</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">配布枚数</span>
                  <span className="text-sm font-medium text-gray-900">{invoice.distributedCount.toLocaleString()}枚</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">単価</span>
                  <span className="text-sm font-medium text-gray-900">￥{invoice.unitPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center border-t pt-3">
                  <span className="text-sm text-gray-600">小計</span>
                  <span className="text-sm font-medium text-gray-900">￥{invoice.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">消費税（10%）</span>
                  <span className="text-sm font-medium text-gray-900">￥{invoice.tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center border-t pt-3">
                  <span className="text-base font-semibold text-gray-900">合計金額</span>
                  <span className="text-lg font-bold text-gray-900">￥{invoice.totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* 備考 */}
            {invoice.description && (
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">備考</h3>
                <p className="text-sm text-gray-600">{invoice.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}