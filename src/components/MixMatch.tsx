import React, { useState } from 'react';
import { Product, CartItem } from '../types';
import { PRODUCTS } from '../data/products';
import { Layers, Plus, ShoppingBag, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';

interface MixMatchProps {
  onAddSetToCart: (items: { product: Product; size: string; color: { name: string; hex: string } }[]) => void;
}

export default function MixMatch({ onAddSetToCart }: MixMatchProps) {
  // We'll separate products by category for easy selection
  const accessories = PRODUCTS.filter((p) => p.category === 'accessories');
  const tops = PRODUCTS.filter((p) => p.category === 'tops');
  const bottoms = PRODUCTS.filter((p) => p.category === 'bottoms');
  const outerwear = PRODUCTS.filter((p) => p.category === 'outerwear');

  // Currently selected outfit components
  const [selectedAccessory, setSelectedAccessory] = useState<Product | null>(accessories[0] || null);
  const [selectedOuterwear, setSelectedOuterwear] = useState<Product | null>(outerwear[0] || null);
  const [selectedTop, setSelectedTop] = useState<Product | null>(tops[0] || null);
  const [selectedBottom, setSelectedBottom] = useState<Product | null>(bottoms[0] || null);

  // States to keep selected sizes & colors
  const [accSize, setAccSize] = useState('Free');
  const [accColor, setAccColor] = useState(accessories[0]?.colors[0] || { name: '', hex: '' });

  const [outerSize, setOuterSize] = useState(outerwear[0]?.sizes[0] || 'M');
  const [outerColor, setOuterColor] = useState(outerwear[0]?.colors[0] || { name: '', hex: '' });

  const [topSize, setTopSize] = useState(tops[0]?.sizes[0] || 'M');
  const [topColor, setTopColor] = useState(tops[0]?.colors[0] || { name: '', hex: '' });

  const [bottomSize, setBottomSize] = useState(bottoms[0]?.sizes[0] || 'M');
  const [bottomColor, setBottomColor] = useState(bottoms[0]?.colors[0] || { name: '', hex: '' });

  const [successAdded, setSuccessAdded] = useState(false);

  // Format price helper (VND)
  const formatVND = (num: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num);
  };

  // Calculate sum of active elements
  const outfitSubtotal = 
    (selectedAccessory?.price || 0) + 
    (selectedOuterwear?.price || 0) + 
    (selectedTop?.price || 0) + 
    (selectedBottom?.price || 0);

  // Auto randomized selection to "shuffle" an outfit
  const handleShuffle = () => {
    const randomAcc = accessories[Math.floor(Math.random() * accessories.length)];
    const randomOuter = outerwear[Math.floor(Math.random() * outerwear.length)];
    const randomTop = tops[Math.floor(Math.random() * tops.length)];
    const randomBottom = bottoms[Math.floor(Math.random() * bottoms.length)];

    if (randomAcc) {
      setSelectedAccessory(randomAcc);
      setAccSize('Free');
      setAccColor(randomAcc.colors[0]);
    }
    if (randomOuter) {
      setSelectedOuterwear(randomOuter);
      setOuterSize(randomOuter.sizes[0] || 'M');
      setOuterColor(randomOuter.colors[0]);
    }
    if (randomTop) {
      setSelectedTop(randomTop);
      setTopSize(randomTop.sizes[0] || 'M');
      setTopColor(randomTop.colors[0]);
    }
    if (randomBottom) {
      setSelectedBottom(randomBottom);
      setBottomSize(randomBottom.sizes[0] || 'M');
      setBottomColor(randomBottom.colors[0]);
    }
  };

  const handleAddOutfitToCart = () => {
    const setList: { product: Product; size: string; color: { name: string; hex: string } }[] = [];

    if (selectedAccessory) {
      setList.push({ product: selectedAccessory, size: accSize, color: accColor });
    }
    if (selectedOuterwear) {
      setList.push({ product: selectedOuterwear, size: outerSize, color: outerColor });
    }
    if (selectedTop) {
      setList.push({ product: selectedTop, size: topSize, color: topColor });
    }
    if (selectedBottom) {
      setList.push({ product: selectedBottom, size: bottomSize, color: bottomColor });
    }

    if (setList.length > 0) {
      onAddSetToCart(setList);
      setSuccessAdded(true);
      setTimeout(() => setSuccessAdded(false), 3000);
    }
  };

  return (
    <div id="mix-match-studio" className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      
      {/* Intro Hero banner */}
      <div className="bg-neutral-900 rounded-3xl p-6 sm:p-10 mb-8 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-3 z-10 max-w-xl text-center md:text-left">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider bg-white/15 rounded-full text-white">
            <Sparkles className="w-3.5 h-3.5" />
            Tính năng độc quyền
          </span>
          <h2 className="font-sans font-black text-2xl sm:text-3xl uppercase tracking-tight leading-none">Mix & Match Outfit Studio</h2>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-medium">Bộc lộ gu thời trang riêng! Tự do phối ngẫu hứng các mẫu áo phông oversize, quần cargo bụi bặm, varsity jacket retro cùng mũ beanie để tạo nên set đồ mang phong cách độc bản.</p>
        </div>
        
        {/* Shuffle buttons */}
        <button
          onClick={handleShuffle}
          className="flex items-center justify-center gap-2 px-5 py-3 bg-white text-neutral-900 rounded-2xl text-xs font-bold hover:scale-105 transition-all cursor-pointer shadow-md shrink-0 self-center"
        >
          <RefreshCw className="w-4 h-4 animate-spin-slow" />
          <span>Xoay Phối Ngẫu Nhiên</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* LEFT COL: Interactive Outfit Mannequin Visual - Span 5 */}
        <div className="lg:col-span-5 bg-neutral-100 rounded-3xl p-6 flex flex-col justify-between border border-neutral-200/50 shadow-inner min-h-[500px]">
          
          <h4 className="text-center text-xs font-mono font-bold uppercase tracking-widest text-neutral-400 mb-6 select-none">
            MÔ HÌNH THỬ ĐỒ CHUNG (CURATED MANNEQUIN)
          </h4>

          {/* Mannequin Vertical Clothing Slots Grid */}
          <div className="flex-1 flex flex-col items-center justify-center gap-5 relative py-4">
            
            {/* Center spine wire */}
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-dashed border-l border-neutral-300 -z-0" />

            {/* SLOT 1: Accessory */}
            <div className="z-10 group relative flex flex-col items-center bg-white p-2 rounded-xl shadow-md border border-neutral-200/50 w-28 h-28 hover:scale-105 transition-all">
              {selectedAccessory ? (
                <>
                  <img
                    src={selectedAccessory.images[0]}
                    alt={selectedAccessory.name}
                    referrerPolicy="no-referrer"
                    className="h-16 w-16 object-cover object-center rounded-lg"
                  />
                  <span className="text-[9px] font-bold text-neutral-800 text-center line-clamp-1 mt-1.5">{selectedAccessory.name}</span>
                </>
              ) : (
                <div className="h-full w-full flex flex-col items-center justify-center text-neutral-300">
                  <Plus className="w-5 h-5 mb-1" />
                  <span className="text-[9px] font-bold font-mono">PHỤ KIỆN</span>
                </div>
              )}
            </div>

            {/* SLOT 2: Outerwear (optional) */}
            <div className="z-10 group relative flex flex-col items-center bg-white p-2 rounded-xl shadow-md border border-neutral-200/50 w-32 h-32 hover:scale-105 transition-all">
              {selectedOuterwear ? (
                <>
                  <img
                    src={selectedOuterwear.images[0]}
                    alt={selectedOuterwear.name}
                    referrerPolicy="no-referrer"
                    className="h-20 w-20 object-cover object-center rounded-lg"
                  />
                  <span className="text-[9px] font-bold text-neutral-800 text-center line-clamp-1 mt-1.5">{selectedOuterwear.name}</span>
                </>
              ) : (
                <div className="h-full w-full flex flex-col items-center justify-center text-neutral-300">
                  <Plus className="w-5 h-5 mb-1" />
                  <span className="text-[9px] font-bold font-mono">KHOÁC NGOÀI</span>
                </div>
              )}
            </div>

            {/* SLOT 3: Tops */}
            <div className="z-10 group relative flex flex-col items-center bg-white p-2 rounded-xl shadow-md border border-neutral-200/50 w-32 h-32 hover:scale-105 transition-all">
              {selectedTop ? (
                <>
                  <img
                    src={selectedTop.images[0]}
                    alt={selectedTop.name}
                    referrerPolicy="no-referrer"
                    className="h-20 w-20 object-cover object-center rounded-lg"
                  />
                  <span className="text-[9px] font-bold text-neutral-800 text-center line-clamp-1 mt-1.5">{selectedTop.name}</span>
                </>
              ) : (
                <div className="h-full w-full flex flex-col items-center justify-center text-neutral-300">
                  <Plus className="w-5 h-5 mb-1" />
                  <span className="text-[9px] font-bold font-mono">ÁO PHÔNG</span>
                </div>
              )}
            </div>

            {/* SLOT 4: Bottoms */}
            <div className="z-10 group relative flex flex-col items-center bg-white p-2 rounded-xl shadow-md border border-neutral-200/50 w-32 h-36 hover:scale-105 transition-all">
              {selectedBottom ? (
                <>
                  <img
                    src={selectedBottom.images[0]}
                    alt={selectedBottom.name}
                    referrerPolicy="no-referrer"
                    className="h-24 w-24 object-cover object-center rounded-lg"
                  />
                  <span className="text-[9px] font-bold text-neutral-800 text-center line-clamp-1 mt-1">{selectedBottom.name}</span>
                </>
              ) : (
                <div className="h-full w-full flex flex-col items-center justify-center text-neutral-300">
                  <Plus className="w-5 h-5 mb-1" />
                  <span className="text-[9px] font-bold font-mono">QUẦN BÒ/CARGO</span>
                </div>
              )}
            </div>

          </div>

          {/* Outfit summary buy box */}
          <div className="mt-6 bg-white p-4 rounded-2xl shadow-md border border-neutral-200/40">
            <div className="flex justify-between items-center mb-4">
              <div className="flex flex-col">
                <span className="text-[10px] font-mono font-bold text-neutral-400">TỔNG SET ĐỒ PHỐI</span>
                <span className="font-mono text-base font-black text-red-500">{formatVND(outfitSubtotal)}</span>
              </div>
              <span className="text-[9px] px-2 py-1 bg-emerald-50 rounded border border-emerald-100 text-emerald-700 font-bold">
                Xác nhận kích cỡ chi tiết bên phải
              </span>
            </div>

            {successAdded ? (
              <div className="w-full h-11 bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/10">
                <span>✓ Đã thêm trọn bộ phối vào giỏ hàng!</span>
              </div>
            ) : (
              <button
                onClick={handleAddOutfitToCart}
                disabled={outfitSubtotal === 0}
                className="w-full h-11 bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-300 text-white text-xs font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Thêm Cả Set Đồ Vào Giỏ</span>
              </button>
            )}
          </div>

        </div>

        {/* RIGHT COL: Detailed Selectors Grid - Span 7 */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-neutral-100 p-6 sm:p-8 shadow-sm space-y-6">
          <h3 className="flex items-center gap-2 font-sans font-black text-base uppercase tracking-wide text-neutral-900 pb-3 border-b border-neutral-100">
            <Layers className="w-5 h-5 text-neutral-800" />
            <span>Tinh Chỉnh Từng Sản Phẩm</span>
          </h3>

          {/* ITEM SELECTOR 1: Accessories */}
          <div className="bg-neutral-50/50 p-4 rounded-2xl border border-neutral-100/70 space-y-3">
            <div className="flex justify-between items-baseline">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400">1. PHỤ KIỆN</span>
              <span className="font-mono text-xs font-bold text-neutral-800">{selectedAccessory ? formatVND(selectedAccessory.price) : ''}</span>
            </div>
            {/* Grid options */}
            <div className="flex gap-2.5 overflow-x-auto pb-1.5 scrollbar-none">
              {accessories.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setSelectedAccessory(p);
                    setAccSize('Free');
                    setAccColor(p.colors[0]);
                  }}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl border shrink-0 text-left transition-all bg-white cursor-pointer ${
                    selectedAccessory?.id === p.id ? 'border-neutral-900 ring-1 ring-neutral-900 shadow-sm' : 'border-neutral-200 hover:border-neutral-500'
                  }`}
                >
                  <img src={p.images[0]} alt={p.name} referrerPolicy="no-referrer" className="h-9 w-9 object-cover rounded" />
                  <span className="text-[10px] font-bold text-neutral-800 max-w-[80px] line-clamp-2 leading-tight">{p.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* ITEM SELECTOR 2: Outerwear */}
          <div className="bg-neutral-50/50 p-4 rounded-2xl border border-neutral-100/70 space-y-3">
            <div className="flex justify-between items-baseline">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400">2. ÁO KHOÁC NGOÀI</span>
              <span className="font-mono text-xs font-bold text-neutral-800">{selectedOuterwear ? formatVND(selectedOuterwear.price) : ''}</span>
            </div>
            {/* Grid options */}
            <div className="flex gap-2.5 overflow-x-auto pb-1.5 scrollbar-none">
              {outerwear.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setSelectedOuterwear(p);
                    setOuterSize(p.sizes[0]);
                    setOuterColor(p.colors[0]);
                  }}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl border shrink-0 text-left transition-all bg-white cursor-pointer ${
                    selectedOuterwear?.id === p.id ? 'border-neutral-900 ring-1 ring-neutral-900 shadow-sm' : 'border-neutral-200 hover:border-neutral-500'
                  }`}
                >
                  <img src={p.images[0]} alt={p.name} referrerPolicy="no-referrer" className="h-9 w-9 object-cover rounded" />
                  <span className="text-[10px] font-bold text-neutral-800 max-w-[90px] line-clamp-2 leading-tight">{p.name}</span>
                </button>
              ))}
            </div>
            {/* Customization specs inside selector */}
            {selectedOuterwear && (
              <div className="flex gap-4 pt-2 border-t border-dashed border-neutral-200/60 text-xs font-bold">
                <div>
                  <span className="text-neutral-400 text-[10px] block mb-1">CHỌN SIZE</span>
                  <div className="flex gap-1">
                    {selectedOuterwear.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setOuterSize(sz)}
                        className={`h-6 px-2 text-[10px] font-mono rounded border ${outerSize === sz ? 'bg-neutral-900 text-white border-neutral-900' : 'bg-white border-neutral-200 hover:border-neutral-900'}`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-neutral-400 text-[10px] block mb-1 font-mono">CHỌN MÀU ({outerColor.name})</span>
                  <div className="flex gap-1.5">
                    {selectedOuterwear.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setOuterColor(color)}
                        className={`h-5 w-5 rounded-full border border-neutral-200 ${outerColor.name === color.name ? 'ring-2 ring-neutral-900 ring-offset-1' : ''}`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ITEM SELECTOR 3: Tops */}
          <div className="bg-neutral-50/50 p-4 rounded-2xl border border-neutral-100/70 space-y-3">
            <div className="flex justify-between items-baseline">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400">3. ÁO PHÔNG TRONG</span>
              <span className="font-mono text-xs font-bold text-neutral-800">{selectedTop ? formatVND(selectedTop.price) : ''}</span>
            </div>
            {/* Grid options */}
            <div className="flex gap-2.5 overflow-x-auto pb-1.5 scrollbar-none">
              {tops.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setSelectedTop(p);
                    setTopSize(p.sizes[0]);
                    setTopColor(p.colors[0]);
                  }}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl border shrink-0 text-left transition-all bg-white cursor-pointer ${
                    selectedTop?.id === p.id ? 'border-neutral-900 ring-1 ring-neutral-900 shadow-sm' : 'border-neutral-200 hover:border-neutral-500'
                  }`}
                >
                  <img src={p.images[0]} alt={p.name} referrerPolicy="no-referrer" className="h-9 w-9 object-cover rounded" />
                  <span className="text-[10px] font-bold text-neutral-800 max-w-[90px] line-clamp-2 leading-tight">{p.name}</span>
                </button>
              ))}
            </div>
            {/* Customization specs */}
            {selectedTop && (
              <div className="flex gap-4 pt-2 border-t border-dashed border-neutral-200/60 text-xs font-bold">
                <div>
                  <span className="text-neutral-400 text-[10px] block mb-1">CHỌN SIZE</span>
                  <div className="flex gap-1">
                    {selectedTop.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setTopSize(sz)}
                        className={`h-6 px-2 text-[10px] font-mono rounded border ${topSize === sz ? 'bg-neutral-900 text-white border-neutral-900' : 'bg-white border-neutral-200 hover:border-neutral-900'}`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-neutral-400 text-[10px] block mb-1 font-mono">CHỌN MÀU ({topColor.name})</span>
                  <div className="flex gap-1.5">
                    {selectedTop.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setTopColor(color)}
                        className={`h-5 w-5 rounded-full border border-neutral-200 ${topColor.name === color.name ? 'ring-2 ring-neutral-900 ring-offset-1' : ''}`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ITEM SELECTOR 4: Bottoms */}
          <div className="bg-neutral-50/50 p-4 rounded-2xl border border-neutral-100/70 space-y-3">
            <div className="flex justify-between items-baseline">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400">4. QUẦN DƯỚI</span>
              <span className="font-mono text-xs font-bold text-neutral-800">{selectedBottom ? formatVND(selectedBottom.price) : ''}</span>
            </div>
            {/* Grid options */}
            <div className="flex gap-2.5 overflow-x-auto pb-1.5 scrollbar-none">
              {bottoms.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setSelectedBottom(p);
                    setBottomSize(p.sizes[0]);
                    setBottomColor(p.colors[0]);
                  }}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl border shrink-0 text-left transition-all bg-white cursor-pointer ${
                    selectedBottom?.id === p.id ? 'border-neutral-900 ring-1 ring-neutral-900 shadow-sm' : 'border-neutral-200 hover:border-neutral-500'
                  }`}
                >
                  <img src={p.images[0]} alt={p.name} referrerPolicy="no-referrer" className="h-9 w-9 object-cover rounded" />
                  <span className="text-[10px] font-bold text-neutral-800 max-w-[90px] line-clamp-2 leading-tight">{p.name}</span>
                </button>
              ))}
            </div>
            {/* Customization specs */}
            {selectedBottom && (
              <div className="flex gap-4 pt-2 border-t border-dashed border-neutral-200/60 text-xs font-bold">
                <div>
                  <span className="text-neutral-400 text-[10px] block mb-1">CHỌN SIZE</span>
                  <div className="flex gap-1">
                    {selectedBottom.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setBottomSize(sz)}
                        className={`h-6 px-2 text-[10px] font-mono rounded border ${bottomSize === sz ? 'bg-neutral-900 text-white border-neutral-900' : 'bg-white border-neutral-200 hover:border-neutral-900'}`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-neutral-400 text-[10px] block mb-1 font-mono">CHỌN MÀU ({bottomColor.name})</span>
                  <div className="flex gap-1.5">
                    {selectedBottom.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setBottomColor(color)}
                        className={`h-5 w-5 rounded-full border border-neutral-200 ${bottomColor.name === color.name ? 'ring-2 ring-neutral-900 ring-offset-1' : ''}`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Interactive hints footer */}
          <div className="flex gap-2 items-start text-xs text-neutral-400 font-medium">
            <AlertCircle className="w-4 h-4 shrink-0 text-neutral-400" />
            <span>Mỗi sản phẩm đều có số lượng giới hạn tại kho. Bạn hãy lựa chọn size phù hợp để chắc chắn nhận hàng ưng ý nhé. Thử tính năng <b>Tính Size Thông Minh</b> ở thanh điều hướng nếu chưa rõ về số đo.</span>
          </div>

        </div>

      </div>
    </div>
  );
}
