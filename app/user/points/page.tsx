'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Coins, Package, Sparkles, X, Check, MapPin, Home as HomeIcon } from 'lucide-react'
import UserLayout from '@/components/user/UserLayout'

type ProductType = 'digital' | 'physical'
type PopupType = 'confirm' | 'success' | 'addressConfirm' | 'addressInput' | 'shippingComplete' | null

export default function UserPointsPage() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showPopup, setShowPopup] = useState<PopupType>(null)
  const [selectedItem, setSelectedItem] = useState<typeof pointItems[0] | null>(null)

  // モックユーザーデータ
  const [userData, setUserData] = useState({
    hasAddress: false, // 住所登録状態（本番ではバックエンドから取得）
    lastName: '山田',
    firstName: '太郎',
    postalCode: '',
    prefecture: '',
    city: '',
    address: '',
    phone: '090-1234-5678'
  })

  // 住所入力フォーム
  const [addressForm, setAddressForm] = useState({
    postalCode: '',
    prefecture: '',
    city: '',
    address: ''
  })
  const [loadingAddress, setLoadingAddress] = useState(false)

  const categories = [
    { id: 'all', label: 'すべて' },
    { id: 'giftcard', label: 'ギフトカード' },
    { id: 'coupon', label: 'クーポン' },
    { id: 'product', label: '商品' },
  ]

  const pointItems = [
    {
      id: 1,
      name: '500円ギフトカード',
      category: 'giftcard',
      type: 'digital' as ProductType,
      points: 500,
      image: '🎁',
      description: 'ユニー全店舗で使える500円分のギフトカード',
      inStock: true
    },
    {
      id: 2,
      name: '1000円ギフトカード',
      category: 'giftcard',
      type: 'digital' as ProductType,
      points: 1000,
      image: '🎁',
      description: 'ユニー全店舗で使える1000円分のギフトカード',
      inStock: true
    },
    {
      id: 3,
      name: '10%OFFクーポン',
      category: 'coupon',
      type: 'digital' as ProductType,
      points: 300,
      image: '🎫',
      description: '次回のお買い物で使える10%OFFクーポン',
      inStock: true
    },
    {
      id: 4,
      name: 'ユニーエコバッグ',
      category: 'product',
      type: 'physical' as ProductType,
      points: 800,
      image: '👜',
      description: 'オリジナルデザインのエコバッグ',
      inStock: true
    },
  ]

  // 在庫ありの商品のみ表示
  const filteredItems = pointItems.filter(
    item => item.inStock && (selectedCategory === 'all' || item.category === selectedCategory)
  )

  const currentPoints = 1234 // モックデータ

  // 郵便番号から住所を取得
  const fetchAddress = async (postalCode: string) => {
    const cleanCode = postalCode.replace(/-/g, '')
    if (cleanCode.length !== 7) return

    setLoadingAddress(true)
    try {
      const response = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${cleanCode}`)
      const data = await response.json()

      if (data.status === 200 && data.results) {
        const result = data.results[0]
        setAddressForm({
          ...addressForm,
          postalCode: postalCode,
          prefecture: result.address1,
          city: result.address2 + result.address3
        })
      } else {
        alert('郵便番号が見つかりませんでした')
      }
    } catch (error) {
      console.error('住所取得エラー:', error)
      alert('住所の取得に失敗しました')
    } finally {
      setLoadingAddress(false)
    }
  }

  const handlePostalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setAddressForm({ ...addressForm, postalCode: value })

    const cleanCode = value.replace(/-/g, '')
    if (cleanCode.length === 7) {
      fetchAddress(value)
    }
  }

  const handleExchange = (item: typeof pointItems[0]) => {
    if (currentPoints < item.points) {
      alert('ポイントが不足しています')
      return
    }

    setSelectedItem(item)

    if (item.type === 'digital') {
      // デジタル商品：確認ポップアップを表示
      setShowPopup('confirm')
    } else if (item.type === 'physical') {
      // 物理商品：住所確認
      if (userData.hasAddress) {
        setShowPopup('addressConfirm')
      } else {
        setShowPopup('addressInput')
      }
    }
  }

  const handleConfirmExchange = () => {
    // デジタル商品の交換処理
    console.log('デジタル商品交換:', selectedItem)
    setShowPopup('success')
  }

  const handlePhysicalExchange = () => {
    // 物理商品の交換処理
    console.log('物理商品交換:', selectedItem)
    setShowPopup('shippingComplete')
  }

  const handleAddressSubmit = () => {
    // 住所を登録してユーザー情報を更新
    setUserData({
      ...userData,
      hasAddress: true,
      postalCode: addressForm.postalCode,
      prefecture: addressForm.prefecture,
      city: addressForm.city,
      address: addressForm.address
    })
    // 交換処理
    handlePhysicalExchange()
  }

  const closePopup = () => {
    setShowPopup(null)
    setSelectedItem(null)
    setAddressForm({
      postalCode: '',
      prefecture: '',
      city: '',
      address: ''
    })
  }

  return (
    <UserLayout>
      <div className="bg-gradient-to-b from-red-50 to-white min-h-screen">
        {/* ヘッダー */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-[428px] mx-auto px-4 py-4">
            <h1 className="text-xl font-bold text-gray-900">ポイント交換</h1>
          </div>
        </div>

        {/* 保有ポイントカード */}
        <div className="max-w-[428px] mx-auto px-4 py-6">
          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-3xl shadow-2xl p-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-medium opacity-90">保有ポイント</span>
            </div>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-5xl font-bold">{currentPoints}</span>
              <span className="text-xl font-medium opacity-90">P</span>
            </div>
            <button
              onClick={() => router.push('/user/points/history')}
              className="w-full bg-white/20 backdrop-blur-sm text-white py-3 rounded-xl font-semibold hover:bg-white/30 transition-colors"
            >
              ポイント履歴を見る
            </button>
          </div>
        </div>

        {/* カテゴリフィルター */}
        <div className="max-w-[428px] mx-auto px-4 mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  selectedCategory === category.id
                    ? 'bg-red-500 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* 商品一覧 */}
        <div className="max-w-[428px] mx-auto px-4 pb-8">
          <div className="space-y-3">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all overflow-hidden"
              >
                <div className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl flex items-center justify-center text-4xl flex-shrink-0">
                      {item.image}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 mb-2">{item.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-yellow-600 font-bold text-lg">
                          <Coins className="w-5 h-5" />
                          <span>{item.points}P</span>
                        </div>
                        <button
                          onClick={() => handleExchange(item)}
                          disabled={currentPoints < item.points}
                          className={`px-4 py-2 rounded-xl font-semibold transition-colors flex items-center gap-1 ${
                            currentPoints < item.points
                              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                              : 'bg-red-500 text-white hover:bg-red-600'
                          }`}
                        >
                          <Package className="w-4 h-4" />
                          交換
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ポップアップ */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          {/* デジタル商品 - 確認ポップアップ */}
          {showPopup === 'confirm' && selectedItem && (
            <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-sm w-full">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mb-4">
                  <span className="text-4xl">{selectedItem.image}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">交換確認</h3>
                <p className="text-gray-600 mb-4">{selectedItem.name}と交換しますか？</p>
                <div className="bg-gray-50 rounded-xl p-3 mb-6 w-full">
                  <div className="flex items-center justify-center gap-2 text-yellow-600 font-bold text-lg">
                    <Coins className="w-5 h-5" />
                    <span>{selectedItem.points}P</span>
                  </div>
                </div>
                <div className="flex gap-3 w-full">
                  <button
                    onClick={closePopup}
                    className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                  >
                    キャンセル
                  </button>
                  <button
                    onClick={handleConfirmExchange}
                    className="flex-1 bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition-colors"
                  >
                    交換する
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* デジタル商品 - 成功ポップアップ */}
          {showPopup === 'success' && selectedItem && (
            <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-sm w-full">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mb-4">
                  <Check className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">交換完了！</h3>
                <p className="text-gray-600 mb-4">{selectedItem.name}と交換しました</p>
                <p className="text-sm text-gray-500 mb-6">ギフトカード一覧からご確認ください</p>
                <button
                  onClick={closePopup}
                  className="w-full bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition-colors"
                >
                  閉じる
                </button>
              </div>
            </div>
          )}

          {/* 物理商品 - 住所確認ポップアップ */}
          {showPopup === 'addressConfirm' && selectedItem && (
            <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-sm w-full">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">配送先確認</h3>
                <p className="text-gray-600 mb-4">{selectedItem.name}をこちらの住所に配送します</p>

                <div className="bg-gray-50 rounded-xl p-4 mb-6 w-full text-left">
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-500">お名前：</span>
                      <span className="text-gray-900 font-medium">{userData.lastName} {userData.firstName}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">電話番号：</span>
                      <span className="text-gray-900 font-medium">{userData.phone}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">郵便番号：</span>
                      <span className="text-gray-900 font-medium">{userData.postalCode}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">住所：</span>
                      <span className="text-gray-900 font-medium">
                        {userData.prefecture}{userData.city}{userData.address}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 w-full">
                  <button
                    onClick={closePopup}
                    className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                  >
                    キャンセル
                  </button>
                  <button
                    onClick={handlePhysicalExchange}
                    className="flex-1 bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition-colors"
                  >
                    交換する
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 物理商品 - 住所入力ポップアップ */}
          {showPopup === 'addressInput' && selectedItem && (
            <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-sm w-full max-h-[90vh] overflow-y-auto">
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">配送先住所の登録</h3>
                  <button
                    onClick={closePopup}
                    className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                <p className="text-sm text-gray-600 mb-4">
                  {selectedItem.name}の配送に必要な住所を登録してください
                </p>

                <div className="space-y-4">
                  {/* 郵便番号 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      郵便番号 <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={addressForm.postalCode}
                        onChange={handlePostalCodeChange}
                        placeholder="123-4567"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900"
                        required
                        maxLength={8}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {loadingAddress ? '住所を取得中...' : '7桁入力すると自動で住所が入力されます'}
                    </p>
                  </div>

                  {/* 都道府県 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      都道府県 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={addressForm.prefecture}
                      onChange={(e) => setAddressForm({ ...addressForm, prefecture: e.target.value })}
                      placeholder="愛知県"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900"
                      required
                    />
                  </div>

                  {/* 市区町村 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      市区町村 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={addressForm.city}
                      onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                      placeholder="名古屋市中区"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900"
                      required
                    />
                  </div>

                  {/* 番地・建物名 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      番地・建物名 <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <HomeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={addressForm.address}
                        onChange={(e) => setAddressForm({ ...addressForm, address: e.target.value })}
                        placeholder="錦1-2-3 ○○ビル101"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900"
                        required
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleAddressSubmit}
                    disabled={!addressForm.postalCode || !addressForm.prefecture || !addressForm.city || !addressForm.address}
                    className="w-full bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    登録して交換する
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 物理商品 - 配送手配完了ポップアップ */}
          {showPopup === 'shippingComplete' && selectedItem && (
            <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-sm w-full">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mb-4">
                  <Package className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">交換完了！</h3>
                <p className="text-gray-600 mb-4">{selectedItem.name}の配送手配が完了しました</p>
                <p className="text-sm text-gray-500 mb-6">
                  登録された住所に商品をお届けします。<br />
                  お届けまで1週間程度お待ちください。
                </p>
                <button
                  onClick={closePopup}
                  className="w-full bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition-colors"
                >
                  閉じる
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </UserLayout>
  )
}
