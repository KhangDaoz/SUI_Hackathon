import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { Input, Textarea, Select } from "./ui/input";
import { Badge } from "./ui/badge";
import { CATEGORIES, Product } from "../data/products";
import { Package, Leaf, X } from "lucide-react";
import { useCurrentAccount } from "@mysten/dapp-kit-react";

interface ListProductFormProps {
  onSubmit: (product: Omit<Product, "id" | "createdAt">) => void;
  onClose: () => void;
}

export function ListProductForm({ onSubmit, onClose }: ListProductFormProps) {
  const account = useCurrentAccount();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    imageUrl: "",
    category: "Sách",
    condition: "good" as "new" | "like-new" | "good" | "fair",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!account) return;

    const greenCredits = Math.floor(parseFloat(formData.price) * 10); // 10 green credits per SUI

    onSubmit({
      title: formData.title,
      description: formData.description,
      price: parseFloat(formData.price),
      imageUrl: formData.imageUrl || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400",
      category: formData.category,
      seller: `${account.address.slice(0, 6)}...${account.address.slice(-4)}`,
      greenCredits,
      condition: formData.condition,
      isGreenProduct: true,
    });
  };

  if (!account) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Package className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground text-center">
            Vui lòng kết nối ví Sui để đăng bán sản phẩm
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Đăng Bán Sản Phẩm
          </CardTitle>
          <CardDescription>
            Chia sẻ đồ dùng, nhận Green Credit
          </CardDescription>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Tên sản phẩm *</label>
            <Input
              placeholder="VD: Sách Giáo Trình Lập Trình C++"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Mô tả</label>
            <Textarea
              placeholder="Mô tả chi tiết về sản phẩm của bạn..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Giá (SUI) *</label>
              <Input
                type="number"
                step="0.1"
                min="0.1"
                placeholder="0.5"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Danh mục</label>
              <Select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              >
                {CATEGORIES.filter((c) => c !== "Tất cả").map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Tình trạng</label>
            <div className="flex gap-2 flex-wrap">
              {(["new", "like-new", "good", "fair"] as const).map((cond) => (
                <Badge
                  key={cond}
                  variant={formData.condition === cond ? "default" : "secondary"}
                  className="cursor-pointer"
                  onClick={() => setFormData({ ...formData, condition: cond })}
                >
                  {cond === "new" && "Mới"}
                  {cond === "like-new" && "Như mới"}
                  {cond === "good" && "Tốt"}
                  {cond === "fair" && "Khá"}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Link ảnh (tùy chọn)</label>
            <Input
              placeholder="https://..."
              value={formData.imageUrl}
              onChange={(e) =>
                setFormData({ ...formData, imageUrl: e.target.value })
              }
            />
          </div>

          {formData.price && (
            <div className="bg-green/10 border border-green/30 rounded-lg p-3">
              <p className="text-sm text-green flex items-center gap-2">
                <Leaf className="h-4 w-4" />
                Người mua sẽ nhận được{" "}
                <strong>+{Math.floor(parseFloat(formData.price) * 10)} Green Credit</strong>
              </p>
            </div>
          )}

          <Button type="submit" variant="green" className="w-full">
            <Leaf className="h-4 w-4 mr-2" />
            Đăng Bán & Nhận Green Credit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
