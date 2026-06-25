import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import ProductDetails from './components/ProductDetails';
import CartDrawer from './components/CartDrawer';
import Checkout from './components/Checkout';
import MixMatch from './components/MixMatch';
import SizeGuide from './components/SizeGuide';
import Lookbook from './components/Lookbook';

import { PRODUCTS } from './data/products';
import { Product, CartItem, Order, DiscountCode } from './types';
import { Sparkles, Grid, SlidersHorizontal, ArrowUpDown, Tag, ClipboardList, Info, Heart } from 'lucide-react';

export default function App() {
  // Navigation & UI States
  const [activeTab, setActiveTab] = useState<'shop' | 'lookbook' | 'mixmatch' | 'sizeguide' | 'orders'>('shop');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [checkoutDiscount, setCheckoutDiscount] = useState<DiscountCode | undefined>(undefined);
  const [isCheckoutActive, setIsCheckoutActive] = useState(false);

  // Cart & Orders State (Initialized from LocalStorage)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('youth_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('youth_orders');
    return saved ? JSON.parse(saved) : [];
  });

  // Filter States
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  // Persistence hooks
  useEffect(() => {
    localStorage.setItem('youth_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('youth_orders', JSON.stringify(orders));
  }, [orders]);

  // Cart Actions
  const handleAddToCart = (product: Product, size: string, color: { name: string; hex: string }, quantity: number) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor.name === color.name
      );

      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += quantity;
        return next;
      }

      return [...prev, { product, selectedSize: size, selectedColor: color, quantity }];
    });
    
    // Auto-open cart drawer for visual feedback
    setIsCartOpen(true);
  };

  const handleQuickAdd = (product: Product, size: string, color: { name: string; hex: string }) => {
    handleAddToCart(product, size, color, 1);
  };

  const handleUpdateCartQuantity = (index: number, quantity: number) => {
    setCartItems((prev) => {
      const next = [...prev];
      next[index].quantity = quantity;
      return next;
    });
  };

  const handleRemoveCartItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, idx) => idx !== index));
  };

  // Add whole Outfit Set to Cart (Mix & Match support)
  const handleAddSetToCart = (setItems: { product: Product; size: string; color: { name: string; hex: string } }[]) => {
    setCartItems((prev) => {
      let next = [...prev];
      setItems.forEach((item) => {
        const existingIdx = next.findIndex(
          (cItem) =>
            cItem.product.id === item.product.id &&
            cItem.selectedSize === item.size &&
            cItem.selectedColor.name === item.color.name
        );

        if (existingIdx > -1) {
          next[existingIdx].quantity += 1;
        } else {
          next.push({
            product: item.product,
            selectedSize: item.size,
            selectedColor: item.color,
            quantity: 1,
          });
        }
      });
      return next;
    });
  };

  // Checkout Initiation
  const handleStartCheckout = (discount?: DiscountCode) => {
    setCheckoutDiscount(discount);
    setIsCartOpen(false);
    setIsCheckoutActive(true);
  };

  // Order Placement Complete callback
  const handlePlaceOrder = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    // Clear cart
    setCartItems([]);
  };

  // Filtering Logic
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchText.toLowerCase()) ||
      product.tags.some((t) => t.toLowerCase().includes(searchText.toLowerCase())) ||
      product.description.toLowerCase().includes(searchText.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sorting Logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // default featured / unordered list
  });

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Helper formats
  const formatVND = (num: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num);
  };

  return (
    <div id="app-root" className="min-h-screen bg-white text-neutral-900 flex flex-col font-sans selection:bg-neutral-900 selection:text-white antialiased">
      
      {/* Dynamic Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setIsCheckoutActive(false); // Reset checkout view when switching tabs
        }}
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        searchText={searchText}
        setSearchText={setSearchText}
      />

      {/* Main Screen Router */}
      <main className="flex-grow">
        
        {/* Full-Screen Checkout flow overrides others */}
        {isCheckoutActive ? (
          <Checkout
            cartItems={cartItems}
            discountCode={checkoutDiscount}
            onClose={() => setIsCheckoutActive(false)}
            onPlaceOrder={handlePlaceOrder}
          />
        ) : (
          <>
            {/* TAB: SHOP CATALOG */}
            {activeTab === 'shop' && (
              <div id="shop-catalog-view" className="animate-fadeIn">
                
                {/* Hero / Promo Banner Carousel Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                  <div className="relative bg-neutral-100 rounded-[32px] overflow-hidden aspect-[16/9] sm:aspect-[21/9] lg:aspect-[24/9] border border-neutral-200/50 flex items-center justify-start p-6 sm:p-12 md:p-16 shadow-lg shadow-neutral-100">
                    
                    {/* Background model image */}
                    <div className="absolute inset-0 z-0">
                      <img
                        src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop"
                        alt="Summer streetwear banner collection"
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover object-center brightness-95 filter"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
                    </div>

                    {/* Banner specs content */}
                    <div className="relative z-10 max-w-md sm:max-w-xl text-white space-y-3 sm:space-y-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md rounded-full">
                        <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                        BỘ SƯU TẬP HÈ NỔI LOẠN 2026
                      </span>
                      <h1 className="font-sans font-black text-3xl sm:text-5xl md:text-6xl tracking-tighter uppercase leading-none">
                        REBEL<br />STREETS
                      </h1>
                      <p className="text-[11px] sm:text-sm text-neutral-200 font-medium leading-relaxed max-w-sm sm:max-w-md">
                        Đột phá định kiến thời trang. Sẵn sàng cháy phố cùng những thiết kế phông thun oversize cực ngầu, quần cargo và áo varsity Retro đậm chất cá tính Gen Z.
                      </p>
                      
                      <div className="pt-2 sm:pt-4 flex gap-3 flex-wrap">
                        <button
                          onClick={() => setSelectedCategory('all')}
                          className="px-5 py-2.5 bg-white text-neutral-900 rounded-xl text-xs font-bold hover:scale-105 transition-all shadow-md cursor-pointer"
                        >
                          MUA NGAY BÂY GIỜ
                        </button>
                        <button
                          onClick={() => setActiveTab('lookbook')}
                          className="px-5 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl text-xs font-bold hover:bg-white/20 transition-all cursor-pointer"
                        >
                          KHÁM PHÁ STYLE BOOK
                        </button>
                      </div>
                    </div>

                  </div>
                </section>

                {/* Main Shop Filter & Catalog Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                  
                  {/* Category Pill Filters Row */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-neutral-100">
                    
                    {/* Categories Left Side */}
                    <div className="flex gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
                      {[
                        { id: 'all', label: 'Tất cả' },
                        { id: 'tops', label: 'Áo Thun / Len' },
                        { id: 'bottoms', label: 'Quần Baggy / Cargo' },
                        { id: 'outerwear', label: 'Áo Khoác' },
                        { id: 'accessories', label: 'Phụ Kiện' }
                      ].map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                            selectedCategory === cat.id
                              ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                              : 'bg-white border-neutral-200 text-neutral-500 hover:text-neutral-900 hover:border-neutral-500'
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>

                    {/* Sorters Right Side */}
                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                      <ArrowUpDown className="w-4 h-4 text-neutral-400" />
                      <select
                        value={sortBy}
                        onChange={(e: any) => setSortBy(e.target.value)}
                        className="text-xs font-bold border border-neutral-200 rounded-xl px-3 py-2 bg-white focus:outline-none focus:border-neutral-900"
                      >
                        <option value="featured">Sản phẩm nổi bật</option>
                        <option value="price-asc">Giá tăng dần</option>
                        <option value="price-desc">Giá giảm dần</option>
                        <option value="rating">Được đánh giá cao</option>
                      </select>
                    </div>

                  </div>

                  {/* Products Grid */}
                  {sortedProducts.length === 0 ? (
                    <div className="text-center py-24 bg-neutral-50 rounded-3xl border border-neutral-100">
                      <Grid className="w-10 h-10 text-neutral-300 mx-auto mb-2.5" />
                      <p className="font-sans font-bold text-sm text-neutral-700">Không tìm thấy sản phẩm nào</p>
                      <p className="text-xs text-neutral-400 mt-1">Bạn vui lòng thử lại với từ khóa tìm kiếm khác nhé.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                      {sortedProducts.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          onViewDetails={(prod) => setSelectedProduct(prod)}
                          onQuickAdd={handleQuickAdd}
                        />
                      ))}
                    </div>
                  )}

                </section>

                {/* Trendy Promotional Banner Bottom (Vouchers) */}
                <section className="bg-neutral-50 py-12 border-t border-neutral-100">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h3 className="font-sans font-black text-sm uppercase tracking-widest text-neutral-400 mb-6 font-mono text-center sm:text-left">
                      ƯU ĐÃI THÀNH VIÊN ĐỘC QUYỀN
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-white border border-neutral-200/50 p-5 rounded-2xl flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
                        <Tag className="w-6 h-6 text-neutral-900 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-sans font-black text-xs uppercase tracking-wide text-neutral-900 mb-1">MÃ NEWBIE: GENZNEW</h4>
                          <p className="text-[11px] leading-relaxed text-neutral-500 font-medium">Giảm ngay 10% cho đơn hàng đầu tiên của bạn khi nhập mã ưu đãi này tại giỏ hàng.</p>
                        </div>
                      </div>
                      <div className="bg-white border border-neutral-200/50 p-5 rounded-2xl flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
                        <Tag className="w-6 h-6 text-neutral-900 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-sans font-black text-xs uppercase tracking-wide text-neutral-900 mb-1">MÃ STREETSTYLE: GIẢM 15%</h4>
                          <p className="text-[11px] leading-relaxed text-neutral-500 font-medium">Nhập mã giảm 15% đối với các đơn hàng quần áo có tổng tạm tính từ 600k trở lên.</p>
                        </div>
                      </div>
                      <div className="bg-white border border-neutral-200/50 p-5 rounded-2xl flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
                        <Tag className="w-6 h-6 text-neutral-900 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-sans font-black text-xs uppercase tracking-wide text-neutral-900 mb-1">MÃ CHÁY PHỐ: WINTERSALE</h4>
                          <p className="text-[11px] leading-relaxed text-neutral-500 font-medium">Ưu đãi giảm cực bốc 20% cho đơn hàng thời trang trọn set từ 1 triệu đồng.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

              </div>
            )}

            {/* TAB: EDITORIAL LOOKBOOK */}
            {activeTab === 'lookbook' && (
              <Lookbook onViewProduct={(prod) => setSelectedProduct(prod)} />
            )}

            {/* TAB: MIX & MATCH STUDIO */}
            {activeTab === 'mixmatch' && (
              <MixMatch onAddSetToCart={handleAddSetToCart} />
            )}

            {/* TAB: SMART SIZE CALCULATOR */}
            {activeTab === 'sizeguide' && (
              <SizeGuide />
            )}

            {/* TAB: ORDER HISTORY PROFILE */}
            {activeTab === 'orders' && (
              <div id="orders-profile-view" className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8 animate-fadeIn">
                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-neutral-100">
                  <ClipboardList className="w-6 h-6 text-neutral-800" />
                  <div>
                    <h2 className="font-sans font-black text-xl sm:text-2xl text-neutral-900 uppercase tracking-tight">Đơn hàng của tôi</h2>
                    <p className="text-xs text-neutral-400 mt-0.5">Theo dõi chi tiết lịch sử mua sắm và quá trình giao nhận hàng tại Youth Fashion.</p>
                  </div>
                </div>

                {orders.length === 0 ? (
                  <div className="text-center py-20 bg-neutral-50 rounded-3xl border border-neutral-100 p-6">
                    <ClipboardList className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
                    <h4 className="font-sans font-bold text-sm text-neutral-700">Bạn chưa có lịch sử mua hàng</h4>
                    <p className="text-xs text-neutral-400 mt-1 max-w-xs mx-auto mb-6">Hãy dạo quanh cửa hàng của chúng tôi để lựa chọn những sản phẩm thời trang sành điệu nhất nhé!</p>
                    <button
                      onClick={() => setActiveTab('shop')}
                      className="px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
                    >
                      Bắt đầu mua sắm ngay
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map((ord) => (
                      <div
                        key={ord.id}
                        className="bg-white rounded-3xl border border-neutral-200/60 p-5 sm:p-6 shadow-sm space-y-4 hover:border-neutral-900 transition-all"
                      >
                        {/* Summary banner order card */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-neutral-100">
                          <div className="flex items-baseline gap-2.5">
                            <span className="font-mono font-bold text-sm text-neutral-900">{ord.id}</span>
                            <span className="text-[10px] text-neutral-400 font-bold font-mono">{ord.date}</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] px-2 py-0.5 bg-neutral-100 text-neutral-600 rounded font-bold uppercase tracking-wider font-mono">
                              {ord.paymentMethod === 'cod' ? 'Thanh toán COD' : 'Đã banking'}
                            </span>
                            <span className="text-[10px] px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded font-bold uppercase tracking-wider font-mono">
                              Đang chuẩn bị
                            </span>
                          </div>
                        </div>

                        {/* Items listed in order details */}
                        <div className="space-y-3.5 divide-y divide-neutral-50">
                          {ord.items.map((item, idx) => (
                            <div key={idx} className="flex gap-3 pt-3.5 first:pt-0">
                              <div className="h-14 w-11 rounded-lg overflow-hidden bg-neutral-50 shrink-0 border border-neutral-100">
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

                        {/* Order Address & Pricing calculations */}
                        <div className="pt-4 border-t border-neutral-100 grid grid-cols-1 md:grid-cols-12 gap-4 items-end text-xs text-neutral-500 font-medium">
                          
                          {/* Shipping address details */}
                          <div className="md:col-span-8 space-y-1 bg-neutral-50 p-3 rounded-2xl border border-neutral-100/50">
                            <span className="text-[9px] uppercase font-bold text-neutral-400 font-mono">Địa chỉ giao hàng</span>
                            <p className="font-bold text-neutral-800 text-xs">{ord.shippingAddress.fullName} — {ord.shippingAddress.phone}</p>
                            <p className="text-[11px] text-neutral-500">
                              {ord.shippingAddress.addressDetail}, {ord.shippingAddress.district}, {ord.shippingAddress.city}
                            </p>
                          </div>

                          {/* Pricing total */}
                          <div className="md:col-span-4 text-right space-y-1 font-mono font-bold">
                            <div className="flex justify-between text-[11px]">
                              <span className="font-sans text-neutral-400">Khấu trừ</span>
                              <span className="text-neutral-600">-{formatVND(ord.discount)}</span>
                            </div>
                            <div className="flex justify-between text-[11px]">
                              <span className="font-sans text-neutral-400">Phí giao ship</span>
                              <span className="text-neutral-600">{ord.shippingFee === 0 ? 'FREE' : formatVND(ord.shippingFee)}</span>
                            </div>
                            <div className="flex justify-between text-neutral-900 font-sans font-black text-sm pt-1.5 border-t border-dashed border-neutral-200">
                              <span>Tổng chi trả</span>
                              <span className="font-mono">{formatVND(ord.total)}</span>
                            </div>
                          </div>

                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}

      </main>

      {/* Footer Section */}
      <footer className="bg-neutral-900 text-neutral-400 border-t border-neutral-800 py-12 mt-16 text-center sm:text-left select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-12 gap-8 pb-10 border-b border-neutral-800">
          
          {/* Logo brand */}
          <div className="sm:col-span-4 space-y-3">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <div className="h-8 w-8 bg-white rounded-lg flex items-center justify-center text-neutral-900 font-mono font-bold text-base tracking-tighter">
                Y
              </div>
              <span className="font-sans font-black tracking-widest text-lg text-white">YOUTH STORE</span>
            </div>
            <p className="text-xs leading-relaxed max-w-xs font-medium">Cửa hàng thời trang dẫn đầu xu hướng streetwear phóng khoáng dành cho giới trẻ năng động.</p>
          </div>

          {/* Links 1 */}
          <div className="sm:col-span-4 space-y-2.5">
            <h5 className="font-mono text-[10px] font-bold text-white tracking-widest uppercase">DANH MỤC</h5>
            <ul className="text-xs font-medium space-y-1.5">
              <li><button onClick={() => { setActiveTab('shop'); setSelectedCategory('all'); }} className="hover:text-white transition-colors">Bộ sưu tập Streetwear</button></li>
              <li><button onClick={() => { setActiveTab('shop'); setSelectedCategory('tops'); }} className="hover:text-white transition-colors">Áo Thun Phông</button></li>
              <li><button onClick={() => { setActiveTab('shop'); setSelectedCategory('bottoms'); }} className="hover:text-white transition-colors">Quần Cargo / Baggy</button></li>
              <li><button onClick={() => setActiveTab('mixmatch')} className="hover:text-white transition-colors">Mix & Match Studio</button></li>
            </ul>
          </div>

          {/* Contact details */}
          <div className="sm:col-span-4 space-y-2.5 text-xs font-medium">
            <h5 className="font-mono text-[10px] font-bold text-white tracking-widest uppercase">LIÊN HỆ</h5>
            <p>Hotline: 1900 8888 (8h - 22h)</p>
            <p>Địa chỉ: 123 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh</p>
            <p>Email: contact@youthfashion.vn</p>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium">
          <p>© 2026 Youth Fashion Store. All Rights Reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Điều khoản dịch vụ</a>
            <a href="#" className="hover:text-white transition-colors">Chính sách bảo mật</a>
            <a href="#" className="hover:text-white transition-colors">Chính sách đổi trả</a>
          </div>
        </div>
      </footer>

      {/* Slide-over Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onStartCheckout={handleStartCheckout}
      />

      {/* Overlay Product Details Modal Popup */}
      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          openSizeGuide={() => {
            setSelectedProduct(null);
            setActiveTab('sizeguide');
          }}
        />
      )}

    </div>
  );
}
