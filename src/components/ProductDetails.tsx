import React, { useState } from 'react';
import { Product } from '../types';
import { X, Star, ShoppingBag, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

interface ProductDetailsProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: { name: string; hex: string }, quantity: number) => void;
  openSizeGuide: () => void;
}

export default function ProductDetails({ product, onClose, onAddToCart, openSizeGuide }: ProductDetailsProps) {
  const [activeImage, setActiveImage] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'reviews'>('desc');

  // Format price helper (VND)
  const formatVND = (num: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num);
  };

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
    onClose();
  };

  // Mock Reviews based on rating
  const reviews = [
    { name: 'Khánh Linh', rating: 5, date: '2 ngày trước', comment: 'Vải siêu mịn, áo dày dặn mặc ấm cực kì, form rũ rất đẹp. Sẽ ủng hộ shop thêm nhiều lần nữa.' },
    { name: 'Minh Tuấn', rating: 5, date: '1 tuần trước', comment: 'Đóng gói bọc hộp cẩn thận dã man, áo thơm mùi tinh dầu tự nhiên. Giao hàng ở SG chỉ 1 ngày là nhận được rồi.' },
    { name: 'Đức Huy', rating: 4, date: '2 tuần trước', comment: 'Quần form rộng baggy thoải mái lắm, túi hộp may chắc chắn tiện lợi. Mình cao 1m75 mặc XL vừa xinh luôn.' }
  ].filter(r => r.rating <= Math.ceil(product.rating));

  return (
    <div id="product-details-modal" className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative bg-white w-full max-w-5xl rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden max-h-[90vh] md:max-h-[85vh] animate-scaleUp border border-neutral-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/80 hover:bg-neutral-900 hover:text-white transition-all shadow-md cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Images */}
        <div className="w-full md:w-1/2 p-4 sm:p-6 bg-neutral-50/50 flex flex-col justify-between overflow-y-auto">
          {/* Main Stage */}
          <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-100 mb-4 shadow-inner">
            <img
              src={activeImage}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover object-center"
            />
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3 justify-center">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`h-16 w-16 sm:h-20 sm:w-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    activeImage === img ? 'border-neutral-900 scale-105 shadow-md' : 'border-neutral-200 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} thumbnail ${idx}`}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover object-center"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Options & Purchase info */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto border-t md:border-t-0 md:border-l border-neutral-100">
          <div>
            {/* Category & Badge */}
            <div className="flex items-center gap-2.5 mb-2.5">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400">
                {product.category}
              </span>
              {product.badge && (
                <span className="px-2 py-0.5 text-[9px] font-mono font-bold rounded-full bg-neutral-900 text-white tracking-wide">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Title */}
            <h2 className="font-sans font-black text-xl sm:text-2xl text-neutral-900 mb-2 leading-tight">
              {product.name}
            </h2>

            {/* Price & Rating */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-100">
              <div className="flex items-baseline gap-2.5">
                <span className="font-mono text-xl sm:text-2xl font-black text-neutral-900">
                  {formatVND(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm font-mono text-neutral-400 line-through">
                    {formatVND(product.originalPrice)}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5 bg-neutral-50 px-3 py-1.5 rounded-full border border-neutral-100">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="text-sm font-mono font-bold text-neutral-800">{product.rating}</span>
                <span className="text-xs text-neutral-400 font-medium">({product.reviewCount})</span>
              </div>
            </div>

            {/* Color Select */}
            <div className="mb-5">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold uppercase text-neutral-500 font-mono tracking-wider">Màu sắc</span>
                <span className="text-xs font-bold text-neutral-800 font-sans">{selectedColor.name}</span>
              </div>
              <div className="flex gap-2.5">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`h-9 w-9 rounded-full border border-neutral-200 flex items-center justify-center transition-all cursor-pointer ${
                      selectedColor.name === color.name ? 'ring-2 ring-neutral-900 ring-offset-2 scale-105' : 'hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  >
                    {selectedColor.name === color.name && (
                      <span className="h-2 w-2 rounded-full bg-white mix-blend-difference" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Select */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold uppercase text-neutral-500 font-mono tracking-wider">Kích cỡ</span>
                <button
                  onClick={openSizeGuide}
                  className="text-xs font-semibold text-neutral-600 hover:text-neutral-900 underline underline-offset-2 transition-all"
                >
                  Gợi ý size thông minh
                </button>
              </div>
              <div className="flex gap-2.5 flex-wrap">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-4 py-2 text-xs font-bold font-mono rounded-xl border transition-all cursor-pointer ${
                      selectedSize === sz
                        ? 'bg-neutral-900 border-neutral-900 text-white shadow-md'
                        : 'bg-white border-neutral-200 text-neutral-700 hover:border-neutral-900'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation Tabs (Description vs Specs vs Reviews) */}
            <div className="border-b border-neutral-100 flex gap-4 text-xs font-bold uppercase tracking-wider font-mono mb-4">
              <button
                onClick={() => setActiveTab('desc')}
                className={`pb-2.5 transition-all relative cursor-pointer ${
                  activeTab === 'desc' ? 'text-neutral-900 border-b-2 border-neutral-900' : 'text-neutral-400 hover:text-neutral-600'
                }`}
              >
                Mô tả
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-2.5 transition-all relative cursor-pointer ${
                  activeTab === 'specs' ? 'text-neutral-900 border-b-2 border-neutral-900' : 'text-neutral-400 hover:text-neutral-600'
                }`}
              >
                Chi tiết vải
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-2.5 transition-all relative cursor-pointer ${
                  activeTab === 'reviews' ? 'text-neutral-900 border-b-2 border-neutral-900' : 'text-neutral-400 hover:text-neutral-600'
                }`}
              >
                Đánh giá ({product.reviewCount})
              </button>
            </div>

            {/* Tab Contents */}
            <div className="min-h-[100px] mb-6 text-sm text-neutral-600 leading-relaxed font-sans">
              {activeTab === 'desc' && <p>{product.description}</p>}
              {activeTab === 'specs' && (
                <ul className="space-y-1.5 list-disc list-inside text-xs font-medium text-neutral-700">
                  {product.specs.map((spec, i) => (
                    <li key={i}>{spec}</li>
                  ))}
                </ul>
              )}
              {activeTab === 'reviews' && (
                <div className="space-y-3.5">
                  {reviews.map((rev, i) => (
                    <div key={i} className="bg-neutral-50 p-3 rounded-xl border border-neutral-100/50">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-bold text-neutral-800 text-xs">{rev.name}</span>
                        <span className="text-[10px] text-neutral-400 font-mono">{rev.date}</span>
                      </div>
                      <div className="flex items-center gap-0.5 mb-1.5">
                        {[...Array(5)].map((_, idx) => (
                          <Star
                            key={idx}
                            className={`w-3 h-3 ${idx < rev.rating ? 'text-amber-400 fill-amber-400' : 'text-neutral-200'}`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-neutral-600 font-medium">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick trust metrics */}
          <div className="grid grid-cols-3 gap-2.5 py-4 border-y border-neutral-100 mb-6 text-center">
            <div className="flex flex-col items-center">
              <ShieldCheck className="w-5 h-5 text-neutral-800 mb-1" />
              <span className="text-[9px] font-bold text-neutral-800 font-sans">CHÍNH HÃNG 100%</span>
            </div>
            <div className="flex flex-col items-center">
              <Truck className="w-5 h-5 text-neutral-800 mb-1" />
              <span className="text-[9px] font-bold text-neutral-800 font-sans">GIAO NHANH TOÀN QUỐC</span>
            </div>
            <div className="flex flex-col items-center">
              <RefreshCw className="w-5 h-5 text-neutral-800 mb-1" />
              <span className="text-[9px] font-bold text-neutral-800 font-sans">ĐỔI TRẢ MIỄN PHÍ</span>
            </div>
          </div>

          {/* Bottom Controls: Quantity & Checkout Add */}
          <div className="flex items-center gap-3.5">
            {/* Quantity Selector */}
            <div className="flex items-center border border-neutral-200 rounded-xl h-11 bg-neutral-50 px-1">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-lg text-lg font-bold flex items-center justify-center text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
              >
                -
              </button>
              <span className="w-8 text-center font-mono text-sm font-bold text-neutral-800">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-lg text-lg font-bold flex items-center justify-center text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
              >
                +
              </button>
            </div>

            {/* Submit Add */}
            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 h-11 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-sm font-bold shadow-lg shadow-neutral-900/15 transition-all cursor-pointer transform active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Thêm vào giỏ hàng</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
