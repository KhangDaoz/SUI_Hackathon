// Mock data types and sample products for demo

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number; // in SUI
  imageUrl: string;
  category: string;
  seller: string;
  greenCredits: number; // rewards when buying
  condition: "new" | "like-new" | "good" | "fair";
  createdAt: number;
  isGreenProduct: boolean;
}

export interface GreenCreditBalance {
  total: number;
  earned: number;
  spent: number;
}

// Sample products for demo
export const MOCK_PRODUCTS: Product[] = [
  {
    id: "0x001",
    title: "Sách Giáo Trình Lập Trình C++",
    description: "Sách giáo trình đại học, còn mới 90%, có ghi chú hữu ích",
    price: 0.5,
    imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400",
    category: "Sách",
    seller: "0xecfeaa25d5ba2ada315ac0cc833033428e56bb317c11f1194931570ac8d3eae1",
    greenCredits: 10,
    condition: "like-new",
    createdAt: Date.now() - 86400000 * 2,
    isGreenProduct: true,
  },
  {
    id: "0x002",
    title: "Laptop Dell Inspiron 15",
    description: "Laptop cũ còn tốt, pin 4h, i5 Gen 10, 8GB RAM, SSD 256GB",
    price: 0.5,
    imageUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
    category: "Điện tử",
    seller: "0xecfeaa25d5ba2ada315ac0cc833033428e56bb317c11f1194931570ac8d3eae1",
    greenCredits: 50,
    condition: "good",
    createdAt: Date.now() - 86400000 * 5,
    isGreenProduct: true,
  },
  {
    id: "0x003",
    title: "Xe Đạp Mini Nhật Bản",
    description: "Xe đạp gấp mini, còn đẹp, phù hợp di chuyển trong khuôn viên trường",
    price: 0.6,
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    category: "Phương tiện",
    seller: "0xecfeaa25d5ba2ada315ac0cc833033428e56bb317c11f1194931570ac8d3eae1",
    greenCredits: 30,
    condition: "good",
    createdAt: Date.now() - 86400000 * 1,
    isGreenProduct: true,
  },
  {
    id: "0x004",
    title: "Bộ Bút Vẽ Kỹ Thuật",
    description: "Bộ bút vẽ kỹ thuật Staedtler, còn 80%, phù hợp sinh viên kiến trúc",
    price: 0.8,
    imageUrl: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400",
    category: "Văn phòng phẩm",
    seller: "0xecfeaa25d5ba2ada315ac0cc833033428e56bb317c11f1194931570ac8d3eae1",
    greenCredits: 15,
    condition: "good",
    createdAt: Date.now() - 86400000 * 3,
    isGreenProduct: true,
  },
  {
    id: "0x005",
    title: "Áo Khoác Uniqlo Size M",
    description: "Áo khoác Uniqlo chính hãng, ít mặc, còn như mới",
    price: 0.3,
    imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400",
    category: "Thời trang",
    seller: "0xecfeaa25d5ba2ada315ac0cc833033428e56bb317c11f1194931570ac8d3eae1",
    greenCredits: 20,
    condition: "like-new",
    createdAt: Date.now() - 86400000 * 4,
    isGreenProduct: true,
  },
  {
    id: "0x006",
    title: "Bình Nước Giữ Nhiệt 500ml",
    description: "Bình nước inox 304, giữ nhiệt 24h, thân thiện môi trường",
    price: 0.3,
    imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400",
    category: "Đồ dùng",
    seller: "0xecfeaa25d5ba2ada315ac0cc833033428e56bb317c11f1194931570ac8d3eae1",
    greenCredits: 25,
    condition: "new",
    createdAt: Date.now() - 86400000 * 0.5,
    isGreenProduct: true,
  },
  // ========== SẢN PHẨM KHÔNG XANH (không được Green Credits) ==========
  {
    id: "0x007",
    title: "iPhone 14 Pro Max 256GB",
    description: "Điện thoại mới 100%, chưa kích hoạt, fullbox",
    price: 8.5,
    imageUrl: "https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=400",
    category: "Điện tử",
    seller: "0x1234...5678",
    greenCredits: 0,
    condition: "new",
    createdAt: Date.now() - 86400000 * 1,
    isGreenProduct: false,
  },
  {
    id: "0x008",
    title: "Tai nghe AirPods Pro 2",
    description: "Hàng mới seal, chưa bóc hộp",
    price: 2.0,
    imageUrl: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400",
    category: "Điện tử",
    seller: "0x2345...6789",
    greenCredits: 0,
    condition: "new",
    createdAt: Date.now() - 86400000 * 2,
    isGreenProduct: false,
  },
  {
    id: "0x009",
    title: "Giày Nike Air Jordan 1",
    description: "Giày thể thao mới, size 42, chưa qua sử dụng",
    price: 1.5,
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
    category: "Thời trang",
    seller: "0x3456...7890",
    greenCredits: 0,
    condition: "new",
    createdAt: Date.now() - 86400000 * 3,
    isGreenProduct: false,
  },
];

export const CATEGORIES = [
  "Tất cả",
  "Sách",
  "Điện tử",
  "Thời trang",
  "Phương tiện",
  "Văn phòng phẩm",
  "Đồ dùng",
  "Khác",
];

export const CONDITIONS = {
  new: "Mới",
  "like-new": "Như mới",
  good: "Tốt",
  fair: "Khá",
};
