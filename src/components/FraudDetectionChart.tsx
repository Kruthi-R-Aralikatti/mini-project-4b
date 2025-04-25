
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  TooltipProps
} from "recharts";
import { DailyStats } from "@/utils/mockData";

interface FraudDetectionChartProps {
  data: DailyStats[];
}

interface CustomTooltipProps extends TooltipProps<number, string> {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-md">
        <p className="font-medium">{label}</p>
        <p className="text-sm">
          Total: <span className="text-blue-600 font-medium">{payload[0].value}</span>
        </p>
        <p className="text-sm">
          Flagged: <span className="text-red-500 font-medium">{payload[1].value}</span> 
          {payload[0].value > 0 && (
            <span className="text-gray-500 text-xs ml-1">
              ({((payload[1].value / payload[0].value) * 100).toFixed(1)}%)
            </span>
          )}
        </p>
      </div>
    );
  }
  return null;
};

const FraudDetectionChart = ({ data }: FraudDetectionChartProps) => {
  // Process data to show only every 5th date label to avoid crowding
  const processedData = data.map((item, index) => ({
    ...item,
    displayDate: index % 5 === 0 ? new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Transaction Activity & Fraud Detection</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={processedData}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="displayDate" 
                tick={{ fontSize: 12 }}
                axisLine={false}
                padding={{ left: 10, right: 10 }}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                name="Total Transactions"
                dataKey="transactions" 
                stroke="#0A2463" 
                strokeWidth={2}
                dot={{ r: 0 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                name="Fraudulent Transactions"
                dataKey="fraudulent" 
                stroke="#D9534F" 
                strokeWidth={2}
                dot={{ r: 0 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default FraudDetectionChart;
