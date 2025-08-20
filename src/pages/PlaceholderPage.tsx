import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Construction, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

/**
 * PlaceholderPage - Generic placeholder for unimplemented pages
 * 
 * A reusable placeholder component for pages that are planned but not yet implemented.
 * Provides a consistent user experience with navigation back to the dashboard.
 * 
 * @component
 * @example
 * ```tsx
 * <PlaceholderPage 
 *   title="Appraisals"
 *   description="Vehicle appraisal management system"
 * />
 * ```
 * 
 * @param {PlaceholderPageProps} props - Component props
 * @param {string} props.title - Page title
 * @param {string} props.description - Page description
 * @param {React.ReactNode} [props.icon] - Optional icon
 * 
 * @returns {JSX.Element} Rendered placeholder page
 */
export function PlaceholderPage({ title, description, icon }: PlaceholderPageProps) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            {icon || <Construction className="h-12 w-12 text-muted-foreground" />}
          </div>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription className="text-base">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            This feature is currently under development and will be available soon.
          </p>
          <Button 
            onClick={() => navigate('/')}
            className="w-full"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
