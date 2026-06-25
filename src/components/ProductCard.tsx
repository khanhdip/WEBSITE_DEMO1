import React, { useState } from 'react';
import { Product } from '../types';
import { Star, Plus, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  onQuickAdd: (product: Product, size: string, color: { name: string; hex: string }) => void;
}

export default function ProductCard({ product, onViewDetails, onQuickAdd }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [showQuickSizes, setShowQuickSizes] = useState(false);

  // Format price helper (VND)
  const formatVND = (num: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num);
  };

  const getBadgeClass = (badge: Product['badge']) => {
    switch (badge) {
      case 'NEW':
        return 'bg-emerald-500 text-white';
      case 'HOT':
        return 'bg-rose-500 text-white animate-pulse';
      case 'SALE':
        return 'bg-amber-500 text-black font-bold';
      case 'EXCLUSIVE':
        return 'bg-purple-600 text-white';
      default:
        return 'bg-neutral-900 text-white';
    }
  };

  const handleQuickAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.sizes.length > 1 && product.sizes[0] !== 'Free') {
      setShowQuickSizes(true);
    } else {
      onQuickAdd(product, 'Free', selectedColor);
    }
  };

  const handleSelectSizeAndAdd = (e: React.MouseEvent, size: string) => {
    e.stopPropagation();
    onQuickAdd(product, size, selectedColor);
    setShowQuickSizes(false);
  };

  return (
    <div
      id={`product-card-${product.id}`}
      className="group relative flex flex-col bg-white rounded-2xl border border-neutral-100 overflow-hidden shadow-sm hover:shadow-xl hover:border-neutral-200 transition-all duration-300 h-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setShowQuickSizes(false);
      }}
    >
      {/* Product Image Stage */}
      <div 
        className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100 cursor-pointer"
        onClick={() => onViewDetails(product)}
      >
        {/* Badge */}
        {product.badge && (
          <span className={`absolute top-3.5 left-3.5 z-10 px-2.5 py-1 text-[10px] font-mono font-bold tracking-wider uppercase rounded-full shadow-sm ${getBadgeClass(product.badge)}`}>
            {product.badge}
          </span>
        )}

        {/* Image Swap */}
        <img
          src={hovered && product.images[1] ? product.images[1] : product.images[0]}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Image Overlay Controls */}
        <div className="absolute inset-0 bg-neutral-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
          <div className="flex gap-2 w-full max-w-xs justify-center items-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(product);
              }}
              className="flex items-center justify-center gap-1.5 px-3 py-2 bg-white text-neutral-900 rounded-xl text-xs font-semibold shadow-md hover:bg-neutral-900 hover:text-white transition-all transform translate-y-2 group-hover:translate-y-0 duration-300 shrink-0"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Xem Thử</span>
            </button>

            {!showQuickSizes ? (
              <button
                onClick={handleQuickAddClick}
                className="flex flex-1 items-center justify-center gap-1.5 px-3 py-2 bg-neutral-900 text-white rounded-xl text-xs font-semibold shadow-md hover:bg-white hover:text-neutral-900 transition-all transform translate-y-2 group-hover:translate-y-0 duration-300"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Mua Ngay</span>
              </button>
            ) : (
              <div className="flex flex-1 gap-1 items-center bg-white p-1 rounded-xl shadow-md transform translate-y-2 group-hover:translate-y-0 duration-300 overflow-x-auto scrollbar-none">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={(e) => handleSelectSizeAndAdd(e, sz)}
                    className="h-7 w-7 flex items-center justify-center rounded-lg text-[10px] font-bold border border-neutral-200 hover:border-neutral-950 hover:bg-neutral-950 hover:text-white transition-all"
                  >
                    {sz}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Specs & Info */}
      <div className="flex flex-col flex-grow p-4 sm:p-5">
        {/* Category & Rating */}
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] uppercase tracking-wider font-bold text-neutral-400 font-mono">
            {product.category}
          </span>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span className="text-xs font-mono font-medium text-neutral-600">{product.rating}</span>
          </div>
        </div>

        {/* Title */}
        <h3 
          className="font-sans font-bold text-sm sm:text-base text-neutral-800 line-clamp-1 group-hover:text-neutral-950 transition-colors cursor-pointer mb-2"
          onClick={() => onViewDetails(product)}
        >
          {product.name}
        </h3>

        {/* Price Tag & Colors */}
        <div className="mt-auto flex items-end justify-between pt-2">
          <div className="flex flex-col">
            {product.originalPrice && (
              <span className="text-xs text-neutral-400 line-through mb-0.5 leading-none">
                {formatVND(product.originalPrice)}
              </span>
            )}
            <span className="font-mono text-sm sm:text-base font-bold text-neutral-900 leading-none">
              {formatVND(product.price)}
            </span>
          </div>

          {/* Miniature Color Dots */}
          <div className="flex gap-1.5 mb-1">
            {product.colors.map((color, index) => (
              <span
                key={color.name}
                title={color.name}
                className={`h-2.5 w-2.5 rounded-full border border-black/10 ring-1 ring-offset-1 ${
                  selectedColor.name === color.name ? 'ring-neutral-900' : 'ring-transparent'
                } transition-all cursor-pointer`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColor(color);
                }}
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
