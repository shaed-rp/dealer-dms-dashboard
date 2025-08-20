# TypeScript Guidelines for Dealership Dashboard

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/your-username/dealership-dashboard)

## Overview

**Current Version**: 1.0.0  
**Last Updated**: January 15, 2025
This document captures lessons learned from resolving 1,221 TypeScript errors and provides guidelines to prevent similar issues in the future.

## Error Categories Analysis

### 1. UI Component Type Definitions (60% of errors - ~732 errors)
**Root Cause:** Missing or incorrect TypeScript interfaces for React components, especially with third-party libraries like Radix UI.

#### Common Patterns Fixed:
- Missing `React.forwardRef` implementations
- Incorrect prop type definitions
- Missing `displayName` assignments
- Inconsistent interface naming

#### ❌ Wrong Way:
```tsx
function Button({ className, ...props }) {
  return <button className={cn("btn", className)} {...props} />;
}
```

#### ✅ Correct Way:
```tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
```

### 2. Third-Party Library Integration (20% of errors - ~244 errors)
**Root Cause:** Complex type discrimination needed for libraries with multiple modes (Radix UI, react-day-picker, etc.).

#### Discriminated Union Pattern:
```tsx
// ❌ Wrong: Single interface with union types
interface AccordionProps {
  type: "single" | "multiple";
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
}

// ✅ Correct: Discriminated unions
interface AccordionSingleProps {
  type: "single";
  value?: string;
  onValueChange?: (value: string) => void;
}

interface AccordionMultipleProps {
  type: "multiple";
  value?: string[];
  onValueChange?: (value: string[]) => void;
}

type AccordionProps = AccordionSingleProps | AccordionMultipleProps;

const Accordion: React.FC<AccordionProps> = ({ type, ...props }) => {
  if (type === "single") {
    const { type: _, ...singleProps } = props as AccordionSingleProps;
    return <AccordionPrimitive.Root type="single" {...singleProps} />;
  } else {
    const { type: _, ...multipleProps } = props as AccordionMultipleProps;
    return <AccordionPrimitive.Root type="multiple" {...multipleProps} />;
  }
};
```

### 3. Unused Imports and Variables (10% of errors - ~122 errors)
**Root Cause:** Leftover imports from refactoring and unused function parameters.

#### Prevention Rules:
```tsx
// ❌ Wrong: Unused imports
import React from 'react'; // Not needed if no JSX in direct scope
import { Clock } from 'lucide-react'; // Imported but never used

// ✅ Correct: Only import what you use
import { Package, Search, Truck } from 'lucide-react';

// ❌ Wrong: Unused parameters
const handleSort = (field: string, index: number) => {
  // index is never used
  setSortField(field);
};

// ✅ Correct: Use underscore prefix for unused parameters
const handleSort = (field: string, _index: number) => {
  setSortField(field);
};
```

### 4. Event Handler Types (5% of errors - ~61 errors)
**Root Cause:** Implicit `any` types for event handlers.

#### ❌ Wrong Way:
```tsx
const handleChange = (e) => { // Implicit any
  setValue(e.target.value);
};
```

#### ✅ Correct Way:
```tsx
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setValue(e.target.value);
};
```

### 5. Mock Data and Utility Functions (3% of errors - ~37 errors)
**Root Cause:** Private methods in classes and incorrect generic usage.

#### ❌ Wrong Way:
```tsx
class MockDataGenerator {
  private static getRandomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }
}

// Usage fails: Property 'getRandomElement' is private
MockDataGenerator.getRandomElement(['a', 'b', 'c']);
```

#### ✅ Correct Way:
```tsx
class MockDataGenerator {
  static getRandomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }
}
```

### 6. Type Indexing Issues (2% of errors - ~24 errors)
**Root Cause:** Missing index signatures for dynamic property access.

#### ❌ Wrong Way:
```tsx
interface Customer {
  name: string;
  email: string;
}

const sortCustomers = (customers: Customer[], field: string) => {
  return customers.sort((a, b) => a[field] > b[field] ? 1 : -1); // Error: can't index
};
```

#### ✅ Correct Way:
```tsx
interface Customer {
  name: string;
  email: string;
  [key: string]: any; // Index signature for dynamic access
}
```

## Type Definition Best Practices

### 1. Component Props Interfaces
```tsx
// Always extend appropriate HTML attributes
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

// Use React.forwardRef for components that need refs
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? <Spinner /> : children}
      </button>
    );
  }
);

Button.displayName = "Button";
```

### 2. Context Types
```tsx
interface SidebarContextValue {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
  toggleSidebar: () => void;
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}
```

### 3. Hook Return Types
```tsx
// Always explicitly type hook returns
function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);
  
  React.useEffect(() => {
    const mql = window.matchMedia("(max-width: 768px)");
    const onChange = () => setIsMobile(window.innerWidth < 768);
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < 768);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}
```

## Import/Export Patterns

### 1. Centralized Type Exports
```tsx
// src/types/index.ts
export type { Customer, Vehicle, Deal } from './api';
export type { DashboardConfig, WidgetConfig } from './dashboard';
export type { UserRole } from './auth';

// Usage in components
import type { Customer, UserRole } from '@/types';
```

### 2. Component Exports
```tsx
// Individual component files
export { Button } from './button';
export type { ButtonProps } from './button';

// Index file
export { Button, type ButtonProps } from './button';
export { Input, type InputProps } from './input';
```

### 3. Utility Exports
```tsx
// utils/index.ts
export { cn } from './cn';
export { formatCurrency } from './format';
export { MockDataGenerator } from './mockData';
```

## Critical Dependencies & Versions

### Required TypeScript Configuration
```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true
  }
}
```

### Key Dependencies
- `@types/react@^19.0.0` - React type definitions
- `@types/node@^20.0.0` - Node.js type definitions
- `typescript@^5.0.0` - TypeScript compiler
- `@radix-ui/react-*` - UI component primitives with proper types

## Build Configuration

### Vite Configuration
```js
// vite.config.js
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
```

### ESLint Configuration
```js
// eslint.config.js
import { fileURLToPath } from 'node:url';

export default [
  {
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
    }
  }
];
```

## Common Gotchas

### 1. Radix UI Component Typing
```tsx
// ❌ Wrong: Extending component props directly
interface AccordionProps extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root> {}

// ✅ Correct: Use discriminated unions for multi-mode components
type AccordionProps = AccordionSingleProps | AccordionMultipleProps;
```

### 2. Event Handler Typing
```tsx
// ❌ Wrong: Generic event type
const handleClick = (event: any) => {};

// ✅ Correct: Specific event type
const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {};
```

### 3. CSS-in-JS Styling
```tsx
// ❌ Wrong: Inline styles without typing
style={{ "--custom-prop": value }}

// ✅ Correct: Type assertion for CSS properties
style={{ "--custom-prop": value } as React.CSSProperties}
```

### 4. Conditional Prop Types
```tsx
// ❌ Wrong: Optional discriminator
interface Props {
  mode?: "single" | "multiple";
  value?: string | string[];
}

// ✅ Correct: Required discriminator with unions
type Props = SingleProps | MultipleProps;
```

## Performance Considerations

### 1. Type-Only Imports
```tsx
// Use type-only imports when possible
import type { FC } from 'react';
import type { ButtonProps } from './Button';

// Regular imports for runtime values
import { Button } from './Button';
```

### 2. Avoid Deep Type Computations
```tsx
// ❌ Avoid: Complex computed types
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// ✅ Prefer: Simple, explicit types
interface PartialConfig {
  theme?: string;
  variant?: string;
  // ... other optional properties
}
```

This documentation provides a foundation for maintaining TypeScript quality in the project and preventing the accumulation of type errors.
