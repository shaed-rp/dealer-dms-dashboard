
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, LabelList } from 'recharts';
import { WidgetBase } from '@/components/widgets/WidgetBase';

interface SalesPerformanceChartProps {
  title?: string;
  description?: string;
  className?: string;
}

const salesData = [
  { name: 'Mike Johnson', deals: 18, revenue: 785000, target: 800000 },
  { name: 'Sarah Davis', deals: 15, revenue: 650000, target: 700000 },
  { name: 'Tom Wilson', deals: 22, revenue: 920000, target: 850000 },
  { name: 'Lisa Chen', deals: 12, revenue: 520000, target: 600000 },
  { name: 'David Brown', deals: 16, revenue: 680000, target: 750000 },
  { name: 'Emily Garcia', deals: 20, revenue: 850000, target: 800000 }
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

const formatCurrencyShort = (value: number) => {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(0)}M`;
  } else if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}k`;
  }
  return formatCurrency(value);
};

// Custom bar component to handle conditional colors
const CustomBar = (props: any) => {
  const { x, y, width, height, payload, dataKey } = props;
  const data = payload;
  
  let fillColor = '#3B82F6'; // Default blue for actual performance
  
  if (dataKey === 'target') {
    fillColor = '#94A3B8'; // Slate blue-gray for targets
  } else if (dataKey === 'revenue') {
    // Check if actual exceeds target
    if (data.revenue > data.target) {
      fillColor = '#10B981'; // Green for exceeding target
    } else {
      fillColor = '#3B82F6'; // Blue for below target
    }
  }
  
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill={fillColor}
      rx={6}
      ry={6}
    />
  );
};

// Custom label component for value labels above bars
const CustomLabel = (props: any) => {
  const { x, y, width, value, dataKey } = props;
  
  if (dataKey === 'revenue') {
    return (
      <text
        x={x + width / 2}
        y={y - 8}
        textAnchor="middle"
        fill="#374151"
        fontSize={11}
        fontWeight={500}
      >
        {formatCurrencyShort(value)}
      </text>
    );
  }
  
  return null;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const achievement = ((data.revenue / data.target) * 100).toFixed(1);
    const isOverTarget = data.revenue > data.target;
    
    return (
      <div className="bg-background/95 backdrop-blur-sm border border-border rounded-lg p-4 shadow-xl max-w-xs">
        <p className="font-semibold text-foreground mb-3 truncate">{label}</p>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Revenue:</span>
            <span className="text-sm font-semibold text-foreground truncate ml-2">
              {formatCurrency(data.revenue)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Target:</span>
            <span className="text-sm font-semibold text-foreground truncate ml-2">
              {formatCurrency(data.target)}
            </span>
          </div>
          <div className="border-t border-border pt-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">Achievement:</span>
              <span className={`text-sm font-bold flex-shrink-0 ml-2 ${isOverTarget ? 'text-green-600' : 'text-orange-600'}`}>
                {achievement}%
              </span>
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-sm text-muted-foreground">Deals:</span>
              <span className="text-sm font-semibold text-foreground flex-shrink-0 ml-2">{data.deals}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

// Custom Legend Component
const CustomLegend = () => {
  return (
    <div className="flex items-center justify-center space-x-6 mt-4 text-sm">
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: '#3B82F6' }}></div>
        <span className="text-muted-foreground">Actual</span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: '#94A3B8' }}></div>
        <span className="text-muted-foreground">Target</span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: '#10B981' }}></div>
        <span className="text-muted-foreground">Exceeds Target</span>
      </div>
    </div>
  );
};

/**
 * SalesPerformanceChart - Enhanced bar chart comparing salesperson performance vs targets
 * 
 * A bar chart component that visualizes individual salesperson performance
 * against their targets. Shows revenue achievement, deal counts, and target
 * comparison with detailed tooltips, achievement percentages, and improved
 * visual indicators with distinct colors for revenue and target bars.
 * 
 * @component
 * @example
 * ```tsx
 * <SalesPerformanceChart 
 *   title="Sales Team Performance"
 *   description="Individual salesperson performance vs targets"
 *   className="col-span-2"
 * />
 * ```
 * 
 * @param {SalesPerformanceChartProps} props - Component props
 * @param {string} [props.title="Sales Team Performance"] - Chart title
 * @param {string} [props.description="Individual salesperson performance vs targets"] - Chart description
 * @param {string} [props.className] - Additional CSS classes
 * 
 * @returns {JSX.Element} Rendered sales performance chart component
 */
export function SalesPerformanceChart({ 
  title = "Sales Team Performance", 
  description = "Individual salesperson performance vs targets", 
  className 
}: SalesPerformanceChartProps) {
  return (
    <WidgetBase title={title} description={description} className={className}>
      <div className="h-80 chart-container overflow-hidden">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={salesData} 
            margin={{ top: 30, right: 30, left: 20, bottom: 60 }}
            barGap={0}
            barCategoryGap="20%"
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#E5E7EB" 
              horizontal={true}
              vertical={false}
            />
            <XAxis 
              dataKey="name" 
              className="text-muted-foreground"
              fontSize={11}
              angle={-45}
              textAnchor="end"
              height={80}
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              className="text-muted-foreground"
              fontSize={12}
              tickFormatter={formatCurrency}
              axisLine={false}
              tickLine={false}
              ticks={[0, 250000, 500000, 750000, 1000000]}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={0} stroke="#E5E7EB" strokeDasharray="3 3" />
            <Bar 
              dataKey="revenue" 
              name="Revenue"
              radius={[6, 6, 0, 0]}
              animationDuration={1000}
              animationBegin={0}
              shape={<CustomBar />}
            >
              <LabelList dataKey="revenue" content={<CustomLabel />} />
            </Bar>
            <Bar 
              dataKey="target" 
              name="Target"
              radius={[6, 6, 0, 0]}
              animationDuration={1000}
              animationBegin={200}
              shape={<CustomBar />}
            />
          </BarChart>
        </ResponsiveContainer>
        <CustomLegend />
      </div>
    </WidgetBase>
  );
}

