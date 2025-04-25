
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Database, ShieldAlert, DollarSign } from "lucide-react";

interface TransactionStatsProps {
  totalTransactions: number;
  flaggedTransactions: number;
  avgRiskScore: number;
  totalAmount: number;
}

const TransactionStats = ({ 
  totalTransactions, 
  flaggedTransactions, 
  avgRiskScore, 
  totalAmount 
}: TransactionStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="card-hover">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
            <Database className="mr-2 h-4 w-4 text-trustshield-blue" />
            Total Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalTransactions.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
        </CardContent>
      </Card>
      
      <Card className="card-hover">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
            <ShieldAlert className="mr-2 h-4 w-4 text-trustshield-red" />
            Flagged Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{flaggedTransactions.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {((flaggedTransactions / totalTransactions) * 100).toFixed(1)}% of total
          </p>
        </CardContent>
      </Card>
      
      <Card className="card-hover">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
            <ShieldCheck className="mr-2 h-4 w-4 text-trustshield-blue" />
            Avg. Risk Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{avgRiskScore}/100</div>
          <div 
            className={`w-full h-2 rounded-full mt-2 bg-gray-200 overflow-hidden`}
          >
            <div 
              className={`h-full rounded-full ${
                avgRiskScore > 70 
                  ? 'bg-trustshield-red' 
                  : avgRiskScore > 40 
                    ? 'bg-trustshield-yellow' 
                    : 'bg-trustshield-green'
              }`}
              style={{ width: `${avgRiskScore}%` }}
            />
          </div>
        </CardContent>
      </Card>
      
      <Card className="card-hover">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
            <DollarSign className="mr-2 h-4 w-4 text-trustshield-green" />
            Total Volume
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalAmount.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground mt-1">Processed amount</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionStats;
