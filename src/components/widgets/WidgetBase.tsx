import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, RefreshCw, Download, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WidgetBaseProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
  error?: string;
  onRefresh?: () => void;
  onExport?: () => void;
  onSettings?: () => void;
  actions?: React.ReactNode;
}

/**
 * WidgetBase - Foundation component for all dashboard widgets
 * 
 * A flexible base component that provides consistent styling, loading states,
 * error handling, and action menus for dashboard widgets. This component
 * serves as the foundation for all widget components in the dashboard.
 * 
 * @component
 * @example
 * ```tsx
 * <WidgetBase 
 *   title="Sales Metrics"
 *   description="Monthly sales performance"
 *   onRefresh={() => refetchData()}
 *   onExport={() => exportData()}
 * >
 *   <div>Widget content goes here</div>
 * </WidgetBase>
 * ```
 * 
 * @param {WidgetBaseProps} props - Component props
 * @param {string} props.title - Widget title displayed in the header
 * @param {string} [props.description] - Optional description text
 * @param {React.ReactNode} props.children - Widget content
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.isLoading] - Shows loading spinner when true
 * @param {string} [props.error] - Error message to display
 * @param {() => void} [props.onRefresh] - Refresh action callback
 * @param {() => void} [props.onExport] - Export action callback
 * @param {() => void} [props.onSettings] - Settings action callback
 * @param {React.ReactNode} [props.actions] - Custom action buttons
 * 
 * @returns {JSX.Element} Rendered widget base component
 */
export function WidgetBase({
  title,
  description,
  children,
  className,
  isLoading = false,
  error,
  onRefresh,
  onExport,
  onSettings,
  actions
}: WidgetBaseProps) {
  return (
    <Card className={cn("relative", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">{title}</CardTitle>
          {description && (
            <CardDescription className="text-sm">{description}</CardDescription>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {actions}
          
          {(onRefresh || onExport || onSettings) && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {onRefresh && (
                  <DropdownMenuItem onClick={onRefresh}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh
                  </DropdownMenuItem>
                )}
                {onExport && (
                  <DropdownMenuItem onClick={onExport}>
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </DropdownMenuItem>
                )}
                {onSettings && (
                  <DropdownMenuItem onClick={onSettings}>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        {isLoading ? (
          <div className="flex items-center justify-center h-32">
            <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-32 text-destructive">
            <p className="text-sm">{error}</p>
          </div>
        ) : (
          children
        )}
      </CardContent>
    </Card>
  );
}

