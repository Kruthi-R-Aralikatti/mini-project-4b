
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldAlert } from "lucide-react";
import { Transaction } from "@/utils/mockData";

interface AlertPanelProps {
  transactions: Transaction[];
}

const AlertPanel = ({ transactions }: AlertPanelProps) => {
  // Get only flagged transactions and sort by risk score (highest first)
  const flaggedTransactions = transactions
    .filter(t => t.flagged)
    .sort((a, b) => b.riskScore - a.riskScore)
    .slice(0, 5);

  return (
    <Card className="h-full">
      <CardHeader className="bg-red-50 border-b">
        <CardTitle className="text-lg flex items-center text-trustshield-red">
          <ShieldAlert className="mr-2 h-5 w-5" />
          High Risk Alerts
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 overflow-hidden">
        {flaggedTransactions.length === 0 ? (
          <div className="p-4 text-center text-gray-500">No high risk transactions detected</div>
        ) : (
          <ul className="divide-y">
            {flaggedTransactions.map((transaction) => (
              <li key={transaction.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium">{transaction.merchant}</div>
                    <div className="text-sm text-gray-600">{transaction.location}</div>
                    <div className="text-sm text-gray-600">
                      {new Date(transaction.date).toLocaleString()}
                    </div>
                    {transaction.anomalyDetails && (
                      <div className="mt-2">
                        <span className="text-xs font-semibold text-red-600">Anomalies detected:</span>
                        <ul className="mt-1 text-xs text-gray-600">
                          {transaction.anomalyDetails.map((anomaly, i) => (
                            <li key={i} className="flex items-center">
                              <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                              {anomaly}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-bold">${transaction.amount.toFixed(2)}</span>
                    <div className="mt-1 flex items-center">
                      <div className={`
                        h-6 w-12 rounded-full flex items-center justify-center text-xs font-bold text-white
                        ${
                          transaction.riskScore > 85 
                            ? 'bg-trustshield-red animate-pulse-alert' 
                            : 'bg-trustshield-yellow'
                        }
                      `}>
                        {transaction.riskScore}/100
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export default AlertPanel;
