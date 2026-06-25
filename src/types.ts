export interface Product {
  id: string;
  name: string;
  category: 'tops' | 'bottoms' | 'outerwear' | 'accessories';
  price: number;
  originalPrice?: number;
  badge?: 'NEW' | 'HOT' | 'SALE' | 'EXCLUSIVE';
  images: string[];
  colors: { name: string; hex: string }[];
  sizes: ('S' | 'M' | 'L' | 'XL' | 'XXL' | 'Free')[];
  description: string;
  specs: string[];
  rating: number;
  reviewCount: number;
  tags: string[];
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor: { name: string; hex: string };
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  shippingAddress: {
    fullName: string;
    phone: string;
    email: string;
    city: string;
    district: string;
    addressDetail: string;
  };
  paymentMethod: 'cod' | 'banking';
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  status: 'pending' | 'shipping' | 'delivered';
}

export interface DiscountCode {
  code: string;
  discountPercent: number;
  description: string;
  minSubtotal?: number;
}
