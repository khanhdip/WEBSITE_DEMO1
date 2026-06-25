import React, { useState } from 'react';
import { CartItem, DiscountCode, Order } from '../types';
import { ChevronLeft, Truck, CreditCard, CheckCircle, Smartphone, MapPin, Copy, Calendar } from 'lucide-react';

interface CheckoutProps {
  cartItems: CartItem[];
  discountCode?: DiscountCode;
  onClose: () => void;
  onPlaceOrder: (order: Order) => void;
}

export default function Checkout({ cartItems, discountCode, onClose, onPlaceOrder }: CheckoutProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [copiedAccount, setCopiedAccount] = useState(false);

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [addressDetail, setAddressDetail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'banking'>('cod');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Created Order placeholder to track in Step 3
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  // Format price helper (VND)
  const formatVND = (num: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num);
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = discountCode ? (subtotal * discountCode.discountPercent) / 100 : 0;
  const shippingFee = subtotal >= 500000 ? 0 : 30000;
  const total = subtotal - discountAmount + shippingFee;

  const validateStep1 = () => {
    const err: Record<string, string> = {};
    if (!fullName.trim()) err.fullName = 'Vui lòng nhập họ và tên';
    if (!phone.trim()) {
      err.phone = 'Vui lòng nhập số điện thoại';
    } else if (!/^[0-9]{10}$/.test(phone.trim())) {
      err.phone = 'Số điện thoại gồm 10 số';
    }
    if (!email.trim()) {
      err.email = 'Vui lòng nhập email';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      err.email = 'Email không hợp lệ';
    }
    if (!city.trim()) err.city = 'Vui lòng nhập tỉnh / thành phố';
    if (!district.trim()) err.district = 'Vui lòng nhập quận / huyện';
    if (!addressDetail.trim()) err.addressDetail = 'Vui lòng nhập số nhà, tên đường';

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (validateStep1()) {
        setStep(2);
      }
    }
  };

  const handleCopyAccount = () => {
    navigator.clipboard.writeText('103875888888');
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  const handleCompleteCheckout = () => {
    const orderId = `YOUTH-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: Order = {
      id: orderId,
      date: new Date().toLocaleDateString('vi-VN'),
      items: [...cartItems],
      shippingAddress: {
        fullName,
        phone,
        email,
        city,
        district,
        addressDetail,
      },
      paymentMethod,
      subtotal,
      discount: discountAmount,
      shippingFee,
      total,
      status: 'pending',
    };

    setCreatedOrder(newOrder);
    onPlaceOrder(newOrder);
    setStep(3);
  };

  return (
    <div id="checkout-container" className="min-h-[80vh] bg-neutral-50/50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button / Navigation */}
        {step < 3 && (
          <button
            onClick={step === 2 ? () => setStep(1) : onClose}
            className="flex items-center gap-1.5 text-xs font-bold text-neutral-500 hover:text-neutral-900 mb-6 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{step === 2 ? 'Quay lại thông tin giao hàng' : 'Quay lại cửa hàng'}</span>
          </button>
        )}

        {/* Stepper Indicators */}
        <div className="flex items-center justify-center gap-4 sm:gap-10 mb-8 max-w-lg mx-auto select-none">
          <div className="flex items-center gap-2">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold border transition-all ${
              step >= 1 ? 'bg-neutral-900 text-white border-neutral-900 shadow-md' : 'bg-white border-neutral-200 text-neutral-400'
            }`}>
              1
            </div>
            <span className={`text-xs font-bold font-sans ${step >= 1 ? 'text-neutral-900' : 'text-neutral-400'}`}>Giao Hàng</span>
          </div>
          <div className="h-0.5 bg-neutral-200 w-12 sm:w-20" />
          <div className="flex items-center gap-2">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold border transition-all ${
              step >= 2 ? 'bg-neutral-900 text-white border-neutral-900 shadow-md' : 'bg-white border-neutral-200 text-neutral-400'
            }`}>
              2
            </div>
            <span className={`text-xs font-bold font-sans ${step >= 2 ? 'text-neutral-900' : 'text-neutral-400'}`}>Thanh Toán</span>
          </div>
          <div className="h-0.5 bg-neutral-200 w-12 sm:w-20" />
          <div className="flex items-center gap-2">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold border transition-all ${
              step === 3 ? 'bg-neutral-900 text-white border-neutral-900 shadow-md' : 'bg-white border-neutral-200 text-neutral-400'
            }`}>
              3
            </div>
            <span className={`text-xs font-bold font-sans ${step === 3 ? 'text-neutral-900' : 'text-neutral-400'}`}>Hoàn Tất</span>
          </div>
        </div>

        {/* Checkout Main Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDE: Active Form Panels */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* STEP 1: Shipping Form */}
            {step === 1 && (
              <div className="bg-white rounded-3xl border border-neutral-100 p-6 sm:p-8 shadow-sm">
                <h3 className="flex items-center gap-2 font-sans font-black text-base uppercase tracking-wide text-neutral-900 mb-6">
                  <MapPin className="w-5 h-5 text-neutral-800" />
                  <span>Thông Tin Nhận Hàng</span>
                </h3>

                <div className="space-y-4">
                  {/* Name Input */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5 font-mono">Họ và tên *</label>
                    <input
                      type="text"
                      placeholder="Nguyễn Văn A"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className={`w-full px-4 py-3 border rounded-xl text-sm placeholder-neutral-400 focus:outline-none focus:ring-1 transition-all ${
                        errors.fullName ? 'border-red-400 focus:ring-red-400 focus:border-red-400' : 'border-neutral-200 focus:ring-neutral-900 focus:border-neutral-900 bg-neutral-50/20 hover:bg-neutral-50/50'
                      }`}
                    />
                    {errors.fullName && <p className="text-[10px] text-red-500 font-bold font-sans mt-1">{errors.fullName}</p>}
                  </div>

                  {/* Phone & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5 font-mono">Số điện thoại *</label>
                      <input
                        type="text"
                        placeholder="0987xxxxxx"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={`w-full px-4 py-3 border rounded-xl text-sm placeholder-neutral-400 focus:outline-none focus:ring-1 transition-all ${
                          errors.phone ? 'border-red-400 focus:ring-red-400' : 'border-neutral-200 focus:ring-neutral-900 focus:border-neutral-900 bg-neutral-50/20 hover:bg-neutral-50/50'
                        }`}
                      />
                      {errors.phone && <p className="text-[10px] text-red-500 font-bold font-sans mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5 font-mono">Địa chỉ Email *</label>
                      <input
                        type="email"
                        placeholder="ten@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full px-4 py-3 border rounded-xl text-sm placeholder-neutral-400 focus:outline-none focus:ring-1 transition-all ${
                          errors.email ? 'border-red-400 focus:ring-red-400' : 'border-neutral-200 focus:ring-neutral-900 focus:border-neutral-900 bg-neutral-50/20 hover:bg-neutral-50/50'
                        }`}
                      />
                      {errors.email && <p className="text-[10px] text-red-500 font-bold font-sans mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Province/City & District Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5 font-mono">Tỉnh / Thành phố *</label>
                      <input
                        type="text"
                        placeholder="TP. Hồ Chí Minh"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className={`w-full px-4 py-3 border rounded-xl text-sm placeholder-neutral-400 focus:outline-none focus:ring-1 transition-all ${
                          errors.city ? 'border-red-400 focus:ring-red-400' : 'border-neutral-200 focus:ring-neutral-900 focus:border-neutral-900 bg-neutral-50/20 hover:bg-neutral-50/50'
                        }`}
                      />
                      {errors.city && <p className="text-[10px] text-red-500 font-bold font-sans mt-1">{errors.city}</p>}
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5 font-mono">Quận / Huyện *</label>
                      <input
                        type="text"
                        placeholder="Quận 1"
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        className={`w-full px-4 py-3 border rounded-xl text-sm placeholder-neutral-400 focus:outline-none focus:ring-1 transition-all ${
                          errors.district ? 'border-red-400 focus:ring-red-400' : 'border-neutral-200 focus:ring-neutral-900 focus:border-neutral-900 bg-neutral-50/20 hover:bg-neutral-50/50'
                        }`}
                      />
                      {errors.district && <p className="text-[10px] text-red-500 font-bold font-sans mt-1">{errors.district}</p>}
                    </div>
                  </div>

                  {/* Detail Address */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5 font-mono">Địa chỉ chi tiết (Số nhà, ngõ hẻm, tên đường) *</label>
                    <input
                      type="text"
                      placeholder="123 Nguyễn Huệ, Phường Bến Nghé"
                      value={addressDetail}
                      onChange={(e) => setAddressDetail(e.target.value)}
                      className={`w-full px-4 py-3 border rounded-xl text-sm placeholder-neutral-400 focus:outline-none focus:ring-1 transition-all ${
                        errors.addressDetail ? 'border-red-400 focus:ring-red-400' : 'border-neutral-200 focus:ring-neutral-900 focus:border-neutral-900 bg-neutral-50/20 hover:bg-neutral-50/50'
                      }`}
                    />
                    {errors.addressDetail && <p className="text-[10px] text-red-500 font-bold font-sans mt-1">{errors.addressDetail}</p>}
                  </div>
                </div>

                <button
                  onClick={handleNextStep}
                  className="w-full mt-8 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-2xl text-sm font-bold shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Tiếp tục chọn phương thức thanh toán</span>
                </button>
              </div>
            )}

            {/* STEP 2: Payment Selector & Mock QR */}
            {step === 2 && (
              <div className="bg-white rounded-3xl border border-neutral-100 p-6 sm:p-8 shadow-sm space-y-6">
                <h3 className="flex items-center gap-2 font-sans font-black text-base uppercase tracking-wide text-neutral-900 mb-2">
                  <CreditCard className="w-5 h-5 text-neutral-800" />
                  <span>Phương Thức Thanh Toán</span>
                </h3>

                {/* COD Option card */}
                <div
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-4 ${
                    paymentMethod === 'cod' ? 'border-neutral-900 bg-neutral-50' : 'border-neutral-100 hover:border-neutral-200'
                  }`}
                >
                  <div className={`mt-0.5 h-4 w-4 rounded-full border flex items-center justify-center ${paymentMethod === 'cod' ? 'border-neutral-900' : 'border-neutral-300'}`}>
                    {paymentMethod === 'cod' && <span className="h-2 w-2 rounded-full bg-neutral-900" />}
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-xs sm:text-sm text-neutral-900 mb-0.5">COD - Thanh toán khi nhận hàng</h4>
                    <p className="text-[11px] text-neutral-500 leading-relaxed font-medium">Bạn sẽ thanh toán bằng tiền mặt cho shipper ngay khi đơn hàng được giao đến tay.</p>
                  </div>
                </div>

                {/* Banking Option card */}
                <div
                  onClick={() => setPaymentMethod('banking')}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-4 ${
                    paymentMethod === 'banking' ? 'border-neutral-900 bg-neutral-50' : 'border-neutral-100 hover:border-neutral-200'
                  }`}
                >
                  <div className={`mt-0.5 h-4 w-4 rounded-full border flex items-center justify-center ${paymentMethod === 'banking' ? 'border-neutral-900' : 'border-neutral-300'}`}>
                    {paymentMethod === 'banking' && <span className="h-2 w-2 rounded-full bg-neutral-900" />}
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-xs sm:text-sm text-neutral-900 mb-0.5">Chuyển khoản Ngân hàng (VietQR) - Đạt chuẩn thanh toán nhanh</h4>
                    <p className="text-[11px] text-neutral-500 leading-relaxed font-medium">Quét mã QR ngân hàng cực nhanh để hoàn tất giao dịch. Đơn được ưu tiên xác nhận tức thì.</p>
                  </div>
                </div>

                {/* Show Mock Banking QR and Credentials */}
                {paymentMethod === 'banking' && (
                  <div className="border border-neutral-100 bg-neutral-50 p-4 sm:p-5 rounded-2xl space-y-4 animate-fadeIn">
                    <div className="flex flex-col sm:flex-row items-center gap-5">
                      
                      {/* Generates a gorgeous visual VietQR Mock frame */}
                      <div className="bg-white p-3 rounded-2xl border border-neutral-100 shadow-sm flex flex-col items-center shrink-0 w-44">
                        <div className="font-mono text-[9px] font-black text-blue-700 tracking-wider mb-2 select-none">VietQR Standard</div>
                        {/* High quality barcode mock */}
                        <div className="h-32 w-32 bg-neutral-100 flex items-center justify-center relative rounded-lg p-1.5 border border-dashed border-neutral-200">
                          {/* Inner design for realistic QR code patterns */}
                          <div className="grid grid-cols-4 gap-2 w-full h-full opacity-85">
                            {[...Array(16)].map((_, i) => (
                              <div key={i} className={`rounded-sm ${i % 3 === 0 || i === 0 || i === 15 ? 'bg-neutral-900' : 'bg-transparent'}`} />
                            ))}
                          </div>
                          {/* Visual center log */}
                          <div className="absolute inset-0 m-auto h-11 w-11 bg-white border border-neutral-100 rounded-lg shadow-sm flex items-center justify-center text-[10px] font-black text-red-500 tracking-tighter">YOUTH</div>
                        </div>
                        <span className="text-[9px] font-bold text-neutral-400 mt-2">Quét mã QR để chuyển</span>
                      </div>

                      {/* Credentials */}
                      <div className="flex-grow space-y-2.5 text-xs font-semibold text-neutral-700 font-sans">
                        <div className="flex justify-between pb-1.5 border-b border-dashed border-neutral-200">
                          <span className="text-neutral-400">Ngân hàng</span>
                          <span className="font-bold text-neutral-900">MB BANK (Ngân hàng Quân Đội)</span>
                        </div>
                        <div className="flex justify-between items-center pb-1.5 border-b border-dashed border-neutral-200">
                          <span className="text-neutral-400">Số tài khoản</span>
                          <div className="flex items-center gap-1">
                            <span className="font-mono font-bold text-neutral-900">103875888888</span>
                            <button onClick={handleCopyAccount} className="text-neutral-400 hover:text-neutral-900 cursor-pointer">
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between pb-1.5 border-b border-dashed border-neutral-200">
                          <span className="text-neutral-400">Tên thụ hưởng</span>
                          <span className="font-bold text-neutral-900 uppercase">NGUYEN VAN YOUTH</span>
                        </div>
                        <div className="flex justify-between pb-1.5 border-b border-dashed border-neutral-200">
                          <span className="text-neutral-400">Nội dung chuyển khoản</span>
                          <span className="font-mono font-bold text-neutral-900 uppercase text-right">YOUTH{phone || 'PAY'}</span>
                        </div>
                        <div className="flex justify-between font-bold">
                          <span className="text-neutral-400">Số tiền chuyển</span>
                          <span className="font-mono text-red-500 font-black text-sm">{formatVND(total)}</span>
                        </div>
                        {copiedAccount && <p className="text-[10px] text-emerald-600 font-bold font-sans text-right">Đã sao chép số tài khoản thành công!</p>}
                      </div>

                    </div>
                  </div>
                )}

                <button
                  onClick={handleCompleteCheckout}
                  className="w-full py-4 bg-neutral-900 hover:bg-neutral-800 text-white rounded-2xl text-sm font-black shadow-lg shadow-neutral-900/10 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Hoàn tất đặt hàng và thanh toán</span>
                </button>
              </div>
            )}

            {/* STEP 3: Order Completed & Live Tracking Mock */}
            {step === 3 && createdOrder && (
              <div className="bg-white rounded-3xl border border-neutral-100 p-6 sm:p-8 shadow-sm space-y-6 text-center">
                <div className="mx-auto h-16 w-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 animate-bounce">
                  <CheckCircle className="w-10 h-10" />
                </div>

                <div className="space-y-1">
                  <h2 className="font-sans font-black text-xl text-neutral-900 uppercase tracking-wide">Đặt hàng thành công!</h2>
                  <p className="text-xs text-neutral-400 font-medium">Cảm ơn bạn đã lựa chọn Youth Fashion. Đơn hàng đang được chuẩn bị.</p>
                </div>

                {/* Details Card */}
                <div className="bg-neutral-50 rounded-2xl border border-neutral-100/50 p-4 text-left space-y-2.5 text-xs text-neutral-600 font-medium font-sans">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Mã đơn hàng</span>
                    <span className="font-mono font-bold text-neutral-900">{createdOrder.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Ngày đặt hàng</span>
                    <span className="font-mono text-neutral-900">{createdOrder.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Tên người nhận</span>
                    <span className="font-bold text-neutral-900">{createdOrder.shippingAddress.fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Phương thức thanh toán</span>
                    <span className="font-bold text-neutral-900">{createdOrder.paymentMethod === 'cod' ? 'Thanh toán COD' : 'Chuyển khoản Ngân hàng'}</span>
                  </div>
                  <div className="flex justify-between text-neutral-900 font-bold border-t border-neutral-200/60 pt-2.5">
                    <span>Tổng hóa đơn thanh toán</span>
                    <span className="font-mono text-red-500 font-black text-sm">{formatVND(createdOrder.total)}</span>
                  </div>
                </div>

                {/* Live Order Status Flow Line */}
                <div className="py-6 border-t border-b border-neutral-100 text-left">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-5 font-mono">Trạng thái vận chuyển</h4>
                  
                  <div className="relative flex justify-between items-center max-w-sm mx-auto">
                    {/* Background Line */}
                    <div className="absolute left-0 right-0 h-1 bg-neutral-200 -z-0" />
                    {/* Active Line */}
                    <div className="absolute left-0 h-1 bg-neutral-900 -z-0" style={{ width: '33%' }} />

                    {/* Nodes */}
                    <div className="flex flex-col items-center gap-1.5 z-10">
                      <div className="h-5 w-5 rounded-full bg-neutral-900 text-white flex items-center justify-center text-[10px] font-bold">
                        ✓
                      </div>
                      <span className="text-[10px] font-bold text-neutral-900">Chuẩn bị</span>
                    </div>
                    <div className="flex flex-col items-center gap-1.5 z-10">
                      <div className="h-5 w-5 rounded-full bg-white text-neutral-400 border border-neutral-300 flex items-center justify-center text-[10px] font-bold animate-pulse">
                        ••
                      </div>
                      <span className="text-[10px] font-bold text-neutral-400">Đang giao</span>
                    </div>
                    <div className="flex flex-col items-center gap-1.5 z-10">
                      <div className="h-5 w-5 rounded-full bg-white text-neutral-300 border border-neutral-200 flex items-center justify-center text-[10px] font-bold">
                        ✓
                      </div>
                      <span className="text-[10px] font-bold text-neutral-300">Đã nhận</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 justify-center pt-2">
                  <button
                    onClick={onClose}
                    className="px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-md"
                  >
                    Quay lại Mua Sắm
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* RIGHT SIDE: Cart Order Summary - Only shown for Step 1 and 2 */}
          {step < 3 && (
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white rounded-3xl border border-neutral-100 p-6 shadow-sm">
                <h4 className="font-sans font-black text-xs uppercase tracking-wider text-neutral-400 mb-4 font-mono">Đơn hàng của bạn</h4>
                
                {/* Scrollable list */}
                <div className="max-h-[220px] overflow-y-auto divide-y divide-neutral-100 pr-1 space-y-3.5 pb-4">
                  {cartItems.map((item) => (
                    <div key={`${item.product.id}-${item.selectedSize}`} className="flex gap-3 pt-3 first:pt-0">
                      <div className="h-14 w-11 rounded-lg overflow-hidden shrink-0 bg-neutral-50 border border-neutral-100">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="flex-grow flex flex-col justify-between py-0.5 text-xs font-bold text-neutral-700">
                        <div>
                          <h5 className="line-clamp-1 text-neutral-800 leading-tight">{item.product.name}</h5>
                          <span className="text-[10px] text-neutral-400 font-mono">Size {item.selectedSize} | {item.selectedColor.name}</span>
                        </div>
                        <div className="flex justify-between font-mono">
                          <span className="text-neutral-400 font-sans">x{item.quantity}</span>
                          <span className="text-neutral-900">{formatVND(item.product.price * item.quantity)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Calculations info */}
                <div className="border-t border-neutral-100 pt-4 space-y-2 text-xs font-bold text-neutral-500 font-mono">
                  <div className="flex justify-between">
                    <span className="font-sans">Tạm tính</span>
                    <span className="text-neutral-800">{formatVND(subtotal)}</span>
                  </div>
                  {discountCode && (
                    <div className="flex justify-between text-emerald-600">
                      <span className="font-sans">Mã giảm ({discountCode.code})</span>
                      <span>-{formatVND(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="font-sans">Phí giao hàng</span>
                    <span className="text-neutral-800">{shippingFee === 0 ? 'Miễn phí' : formatVND(shippingFee)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-neutral-900 border-t border-neutral-100 pt-3 font-sans font-black">
                    <span>Tổng thanh toán</span>
                    <span className="font-mono text-neutral-900">{formatVND(total)}</span>
                  </div>
                </div>
              </div>

              {/* Secure checkout info card */}
              <div className="bg-neutral-100/50 rounded-2xl p-4 border border-neutral-100 flex gap-3">
                <Truck className="w-5 h-5 text-neutral-700 shrink-0" />
                <div className="text-[10px] leading-relaxed text-neutral-500 font-medium font-sans">
                  <p className="font-bold text-neutral-700 mb-0.5">Giao hàng toàn quốc nhanh chóng</p>
                  Đơn hàng sẽ được bàn giao ngay cho hãng vận chuyển (GHTK, GHN). Dự kiến nhận hàng trong vòng 1-2 ngày đối với TP. Hồ Chí Minh/Hà Nội, và 2-3 ngày làm việc đối với các tỉnh thành khác.
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
