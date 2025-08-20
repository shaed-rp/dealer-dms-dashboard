# TypeScript Error Prevention Checklist

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/your-username/dealership-dashboard)

**Current Version**: 1.0.0  
**Last Updated**: January 15, 2025

## Pre-Commit Checklist

### ✅ Before Every Commit
- [ ] Run `npx tsc --noEmit --skipLibCheck` and ensure 0 errors
- [ ] Run `npm run lint` and fix all TypeScript-related warnings
- [ ] Check that all new components have proper TypeScript interfaces
- [ ] Verify all event handlers are properly typed
- [ ] Ensure no unused imports remain (check ESLint warnings)
- [ ] Confirm all `React.forwardRef` components have `displayName`

### ✅ When Adding New UI Components
- [ ] Create interface extending appropriate HTML attributes
- [ ] Use `React.forwardRef` if component needs ref forwarding
- [ ] Add `displayName` for better debugging
- [ ] Export both component and its props interface
- [ ] Test component with different prop combinations

### ✅ When Integrating Third-Party Libraries
- [ ] Check if library has built-in TypeScript support
- [ ] Install corresponding `@types/` package if needed
- [ ] Create discriminated unions for multi-mode components
- [ ] Test all component modes/variants
- [ ] Document any custom type definitions needed

### ✅ When Modifying Mock Data or Utilities
- [ ] Ensure class methods are public if used externally
- [ ] Add proper generic type constraints
- [ ] Test with different data types
- [ ] Update interfaces if data structure changes

## Warning Signs of Cascade Errors

### 🚨 Red Flags That Indicate Potential Problems

#### 1. Import/Export Issues
```bash
# Warning signs in terminal:
Module '"./types"' has no exported member 'SomeType'
Cannot find module '@/components/ui/button'
```
**Action:** Check path aliases and export statements immediately.

#### 2. Component Prop Errors
```bash
# Warning signs:
Property 'someProps' does not exist on type 'IntrinsicAttributes'
Type '{ children: ReactNode; }' is not assignable to type 'SomeProps'
```
**Action:** Review component interfaces and prop definitions.

#### 3. Event Handler Errors
```bash
# Warning signs:
Parameter 'e' implicitly has an 'any' type
Argument of type 'Event' is not assignable to parameter of type 'MouseEvent'
```
**Action:** Add explicit event handler types immediately.

#### 4. Third-Party Library Errors
```bash
# Warning signs:
An interface can only extend an object type or intersection of object types
Property 'mode' does not exist on type '{}'
```
**Action:** Implement discriminated unions or custom interfaces.

## Testing TypeScript Changes

### 1. Incremental Verification
```bash
# Test specific files
npx tsc --noEmit src/components/ui/button.tsx

# Test specific directories  
npx tsc --noEmit src/components/**/*.tsx

# Full project check
npx tsc --noEmit --skipLibCheck
```

### 2. Component Testing Checklist
```tsx
// Test all prop combinations
<Button variant="default" size="sm">Default Small</Button>
<Button variant="outline" size="lg">Outline Large</Button>
<Button disabled>Disabled</Button>

// Test ref forwarding
const buttonRef = useRef<HTMLButtonElement>(null);
<Button ref={buttonRef}>With Ref</Button>

// Test event handlers
<Button onClick={(e: React.MouseEvent<HTMLButtonElement>) => {}}>
  With Handler
</Button>
```

### 3. Integration Testing
```tsx
// Test with form libraries
import { useForm } from 'react-hook-form';

// Test with routing
import { Link } from 'react-router-dom';

// Test with state management
import { useContext } from 'react';
```

## Quick Wins

### VS Code Settings
Add to `.vscode/settings.json`:
```json
{
  "typescript.preferences.noSemicolons": "off",
  "typescript.preferences.quoteStyle": "double",
  "typescript.suggest.autoImports": true,
  "typescript.updateImportsOnFileMove.enabled": "always",
  "editor.codeActionsOnSave": {
    "source.organizeImports": true,
    "source.fixAll.eslint": true
  },
  "typescript.preferences.includePackageJsonAutoImports": "on"
}
```

### Recommended VS Code Extensions
```json
{
  "recommendations": [
    "ms-vscode.vscode-typescript-next",
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-json",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

### ESLint Rules to Add
```js
// eslint.config.js additions
export default [
  {
    rules: {
      // Catch unused variables and imports
      '@typescript-eslint/no-unused-vars': ['error', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_' 
      }],
      
      // Require explicit return types for functions
      '@typescript-eslint/explicit-function-return-type': 'warn',
      
      // Warn about any types
      '@typescript-eslint/no-explicit-any': 'warn',
      
      // Require consistent type imports
      '@typescript-eslint/consistent-type-imports': 'error',
      
      // Prevent unused imports
      'no-unused-vars': 'off', // Turn off base rule
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': ['warn', {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_'
      }],
      
      // React specific
      'react-hooks/exhaustive-deps': 'warn',
      'react/prop-types': 'off', // Using TypeScript instead
    }
  }
];
```

### Build Checks to Implement

#### 1. Pre-commit Hook
```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "tsc --noEmit --skipLibCheck"
    ]
  }
}
```

#### 2. GitHub Actions CI
```yaml
# .github/workflows/typescript.yml
name: TypeScript Check
on: [push, pull_request]

jobs:
  typescript:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npx tsc --noEmit --skipLibCheck
      - run: npm run lint
```

#### 3. Package.json Scripts
```json
{
  "scripts": {
    "type-check": "tsc --noEmit --skipLibCheck",
    "type-check:watch": "tsc --noEmit --skipLibCheck --watch",
    "lint:ts": "eslint 'src/**/*.{ts,tsx}' --fix",
    "check-all": "npm run type-check && npm run lint:ts && npm run build"
  }
}
```

## Specific Error Prevention Strategies

### 1. Component Development Workflow
```bash
# 1. Create component file
touch src/components/ui/new-component.tsx

# 2. Start with proper template
# 3. Add interface first, implementation second
# 4. Test immediately
npx tsc --noEmit src/components/ui/new-component.tsx

# 5. Add to index exports
# 6. Test integration
```

### 2. Third-Party Integration Workflow
```bash
# 1. Install library and types
npm install some-library
npm install -D @types/some-library

# 2. Create wrapper component with proper types
# 3. Test all modes/variants
# 4. Document any custom types needed
```

### 3. Refactoring Workflow
```bash
# 1. Before refactoring
npx tsc --noEmit --skipLibCheck

# 2. Make small changes
# 3. Check types after each change
npx tsc --noEmit --skipLibCheck

# 4. Fix errors immediately, don't let them accumulate
```

## Emergency Error Triage

### When You Have 50+ TypeScript Errors

#### 1. Categorize First (5 minutes)
```bash
# Run type check and save output
npx tsc --noEmit --skipLibCheck > typescript-errors.txt

# Count by category
grep "Property.*does not exist" typescript-errors.txt | wc -l
grep "Cannot find module" typescript-errors.txt | wc -l
grep "implicitly has an 'any' type" typescript-errors.txt | wc -l
```

#### 2. Fix in Priority Order
1. **Import/Export errors** (breaks build)
2. **Missing interfaces** (affects multiple files)
3. **Event handler types** (easy wins)
4. **Unused imports** (cleanup)
5. **Complex discriminated unions** (time-intensive)

#### 3. Use Temporary Fixes Sparingly
```tsx
// ❌ Avoid but acceptable as temporary fix
const handleClick = (e: any) => {}; // TODO: Fix event type

// ✅ Better temporary fix with TODO
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  // TODO: Add proper click handling
};
```

## Monthly Maintenance

### TypeScript Health Check
- [ ] Review and update `@types/` packages
- [ ] Check for new TypeScript version compatibility
- [ ] Review and update ESLint rules
- [ ] Audit unused dependencies
- [ ] Update component interfaces as needed
- [ ] Review and improve discriminated unions

### Documentation Updates
- [ ] Update this checklist based on new patterns
- [ ] Document any new third-party integrations
- [ ] Share learnings with team
- [ ] Update VS Code settings for new extensions

This checklist should prevent the accumulation of TypeScript errors and catch issues early in the development process.
