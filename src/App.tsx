import { useState } from "react";
import { ConnectButton, useCurrentAccount, useCurrentNetwork } from "@mysten/dapp-kit-react";
import { ProductList } from "./components/ProductList";
import { ListProductForm } from "./components/ListProductForm";
import { GreenCreditCard } from "./components/GreenCreditCard";
import { PurchaseModal } from "./components/PurchaseModal";
import { TransactionHistory } from "./components/TransactionHistory";
import { Product, MOCK_PRODUCTS } from "./data/products";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { Leaf, Plus, Store, Recycle, Users } from "lucide-react";

function App() {
  const account = useCurrentAccount();
  const network = useCurrentNetwork();
  const [showListForm, setShowListForm] = useState(false);
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [greenCredits, setGreenCredits] = useState(125);
  const [totalPurchases, setTotalPurchases] = useState(3);
  const [totalListings, setTotalListings] = useState(1);

  const handleBuy = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleConfirmPurchase = () => {
    if (selectedProduct) {
      setGreenCredits((prev) => prev + selectedProduct.greenCredits);
      setTotalPurchases((prev) => prev + 1);
      setProducts((prev) => prev.filter((p) => p.id !== selectedProduct.id));
    }
    setSelectedProduct(null);
  };

  const handleListProduct = (productData: Omit<Product, "id" | "createdAt">) => {
    const newProduct: Product = {
      ...productData,
      id: `0x${Date.now().toString(16)}`,
      createdAt: Date.now(),
    };
    setProducts((prev) => [newProduct, ...prev]);
    setTotalListings((prev) => prev + 1);
    setGreenCredits((prev) => prev + 5); // Bonus for listing
    setShowListForm(false);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="bg-green/20 p-2 rounded-lg">
              <Recycle className="h-6 w-6 text-green" />
            </div>
            <div>
              <h1 className="text-lg font-bold">P-Market</h1>
              <p className="text-xs text-muted-foreground">Chợ Sinh Viên Xanh</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {account && (
              <Badge variant="green" className="hidden md:flex items-center gap-1">
                <Leaf className="h-3 w-3" />
                {greenCredits} GC
              </Badge>
            )}
            <ConnectButton />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b bg-gradient-to-b from-green/5 to-background">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <Badge variant="green" className="inline-flex">
              <Leaf className="h-3 w-3 mr-1" />
              Powered by Sui Blockchain
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold">
              Trao đổi đồ cũ,{" "}
              <span className="text-green">Nhận Green Credit</span>
            </h2>
            <p className="text-muted-foreground">
              Nền tảng marketplace phi tập trung dành cho sinh viên. 
              Mua bán đồ dùng cũ, sách vở, thiết bị học tập và nhận phần thưởng 
              Green Credit cho hành vi tiêu dùng bền vững.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>1,234 sinh viên</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Store className="h-4 w-4" />
                <span>{products.length} sản phẩm</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-green">
                <Leaf className="h-4 w-4" />
                <span>5,678 Green Credits đã phát</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <GreenCreditCard
              greenCredits={greenCredits}
              totalPurchases={totalPurchases}
              totalListings={totalListings}
            />
            
            <Button
              variant="green"
              className="w-full"
              onClick={() => setShowListForm(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Đăng bán sản phẩm
            </Button>

            {/* How it works */}
            <div className="bg-muted/30 rounded-lg p-4 space-y-3">
              <h3 className="font-semibold text-sm">Cách hoạt động:</h3>
              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex gap-2">
                  <div className="bg-green/20 text-green rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">1</div>
                  <p>Kết nối ví Sui</p>
                </div>
                <div className="flex gap-2">
                  <div className="bg-green/20 text-green rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">2</div>
                  <p>Mua/Bán đồ dùng cũ</p>
                </div>
                <div className="flex gap-2">
                  <div className="bg-green/20 text-green rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">3</div>
                  <p>Nhận Green Credit rewards</p>
                </div>
                <div className="flex gap-2">
                  <div className="bg-green/20 text-green rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">4</div>
                  <p>Đổi ưu đãi & giảm phí</p>
                </div>
              </div>
            </div>

            {/* Transaction History */}
            <TransactionHistory />
          </div>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            {showListForm ? (
              <ListProductForm
                onSubmit={handleListProduct}
                onClose={() => setShowListForm(false)}
              />
            ) : (
              <ProductList products={products} onBuy={handleBuy} />
            )}
          </div>
        </div>
      </main>

      {/* Purchase Modal */}
      {selectedProduct && (
        <PurchaseModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onConfirm={handleConfirmPurchase}
        />
      )}

      {/* Footer */}
      <footer className="border-t mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Recycle className="h-4 w-4 text-green" />
              <span>P-Market - Sui Hackathon 2026</span>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <Badge variant="sui">{network || "testnet"}</Badge>
              <span>Giao dịch thực trên blockchain</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
