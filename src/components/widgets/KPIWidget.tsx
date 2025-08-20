import { WidgetBase } from './WidgetBase';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus,
  DollarSign,
  Car,
  Users,
  Star,
  Target,
  Calculator,
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar,
  Package,
  TrendingUp as TrendingUpIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { KPIWidget as KPIWidgetType } from '@/types';

interface KPIWidgetProps {
  data: KPIWidgetType;
  className?: string;
}

const iconMap = {
  DollarSign,
  Car,
  Users,
  Star,
  Target,
  Calculator,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp: TrendingUpIcon,
  TrendingDown,
  Calendar,
  Package
};

/**
 * KPIWidget - Displays key performance indicators with trend analysis
 * 
 * A comprehensive widget component that shows important business metrics with
 * visual indicators for performance trends, change percentages, and target progress.
 * 
 * @component
 * @example
 * ```tsx
 * <KPIWidget 
 *   data={{
 *     id: 'revenue',
 *     title: 'Monthly Revenue',
 *     value: 50000,
 *     previousValue: 45000,
 *     change: 11.1,
 *     changeType: 'increase',
 *     format: 'currency',
 *     icon: 'DollarSign',
 *     color: 'green',
 *     target: 60000
 *   }}
 * />
 * ```
 * 
 * @param {KPIWidgetProps} props - Component props
 * @param {KPIWidgetType} props.data - KPI data object containing metrics and display options
 * @param {string} [props.className] - Additional CSS classes for styling
 * 
 * @returns {JSX.Element} Rendered KPI widget component
 */
export function KPIWidget({ data, className }: KPIWidgetProps) {
  const {
    title,
    value,
    previousValue,
    change,
    changeType,
    format,
    icon,
    color,
    target,
    unit
  } = data;

  /**
   * Formats the display value based on the specified format type
   * @param {number | string} val - The value to format
   * @returns {string} Formatted value string
   */
  const formatValue = (val: number | string) => {
    if (typeof val === 'string') return val;
    
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }).format(val);
      case 'percentage':
        return `${val}%`;
      case 'number':
        return new Intl.NumberFormat('en-US').format(val);
      default:
        return val.toString();
    }
  };

  /**
   * Returns the appropriate icon component for the change indicator
   * @returns {React.ComponentType} Icon component
   */
  const getChangeIcon = () => {
    if (!change) return Minus;
    if (changeType === 'increase') return TrendingUp;
    if (changeType === 'decrease') return TrendingDown;
    return Minus;
  };

  /**
   * Returns the CSS class for change indicator color
   * @returns {string} CSS class name
   */
  const getChangeColor = () => {
    if (!change) return 'text-muted-foreground';
    if (changeType === 'increase') return 'text-green-600';
    if (changeType === 'decrease') return 'text-red-600';
    return 'text-muted-foreground';
  };

  const Icon = icon ? iconMap[icon as keyof typeof iconMap] : null;
  const ChangeIcon = getChangeIcon();

  const colorClasses = {
    green: 'text-green-600 bg-green-50 border-green-200',
    blue: 'text-blue-600 bg-blue-50 border-blue-200',
    purple: 'text-purple-600 bg-purple-50 border-purple-200',
    orange: 'text-orange-600 bg-orange-50 border-orange-200',
    yellow: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    red: 'text-red-600 bg-red-50 border-red-200'
  };

  return (
    <WidgetBase title={title} className={className}>
      <div className="space-y-4">
        {/* Main Value */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold tracking-tight">
                {formatValue(value)}
              </span>
              {unit && (
                <span className="text-sm text-muted-foreground">{unit}</span>
              )}
            </div>
            
            {/* Change Indicator */}
            {change !== undefined && (
              <div className={cn("flex items-center space-x-1 text-sm", getChangeColor())}>
                <ChangeIcon className="h-3 w-3" />
                <span>
                  {Math.abs(change)}% from last period
                </span>
              </div>
            )}
          </div>

          {/* Icon */}
          {Icon && (
            <div className={cn(
              "flex h-12 w-12 items-center justify-center rounded-lg border",
              color ? colorClasses[color as keyof typeof colorClasses] : 'text-muted-foreground bg-muted border-border'
            )}>
              <Icon className="h-6 w-6" />
            </div>
          )}
        </div>

        {/* Target Progress */}
        {target && typeof value === 'number' && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Target</span>
              <span className="font-medium">{formatValue(target)}</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  value >= target ? "bg-green-500" : "bg-primary"
                )}
                style={{ width: `${Math.min((value / target) * 100, 100)}%` }}
              />
            </div>
            <div className="text-xs text-muted-foreground">
              {((value / target) * 100).toFixed(1)}% of target
            </div>
          </div>
        )}

        {/* Previous Value Comparison */}
        {previousValue !== undefined && (
          <div className="pt-2 border-t border-border">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Previous</span>
              <span>{formatValue(previousValue)}</span>
            </div>
          </div>
        )}
      </div>
    </WidgetBase>
  );
}

