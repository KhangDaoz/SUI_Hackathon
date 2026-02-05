import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Product, CONDITIONS } from "../data/products";
import { Leaf, ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onBuy: (product: Product) => void;
}

export function ProductCard({ product, onBuy }: ProductCardProps) {
  const formatDate = (timestamp: number) => {
    const days = Math.floor((Date.now() - timestamp) / 86400000);
    if (days === 0) return "Hôm nay";
    if (days === 1) return "Hôm qua";
    return `${days} ngày trước`;
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {product.isGreenProduct && (
          <Badge
            variant="green"
            className="absolute top-2 left-2 flex items-center gap-1"
          >
            <Leaf className="h-3 w-3" />
            Green
          </Badge>
        )}
        <Badge variant="secondary" className="absolute top-2 right-2">
          {CONDITIONS[product.condition]}
        </Badge>
      </div>
      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-sm line-clamp-2 mb-1">
            {product.title}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs">
            {product.category}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {formatDate(product.createdAt)}
          </span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div>
            <p className="text-lg font-bold text-sui">{product.price} SUI</p>
            <p className="text-xs text-green flex items-center gap-1">
              <Leaf className="h-3 w-3" />+{product.greenCredits} Green Credit
            </p>
          </div>
          <Button size="sm" variant="green" onClick={() => onBuy(product)}>
            <ShoppingCart className="h-4 w-4" />
            Mua
          </Button>
        </div>

        <p className="text-xs text-muted-foreground truncate">
          Người bán: {product.seller}
        </p>
      </CardContent>
    </Card>
  );
}
