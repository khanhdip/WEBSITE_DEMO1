import { Product, DiscountCode } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'top-1',
    name: 'Áo Thun Oversize "Urban Rebellion"',
    category: 'tops',
    price: 320000,
    originalPrice: 450000,
    badge: 'HOT',
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=800&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Đen Washed', hex: '#2A2B2D' },
      { name: 'Kem Sand', hex: '#E6DFD3' },
      { name: 'Xanh Lá Sage', hex: '#8F9779' }
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    description: 'Áo thun form rộng unisex được làm từ 100% Cotton 2 chiều định lượng 250gsm dày dặn, đứng form. Hình in lụa cao cấp sắc nét mặt sau thể hiện tinh thần phá cách của giới trẻ thành thị. Thấm hút mồ hôi cực tốt và không xơ nứt sau nhiều lần giặt.',
    specs: [
      'Chất liệu: 100% Premium Cotton dập gân mịn',
      'Định lượng: 250gsm siêu dày dặn',
      'Công nghệ in: In lụa Plastisol chống nứt vỡ',
      'Đường may: Trùm vai bo cổ dệt bo mác cao cấp',
      'Sản xuất tại Việt Nam'
    ],
    rating: 4.8,
    reviewCount: 142,
    tags: ['Oversize', 'Graphic Tee', 'Streetwear', 'Premium']
  },
  {
    id: 'top-2',
    name: 'Áo Knit Sweater Loang Màu "Aura Shift"',
    category: 'tops',
    price: 450000,
    badge: 'NEW',
    images: [
      'https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Pastel Blue Gradient', hex: '#A1C4FD' },
      { name: 'Charcoal Cyber', hex: '#4F4F4F' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Áo len dệt kim mỏng nhẹ lấy cảm hứng từ phong cách Y2K và Grunge Aesthetic. Kỹ thuật nhuộm loang màu thủ công (Space-dye) mang lại hiệu ứng phối màu chuyển tiếp ngẫu hứng độc nhất cho từng sản phẩm. Form áo suông nhẹ, hơi rũ rủ sành điệu.',
    specs: [
      'Chất liệu: Sợi Cotton dệt kim tổng hợp mềm mịn, không ngứa',
      'Họa tiết nhuộm dải màu ngẫu nhiên độc bản',
      'Kiểu dáng cổ tròn, bo nhẹ tay áo tinh tế',
      'Thích hợp mặc cả bốn mùa'
    ],
    rating: 4.6,
    reviewCount: 58,
    tags: ['Y2K', 'Knitwear', 'Aura', 'Unisex']
  },
  {
    id: 'outer-1',
    name: 'Áo Khoác Varsity "Championship" Retro',
    category: 'outerwear',
    price: 750000,
    originalPrice: 950000,
    badge: 'SALE',
    images: [
      'https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Đen phối Kem', hex: '#1C1D1F' },
      { name: 'Xanh Varsity', hex: '#1A365D' }
    ],
    sizes: ['M', 'L', 'XL'],
    description: 'Chiếc áo khoác Varsity mang tính biểu tượng đậm chất Retro học đường Mỹ. Thân áo bằng dạ nỉ ép mềm mại giữ ấm tốt, kết hợp phối tay da PU cao cấp chống nước nhẹ. Điểm nhấn thêu nổi xù chenille tỉ mỉ, nút bấm kim loại sơn tĩnh điện cùng tone cực xịn.',
    specs: [
      'Chất liệu thân: 80% Dạ nỉ cao cấp, lót dù dù thoáng khí',
      'Chất liệu tay: Da PU mờ hạt mịn, co giãn nhẹ',
      'Hình thêu: Thêu xù nổi 3D kết hợp thêu phẳng chi tiết',
      'Bo chun cổ, tay và gấu áo dệt sọc dày dặn không bai dão'
    ],
    rating: 4.9,
    reviewCount: 204,
    tags: ['Varsity Jacket', 'Retro', 'Heavyweight', 'Iconic']
  },
  {
    id: 'outer-2',
    name: 'Áo Hoodie Zip Heavyweight "Gothic Metal"',
    category: 'outerwear',
    price: 520000,
    badge: 'EXCLUSIVE',
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Đen Jet-Black', hex: '#111111' },
      { name: 'Xám Wash Bụi', hex: '#555555' }
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    description: 'Áo khoác hoodie khóa kéo hai đầu kim loại mượt mà (Double-way ZIP). Mặt trước thêu nổi phông chữ Gothic đặc trưng tinh xảo. Form áo rũ nón rộng bồng bềnh che nắng gió cực tốt, túi trước sâu tiện lợi đựng điện thoại hay ví tiền.',
    specs: [
      'Chất liệu: Nỉ chân cua 100% cotton định lượng 400gsm siêu nặng tay',
      'Khóa kéo kim loại YKK hai đầu tiện lợi',
      'Nón 2 lớp dày dặn đứng form trùm đầu thoải mái',
      'Dây rút dẹt có bọc kim loại chống tưa đầu'
    ],
    rating: 4.7,
    reviewCount: 96,
    tags: ['Hoodie', 'Gothic', 'Heavyweight', 'Zip-up']
  },
  {
    id: 'bottom-1',
    name: 'Quần Cargo Multi-Pocket "Utility-X"',
    category: 'bottoms',
    price: 480000,
    originalPrice: 580000,
    badge: 'HOT',
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517423568366-8b83523034fd?q=80&w=800&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Xanh Rêu Lính', hex: '#3B4D3C' },
      { name: 'Xám Xi Măng', hex: '#8E9094' },
      { name: 'Đen Tactical', hex: '#1D1D1F' }
    ],
    sizes: ['M', 'L', 'XL'],
    description: 'Quần túi hộp form rộng Baggy lấy cảm hứng từ phong cách Gorpcore & Techwear bụi bặm. Sở hữu 6 túi hộp tiện dụng xếp nếp nổi cá tính. Gấu quần trang bị dây rút bo gấu thông minh, linh hoạt biến hóa từ ống suông sang ống bo jogger trong 3 giây.',
    specs: [
      'Chất liệu: Kaki Cotton Twill 100% dày, siêu bền bỉ',
      'Form dáng: Baggy Cargo bụi bặm phóng khoáng',
      'Dây rút gấu quần rút co giãn khóa nhựa bấm',
      'Cạp quần nửa chun co giãn kèm đai cài thắt lưng tiện lợi'
    ],
    rating: 4.8,
    reviewCount: 178,
    tags: ['Cargo', 'Techwear', 'Gorpcore', 'Baggy']
  },
  {
    id: 'bottom-2',
    name: 'Quần Baggy Jeans Rách Gối "Vintage Blue"',
    category: 'bottoms',
    price: 490000,
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582562124811-c09040d0a901?q=80&w=800&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Xanh Wash Sáng', hex: '#A9C4EB' },
      { name: 'Xanh Retro Denim', hex: '#4B6584' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Chiếc quần Jeans không thể thiếu cho set đồ dạo phố bụi bặm. Sử dụng kỹ thuật mài wash màu loang vintage sành điệu cùng các vết xé rách gối cá tính được may kèm lớp lót bảo vệ đùi bên trong tinh tế. Form baggy thụng che khuyết điểm chân hoàn hảo.',
    specs: [
      'Chất liệu: 100% Heavyweight Denim bò không co giãn, giữ form',
      'Công nghệ: Wash enzyme mài sờn vintage mềm mại dải màu xanh',
      'Đường chỉ khâu vàng đồng dập nổi đặc trưng bụi bặm',
      'Khóa kéo đồng đồng thau chống kẹt rỉ'
    ],
    rating: 4.5,
    reviewCount: 110,
    tags: ['Jeans', 'Vintage', 'Baggy', 'Distressed']
  },
  {
    id: 'acc-1',
    name: 'Mũ Beanie Dệt Kim "Cold Vibe"',
    category: 'accessories',
    price: 150000,
    originalPrice: 190000,
    badge: 'SALE',
    images: [
      'https://images.unsplash.com/photo-1576871337622-98d48d4aa53e?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1608156639585-b3a032ef9689?q=80&w=800&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Đen Jet Black', hex: '#111111' },
      { name: 'Xám Sương Mù', hex: '#B2BEC3' },
      { name: 'Cam Neon Cyber', hex: '#FF7675' }
    ],
    sizes: ['Free'],
    description: 'Mũ len Beanie dệt gân gập gấu dẻo dai thích hợp cho cả nam và nữ. Phụ kiện hoàn hảo để tăng điểm "chất chơi" cho toàn bộ trang phục. Chất len len tăm co giãn thoải mái, ôm nhẹ đầu không gây bí nóng hay ngứa ngáy da đầu.',
    specs: [
      'Chất liệu: 100% Acrylic tổng hợp giữ ấm tốt, nhanh khô',
      'Kiểu dệt: Dệt gân nổi sọc sành điệu co giãn đa chiều',
      'Mác nhãn thêu dệt nổi may gập gấu mũ sành điệu',
      'Kích thước: Co giãn freesize ôm đầu nam nữ'
    ],
    rating: 4.6,
    reviewCount: 320,
    tags: ['Beanie', 'Headwear', 'Winter Accessory', 'Unisex']
  },
  {
    id: 'acc-2',
    name: 'Túi Tote Canvas "Slogan Rebellion"',
    category: 'accessories',
    price: 190000,
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Kem Ngà Kem', hex: '#F5F5DC' },
      { name: 'Đen Mực Đen', hex: '#1C1C1C' }
    ],
    sizes: ['Free'],
    description: 'Túi canvas thô dày dặn đeo vai hoặc xách tay sành điệu. In slogan phản quang cực độc thu hút ánh nhìn ban đêm. Ngăn trong siêu rộng chứa vừa laptop 15.6 inch kèm túi nhỏ phụ có kéo khóa bảo mật đựng thẻ xe, chìa khóa, thỏi son.',
    specs: [
      'Chất liệu: Canvas thô mộc 100% cotton dệt đôi dày 12oz bền bỉ',
      'Kích thước: 38cm x 42cm x đáy rộng 6cm rộng rãi',
      'Đóng mở: Miệng túi trang bị nút bấm kim loại hoặc khóa kéo nhựa',
      'Quai đeo may gia cố chữ X chịu lực nặng lên tới 10kg'
    ],
    rating: 4.7,
    reviewCount: 154,
    tags: ['Tote Bag', 'Canvas Bag', 'Streetwear Accent', 'Reflective']
  }
];

export const DISCOUNT_CODES: DiscountCode[] = [
  { code: 'GENZNEW', discountPercent: 10, description: 'Giảm 10% cho đơn hàng đầu tiên của thành viên mới' },
  { code: 'STREETSTYLE', discountPercent: 15, description: 'Giảm 15% cho đơn hàng thời trang từ 600k', minSubtotal: 600000 },
  { code: 'WINTERSALE', discountPercent: 20, description: 'Giảm 20% cho đơn hàng từ 1 triệu đồng', minSubtotal: 1000000 }
];

export const LOOKBOOK_SESSIONS = [
  {
    id: 'look-1',
    title: 'Cyberpunk Neo-Tokyo',
    subtitle: 'Tương lai đô thị nổi loạn với tông đen tactical và cam neon rực rỡ.',
    theme: 'Techwear & Futuristic',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop',
    products: ['top-1', 'bottom-1', 'acc-1']
  },
  {
    id: 'look-2',
    title: 'Pastel Dreamscape',
    subtitle: 'Nét thơ mộng, dịu êm phong cách soft-boy/soft-girl châu Á.',
    theme: 'Chilled Pastel Grunge',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop',
    products: ['top-2', 'bottom-2', 'acc-2']
  },
  {
    id: 'look-3',
    title: 'Ivy Retro Academic',
    subtitle: 'Cổ điển pha lẫn thể thao học đường sành điệu tinh tế.',
    theme: 'Vintage Sporty Chic',
    image: 'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?q=80&w=800&auto=format&fit=crop',
    products: ['outer-1', 'bottom-2', 'acc-1']
  }
];
