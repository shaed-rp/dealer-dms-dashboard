import React from 'react';
import { cn } from '@/lib/utils';

interface WidgetGridProps {
  children: React.ReactNode;
  className?: string;
  columns?: 1 | 2 | 3 | 4 | 5;
}

/**
 * WidgetGrid - Responsive grid layout for dashboard widgets
 * 
 * A flexible grid component that arranges widgets in a responsive layout.
 * Automatically adjusts column count based on screen size and specified columns.
 * 
 * @component
 * @example
 * ```tsx
 * <WidgetGrid columns={4}>
 *   <KPIWidget data={kpi1} />
 *   <KPIWidget data={kpi2} />
 *   <KPIWidget data={kpi3} />
 *   <KPIWidget data={kpi4} />
 * </WidgetGrid>
 * ```
 * 
 * @param {WidgetGridProps} props - Component props
 * @param {React.ReactNode} props.children - Widget components to display
 * @param {string} [props.className] - Additional CSS classes
 * @param {1|2|3|4|5} [props.columns=4] - Maximum number of columns on large screens
 * 
 * @returns {JSX.Element} Rendered grid layout
 */
export function WidgetGrid({ children, className, columns = 4 }: WidgetGridProps) {
  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 lg:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'
  };

  return (
    <div className={cn(
      "grid gap-6",
      gridClasses[columns],
      className
    )}>
      {children}
    </div>
  );
}

interface WidgetRowProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * WidgetRow - Container for organizing widget sections vertically
 * 
 * A simple container component that stacks widget grids or sections
 * vertically with consistent spacing.
 * 
 * @component
 * @example
 * ```tsx
 * <WidgetRow>
 *   <WidgetGrid columns={2}>
 *     <ChartWidget />
 *     <TableWidget />
 *   </WidgetGrid>
 *   <WidgetGrid columns={4}>
 *     <KPIWidget data={kpi1} />
 *     <KPIWidget data={kpi2} />
 *     <KPIWidget data={kpi3} />
 *     <KPIWidget data={kpi4} />
 *   </WidgetGrid>
 * </WidgetRow>
 * ```
 * 
 * @param {WidgetRowProps} props - Component props
 * @param {React.ReactNode} props.children - Widget sections to stack
 * @param {string} [props.className] - Additional CSS classes
 * 
 * @returns {JSX.Element} Rendered row container
 */
export function WidgetRow({ children, className }: WidgetRowProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {children}
    </div>
  );
}

interface WidgetSectionProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * WidgetSection - Section container with optional title and description
 * 
 * A section component that groups related widgets together with
 * an optional title and description for better organization.
 * 
 * @component
 * @example
 * ```tsx
 * <WidgetSection 
 *   title="Key Performance Indicators"
 *   description="Monthly performance metrics"
 * >
 *   <WidgetGrid columns={4}>
 *     <KPIWidget data={kpi1} />
 *     <KPIWidget data={kpi2} />
 *     <KPIWidget data={kpi3} />
 *     <KPIWidget data={kpi4} />
 *   </WidgetGrid>
 * </WidgetSection>
 * ```
 * 
 * @param {WidgetSectionProps} props - Component props
 * @param {string} [props.title] - Section title
 * @param {string} [props.description] - Section description
 * @param {React.ReactNode} props.children - Widget content
 * @param {string} [props.className] - Additional CSS classes
 * 
 * @returns {JSX.Element} Rendered section container
 */
export function WidgetSection({ title, description, children, className }: WidgetSectionProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {(title || description) && (
        <div className="space-y-1">
          {title && (
            <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          )}
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </div>
      )}
      {children}
    </div>
  );
}

