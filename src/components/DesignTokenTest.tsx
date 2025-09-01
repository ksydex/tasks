import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Text } from '@/components/ui/primitives'
import { StatusIndicator, PriorityBadge, Tag } from '@/components/ui/primitives'
import { DueStatus } from '@/components/ui/composites'
import { Clock, AlertTriangle, Star, Moon, Sun, Home, Bold, Italic, Underline, ChevronDown, ArrowLeft, ArrowRight, RotateCcw, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'

// Form Components
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Textarea } from '@/components/ui/textarea'
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '@/components/ui/input-otp'
import { Label } from '@/components/ui/label'

// Navigation Components
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

// Data Display Components
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

// Interactive Components
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger } from '@/components/ui/context-menu'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

// Layout Components
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

// Utility Components
import { Skeleton } from '@/components/ui/skeleton'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Toggle } from '@/components/ui/toggle'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

// Advanced Components
import { MultiSelect } from '@/components/ui/multi-select'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'

// Internal components for DesignTokenTest page
const ColorSwatch = ({ color, name }: { color: string; name: string }) => (
  <div className="p-4 bg-background border rounded-lg text-center">
    <div className="w-full h-8 rounded mb-2" style={{ backgroundColor: color }}></div>
    <Text variant="small">{name}</Text>
  </div>
)

const DemoArea = ({ children, size = 'md' }: { children: React.ReactNode; size?: 'sm' | 'md' | 'lg' }) => (
  <div className={`
    flex items-center justify-center rounded-md border border-dashed text-sm
    ${size === 'sm' ? 'h-[80px] w-[160px]' : size === 'md' ? 'h-[100px] w-[200px]' : 'h-[150px] w-[300px]'}
  `}>
    {children}
  </div>
)

const SuccessCard = ({ title, description, children }: { title: string; description: string; children?: React.ReactNode }) => (
  <Card className="border-green-200 bg-green-50 dark:bg-green-950/20">
    <CardContent className="pt-6">
      <div className="text-center space-y-4">
        <Text variant="h3" className="text-green-800 dark:text-green-200 mb-2">
          {title}
        </Text>
        <Text variant="p" className="text-green-700 dark:text-green-300">
          {description}
        </Text>
        {children}
      </div>
    </CardContent>
  </Card>
)

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
        <div className="flex flex-col items-center text-center mb-8 space-y-4">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="outline" size="sm">
                <Home className="w-4 h-4 mr-2" />
                Back to App
              </Button>
            </Link>
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

          <div>
            <Text variant="h1" as="h1" className="mb-2">Design Token System Test</Text>
            <Text variant="lead" className="text-muted-foreground">
              Comprehensive demonstration of the design token system
            </Text>
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
              <ColorSwatch color="hsl(var(--primary))" name="Primary" />
              <ColorSwatch color="hsl(var(--foreground))" name="Foreground" />
              <ColorSwatch color="hsl(var(--accent-foreground))" name="Accent" />
              <ColorSwatch color="hsl(var(--destructive))" name="Destructive" />
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
            <div className="space-y-2 flex flex-wrap gap-2">
              <StatusIndicator variant="neutral">
                Normal status
              </StatusIndicator>
              <StatusIndicator variant="warning" icon={<Clock className="h-3 w-3" />}>
                Due soon
              </StatusIndicator>
              <StatusIndicator variant="warning" icon={<Clock className="h-3 w-3" />}>
                Due today
              </StatusIndicator>
              <StatusIndicator variant="error" icon={<AlertTriangle className="h-3 w-3" />}>
                Overdue
              </StatusIndicator>
              <StatusIndicator variant="success" icon={<Star className="h-3 w-3" />}>
                Completed
              </StatusIndicator>
              <StatusIndicator variant="info" icon={<Star className="h-3 w-3" />}>
                In Progress
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

          <div>
            <Text variant="h4" className="mb-2">Due Status Component</Text>
            <div className="space-y-2">
              <Text variant="small" className="mb-2">Combined due date and priority display:</Text>
              <div className="flex gap-2 flex-wrap">
                <DueStatus dueDate={new Date(Date.now() - 86400000)} priority="high" showPriority />
                <DueStatus dueDate={new Date()} priority="medium" showPriority />
                <DueStatus dueDate={new Date(Date.now() + 86400000)} priority="low" showPriority />
                <DueStatus dueDate={new Date(Date.now() + 259200000)} priority="urgent" showPriority />
              </div>

              <Text variant="small" className="mb-2 mt-4">Relative time examples (hover for actual date):</Text>
              <div className="flex gap-2 flex-wrap">
                <DueStatus dueDate={new Date(Date.now() - 172800000)} /> {/* 2 days overdue */}
                <DueStatus dueDate={new Date(Date.now() - 86400000)} /> {/* 1 day overdue */}
                <DueStatus dueDate={new Date()} /> {/* Due today */}
                <DueStatus dueDate={new Date(Date.now() + 86400000)} /> {/* Due tomorrow */}
                <DueStatus dueDate={new Date(Date.now() + 172800000)} /> {/* Due in 2 days */}
                <DueStatus dueDate={new Date(Date.now() + 259200000)} /> {/* Due in 3 days */}
                <DueStatus dueDate={new Date(Date.now() + 345600000)} /> {/* Due in 4 days - shows date */}
              </div>

              <Text variant="small" className="mb-2 mt-4">Size variants:</Text>
              <div className="flex gap-2 flex-wrap items-center">
                <DueStatus dueDate={new Date()} size="sm" />
                <DueStatus dueDate={new Date()} size="md" />
                <DueStatus dueDate={new Date()} size="lg" />
              </div>
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

      {/* Border Radius System Test */}
      <Card>
        <CardHeader>
          <CardTitle>🔘 Border Radius System</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Text variant="h4" className="mb-3">Border Radius Tokens</Text>
            <Text variant="p" className="mb-4 text-muted-foreground">
              Consistent border radius values using design tokens for visual harmony across components.
            </Text>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="w-20 h-20 bg-primary rounded-none border-2 border-border flex items-center justify-center">
                  <Text variant="small" className="text-primary-foreground font-medium">None</Text>
                </div>
                <Text variant="small" className="text-center">rounded-none (0px)</Text>
              </div>
              <div className="space-y-2">
                <div className="w-20 h-20 bg-secondary rounded-sm border-2 border-border flex items-center justify-center">
                  <Text variant="small" className="text-secondary-foreground font-medium">SM</Text>
                </div>
                <Text variant="small" className="text-center">rounded-sm (4px)</Text>
              </div>
              <div className="space-y-2">
                <div className="w-20 h-20 bg-accent rounded-md border-2 border-border flex items-center justify-center">
                  <Text variant="small" className="text-accent-foreground font-medium">MD</Text>
                </div>
                <Text variant="small" className="text-center">rounded-md (6px)</Text>
              </div>
              <div className="space-y-2">
                <div className="w-20 h-20 bg-muted rounded-lg border-2 border-border flex items-center justify-center">
                  <Text variant="small" className="text-muted-foreground font-medium">LG</Text>
                </div>
                <Text variant="small" className="text-center">rounded-lg (12px)</Text>
              </div>
              <div className="space-y-2">
                <div className="w-20 h-20 bg-destructive rounded-xl border-2 border-border flex items-center justify-center">
                  <Text variant="small" className="text-destructive-foreground font-medium">XL</Text>
                </div>
                <Text variant="small" className="text-center">rounded-xl (16px)</Text>
              </div>
              <div className="space-y-2">
                <div className="w-20 h-20 bg-card rounded-full border-2 border-border flex items-center justify-center">
                  <Text variant="small" className="text-card-foreground font-medium">Full</Text>
                </div>
                <Text variant="small" className="text-center">rounded-full (50%)</Text>
              </div>
            </div>
          </div>

          <div>
            <Text variant="h4" className="mb-3">Component Standards</Text>
            <Text variant="p" className="mb-4 text-muted-foreground">
              How border radius is applied consistently across different component types.
            </Text>
            <div className="space-y-4">
              <div>
                <Text variant="small" className="font-medium mb-2">Status Indicators & Badges (rounded-md)</Text>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="default">Default Badge</Badge>
                  <StatusIndicator variant="success" icon={<Star className="h-3 w-3" />}>
                    Success Status
                  </StatusIndicator>
                  <DueStatus dueDate={new Date()} />
                  <PriorityBadge priority="high" />
                </div>
              </div>

              <div>
                <Text variant="small" className="font-medium mb-2">Interactive Elements (rounded-md)</Text>
                <div className="flex gap-2 flex-wrap">
                  <Button variant="default">Button</Button>
                  <Input placeholder="Input field" className="w-32" />
                  <Checkbox id="demo-checkbox" />
                  <Label htmlFor="demo-checkbox">Checkbox</Label>
                </div>
              </div>

              <div>
                <Text variant="small" className="font-medium mb-2">Containers & Cards (rounded-lg)</Text>
                <div className="flex gap-2 flex-wrap">
                  <Card className="w-32 h-16 p-2">
                    <CardContent className="p-1">
                      <Text variant="small">Card</Text>
                    </CardContent>
                  </Card>
                  <div className="w-32 h-16 bg-popover rounded-lg border p-2 flex items-center justify-center">
                    <Text variant="small">Popover</Text>
                  </div>
                  <div className="w-32 h-16 bg-muted rounded-lg border p-2 flex items-center justify-center">
                    <Text variant="small">Container</Text>
                  </div>
                </div>
              </div>

              <div>
                <Text variant="small" className="font-medium mb-2">Circular Elements (rounded-full)</Text>
                <div className="flex gap-2 flex-wrap items-center">
                  <Avatar>
                    <AvatarFallback>AV</AvatarFallback>
                  </Avatar>
                  <Button size="icon" variant="outline">
                    <Star className="h-4 w-4" />
                  </Button>
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Text variant="small" className="text-primary-foreground text-xs">I</Text>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <Text variant="h4" className="mb-3">Before vs After Comparison</Text>
            <Text variant="p" className="mb-4 text-muted-foreground">
              Visual comparison showing the consistency improvements made to border radius usage.
            </Text>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Text variant="small" className="font-medium text-destructive">❌ Before (Inconsistent)</Text>
                <div className="space-y-2">
                  <Badge variant="default">Badge: rounded-md</Badge>
                  <StatusIndicator variant="warning" icon={<Clock className="h-3 w-3" />}>
                    Status: rounded (old)
                  </StatusIndicator>
                  <DueStatus dueDate={new Date()}>Due: rounded (old)</DueStatus>
                </div>
                <Text variant="small" className="text-muted-foreground">
                  Different border radius values created visual inconsistency
                </Text>
              </div>
              <div className="space-y-3">
                <Text variant="small" className="font-medium text-green-600">✅ After (Consistent)</Text>
                <div className="space-y-2">
                  <Badge variant="default">Badge: rounded-md</Badge>
                  <StatusIndicator variant="warning" icon={<Clock className="h-3 w-3" />}>
                    Status: rounded-md
                  </StatusIndicator>
                  <DueStatus dueDate={new Date()}>Due: rounded-md</DueStatus>
                </div>
                <Text variant="small" className="text-muted-foreground">
                  All status components now use consistent border radius
                </Text>
              </div>
            </div>
          </div>
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

      {/* Advanced Form Components */}
      <Card>
        <CardHeader>
          <CardTitle>📋 Advanced Form Components</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Text variant="h4" className="mb-2">Checkbox & Radio Groups</Text>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <Label htmlFor="terms">
                  Accept terms and conditions
                </Label>
              </div>
              <RadioGroup defaultValue="option-one">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-one" id="option-one" />
                  <Label htmlFor="option-one">
                    Option One
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-two" id="option-two" />
                  <Label htmlFor="option-two">
                    Option Two
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div>
            <Text variant="h4" className="mb-2">Switch & Slider</Text>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="airplane-mode" />
                <Label htmlFor="airplane-mode">
                  Airplane mode
                </Label>
              </div>
              <div className="space-y-2">
                <Label>Volume</Label>
                <Slider defaultValue={[33]} max={100} step={1} />
              </div>
            </div>
          </div>

          <div>
            <Text variant="h4" className="mb-2">Textarea & Input OTP</Text>
            <div className="space-y-2">
              <Textarea placeholder="Type your message here." />
              <div className="space-y-2">
                <Label>Enter verification code</Label>
                <InputOTP maxLength={6}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSeparator />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation & Menu Components */}
      <Card>
        <CardHeader>
          <CardTitle>🧭 Navigation & Menu Components</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Text variant="h4" className="mb-2">Breadcrumb</Text>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/components">Components</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Design Tokens</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div>
            <Text variant="h4" className="mb-2">Tabs</Text>
            <Tabs defaultValue="account" className="w-full">
              <TabsList>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                <Text variant="p">Make changes to your account here.</Text>
              </TabsContent>
              <TabsContent value="password">
                <Text variant="p">Change your password here.</Text>
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <Text variant="h4" className="mb-2">Accordion</Text>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is it styled?</AccordionTrigger>
                <AccordionContent>
                  Yes. It comes with default styles that matches the other components&apos; aesthetic.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </CardContent>
      </Card>

      {/* Data Display Components */}
      <Card>
        <CardHeader>
          <CardTitle>📊 Data Display Components</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Text variant="h4" className="mb-2">Table</Text>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Design System</TableCell>
                  <TableCell>In Progress</TableCell>
                  <TableCell>High</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>User Testing</TableCell>
                  <TableCell>Completed</TableCell>
                  <TableCell>Medium</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div>
            <Text variant="h4" className="mb-2">Progress</Text>
            <div className="space-y-2">
              <div className="space-y-1">
                <Text variant="small">Design System Progress</Text>
                <Progress value={75} />
              </div>
              <div className="space-y-1">
                <Text variant="small">User Testing</Text>
                <Progress value={100} />
              </div>
            </div>
          </div>

          <div>
            <Text variant="h4" className="mb-2">Avatar</Text>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Components */}
      <Card>
        <CardHeader>
          <CardTitle>🎯 Interactive Components</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Text variant="h4" className="mb-2">Dropdown Menu</Text>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Open Menu</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div>
            <Text variant="h4" className="mb-2">Context Menu</Text>
            <div className="space-y-4">
              <div>
                <Text variant="small" className="mb-2">Basic Context Menu</Text>
                <ContextMenu>
                  <ContextMenuTrigger asChild>
                    <DemoArea>
                      Right click here
                    </DemoArea>
                  </ContextMenuTrigger>
                  <ContextMenuContent>
                    <ContextMenuItem>Back</ContextMenuItem>
                    <ContextMenuItem>Forward</ContextMenuItem>
                    <ContextMenuItem>Reload</ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem>Inspect</ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              </div>

              <div>
                <Text variant="small" className="mb-2">Context Menu with Icons</Text>
                <ContextMenu>
                  <ContextMenuTrigger asChild>
                    <DemoArea>
                      Right click here
                    </DemoArea>
                  </ContextMenuTrigger>
                  <ContextMenuContent>
                    <ContextMenuItem>
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </ContextMenuItem>
                    <ContextMenuItem>
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Forward
                    </ContextMenuItem>
                    <ContextMenuItem>
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reload
                    </ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              </div>
            </div>
          </div>

          <div>
            <Text variant="h4" className="mb-2">Popover & Tooltip</Text>
            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">Open Popover</Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Text variant="h4">Dimensions</Text>
                      <Text variant="small">Set the dimensions for the layer.</Text>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">Hover for tooltip</Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <Text variant="small">This is a tooltip</Text>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Layout Components */}
      <Card>
        <CardHeader>
          <CardTitle>📐 Layout Components</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Text variant="h4" className="mb-2">Separator</Text>
            <div className="space-y-2">
              <Text variant="small">Above separator</Text>
              <Separator />
              <Text variant="small">Below separator</Text>
            </div>
          </div>

          <div>
            <Text variant="h4" className="mb-2">Scroll Area</Text>
            <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
              <div className="space-y-4">
                <Text variant="h4">Scrollable Content</Text>
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} className="p-4 border rounded">
                    <Text variant="small">Item {i + 1}</Text>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          <div>
            <Text variant="h4" className="mb-2">Collapsible</Text>
            <Collapsible>
              <CollapsibleTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  Click to expand
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-2">
                <div className="rounded-md border px-4 py-3 font-mono text-sm">
                  <Text variant="small">This is collapsible content.</Text>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </CardContent>
      </Card>

      {/* Utility Components */}
      <Card>
        <CardHeader>
          <CardTitle>🔧 Utility Components</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Text variant="h4" className="mb-2">Skeleton</Text>
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[300px]" />
            </div>
          </div>

          <div>
            <Text variant="h4" className="mb-2">Aspect Ratio</Text>
            <div className="w-[200px]">
              <AspectRatio ratio={16 / 9} className="bg-muted">
                <div className="flex items-center justify-center">
                  <Text variant="small">16:9</Text>
                </div>
              </AspectRatio>
            </div>
          </div>

          <div>
            <Text variant="h4" className="mb-2">Toggle & Toggle Group</Text>
            <div className="space-y-2">
              <Toggle aria-label="Toggle bold">
                <Bold className="h-4 w-4" />
              </Toggle>

              <ToggleGroup type="single">
                <ToggleGroupItem value="bold" aria-label="Toggle bold">
                  <Bold className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="italic" aria-label="Toggle italic">
                  <Italic className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="underline" aria-label="Toggle underline">
                  <Underline className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Components */}
      <Card>
        <CardHeader>
          <CardTitle>🚀 Advanced Components</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Text variant="h4" className="mb-2">Multi Select</Text>
            <div className="max-w-sm">
              <MultiSelect
                options={[
                  { label: "Design System", value: "design-system" },
                  { label: "User Testing", value: "user-testing" },
                  { label: "Documentation", value: "documentation" },
                  { label: "Bug Fixes", value: "bug-fixes" }
                ]}
                selected={[]}
                onChange={() => {}}
                placeholder="Select tasks..."
              />
            </div>
          </div>

            <div>
            <Text variant="h4" className="mb-2">Select</Text>
            <div className="max-w-sm">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a task" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="design-system">Design System</SelectItem>
                  <SelectItem value="user-testing">User Testing</SelectItem>
                  <SelectItem value="documentation">Documentation</SelectItem>
                  <SelectItem value="bug-fixes">Bug Fixes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            </div>

          <div>
            <Text variant="h4" className="mb-2">Calendar</Text>
            <div className="max-w-sm">
              <Calendar
                mode="single"
                selected={new Date()}
                className="rounded-md border"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Success Indicator */}
      <SuccessCard
        title="✅ Design Tokens Working Successfully!"
        description="All components are using the centralized design token system. Colors, spacing, typography, and variants are all working correctly."
      >
        <div className="p-4 bg-background/50 rounded-lg border border-green-300 dark:border-green-700">
          <Text variant="small" className="text-green-600 dark:text-green-400">
            <strong>Theme Test:</strong> Try switching between light and dark themes using the toggle above.
            Notice how all colors, backgrounds, and text automatically adapt while maintaining semantic meaning.
          </Text>
        </div>
      </SuccessCard>

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
