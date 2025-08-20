# Contributing to Pritchard Companies Intelligence Dashboard

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/your-username/dealership-dashboard)
[![Contributing](https://img.shields.io/badge/contributing-welcome-green.svg)](CONTRIBUTING.md)

Thank you for your interest in contributing to the Pritchard Companies Intelligence Dashboard! This document provides guidelines and information for contributors.

**Current Version**: 1.0.0  
**Last Updated**: January 15, 2025

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm
- Git

### Setup Development Environment

```bash
# Fork and clone the repository
git clone https://github.com/your-username/dealership-dashboard.git
cd dealership-dashboard

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

## 📋 Development Guidelines

### Code Style

We follow these coding standards:

- **TypeScript**: Strict mode enabled
- **ESLint**: Configured with React and TypeScript rules
- **Prettier**: Automatic code formatting
- **Conventional Commits**: For commit messages

### Commit Message Format

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

**Examples:**
```bash
feat(dashboard): add new KPI widget for sales metrics
fix(api): resolve authentication token refresh issue
docs(readme): update installation instructions
```

### Branch Naming Convention

```
feature/description
fix/description
docs/description
refactor/description
```

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── charts/         # Chart components
│   ├── dashboard/      # Role-specific dashboards
│   ├── layout/         # Layout components
│   ├── tables/         # Data table components
│   ├── ui/             # shadcn/ui components
│   └── widgets/        # Reusable widgets
├── data/               # Mock data and generators
├── types/              # TypeScript type definitions
├── lib/                # Utility functions
└── hooks/              # Custom React hooks
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

### Writing Tests

- Use React Testing Library for component tests
- Test user interactions, not implementation details
- Aim for high test coverage (>80%)
- Mock external dependencies

**Example Test:**
```typescript
import { render, screen } from '@testing-library/react';
import { KPIWidget } from '@/components/widgets/KPIWidget';

describe('KPIWidget', () => {
  it('displays the correct value', () => {
    const mockData = {
      title: 'Revenue',
      value: 50000,
      format: 'currency'
    };
    
    render(<KPIWidget data={mockData} />);
    expect(screen.getByText('$50,000')).toBeInTheDocument();
  });
});
```

## 🎨 Adding New Components

### 1. Create Component File

```typescript
// src/components/widgets/NewWidget.tsx
import React from 'react';
import { WidgetBase } from './WidgetBase';

interface NewWidgetProps {
  title?: string;
  description?: string;
  className?: string;
}

export function NewWidget({ 
  title = "New Widget", 
  description, 
  className 
}: NewWidgetProps) {
  return (
    <WidgetBase title={title} description={description} className={className}>
      {/* Widget content */}
    </WidgetBase>
  );
}
```

### 2. Add TypeScript Types

```typescript
// src/types/widgets.ts
export interface NewWidgetData {
  id: string;
  title: string;
  value: number;
  // ... other properties
}
```

### 3. Add to Mock Data

```typescript
// src/data/mockData.ts
export class MockDataGenerator {
  static generateNewWidgetData(): NewWidgetData[] {
    // Generate mock data
  }
}
```

## 📊 Adding New Dashboard Roles

### 1. Create Dashboard Component

```typescript
// src/components/dashboard/NewRoleDashboard.tsx
import React from 'react';
import { WidgetGrid, WidgetSection } from '@/components/widgets/WidgetGrid';
import { KPIWidget } from '@/components/widgets/KPIWidget';
import { MockDataGenerator } from '@/data/mockData';
import { UserRole } from '@/types';

export function NewRoleDashboard() {
  const kpiData = MockDataGenerator.generateKPIData(UserRole.NEW_ROLE);

  return (
    <div className="space-y-8">
      <WidgetSection title="Key Performance Indicators">
        <WidgetGrid columns={4}>
          {kpiData.map((kpi) => (
            <KPIWidget key={kpi.id} data={kpi} />
          ))}
        </WidgetGrid>
      </WidgetSection>
    </div>
  );
}
```

### 2. Update Type Definitions

```typescript
// src/types/dashboard.ts
export enum UserRole {
  // ... existing roles
  NEW_ROLE = 'new-role'
}
```

### 3. Update App Component

```typescript
// src/App.tsx
import { NewRoleDashboard } from '@/components/dashboard/NewRoleDashboard';

// Add to renderDashboard function
case UserRole.NEW_ROLE:
  return <NewRoleDashboard />;
```

## 🔧 API Integration

### Adding New API Endpoints

1. **Create API Service**
```typescript
// src/services/api.ts
export class ApiService {
  async fetchNewData(): Promise<NewDataType[]> {
    const response = await fetch('/api/new-endpoint');
    return response.json();
  }
}
```

2. **Add Type Definitions**
```typescript
// src/types/api.ts
export interface NewDataType {
  id: string;
  name: string;
  // ... other properties
}
```

3. **Update Mock Data**
```typescript
// src/data/mockData.ts
export const mockNewData: NewDataType[] = [
  // Mock data
];
```

## 🐛 Bug Reports

### Before Submitting a Bug Report

1. Check existing issues
2. Try to reproduce the bug
3. Check browser console for errors
4. Verify the issue occurs in different browsers

### Bug Report Template

```markdown
**Bug Description**
Brief description of the issue

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What should happen

**Actual Behavior**
What actually happens

**Environment**
- OS: [e.g. Windows 10]
- Browser: [e.g. Chrome 120]
- Node.js: [e.g. 18.17.0]

**Additional Context**
Screenshots, console logs, etc.
```

## 💡 Feature Requests

### Feature Request Template

```markdown
**Feature Description**
Brief description of the feature

**Use Case**
Why this feature is needed

**Proposed Solution**
How you think it should work

**Alternative Solutions**
Other approaches considered

**Additional Context**
Screenshots, mockups, etc.
```

## 🔄 Pull Request Process

### Before Submitting a PR

1. **Fork the repository**
2. **Create a feature branch**
3. **Make your changes**
4. **Add tests** (if applicable)
5. **Update documentation**
6. **Run linting and tests**
7. **Commit with conventional commits**

### PR Checklist

- [ ] Code follows project style guidelines
- [ ] Tests pass
- [ ] Documentation updated
- [ ] No console errors
- [ ] Responsive design tested
- [ ] Accessibility considerations
- [ ] Performance impact assessed

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Screenshots
Add screenshots if UI changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
```

## 📚 Resources

### Documentation
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)

### Tools
- [ESLint Configuration](https://eslint.org/docs/user-guide/configuring)
- [Prettier Configuration](https://prettier.io/docs/en/configuration.html)
- [Conventional Commits](https://www.conventionalcommits.org/)

## 🤝 Getting Help

- **Issues**: Create an issue for bugs or feature requests
- **Discussions**: Use GitHub Discussions for questions
- **Documentation**: Check the README and API documentation

## 📄 License

By contributing to this project, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to the Pritchard Companies Intelligence Dashboard! 🚀
