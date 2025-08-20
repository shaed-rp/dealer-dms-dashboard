
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { WidgetBase } from '@/components/widgets/WidgetBase';

interface ServiceEfficiencyChartProps {
  title?: string;
  description?: string;
  className?: string;
}

const efficiencyData = [
  { day: 'Mon', efficiency: 95, hoursWorked: 8.2, hoursBilled: 7.8 },
  { day: 'Tue', efficiency: 108, hoursWorked: 8.5, hoursBilled: 9.2 },
  { day: 'Wed', efficiency: 112, hoursWorked: 8.0, hoursBilled: 9.0 },
  { day: 'Thu', efficiency: 98, hoursWorked: 8.3, hoursBilled: 8.1 },
  { day: 'Fri', efficiency: 115, hoursWorked: 8.1, hoursBilled: 9.3 },
  { day: 'Sat', efficiency: 105, hoursWorked: 6.0, hoursBilled: 6.3 }
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const isOverTarget = data.efficiency > 100;
    
    return (
      <div className="bg-background/95 backdrop-blur-sm border border-border rounded-lg p-4 shadow-xl max-w-xs">
        <p className="font-semibold text-foreground mb-3 truncate">{label}</p>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Efficiency:</span>
            <span className={`text-sm font-bold flex-shrink-0 ml-2 ${isOverTarget ? 'text-green-600' : 'text-orange-600'}`}>
              {data.efficiency}%
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Hours Worked:</span>
            <span className="text-sm font-semibold text-foreground truncate ml-2">
              {data.hoursWorked}h
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Hours Billed:</span>
            <span className="text-sm font-semibold text-foreground truncate ml-2">
              {data.hoursBilled}h
            </span>
          </div>
          <div className="border-t border-border pt-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Target:</span>
              <span className="text-sm font-semibold text-foreground flex-shrink-0 ml-2">100%</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

/**
 * ServiceEfficiencyChart - Enhanced area chart showing daily technician efficiency trends
 * 
 * An area chart component that visualizes daily technician efficiency metrics
 * including efficiency percentages, hours worked vs billed, and target benchmarks.
 * Features gradient fills, target line indicators, detailed tooltips, and smooth
 * animations with improved visual design and distinct colors for efficiency and target.
 * 
 * @component
 * @example
 * ```tsx
 * <ServiceEfficiencyChart 
 *   title="Service Efficiency Trend"
 *   description="Daily technician efficiency over the week"
 *   className="col-span-2"
 * />
 * ```
 * 
 * @param {ServiceEfficiencyChartProps} props - Component props
 * @param {string} [props.title="Service Efficiency Trend"] - Chart title
 * @param {string} [props.description="Daily technician efficiency over the week"] - Chart description
 * @param {string} [props.className] - Additional CSS classes
 * 
 * @returns {JSX.Element} Rendered service efficiency chart component
 */
export function ServiceEfficiencyChart({ 
  title = "Service Efficiency Trend", 
  description = "Daily technician efficiency over the week", 
  className 
}: ServiceEfficiencyChartProps) {
  return (
    <WidgetBase title={title} description={description} className={className}>
      <div className="h-80 chart-container overflow-hidden">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={efficiencyData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <defs>
              <linearGradient id="efficiencyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="targetGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-3))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--chart-3))" stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted/50" />
            <XAxis 
              dataKey="day" 
              className="text-muted-foreground"
              fontSize={12}
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              className="text-muted-foreground"
              fontSize={12}
              domain={[80, 120]}
              tickFormatter={(value) => `${value}%`}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            {/* Target line at 100% */}
            <ReferenceLine 
              y={100} 
              stroke="hsl(var(--chart-3))" 
              strokeWidth={2} 
              strokeDasharray="5 5"
              label={{ 
                value: "Target (100%)", 
                position: "insideTopRight",
                fill: "hsl(var(--chart-3))",
                fontSize: 11,
                fontWeight: "bold"
              }}
            />
            <Area
              type="monotone"
              dataKey="efficiency"
              stroke="hsl(var(--chart-1))"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#efficiencyGradient)"
              animationDuration={1000}
              animationBegin={0}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </WidgetBase>
  );
}

