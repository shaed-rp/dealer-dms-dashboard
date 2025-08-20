
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { WidgetBase } from '@/components/widgets/WidgetBase';

interface DepartmentPerformanceChartProps {
  title?: string;
  description?: string;
  className?: string;
}

// Data with exact values and calculated percentages
const departmentData = [
  { name: 'Sales', value: 1250000, color: '#3B82F6', percentage: 75.5 },
  { name: 'Service', value: 185000, color: '#10B981', percentage: 11.2 },
  { name: 'Parts', value: 95000, color: '#F59E0B', percentage: 5.7 },
  { name: 'F&I', value: 125000, color: '#8B5CF6', percentage: 7.6 }
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    
    return (
      <div className="bg-background/95 backdrop-blur-sm border border-border rounded-lg p-4 shadow-xl max-w-xs">
        <div className="flex items-center space-x-2 mb-2">
          <div 
            className="w-4 h-4 rounded-full flex-shrink-0" 
            style={{ backgroundColor: data.color }}
          />
          <p className="font-semibold text-foreground truncate">{data.name}</p>
        </div>
        <div className="space-y-1">
          <p className="text-lg font-bold text-foreground truncate">
            {formatCurrency(data.value)}
          </p>
          <p className="text-sm text-muted-foreground truncate">
            {data.percentage}% of total revenue
          </p>
        </div>
      </div>
    );
  }
  return null;
};

const CustomLegend = () => {
  return (
    <div className="mt-4 px-2">
      <div className="grid grid-cols-2 gap-2">
        {departmentData.map((item, index) => (
          <div key={index} className="flex items-center p-2 bg-muted/30 rounded-md hover:bg-muted/50 transition-colors">
            <div 
              className="w-3 h-3 rounded-full flex-shrink-0 mr-2" 
              style={{ backgroundColor: item.color }}
            />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-foreground truncate leading-tight">
                {item.name}
              </div>
              <div className="text-xs text-muted-foreground truncate leading-tight">
                {formatCurrency(item.value)}
              </div>
            </div>
            <div className="text-right ml-2 flex-shrink-0">
              <div className="text-xs font-bold text-foreground">
                {item.percentage}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * DepartmentPerformanceChart - Enhanced pie chart showing revenue distribution by department
 * 
 * A pie chart component that visualizes revenue distribution across different
 * departments (Sales, Service, Parts, F&I). Features custom tooltips with
 * percentage calculations, detailed legend with values, responsive design,
 * and improved visual hierarchy with distinct colors for each department.
 * All text is contained within box boundaries during hover effects.
 * 
 * @component
 * @example
 * ```tsx
 * <DepartmentPerformanceChart 
 *   title="Department Performance"
 *   description="Revenue distribution by department"
 *   className="col-span-1"
 * />
 * ```
 * 
 * @param {DepartmentPerformanceChartProps} props - Component props
 * @param {string} [props.title="Department Performance"] - Chart title
 * @param {string} [props.description="Revenue distribution by department"] - Chart description
 * @param {string} [props.className] - Additional CSS classes
 * 
 * @returns {JSX.Element} Rendered department performance chart component
 */
export function DepartmentPerformanceChart({ 
  title = "Department Performance", 
  description = "Revenue distribution by department", 
  className 
}: DepartmentPerformanceChartProps) {
  return (
    <WidgetBase title={title} description={description} className={className}>
      <div className="h-80 chart-container overflow-hidden">
        <ResponsiveContainer width="100%" height="55%">
          <PieChart>
            <defs>
              <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.1)"/>
              </filter>
            </defs>
            <Pie
              data={departmentData}
              cx="50%"
              cy="50%"
              innerRadius={45}
              outerRadius={85}
              paddingAngle={2}
              dataKey="value"
              animationDuration={1000}
              animationBegin={0}
            >
              {departmentData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  stroke="hsl(var(--background))"
                  strokeWidth={2}
                  filter="url(#shadow)"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <CustomLegend />
      </div>
    </WidgetBase>
  );
}

