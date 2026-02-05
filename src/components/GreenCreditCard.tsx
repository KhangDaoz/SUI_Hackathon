import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Badge } from "./ui/badge";
import { useCurrentAccount } from "@mysten/dapp-kit-react";
import { Leaf, TrendingUp, ShoppingBag, Recycle, Award } from "lucide-react";

interface GreenCreditCardProps {
  greenCredits: number;
  totalPurchases: number;
  totalListings: number;
}

export function GreenCreditCard({
  greenCredits,
  totalPurchases,
  totalListings,
}: GreenCreditCardProps) {
  const account = useCurrentAccount();

  const getLevel = (credits: number) => {
    if (credits >= 500) return { name: "🌳 Eco Champion", color: "text-green" };
    if (credits >= 200) return { name: "🌿 Green Hero", color: "text-green" };
    if (credits >= 100) return { name: "🌱 Eco Starter", color: "text-green" };
    return { name: "🌾 Newcomer", color: "text-muted-foreground" };
  };

  const level = getLevel(greenCredits);
  const nextLevel = greenCredits < 100 ? 100 : greenCredits < 200 ? 200 : greenCredits < 500 ? 500 : 1000;
  const progress = (greenCredits / nextLevel) * 100;

  if (!account) {
    return (
      <Card className="bg-gradient-to-br from-green/5 to-green/10 border-green/20">
        <CardContent className="flex flex-col items-center justify-center py-8">
          <Leaf className="h-12 w-12 text-green/50 mb-4" />
          <p className="text-muted-foreground text-center">
            Kết nối ví để xem Green Credit của bạn
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-green/5 to-green/10 border-green/20">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Leaf className="h-5 w-5 text-green" />
          Green Credit
        </CardTitle>
        <CardDescription>
          Thưởng cho hành vi tiêu dùng xanh
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Main Credit Display */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-4xl font-bold text-green">{greenCredits}</p>
            <p className="text-sm text-muted-foreground">Green Credits</p>
          </div>
          <Badge variant="green" className="text-sm">
            {level.name}
          </Badge>
        </div>

        {/* Progress to next level */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Tiến trình lên level</span>
            <span>{greenCredits}/{nextLevel}</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-green transition-all duration-500"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="bg-background/50 rounded-lg p-3 flex items-center gap-2">
            <ShoppingBag className="h-4 w-4 text-sui" />
            <div>
              <p className="text-lg font-semibold">{totalPurchases}</p>
              <p className="text-xs text-muted-foreground">Đã mua</p>
            </div>
          </div>
          <div className="bg-background/50 rounded-lg p-3 flex items-center gap-2">
            <Recycle className="h-4 w-4 text-green" />
            <div>
              <p className="text-lg font-semibold">{totalListings}</p>
              <p className="text-xs text-muted-foreground">Đã bán</p>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="border-t border-green/20 pt-3 space-y-2">
          <p className="text-xs font-medium text-green flex items-center gap-1">
            <Award className="h-3 w-3" />
            Quyền lợi của bạn:
          </p>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li className="flex items-center gap-2">
              <TrendingUp className="h-3 w-3" />
              Giảm {Math.min(Math.floor(greenCredits / 50), 10)}% phí giao dịch
            </li>
            <li className="flex items-center gap-2">
              <Leaf className="h-3 w-3" />
              Badge "{level.name}" trên profile
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
