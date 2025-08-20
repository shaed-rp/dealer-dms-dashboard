
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Legend } from 'recharts';
import { WidgetBase } from '@/components/widgets/WidgetBase';

interface RevenueChartProps {
  title?: string;
  description?: string;
  className?: string;
}

const revenueData = [
  { month: 'Jul', sales: 1250000, service: 185000, parts: 95000 },
  { month: 'Aug', sales: 1180000, service: 192000, parts: 88000 },
  { month: 'Sep', sales: 1320000, service: 178000, parts: 102000 },
  { month: 'Oct', sales: 1450000, service: 205000, parts: 115000 },
  { month: 'Nov', sales: 1380000, service: 198000, parts: 108000 },
  { month: 'Dec', sales: 1520000, service: 220000, parts: 125000 },
  { month: 'Jan', sales: 1250000, service: 185000, parts: 95000 }
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const total = payload.reduce((sum: number, p: any) => sum + p.value, 0);
    
    return (
      <div className="bg-background/95 backdrop-blur-sm border border-border rounded-lg p-4 shadow-xl max-w-xs">
        <p className="font-semibold text-foreground mb-2 truncate">{label}</p>
        <div className="space-y-2">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2 min-w-0 flex-1">
                <div 
                  className="w-3 h-3 rounded-full flex-shrink-0" 
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-sm font-medium text-foreground truncate">{entry.name}</span>
              </div>
              <span className="text-sm font-semibold text-foreground flex-shrink-0 ml-2">
                {formatCurrency(entry.value)}
              </span>
            </div>
          ))}
          <div className="border-t border-border pt-2 mt-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">Total</span>
              <span className="text-sm font-bold text-primary">{formatCurrency(total)}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }: any) => {
  return (
    <div className="flex justify-center space-x-6 mt-4 overflow-hidden">
      {payload.map((entry: any, index: number) => (
        <div key={index} className="flex items-center space-x-2 flex-shrink-0">
          <div 
            className="w-3 h-3 rounded-full flex-shrink-0" 
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm font-medium text-muted-foreground truncate">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

/**
 * RevenueChart - Enhanced line chart displaying revenue trends by department
 * 
 * A comprehensive line chart component that visualizes monthly revenue trends
 * across different departments (Sales, Service, Parts). Features interactive
 * tooltips, responsive design, trend indicators, smooth animations, and
 * a clear legend for better data interpretation.
 * 
 * @component
 * @example
 * ```tsx
 * <RevenueChart 
 *   title="Revenue Trend"
 *   description="Monthly revenue by department"
 *   className="col-span-2"
 * />
 * ```
 * 
 * @param {RevenueChartProps} props - Component props
 * @param {string} [props.title="Revenue Trend"] - Chart title
 * @param {string} [props.description="Monthly revenue by department"] - Chart description
 * @param {string} [props.className] - Additional CSS classes
 * 
 * @returns {JSX.Element} Rendered revenue chart component
 */
export function RevenueChart({ title = "Revenue Trend", description = "Monthly revenue by department", className }: RevenueChartProps) {
  return (
    <WidgetBase title={title} description={description} className={className}>
      <div className="h-80 chart-container overflow-hidden">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <defs>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.05}/>
              </linearGradient>
              <linearGradient id="serviceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0.05}/>
              </linearGradient>
              <linearGradient id="partsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              className="stroke-muted/30" 
              horizontal={true}
              vertical={false}
            />
            <XAxis 
              dataKey="month" 
              className="text-muted-foreground"
              fontSize={12}
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              className="text-muted-foreground"
              fontSize={12}
              tickFormatter={formatCurrency}
              axisLine={false}
              tickLine={false}
              domain={[0, 1600000]}
              ticks={[0, 400000, 800000, 1200000, 1600000]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
            <ReferenceLine y={0} stroke="hsl(var(--border))" strokeDasharray="3 3" />
            <Line 
              type="monotone" 
              dataKey="sales" 
              stroke="#3B82F6" 
              strokeWidth={3}
              name="Sales"
              dot={{ 
                fill: '#3B82F6', 
                strokeWidth: 2, 
                r: 5,
                stroke: 'hsl(var(--background))'
              }}
              activeDot={{ 
                r: 8, 
                stroke: '#3B82F6', 
                strokeWidth: 2,
                fill: 'hsl(var(--background))'
              }}
              animationDuration={1000}
              animationBegin={0}
            />
            <Line 
              type="monotone" 
              dataKey="service" 
              stroke="#10B981" 
              strokeWidth={3}
              name="Service"
              dot={{ 
                fill: '#10B981', 
                strokeWidth: 2, 
                r: 5,
                stroke: 'hsl(var(--background))'
              }}
              activeDot={{ 
                r: 8, 
                stroke: '#10B981', 
                strokeWidth: 2,
                fill: 'hsl(var(--background))'
              }}
              animationDuration={1000}
              animationBegin={200}
            />
            <Line 
              type="monotone" 
              dataKey="parts" 
              stroke="#F59E0B" 
              strokeWidth={3}
              name="Parts"
              dot={{ 
                fill: '#F59E0B', 
                strokeWidth: 2, 
                r: 5,
                stroke: 'hsl(var(--background))'
              }}
              activeDot={{ 
                r: 8, 
                stroke: '#F59E0B', 
                strokeWidth: 2,
                fill: 'hsl(var(--background))'
              }}
              animationDuration={1000}
              animationBegin={400}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </WidgetBase>
  );
}

