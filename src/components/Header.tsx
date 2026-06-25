import React, { useState } from 'react';
import { ShoppingBag, Search, HelpCircle, BookOpen, Layers, ClipboardList, Menu, X, Shirt } from 'lucide-react';

interface HeaderProps {
  activeTab: 'shop' | 'lookbook' | 'mixmatch' | 'sizeguide' | 'orders';
  setActiveTab: (tab: 'shop' | 'lookbook' | 'mixmatch' | 'sizeguide' | 'orders') => void;
  cartCount: number;
  onOpenCart: () => void;
  searchText: string;
  setSearchText: (text: string) => void;
}

export default function Header({
  activeTab,
  setActiveTab,
  cartCount,
  onOpenCart,
  searchText,
  setSearchText,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'shop', label: 'Cửa hàng', icon: Shirt },
    { id: 'lookbook', label: 'Aesthetic Lookbook', icon: BookOpen },
    { id: 'mixmatch', label: 'Mix & Match Studio', icon: Layers },
    { id: 'sizeguide', label: 'Tính Size Thông Minh', icon: HelpCircle },
    { id: 'orders', label: 'Đơn hàng của tôi', icon: ClipboardList },
  ] as const;

  return (
    <header id="main-header" className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-neutral-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-20 items-center justify-between gap-4">
          
          {/* Logo */}
          <div 
            id="logo-container" 
            className="flex items-center gap-2 cursor-pointer select-none shrink-0"
            onClick={() => { setActiveTab('shop'); setMobileMenuOpen(false); }}
          >
            <div className="h-9 w-9 bg-neutral-900 rounded-lg flex items-center justify-center text-white font-mono font-bold text-lg tracking-tighter shadow-sm">
              Y
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-black tracking-widest text-xl text-neutral-900 leading-none">YOUTH</span>
              <span className="font-mono text-[9px] tracking-[0.2em] uppercase font-semibold text-neutral-400">Trend & Rebellion</span>
            </div>
          </div>

          {/* Nav Links - Desktop */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const IconComp = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-neutral-900 text-white shadow-md shadow-neutral-900/10'
                      : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'
                  }`}
                >
                  <IconComp className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Actions: Search & Cart & Menu */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Search Input (only shown if in 'shop' tab) */}
            {activeTab === 'shop' && (
              <div className="relative hidden sm:block w-48 xl:w-64">
                <input
                  type="text"
                  placeholder="Tìm áo quần, phụ kiện..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-neutral-200 rounded-full text-xs font-medium placeholder-neutral-400 focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-all bg-neutral-50/50 hover:bg-neutral-50"
                />
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400" />
              </div>
            )}

            {/* Cart Button */}
            <button
              id="cart-trigger"
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full border border-neutral-200 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all cursor-pointer group shadow-sm bg-white"
            >
              <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-105" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white font-mono text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-full border border-neutral-200 hover:bg-neutral-100 text-neutral-700 lg:hidden cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-neutral-100 py-4 px-4 shadow-inner space-y-4 animate-fadeIn">
          {/* Mobile Search */}
          {activeTab === 'shop' && (
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm áo quần, phụ kiện..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full pl-9 pr-4 py-3 border border-neutral-200 rounded-xl text-sm placeholder-neutral-400 focus:outline-none focus:border-neutral-900"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            </div>
          )}

          {/* Mobile Nav Links */}
          <div className="flex flex-col gap-1">
            {navItems.map((item) => {
              const IconComp = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-neutral-900 text-white shadow-sm'
                      : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'
                  }`}
                >
                  <IconComp className="w-4.5 h-4.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
