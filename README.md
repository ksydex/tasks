# 🎯 **Task Board - Kanban Style Task Manager**

A modern, responsive task management application built with React, TypeScript, and a comprehensive design system.

## 🚀 **Quick Start**

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

**Visit**: http://localhost:5173

## ✨ **Features**

- **📋 Kanban Board**: Drag and drop task management
- **🎨 Design System**: Comprehensive token-based styling
- **🌙 Dark Mode**: Automatic theme switching
- **⚡ Command Palette**: Quick task creation and navigation
- **🏷️ Tag System**: Organize tasks with custom tags
- **📊 Task Analytics**: Progress tracking and statistics
- **♿ Accessible**: WCAG compliant with keyboard navigation

## 🎨 **Design System**

This project features a production-ready design system with:

- **Type-safe component variants** using CVA
- **Systematic color management** with CSS variables
- **Consistent spacing and typography** scales
- **Zero hardcoded styling** in business components
- **Theme-aware design tokens** for light/dark modes

**🔍 View Design System**: Click the 🎨 palette icon in the app header

## 🏗️ **Tech Stack**

- **React 18** + **TypeScript** - Modern UI development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Zustand** - Lightweight state management
- **Radix UI** - Accessible component primitives
- **React DnD** - Drag and drop functionality
- **Lucide React** - Beautiful icons

## 📚 **Documentation**

Complete project documentation is available in the [`/docs`](./docs/) folder:

- **[📋 Documentation Index](./docs/README.md)** - Overview and navigation
- **[🔍 Design Token Guide](./docs/DESIGN_TOKENS_VERIFICATION_GUIDE.md)** - How to verify and modify the design system
- **[📊 Refactoring Analysis](./docs/REFACTORING_COMPLETE.md)** - Complete architecture transformation

## 🛠️ **Development**

### **Project Structure**
```
src/
├── components/
│   ├── ui/
│   │   ├── primitives/    # Basic components (Button, Input)
│   │   ├── composites/    # Complex components (Card, Dialog)
│   │   └── patterns/      # Complete workflows
│   ├── TaskCard.tsx       # Business components
│   └── KanbanColumn.tsx
├── lib/
│   ├── design-tokens.ts   # Design system tokens
│   ├── component-variants.ts  # CVA variant definitions
│   └── status-colors.ts   # Semantic color system
├── store/
│   └── todo-store.ts      # Zustand state management
└── pages/
    ├── HomePage.tsx       # Main kanban interface
    └── NotFoundPage.tsx
```

### **Key Commands**
```bash
npm run dev          # Development server
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🎯 **Contributing**

1. Follow the established design token patterns
2. Use existing UI primitives for new components
3. Maintain TypeScript strict mode compliance
4. Test both light and dark themes
5. Ensure keyboard accessibility

## 📄 **License**

MIT License - feel free to use this project as a foundation for your own applications.

---

**🎉 Built with a focus on developer experience, design consistency, and production readiness.**
