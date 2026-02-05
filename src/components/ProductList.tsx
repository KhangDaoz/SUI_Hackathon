import { useState } from "react";
import { ProductCard } from "./ProductCard";
import { Product, MOCK_PRODUCTS, CATEGORIES } from "../data/products";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Search, Filter } from "lucide-react";

interface ProductListProps {
  onBuy: (product: Product) => void;
  products?: Product[];
}

export function ProductList({ onBuy, products = MOCK_PRODUCTS }: ProductListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "Tất cả" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm sản phẩm..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "secondary"}
                className="cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        Hiển thị {filteredProducts.length} sản phẩm
        {selectedCategory !== "Tất cả" && ` trong danh mục "${selectedCategory}"`}
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onBuy={onBuy} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Không tìm thấy sản phẩm nào</p>
        </div>
      )}
    </div>
  );
}
