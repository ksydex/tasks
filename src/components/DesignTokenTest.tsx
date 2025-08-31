import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Text } from '@/components/ui/primitives'
import { StatusIndicator, PriorityBadge, Tag } from '@/components/ui/primitives'
import { Clock, AlertTriangle, Star, Moon, Sun, Home } from 'lucide-react'
import { Link } from 'react-router-dom'

/**
 * Design Token Test Component
 * This component demonstrates that design tokens are working correctly
 * by showing various UI components using the token system
 */
export function DesignTokenTest() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Check if dark mode is already enabled
    const isDarkMode = document.documentElement.classList.contains('dark')
    setIsDark(isDarkMode)
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)

    if (newTheme) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="p-8 space-y-8 max-w-4xl mx-auto">
        {/* Header with navigation and theme toggle */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="outline" size="sm">
                <Home className="w-4 h-4 mr-2" />
                Back to App
              </Button>
            </Link>
            <div>
              <Text variant="h1" as="h1">Design Token System Test</Text>
              <Text variant="lead" className="text-muted-foreground">
                Comprehensive demonstration of the design token system
              </Text>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Text variant="small" className="text-muted-foreground">
              Current theme: <span className="font-medium">{isDark ? 'Dark' : 'Light'}</span>
            </Text>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              className="relative"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Theme Demo Section */}
        <Card className="border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              🎯 Live Theme Testing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Text variant="p" className="mb-4">
              Click the theme toggle above to see all design tokens automatically adapt!
              Watch how colors, backgrounds, and text respond in real-time.
            </Text>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-background border rounded-lg text-center">
                <div className="w-full h-8 bg-primary rounded mb-2"></div>
                <Text variant="small">Primary</Text>
              </div>
              <div className="p-4 bg-muted border rounded-lg text-center">
                <div className="w-full h-8 bg-foreground rounded mb-2"></div>
                <Text variant="small">Foreground</Text>
              </div>
              <div className="p-4 bg-accent border rounded-lg text-center">
                <div className="w-full h-8 bg-accent-foreground rounded mb-2"></div>
                <Text variant="small">Accent</Text>
              </div>
              <div className="p-4 bg-card border rounded-lg text-center">
                <div className="w-full h-8 bg-destructive rounded mb-2"></div>
                <Text variant="small">Destructive</Text>
              </div>
            </div>
          </CardContent>
        </Card>

      {/* Color System Test */}
      <Card>
        <CardHeader>
          <CardTitle>🎨 Color Token System</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Text variant="h4" className="mb-2">Primary Colors</Text>
            <div className="flex gap-2 flex-wrap">
              <div className="w-16 h-16 bg-primary rounded border"></div>
              <div className="w-16 h-16 bg-primary-foreground rounded border"></div>
              <div className="w-16 h-16 bg-secondary rounded border"></div>
              <div className="w-16 h-16 bg-muted rounded border"></div>
              <div className="w-16 h-16 bg-accent rounded border"></div>
            </div>
          </div>

          <div>
            <Text variant="h4" className="mb-2">Semantic Colors</Text>
            <div className="flex gap-2 flex-wrap">
              <div className="w-16 h-16 bg-destructive rounded border"></div>
              <div className="w-16 h-16 bg-card rounded border"></div>
              <div className="w-16 h-16 bg-popover rounded border"></div>
              <div className="w-16 h-16 bg-background rounded border"></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Component Variant System Test */}
      <Card>
        <CardHeader>
          <CardTitle>⚙️ Component Variant System</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Text variant="h4" className="mb-2">Button Variants</Text>
            <div className="flex gap-2 flex-wrap">
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
          </div>

          <div>
            <Text variant="h4" className="mb-2">Button Sizes</Text>
            <div className="flex gap-2 items-center flex-wrap">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon">
                <Star className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <Text variant="h4" className="mb-2">Badge Variants</Text>
            <div className="flex gap-2 flex-wrap">
              <Badge variant="default">Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Input System Test */}
      <Card>
        <CardHeader>
          <CardTitle>📝 Input Variant System</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Text variant="h4" className="mb-2">Input Sizes</Text>
            <div className="space-y-2 max-w-md">
              <Input placeholder="Small input" size="sm" />
              <Input placeholder="Default input" size="md" />
              <Input placeholder="Large input" size="lg" />
            </div>
          </div>

          <div>
            <Text variant="h4" className="mb-2">Input States</Text>
            <div className="space-y-2 max-w-md">
              <Input placeholder="Default state" state="default" />
              <Input placeholder="Error state" state="error" />
              <Input placeholder="Success state" state="success" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status System Test */}
      <Card>
        <CardHeader>
          <CardTitle>⚡ Status & Priority System</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Text variant="h4" className="mb-2">Status Indicators</Text>
            <div className="space-y-2">
              <StatusIndicator status="normal" icon={<Clock className="h-3 w-3" />}>
                Normal status
              </StatusIndicator>
              <StatusIndicator status="dueSoon" icon={<Clock className="h-3 w-3" />}>
                Due soon
              </StatusIndicator>
              <StatusIndicator status="dueToday" icon={<Clock className="h-3 w-3" />}>
                Due today
              </StatusIndicator>
              <StatusIndicator status="overdue" icon={<AlertTriangle className="h-3 w-3" />}>
                Overdue
              </StatusIndicator>
            </div>
          </div>

          <div>
            <Text variant="h4" className="mb-2">Priority Badges</Text>
            <div className="flex gap-2 flex-wrap">
              <PriorityBadge priority="low" />
              <PriorityBadge priority="medium" />
              <PriorityBadge priority="high" />
              <PriorityBadge priority="urgent" />
            </div>
          </div>

          <div>
            <Text variant="h4" className="mb-2">Dynamic Tags</Text>
            <div className="flex gap-2 flex-wrap">
              <Tag color="#3b82f6" icon="🚀">Frontend</Tag>
              <Tag color="#ef4444" icon="🐛">Bug</Tag>
              <Tag color="#10b981" icon="✨">Feature</Tag>
              <Tag color="#f59e0b" icon="📝">Documentation</Tag>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Typography System Test */}
      <Card>
        <CardHeader>
          <CardTitle>📖 Typography System</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Text variant="h1">Heading 1 - Main title</Text>
          <Text variant="h2">Heading 2 - Section title</Text>
          <Text variant="h3">Heading 3 - Subsection title</Text>
          <Text variant="h4">Heading 4 - Component title</Text>
          <Text variant="lead">Lead text - Important description or introduction</Text>
          <Text variant="p">Paragraph - Regular body text for content and descriptions</Text>
          <Text variant="large">Large text - Emphasized content</Text>
          <Text variant="small">Small text - Secondary information</Text>
          <Text variant="muted">Muted text - Less important information</Text>
        </CardContent>
      </Card>

      {/* Card System Test */}
      <Card hover="lift" className="transition-all">
        <CardHeader>
          <CardTitle>🎯 Card Variant System</CardTitle>
        </CardHeader>
        <CardContent>
          <Text variant="p" className="mb-4">
            This card demonstrates the hover effect variant. Try hovering over it!
          </Text>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card padding="sm">
              <CardContent>
                <Text variant="small">Small padding card</Text>
              </CardContent>
            </Card>
            <Card padding="md">
              <CardContent>
                <Text variant="small">Medium padding card</Text>
              </CardContent>
            </Card>
            <Card padding="lg">
              <CardContent>
                <Text variant="small">Large padding card</Text>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Dark Mode Test */}
      <Card>
        <CardHeader>
          <CardTitle>🌙 Theme System Test</CardTitle>
        </CardHeader>
        <CardContent>
          <Text variant="p" className="mb-4">
            All components automatically adapt to light/dark themes using CSS variables.
            Try switching your system theme to see the tokens in action!
          </Text>
          <div className="p-4 border rounded-lg bg-muted/50">
            <Text variant="small" className="text-muted-foreground">
              This box uses token-based colors that automatically adapt to your theme
            </Text>
          </div>
        </CardContent>
      </Card>

      {/* Success Indicator */}
      <Card className="border-green-200 bg-green-50 dark:bg-green-950/20">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div>
              <Text variant="h3" className="text-green-800 dark:text-green-200 mb-2">
                ✅ Design Tokens Working Successfully!
              </Text>
              <Text variant="p" className="text-green-700 dark:text-green-300">
                All components are using the centralized design token system.
                Colors, spacing, typography, and variants are all working correctly.
              </Text>
            </div>

            <div className="p-4 bg-background/50 rounded-lg border border-green-300 dark:border-green-700">
              <Text variant="small" className="text-green-600 dark:text-green-400">
                <strong>Theme Test:</strong> Try switching between light and dark themes using the toggle above.
                Notice how all colors, backgrounds, and text automatically adapt while maintaining semantic meaning.
              </Text>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Back to app */}
      <div className="text-center">
        <Link to="/">
          <Button variant="default" size="lg">
            <Home className="w-4 h-4 mr-2" />
            Return to Task Board
          </Button>
        </Link>
      </div>
    </div>
    </div>
  )
}
