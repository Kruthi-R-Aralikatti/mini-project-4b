
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import TransactionStats from "@/components/TransactionStats";
import TransactionTable from "@/components/TransactionTable";
import FraudDetectionChart from "@/components/FraudDetectionChart";
import AlertPanel from "@/components/AlertPanel";
import TransactionInput from "@/components/TransactionInput";
import { mockTransactions, mockDailyStats, aggregateStats as initialAggregateStats, Transaction } from "@/utils/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [aggregateStats, setAggregateStats] = useState(initialAggregateStats);

  // Simulate loading state for demonstration
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleNewTransaction = (amount: number) => {
    const newTransaction: Transaction = {
      id: `txn_${Math.random().toString(36).substring(2, 10)}`,
      amount,
      date: new Date().toISOString(),
      merchant: "Manual Entry",
      location: "Web Interface",
      status: "completed",
      type: "card",
      riskScore: amount > 1000 ? 85 : amount > 500 ? 65 : amount > 250 ? 45 : 25,
      flagged: amount > 1000,
      anomalyDetails: amount > 1000 ? ["Amount significantly higher than average"] : undefined
    };

    setTransactions(prev => [newTransaction, ...prev]);
    
    // Update aggregate stats
    setAggregateStats(prev => ({
      totalTransactions: prev.totalTransactions + 1,
      flaggedTransactions: prev.flaggedTransactions + (newTransaction.flagged ? 1 : 0),
      avgRiskScore: Math.round((prev.avgRiskScore * prev.totalTransactions + newTransaction.riskScore) / (prev.totalTransactions + 1)),
      totalAmount: prev.totalAmount + amount
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <ShieldCheck size={60} className="mx-auto text-trustshield-blue animate-pulse" />
            <h2 className="text-2xl font-bold mt-4 text-trustshield-blue">
              Loading TrustShield AI
            </h2>
            <p className="text-gray-600 mt-2">
              Analyzing transaction data for fraud patterns...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 container py-6 space-y-6">
        {/* Transaction Input */}
        <TransactionInput onNewTransaction={handleNewTransaction} />

        {/* Stats Overview */}
        <TransactionStats
          totalTransactions={aggregateStats.totalTransactions}
          flaggedTransactions={aggregateStats.flaggedTransactions}
          avgRiskScore={aggregateStats.avgRiskScore}
          totalAmount={aggregateStats.totalAmount}
        />

        {/* Main Content Area */}
        <Tabs defaultValue="dashboard" className="space-y-4">
          <TabsList>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="transactions">All Transactions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Transaction Chart - Takes up 2/3 of the space */}
              <div className="lg:col-span-2">
                <FraudDetectionChart data={mockDailyStats} />
              </div>
              
              {/* Alert Panel - Takes up 1/3 of the space */}
              <div>
                <AlertPanel transactions={mockTransactions} />
              </div>
            </div>
            
            {/* Recent transactions table */}
            <TransactionTable transactions={mockTransactions} />
            
            {/* AI Detection Info */}
            <Card className="bg-trustshield-blue text-white">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <ShieldCheck className="h-10 w-10 mt-1 text-white" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">How TrustShield AI Works</h3>
                    <p className="opacity-90 mb-4">
                      Our advanced AI system continuously monitors your transactions for unusual patterns and behaviors 
                      that may indicate fraudulent activity. The system analyzes multiple factors including:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 opacity-90">
                      <li>Location anomalies and unusual spending patterns</li>
                      <li>Transaction velocity and frequency analysis</li>
                      <li>Device fingerprinting and behavioral biometrics</li>
                      <li>Historical transaction data comparison</li>
                      <li>Machine learning models trained on billions of transactions</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="transactions">
            <TransactionTable transactions={mockTransactions} />
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-white py-4 border-t">
        <div className="container text-center text-sm text-gray-500">
          © {new Date().getFullYear()} TrustShield AI Fraud Detection | All data shown is simulated
        </div>
      </footer>
    </div>
  );
};

export default Index;
