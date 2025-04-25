
export interface Transaction {
  id: string;
  amount: number;
  date: string;
  merchant: string;
  location: string;
  status: 'completed' | 'pending' | 'failed';
  riskScore: number; // 0-100, where 100 is highest risk
  type: 'card' | 'transfer' | 'withdrawal';
  cardLast4?: string;
  flagged: boolean;
  anomalyDetails?: string[];
}

export interface DailyStats {
  date: string;
  transactions: number;
  fraudulent: number;
}

// Generate random transactions
const generateRandomTransactions = (count: number): Transaction[] => {
  const merchants = ['Amazon', 'Walmart', 'Target', 'Best Buy', 'Apple Store', 'Netflix', 'Uber', 'Starbucks', 'Unknown Merchant'];
  const locations = ['New York, US', 'London, UK', 'San Francisco, US', 'Tokyo, JP', 'Moscow, RU', 'Lagos, NG', 'Mumbai, IN'];
  const types: ('card' | 'transfer' | 'withdrawal')[] = ['card', 'transfer', 'withdrawal'];
  const anomalies = [
    'Unusual location',
    'Amount significantly higher than average',
    'Multiple transactions in short timeframe',
    'First international transaction',
    'New merchant category',
    'Irregular time of day',
    'Multiple declined attempts',
    'New device used',
    'Velocity check failed'
  ];

  const transactions: Transaction[] = [];

  for (let i = 0; i < count; i++) {
    // Determine if this will be a flagged transaction (roughly 15% chance)
    const isFlagged = Math.random() < 0.15;
    
    // Higher risk score for flagged transactions
    const riskScore = isFlagged
      ? Math.floor(Math.random() * 30) + 70 // 70-100 for flagged
      : Math.floor(Math.random() * 65); // 0-65 for not flagged

    // Select random anomaly details for flagged transactions
    const anomalyDetails = isFlagged
      ? Array(Math.floor(Math.random() * 3) + 1)
          .fill(null)
          .map(() => anomalies[Math.floor(Math.random() * anomalies.length)])
          .filter((value, index, self) => self.indexOf(value) === index) // Remove duplicates
      : [];

    // Generate transaction date within last 14 days
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 14));
    
    const transaction: Transaction = {
      id: `txn_${Math.random().toString(36).substring(2, 10)}`,
      amount: parseFloat((Math.random() * 990 + 10).toFixed(2)), // Amount between $10 and $1000
      date: date.toISOString(),
      merchant: merchants[Math.floor(Math.random() * merchants.length)],
      location: locations[Math.floor(Math.random() * locations.length)],
      status: Math.random() > 0.1 ? 'completed' : (Math.random() > 0.5 ? 'pending' : 'failed'),
      riskScore,
      type: types[Math.floor(Math.random() * types.length)],
      cardLast4: Math.floor(Math.random() * 10000).toString().padStart(4, '0'),
      flagged: isFlagged,
      anomalyDetails: anomalyDetails.length > 0 ? anomalyDetails : undefined
    };

    transactions.push(transaction);
  }

  // Sort by date, newest first
  return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// Generate daily stats for chart
const generateDailyStats = (): DailyStats[] => {
  const stats: DailyStats[] = [];
  const today = new Date();
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    
    const transactions = Math.floor(Math.random() * 100) + 50; // 50-150 transactions per day
    const fraudulent = Math.floor(Math.random() * Math.min(15, transactions * 0.2)); // 0-15 fraudulent or max 20%
    
    stats.push({
      date: date.toISOString().split('T')[0],
      transactions,
      fraudulent
    });
  }
  
  return stats;
};

export const mockTransactions = generateRandomTransactions(50);
export const mockDailyStats = generateDailyStats();

// Aggregate stats
export const aggregateStats = {
  totalTransactions: mockTransactions.length,
  flaggedTransactions: mockTransactions.filter(t => t.flagged).length,
  avgRiskScore: Math.round(mockTransactions.reduce((sum, t) => sum + t.riskScore, 0) / mockTransactions.length),
  totalAmount: Math.round(mockTransactions.reduce((sum, t) => sum + t.amount, 0))
};
