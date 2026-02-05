import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Product } from "../data/products";
import { X, Leaf, ShoppingCart, CheckCircle2, AlertCircle, ExternalLink, Copy, Check } from "lucide-react";
import { useCurrentAccount, useCurrentNetwork, useDAppKit } from "@mysten/dapp-kit-react";
import { Transaction } from "@mysten/sui/transactions";

interface PurchaseModalProps {
  product: Product;
  onClose: () => void;
  onConfirm: () => void;
}

// Platform wallet address (for demo - replace with your actual address)
const PLATFORM_WALLET = "0x0000000000000000000000000000000000000000000000000000000000000000";

export function PurchaseModal({ product, onClose, onConfirm }: PurchaseModalProps) {
  const account = useCurrentAccount();
  const network = useCurrentNetwork();
  const dAppKit = useDAppKit();
  
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [txDigest, setTxDigest] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Convert SUI to MIST (1 SUI = 1_000_000_000 MIST)
  const totalPriceInMist = BigInt(Math.floor(product.price * 1.025 * 1_000_000_000));

  const getSuiscanUrl = (digest: string) => {
    const baseUrl = network === "mainnet" 
      ? "https://suiscan.xyz/mainnet" 
      : `https://suiscan.xyz/${network}`;
    return `${baseUrl}/tx/${digest}`;
  };

  const copyTxHash = () => {
    if (txDigest) {
      navigator.clipboard.writeText(txDigest);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePurchase = async () => {
    if (!account) return;
    
    setIsPurchasing(true);
    setError(null);
    
    try {
      // Create a real transaction on Sui blockchain
      const tx = new Transaction();
      
      // Split coin for payment amount
      const [coin] = tx.splitCoins(tx.gas, [totalPriceInMist]);
      
      // Transfer to seller (using platform wallet for demo)
      tx.transferObjects([coin], PLATFORM_WALLET);

      // Sign and execute using dAppKit
      const result = await dAppKit.signAndExecuteTransaction({
        transaction: tx,
      });

      console.log("Transaction result:", result);
      
      // Get digest from transaction result
      const digest = result.$kind === "Transaction" 
        ? result.Transaction.digest 
        : null;
      
      if (digest) {
        setTxDigest(digest);
        setIsSuccess(true);
      } else {
        throw new Error("Không thể lấy transaction digest");
      }
      
    } catch (err: any) {
      console.error("Transaction failed:", err);
      setError(err.message || "Giao dịch thất bại. Vui lòng thử lại.");
      setIsPurchasing(false);
    }
  };

  if (isSuccess && txDigest) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center py-8 space-y-4">
            <CheckCircle2 className="h-16 w-16 text-green animate-bounce" />
            <h3 className="text-xl font-bold">Giao dịch thành công!</h3>
            
            <p className="text-muted-foreground text-center">
              Bạn đã nhận được{" "}
              <span className="text-green font-bold">
                +{product.greenCredits} Green Credit
              </span>
            </p>

            {/* Transaction Hash */}
            <div className="w-full bg-muted/50 rounded-lg p-3 space-y-2">
              <p className="text-xs text-muted-foreground">Transaction Hash:</p>
              <div className="flex items-center gap-2">
                <code className="text-xs font-mono break-all flex-1">
                  {txDigest}
                </code>
                <Button variant="ghost" size="icon" onClick={copyTxHash}>
                  {copied ? (
                    <Check className="h-4 w-4 text-green" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Suiscan Link */}
            <a
              href={getSuiscanUrl(txDigest)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <Button variant="outline" className="w-full">
                <ExternalLink className="h-4 w-4 mr-2" />
                Xem trên Suiscan ({network})
              </Button>
            </a>

            <Badge variant="green" className="text-sm">
              <Leaf className="h-3 w-3 mr-1" />
              Cảm ơn bạn đã mua đồ tái sử dụng!
            </Badge>

            <Button variant="green" className="w-full mt-4" onClick={onConfirm}>
              Đóng
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Xác nhận mua hàng
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Product Info */}
          <div className="flex gap-4">
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-24 h-24 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h4 className="font-semibold">{product.title}</h4>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {product.description}
              </p>
              <Badge variant="outline" className="mt-2">
                {product.category}
              </Badge>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Giá sản phẩm</span>
              <span className="font-semibold text-sui">{product.price} SUI</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Phí nền tảng (2.5%)</span>
              <span className="text-sm">{(product.price * 0.025).toFixed(4)} SUI</span>
            </div>
            <div className="border-t border-border pt-2 flex justify-between">
              <span className="font-medium">Tổng thanh toán</span>
              <span className="font-bold text-sui">
                {(product.price * 1.025).toFixed(4)} SUI
              </span>
            </div>
          </div>

          {/* Green Credit Reward */}
          <div className="bg-green/10 border border-green/30 rounded-lg p-3 flex items-center gap-3">
            <Leaf className="h-8 w-8 text-green" />
            <div>
              <p className="font-semibold text-green">
                +{product.greenCredits} Green Credit
              </p>
              <p className="text-xs text-muted-foreground">
                Phần thưởng cho việc mua đồ tái sử dụng
              </p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive-foreground flex-shrink-0" />
              <p className="text-sm text-destructive-foreground">{error}</p>
            </div>
          )}

          {/* Wallet Check */}
          {!account ? (
            <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive-foreground" />
              <p className="text-sm text-destructive-foreground">
                Vui lòng kết nối ví Sui để mua hàng
              </p>
            </div>
          ) : (
            <Button
              variant="green"
              className="w-full"
              onClick={handlePurchase}
              disabled={isPurchasing}
            >
              {isPurchasing ? (
                <>
                  <div className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                  Đang ký giao dịch...
                </>
              ) : (
                <>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Thanh toán {(product.price * 1.025).toFixed(4)} SUI
                </>
              )}
            </Button>
          )}

          {/* Network Info */}
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Badge variant="sui" className="text-xs">
              {network || "testnet"}
            </Badge>
            <span>Giao dịch thực trên blockchain</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
