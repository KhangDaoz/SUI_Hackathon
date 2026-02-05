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
    seller: "0x1234...5678",
    greenCredits: 10,
    condition: "like-new",
    createdAt: Date.now() - 86400000 * 2,
    isGreenProduct: true,
  },
  {
    id: "0x002",
    title: "Laptop Dell Inspiron 15",
    description: "Laptop cũ còn tốt, pin 4h, i5 Gen 10, 8GB RAM, SSD 256GB",
    price: 5.0,
    imageUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
    category: "Điện tử",
    seller: "0x2345...6789",
    greenCredits: 50,
    condition: "good",
    createdAt: Date.now() - 86400000 * 5,
    isGreenProduct: true,
  },
  {
    id: "0x003",
    title: "Xe Đạp Mini Nhật Bản",
    description: "Xe đạp gấp mini, còn đẹp, phù hợp di chuyển trong khuôn viên trường",
    price: 2.5,
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    category: "Phương tiện",
    seller: "0x3456...7890",
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
    seller: "0x4567...8901",
    greenCredits: 15,
    condition: "good",
    createdAt: Date.now() - 86400000 * 3,
    isGreenProduct: true,
  },
  {
    id: "0x005",
    title: "Áo Khoác Uniqlo Size M",
    description: "Áo khoác Uniqlo chính hãng, ít mặc, còn như mới",
    price: 1.2,
    imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400",
    category: "Thời trang",
    seller: "0x5678...9012",
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
    seller: "0x6789...0123",
    greenCredits: 25,
    condition: "new",
    createdAt: Date.now() - 86400000 * 0.5,
    isGreenProduct: true,
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
