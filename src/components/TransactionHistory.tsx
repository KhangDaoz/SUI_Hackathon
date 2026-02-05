import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { useCurrentAccount, useCurrentNetwork } from "@mysten/dapp-kit-react";
import { History, ExternalLink, ArrowUpRight } from "lucide-react";

export function TransactionHistory() {
  const account = useCurrentAccount();
  const network = useCurrentNetwork();

  const getSuiscanUrl = (address: string) => {
    const baseUrl = network === "mainnet"
      ? "https://suiscan.xyz/mainnet"
      : `https://suiscan.xyz/${network}`;
    return `${baseUrl}/account/${address}`;
  };

  if (!account) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <History className="h-4 w-4" />
          Lịch sử giao dịch
        </CardTitle>
        <CardDescription className="text-xs">
          Xem giao dịch trên {network}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
            <div className="bg-sui/20 p-1.5 rounded-full">
              <ArrowUpRight className="h-3 w-3 text-sui" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">
                Địa chỉ ví của bạn
              </p>
              <p className="font-mono text-xs truncate">
                {account.address.slice(0, 10)}...{account.address.slice(-8)}
              </p>
            </div>
          </div>
          
          <a
            href={getSuiscanUrl(account.address)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="sm" className="w-full">
              <ExternalLink className="h-3 w-3 mr-2" />
              Xem trên Suiscan
            </Button>
          </a>
          
          <p className="text-xs text-center text-muted-foreground">
            Sau khi mua hàng, giao dịch sẽ hiển thị trên Suiscan
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
