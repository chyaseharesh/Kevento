# KhatraEvents NextJS & TailwindCSS UI Guidelines

## Project Setup

### TailwindCSS Configuration
```javascript
// tailwind.config.js
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF4B2B',
          hover: '#E63E1F',
          active: '#D93516',
        },
        secondary: {
          DEFAULT: '#2B3FF4',
          hover: '#1F2EE6',
          active: '#161DD9',
        },
        success: '#22C55E',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

## Component Architecture

### Base Layout Component
```tsx
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
```

### Reusable Components

#### Button Component
```tsx
// components/ui/button.tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

const Button = ({ 
  variant = 'primary', 
  size = 'md',
  className,
  ...props 
}: ButtonProps) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-colors'
  
  const variants = {
    primary: 'bg-primary hover:bg-primary-hover text-white',
    secondary: 'bg-secondary hover:bg-secondary-hover text-white',
    outline: 'border-2 border-primary text-primary hover:bg-primary/10'
  }
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg'
  }

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  )
}
```

#### Card Component
```tsx
// components/ui/card.tsx
interface CardProps {
  children: React.ReactNode
  className?: string
}

const Card = ({ children, className }: CardProps) => {
  return (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden ${className}`}>
      {children}
    </div>
  )
}

const CardHeader = ({ children, className }: CardProps) => (
  <div className={`p-6 border-b border-gray-200 ${className}`}>{children}</div>
)

const CardContent = ({ children, className }: CardProps) => (
  <div className={`p-6 ${className}`}>{children}</div>
)
```

### Form Components

#### Input Component
```tsx
// components/ui/input.tsx
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = ({ label, error, className, ...props }: InputProps) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        className={`
          w-full rounded-lg border border-gray-300 px-4 py-2.5
          focus:border-primary focus:ring-2 focus:ring-primary/20
          ${error ? 'border-error' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-sm text-error">{error}</p>
      )}
    </div>
  )
}
```

## Layout Patterns

### Container Sizes
```tsx
// components/ui/container.tsx
const Container = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  )
}
```

### Grid Layouts
```tsx
// Example grid implementations
const ThreeColumnGrid = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {children}
  </div>
)

const SidebarLayout = ({ sidebar, content }: { sidebar: React.ReactNode, content: React.ReactNode }) => (
  <div className="grid grid-cols-1 gap-8 lg:grid-cols-[256px_1fr]">
    <aside>{sidebar}</aside>
    <main>{content}</main>
  </div>
)
```

## Responsive Design Utilities

### Breakpoint Classes
```css
/* Mobile First Approach */
.responsive-element {
  @apply w-full;                /* Mobile default */
  @apply sm:w-1/2;             /* Tablet (640px+) */
  @apply lg:w-1/3;             /* Desktop (1024px+) */
  @apply xl:w-1/4;             /* Large Desktop (1280px+) */
}
```

### Navigation Components

#### Header
```tsx
// components/layout/header.tsx
const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Logo />
          <nav className="hidden md:flex items-center gap-6">
            {/* Navigation items */}
          </nav>
          <MobileMenu className="md:hidden" />
        </div>
      </Container>
    </header>
  )
}
```

## Animation Utilities

### Transition Classes
```css
/* Common transition patterns */
.transition-base {
  @apply transition-all duration-300 ease-in-out;
}

.hover-scale {
  @apply hover:scale-105 transition-transform duration-200;
}

.fade-in {
  @apply opacity-0 animate-[fadeIn_0.3s_ease-in-out_forwards];
}
```

## Loading States

### Skeleton Components
```tsx
// components/ui/skeleton.tsx
const Skeleton = ({ className }: { className?: string }) => (
  <div 
    className={`
      animate-pulse bg-gray-200 rounded-md
      ${className}
    `}
  />
)

// Usage example
const EventCardSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="h-48 w-full" />
    <Skeleton className="h-4 w-2/3" />
    <Skeleton className="h-4 w-1/2" />
  </div>
)
```

## Error Handling

### Error Components
```tsx
// components/ui/error.tsx
const ErrorMessage = ({ message }: { message: string }) => (
  <div className="rounded-lg bg-error/10 p-4 text-error">
    <p className="text-sm">{message}</p>
  </div>
)

const FormError = ({ message }: { message: string }) => (
  <p className="mt-1 text-sm text-error">{message}</p>
)
```

## Best Practices

### Component Organization
```plaintext
components/
  ├── layout/           # Layout components
  │   ├── header.tsx
  │   ├── footer.tsx
  │   └── sidebar.tsx
  ├── ui/              # Base UI components
  │   ├── button.tsx
  │   ├── input.tsx
  │   └── card.tsx
  ├── forms/           # Form-specific components
  ├── events/          # Event-related components
  └── shared/          # Shared utilities
```

### CSS Class Order
Follow this order for Tailwind classes:
1. Layout (flex, grid, position)
2. Sizing (width, height)
3. Spacing (margin, padding)
4. Typography
5. Visual (colors, shadows)
6. Interactive (hover, focus)
7. Responsive modifiers

Example:
```tsx
<div className="
  flex items-center justify-between  /* Layout */
  w-full h-16                       /* Sizing */
  px-4 py-2                         /* Spacing */
  text-lg font-medium              /* Typography */
  bg-white shadow-sm               /* Visual */
  hover:bg-gray-50                 /* Interactive */
  sm:px-6 lg:px-8                 /* Responsive */
">
```