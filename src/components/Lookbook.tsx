import React from 'react';
import { LOOKBOOK_SESSIONS, PRODUCTS } from '../data/products';
import { Product } from '../types';
import { ArrowUpRight, BookOpen, Sparkles } from 'lucide-react';

interface LookbookProps {
  onViewProduct: (product: Product) => void;
}

export default function Lookbook({ onViewProduct }: LookbookProps) {
  // Helper to fetch product details based on ID
  const getProductById = (id: string): Product | undefined => {
    return PRODUCTS.find((p) => p.id === id);
  };

  // Format price helper (VND)
  const formatVND = (num: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num);
  };

  return (
    <div id="lookbook-section" className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      
      {/* Editorial Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider bg-neutral-100 text-neutral-800 rounded-full mb-3 border border-neutral-200">
          <BookOpen className="w-3.5 h-3.5 text-neutral-600" />
          AESTHETIC INSPIRATION
        </div>
        <h2 className="font-sans font-black text-2xl sm:text-3xl text-neutral-900 uppercase tracking-tight">Editorial Lookbook</h2>
        <p className="text-xs sm:text-sm text-neutral-400 mt-2 leading-relaxed">
          Khám phá bộ sưu tập các phong cách xu hướng nổi loạn, lãng mạn hay cổ điển được định hình bởi đội ngũ Stylist của Youth Fashion. Nhấp vào các sản phẩm đính kèm để mua sắm trọn set đồ.
        </p>
      </div>

      {/* Grid of Lookbook Sessions */}
      <div className="space-y-16">
        {LOOKBOOK_SESSIONS.map((session, index) => (
          <div
            key={session.id}
            className={`flex flex-col lg:flex-row gap-8 items-center ${
              index % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}
          >
            {/* Left/Right Side: Massive Aesthetic Image */}
            <div className="w-full lg:w-1/2 rounded-3xl overflow-hidden aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/5] bg-neutral-100 shadow-lg relative group">
              <img
                src={session.image}
                alt={session.title}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Blur vignette hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end text-white">
                <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-300 block mb-1 uppercase">
                  {session.theme}
                </span>
                <h3 className="font-sans font-black text-xl sm:text-2xl uppercase tracking-tight">
                  {session.title}
                </h3>
                <p className="text-xs text-neutral-300 mt-1 max-w-md leading-relaxed font-medium">
                  {session.subtitle}
                </p>
              </div>
            </div>

            {/* Right/Left Side: Attached Products Shop Cards */}
            <div className="w-full lg:w-1/2 space-y-6">
              <div className="flex items-center gap-2 pb-3 border-b border-neutral-100">
                <Sparkles className="w-4 h-4 text-neutral-800" />
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-800">
                  CÁC SẢN PHẨM TRONG SET ĐỒ (SHOP THE LOOK)
                </h4>
              </div>

              {/* Product cards in Lookbook */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {session.products.map((pId) => {
                  const product = getProductById(pId);
                  if (!product) return null;
                  return (
                    <div
                      key={product.id}
                      onClick={() => onViewProduct(product)}
                      className="group flex gap-3.5 p-3.5 bg-white border border-neutral-100 hover:border-neutral-900 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer items-center"
                    >
                      {/* Image */}
                      <div className="h-16 w-12 rounded-xl overflow-hidden shrink-0 bg-neutral-50 border border-neutral-100">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      
                      {/* Specs info */}
                      <div className="flex-grow flex flex-col justify-between py-0.5">
                        <div>
                          <h5 className="font-sans font-bold text-xs text-neutral-800 line-clamp-1 group-hover:text-neutral-950 transition-colors">
                            {product.name}
                          </h5>
                          <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 font-mono block mt-0.5">
                            {product.category}
                          </span>
                        </div>
                        <div className="flex justify-between items-baseline mt-2.5">
                          <span className="font-mono text-xs font-bold text-neutral-900">
                            {formatVND(product.price)}
                          </span>
                          <span className="text-[10px] font-bold text-neutral-500 group-hover:text-neutral-900 flex items-center gap-0.5 transition-all">
                            Xem ngay
                            <ArrowUpRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Styling quote block */}
              <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-100">
                <p className="text-xs italic text-neutral-500 font-medium leading-relaxed">
                  "Với bộ sưu tập {session.title}, chúng tôi tập trung khai thác sự kết hợp giữa các hình thêu xù nổi loạn 3D đặc trưng của giới trẻ đô thị với các mảng rách xé và phối túi hộp hầm hố. Sự phối hợp này tạo nên độ cân bằng hoàn hảo giữa tính sành điệu ứng dụng hàng ngày và tinh thần nổi loạn tự do."
                </p>
                <span className="block text-[10px] text-neutral-400 font-bold font-mono mt-2.5 uppercase tracking-wide text-right">
                  — Lead Stylist, Youth Fashion
                </span>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
