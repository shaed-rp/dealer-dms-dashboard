# Troubleshooting Guide

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/your-username/dealership-dashboard)

**Current Version**: 1.0.0  
**Last Updated**: January 15, 2025

This guide helps you resolve common issues when working with the Pritchard Companies Intelligence Dashboard.

## 🚨 Quick Fixes

### Build Issues

#### Tailwind CSS Not Working
**Problem**: Styles not applying, components look unstyled
```bash
# Error: Cannot apply unknown utility class `border-border`
```

**Solution**:
1. Ensure `src/index.css` contains:
```css
@import "tailwindcss";
```
2. Restart the development server:
```bash
pnpm dev
```

#### TypeScript Errors
**Problem**: Type errors during build
```bash
# Error: Cannot find module '@/components/...'
```

**Solution**:
1. Check `tsconfig.json` has correct path mapping:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```
2. Verify import paths use `@/` prefix
3. Restart TypeScript server in your editor

#### Missing Dependencies
**Problem**: Module not found errors
```bash
# Error: Cannot resolve 'react' or 'lucide-react'
```

**Solution**:
```bash
# Reinstall dependencies
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Runtime Issues

#### Components Not Rendering
**Problem**: Blank screen or missing components

**Checklist**:
1. Open browser console (F12) for errors
2. Verify component imports are correct
3. Check if mock data is generating properly
4. Ensure all required props are passed

**Debug Steps**:
```typescript
// Add console.log to check data
console.log('KPI Data:', kpiData);
console.log('Component Props:', props);
```

#### Chart Not Displaying
**Problem**: Charts show empty or broken

**Solutions**:
1. Check data format matches chart expectations
2. Verify Recharts library is imported
3. Ensure container has proper dimensions
4. Check for JavaScript errors in console

#### Role Switching Not Working
**Problem**: Can't switch between dashboard roles

**Checklist**:
1. Verify `UserRole` enum includes all roles
2. Check `App.tsx` has all role cases
3. Ensure role selector component is working
4. Verify dashboard components are exported

### Performance Issues

#### Slow Loading
**Problem**: Dashboard takes too long to load

**Optimizations**:
1. Check bundle size:
```bash
pnpm build
# Look for large chunks in output
```

2. Enable code splitting:
```typescript
// Use lazy loading for dashboard components
const GeneralManagerDashboard = lazy(() => import('./GeneralManagerDashboard'));
```

3. Optimize images and assets
4. Check network tab for slow requests

#### Memory Leaks
**Problem**: Dashboard becomes slow over time

**Solutions**:
1. Check for unmounted component updates
2. Use `useEffect` cleanup functions
3. Avoid creating new objects in render
4. Use React DevTools Profiler

## 🔧 Development Issues

### Hot Reload Not Working
**Problem**: Changes not reflecting in browser

**Solutions**:
1. Check Vite configuration in `vite.config.js`
2. Restart development server:
```bash
pnpm dev
```
3. Clear browser cache
4. Check for syntax errors preventing compilation

### ESLint Errors
**Problem**: Linting errors in editor

**Solutions**:
1. Run linting:
```bash
pnpm lint
```

2. Auto-fix issues:
```bash
pnpm lint --fix
```

3. Check ESLint configuration in `eslint.config.js`

### TypeScript Errors
**Problem**: Type checking errors

**Solutions**:
1. Run type checking:
```bash
pnpm type-check
```

2. Check type definitions in `src/types/`
3. Verify component prop types
4. Update TypeScript version if needed

## 📱 Mobile/Responsive Issues

### Layout Breaking on Mobile
**Problem**: Dashboard doesn't look good on mobile

**Solutions**:
1. Check responsive breakpoints in Tailwind classes
2. Test with browser dev tools mobile view
3. Verify `WidgetGrid` columns are responsive
4. Check sidebar collapse functionality

### Touch Interactions
**Problem**: Buttons/controls not working on touch devices

**Solutions**:
1. Ensure touch targets are large enough (44px minimum)
2. Check for hover-only interactions
3. Test with actual mobile device
4. Verify touch event handlers

## 🎨 Styling Issues

### Dark Mode Not Working
**Problem**: Dark mode toggle doesn't work

**Solutions**:
1. Check CSS variables in `src/index.css`
2. Verify dark mode classes are applied
3. Check component theme implementation
4. Ensure Tailwind dark mode is configured

### Component Styling
**Problem**: Components don't match design

**Solutions**:
1. Check shadcn/ui component installation
2. Verify CSS variables are defined
3. Check component className props
4. Ensure Tailwind classes are correct

## 🔌 API Integration Issues

### Mock Data Not Loading
**Problem**: Dashboard shows no data

**Solutions**:
1. Check `MockDataGenerator` is working
2. Verify data structure matches types
3. Check component data props
4. Add error boundaries for data loading

### Real API Integration
**Problem**: Can't connect to real APIs

**Solutions**:
1. Check API endpoint URLs
2. Verify authentication headers
3. Check CORS configuration
4. Test API endpoints separately

## 🧪 Testing Issues

### Tests Not Running
**Problem**: Test commands fail

**Solutions**:
1. Install testing dependencies:
```bash
pnpm add -D @testing-library/react @testing-library/jest-dom
```

2. Check test configuration
3. Verify test file naming convention
4. Check for syntax errors in test files

### Component Tests Failing
**Problem**: Component tests don't pass

**Solutions**:
1. Check component imports in tests
2. Verify mock data structure
3. Check for async operations
4. Ensure test environment is set up

## 🚀 Deployment Issues

### Build Fails
**Problem**: Production build doesn't work

**Solutions**:
1. Check for TypeScript errors
2. Verify all imports are correct
3. Check for missing dependencies
4. Test build locally first

### Runtime Errors in Production
**Problem**: App works in development but not production

**Solutions**:
1. Check environment variables
2. Verify API endpoints are accessible
3. Check for client-side routing issues
4. Test with production build locally

## 📊 Performance Monitoring

### Bundle Size Analysis
```bash
# Analyze bundle size
pnpm build
# Check dist/ folder for large files
```

### Performance Metrics
- **First Contentful Paint**: Should be < 1.5s
- **Time to Interactive**: Should be < 2.5s
- **Lighthouse Score**: Should be > 90

### Memory Usage
- Use React DevTools Profiler
- Check for memory leaks
- Monitor component re-renders

## 🆘 Getting Help

### Before Asking for Help
1. Check this troubleshooting guide
2. Search existing issues
3. Try the solutions above
4. Gather error messages and logs

### When Creating an Issue
Include:
- **Error message** (exact text)
- **Steps to reproduce**
- **Environment details** (OS, browser, Node version)
- **Expected vs actual behavior**
- **Screenshots** if applicable

### Useful Commands
```bash
# Check versions
node --version
pnpm --version

# Clean install
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Build and check
pnpm build
pnpm preview

# Type checking
pnpm type-check

# Linting
pnpm lint
```

## 🔄 Common Workflows

### Setting Up Development Environment
```bash
# 1. Clone repository
git clone <repo-url>
cd dealership-dashboard

# 2. Install dependencies
pnpm install

# 3. Start development
pnpm dev

# 4. Open browser
open http://localhost:3000
```

### Adding New Component
```bash
# 1. Create component file
touch src/components/widgets/NewWidget.tsx

# 2. Add TypeScript types
# 3. Add to mock data
# 4. Test component
# 5. Update documentation
```

### Debugging Process
1. **Identify the problem** (error message, unexpected behavior)
2. **Check this guide** for common solutions
3. **Add debugging logs** to isolate the issue
4. **Test in isolation** (minimal reproduction)
5. **Search for similar issues** in the repository
6. **Create detailed issue** if needed

---

For additional help, see the [Contributing Guide](CONTRIBUTING.md) or create an issue in the repository.
