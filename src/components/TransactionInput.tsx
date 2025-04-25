import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { DollarSign, IndianRupee } from "lucide-react";
import RiskMeter from "./RiskMeter";

interface TransactionInputProps {
  onNewTransaction: (amount: number) => void;
}

const TransactionInput = ({ onNewTransaction }: TransactionInputProps) => {
  const [amount, setAmount] = useState("");
  const [calculatedRisk, setCalculatedRisk] = useState<number | null>(null);
  const { toast } = useToast();

  const calculateRiskScore = (amount: number): number => {
    // Simple risk calculation based on amount
    if (amount > 1000) return 85;
    if (amount > 500) return 65;
    if (amount > 250) return 45;
    return 25;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount) / 83; // Convert INR to USD for internal processing
    
    if (isNaN(numAmount) || numAmount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount greater than 0",
        variant: "destructive"
      });
      return;
    }

    const riskScore = calculateRiskScore(numAmount);
    setCalculatedRisk(riskScore);
    
    // Display risk assessment message
    if (riskScore > 70) {
      toast({
        title: "High Risk Transaction",
        description: "This transaction has been flagged for review",
        variant: "destructive"
      });
    } else if (riskScore > 40) {
      toast({
        title: "Medium Risk Transaction",
        description: "Transaction will be monitored",
        variant: "default"
      });
    } else {
      toast({
        title: "Low Risk Transaction",
        description: "Transaction appears safe",
        variant: "default"
      });
    }

    // Pass the transaction to parent component
    onNewTransaction(numAmount);
    setAmount("");
    setTimeout(() => setCalculatedRisk(null), 3000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <IndianRupee className="h-5 w-5" />
          New Transaction
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount in ₹"
                className="w-full"
                step="0.01"
                min="0"
              />
            </div>
            <Button type="submit">
              Analyze Risk
            </Button>
          </div>
          
          {calculatedRisk !== null && (
            <div className="mt-4">
              <RiskMeter score={calculatedRisk} size="md" />
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default TransactionInput;
