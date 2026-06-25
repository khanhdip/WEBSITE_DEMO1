import React, { useState } from 'react';
import { CartItem, DiscountCode } from '../types';
import { X, Minus, Plus, Trash2, Ticket, Percent, Truck } from 'lucide-react';
import { DISCOUNT_CODES } from '../data/products';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemoveItem: (index: number) => void;
  onStartCheckout: (discountCode?: DiscountCode) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onStartCheckout,
}: CartDrawerProps) {
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<DiscountCode | null>(null);
  const [promoError, setPromoError] = useState('');

  if (!isOpen) return null;

  // Format price helper (VND)
  const formatVND = (num: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num);
  };

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  
  // Free shipping progress bar (limit is 500,000 VND)
  const freeShippingThreshold = 500000;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyPromo = () => {
    setPromoError('');
    const code = DISCOUNT_CODES.find((c) => c.code.toUpperCase() === promoCodeInput.trim().toUpperCase());

    if (!code) {
      setPromoError('Mã giảm giá không chính xác hoặc đã hết hạn!');
      setAppliedPromo(null);
      return;
    }

    if (code.minSubtotal && subtotal < code.minSubtotal) {
      setPromoError(`Mã này yêu cầu đơn hàng tối thiểu từ ${formatVND(code.minSubtotal)}!`);
      setAppliedPromo(null);
      return;
    }

    setAppliedPromo(code);
    setPromoCodeInput('');
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
  };

  const discountAmount = appliedPromo ? (subtotal * appliedPromo.discountPercent) / 100 : 0;
  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 30000;
  const grandTotal = subtotal - discountAmount + shippingFee;

  return (
    <div id="cart-drawer-overlay" className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm transition-all animate-fadeIn">
      {/* Click outside to close */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

      {/* Drawer content */}
      <div className="relative bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-slideLeft border-l border-neutral-100">
        
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100">
          <div className="flex items-baseline gap-2">
            <h2 className="font-sans font-black text-lg text-neutral-900 uppercase tracking-wide">Giỏ Hàng</h2>
            <span className="text-xs font-mono font-bold text-neutral-400">({cartItems.length} sản phẩm)</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Alert banner */}
        {cartItems.length > 0 && (
          <div className="bg-neutral-50 border-b border-neutral-100 px-6 py-4">
            <div className="flex items-center gap-2 mb-2">
              <Truck className={`w-4 h-4 ${amountNeededForFreeShipping === 0 ? 'text-emerald-500' : 'text-neutral-500'}`} />
              <span className="text-xs font-bold text-neutral-700">
                {amountNeededForFreeShipping === 0
                  ? 'Chúc mừng! Bạn đã được MIỄN PHÍ vận chuyển 🎉'
                  : `Mua thêm ${formatVND(amountNeededForFreeShipping)} để được miễn phí ship!`}
              </span>
            </div>
            <div className="w-full bg-neutral-200 h-1.5 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${progressPercent === 100 ? 'bg-emerald-500' : 'bg-neutral-900'}`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-20">
              <div className="h-16 w-16 bg-neutral-50 rounded-full flex items-center justify-center mb-4 text-neutral-400">
                <X className="w-8 h-8" />
              </div>
              <p className="font-sans font-bold text-neutral-800 text-sm mb-1">Giỏ hàng của bạn đang trống</p>
              <p className="text-xs text-neutral-400 max-w-xs mb-6">Hãy lướt qua catalog và chọn những sản phẩm thời trang ưng ý nhất nhé!</p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-neutral-900 text-white rounded-xl text-xs font-bold shadow-md hover:bg-neutral-800 transition-all cursor-pointer"
              >
                Tiếp tục mua sắm
              </button>
            </div>
          ) : (
            cartItems.map((item, idx) => (
              <div
                key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.name}`}
                className="flex gap-4 p-3 bg-white rounded-2xl border border-neutral-100 shadow-sm hover:border-neutral-200 transition-all"
              >
                {/* Product image */}
                <div className="h-20 w-16 rounded-xl overflow-hidden bg-neutral-50 shrink-0 border border-neutral-100">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                {/* Info & Quantity controls */}
                <div className="flex-grow flex flex-col justify-between py-0.5">
                  <div>
                    <h4 className="font-sans font-bold text-xs text-neutral-800 line-clamp-1">
                      {item.product.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-bold font-mono px-2 py-0.5 bg-neutral-100 rounded text-neutral-600">
                        Size {item.selectedSize}
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="h-2.5 w-2.5 rounded-full border border-black/10" style={{ backgroundColor: item.selectedColor.hex }} />
                        <span className="text-[10px] text-neutral-500 font-medium">{item.selectedColor.name}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-neutral-200 rounded-lg bg-neutral-50 p-0.5 scale-90 -ml-1">
                      <button
                        onClick={() => onUpdateQuantity(idx, Math.max(1, item.quantity - 1))}
                        className="w-5.5 h-5.5 rounded text-xs font-bold flex items-center justify-center text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center font-mono text-xs font-bold text-neutral-800">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                        className="w-5.5 h-5.5 rounded text-xs font-bold flex items-center justify-center text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Price & Delete */}
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs font-bold text-neutral-900">
                        {formatVND(item.product.price * item.quantity)}
                      </span>
                      <button
                        onClick={() => onRemoveItem(idx)}
                        className="p-1 text-neutral-400 hover:text-red-500 transition-colors cursor-pointer"
                        title="Xóa"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer / Summary calculations */}
        {cartItems.length > 0 && (
          <div className="border-t border-neutral-100 bg-neutral-50/50 p-6 space-y-4">
            
            {/* Promo Code Input */}
            <div className="space-y-1">
              <div className="flex gap-2">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Mã giảm giá (STREETSTYLE...)"
                    value={promoCodeInput}
                    onChange={(e) => {
                      setPromoCodeInput(e.target.value);
                      setPromoError('');
                    }}
                    className="w-full pl-9 pr-4 py-2.5 border border-neutral-200 rounded-xl text-xs font-medium focus:outline-none focus:border-neutral-900 bg-white"
                  />
                  <Ticket className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                </div>
                <button
                  onClick={handleApplyPromo}
                  className="px-4 py-2 bg-neutral-900 text-white rounded-xl text-xs font-bold hover:bg-neutral-800 transition-all shrink-0 cursor-pointer"
                >
                  Áp dụng
                </button>
              </div>

              {/* Promo validation notices */}
              {promoError && <p className="text-[10px] text-red-500 font-bold font-sans pl-1">{promoError}</p>}
              
              {appliedPromo && (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-100 text-emerald-800 p-2 rounded-lg text-[11px] font-bold">
                  <div className="flex items-center gap-1.5">
                    <Percent className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Đã áp dụng mã: <span className="font-mono underline">{appliedPromo.code}</span> (Giảm {appliedPromo.discountPercent}%)</span>
                  </div>
                  <button onClick={handleRemovePromo} className="text-emerald-700 hover:text-emerald-950 font-bold pl-1.5">
                    Gỡ
                  </button>
                </div>
              )}
            </div>

            {/* Sum Calculations */}
            <div className="space-y-2 text-xs font-bold text-neutral-600 font-mono">
              <div className="flex justify-between">
                <span className="font-sans">Tạm tính</span>
                <span className="text-neutral-800">{formatVND(subtotal)}</span>
              </div>
              {appliedPromo && (
                <div className="flex justify-between text-emerald-600">
                  <span className="font-sans">Khấu trừ ({appliedPromo.discountPercent}%)</span>
                  <span>-{formatVND(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="font-sans">Phí ship</span>
                <span className="text-neutral-800">{shippingFee === 0 ? 'FREE' : formatVND(shippingFee)}</span>
              </div>
              <div className="flex justify-between text-sm text-neutral-900 border-t border-neutral-100 pt-2.5 font-sans font-black">
                <span>Tổng số tiền</span>
                <span className="font-mono">{formatVND(grandTotal)}</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={() => onStartCheckout(appliedPromo || undefined)}
              className="w-full py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-bold rounded-2xl shadow-lg shadow-neutral-900/15 transition-all flex items-center justify-center gap-2 cursor-pointer transform active:scale-[0.99]"
            >
              <span>Thanh Toán Đơn Hàng</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
