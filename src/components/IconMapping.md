# Icon Mapping Documentation

This document provides a reference for all emoji replacements with professional Lucide React icons throughout the Apper application.

## Onboarding Steps

| Original Emoji | Replacement Icon | Context | Reasoning |
|---------------|------------------|---------|-----------|
| 👋 | `Sparkles` (in hero section) | Welcome greeting | Professional welcome with energy |
| 🚀 | `Brain` (section header) | What Makes Apper Special | Represents AI intelligence |
| 🎨 | `Wand2` (animated bubble) | Interactive Building | Magic wand for creation |
| ✨ | `MessageSquarePlus` | Create Your First App | Communication + creation |

## Course Content

| Original Emoji | Replacement Icon | Context | Reasoning |
|---------------|------------------|---------|-----------|
| Various section emojis | `{section.icon \|\| "BookOpen"}` | Section headers | Dynamic, semantic icons |
| 🏆 | `Trophy` | Course completion | Achievement and success |

## Component-Level Icons

### StepContent.jsx
- **Hero Icon**: `Sparkles` (w-16 h-16) - Main welcome graphic
- **Section Headers**: `Brain` (w-6 h-6) - AI/intelligence theme
- **Animated Bubble**: `Wand2` (w-6 h-6) - Magic/creation theme
- **Prompt Box**: `MessageSquarePlus` (w-8 h-8) - Communication interface
- **Examples**: `Lightbulb` (w-6 h-6) - Ideas and inspiration
- **Pro Tips**: `Sparkles` (w-6 h-6) - Enhanced features

### CourseContent.jsx
- **Section Headers**: Dynamic `{section.icon \|\| "BookOpen"}` (w-6 h-6)
- **Completion**: `Trophy` (w-16 h-16) - Achievement

## Icon Sizing Standards

- **Hero/Main Graphics**: w-16 h-16 (64px)
- **Section Headers**: w-6 h-6 (24px) or w-8 h-8 (32px)
- **Interactive Elements**: w-4 h-4 (16px) to w-6 h-6 (24px)
- **Decorative/Animated**: w-6 h-6 (24px)

## Color Schemes

- **Gradient Backgrounds**: `from-primary to-secondary`
- **Icon Colors**: `text-white` on colored backgrounds
- **Interactive States**: Hover and active state animations preserved

## Accessibility Features

- All icons include proper ARIA labels through Icon component
- Semantic icon choices that match content meaning
- Consistent sizing for better visual hierarchy
- High contrast maintained with gradient backgrounds

## Maintenance Notes

- All icons use the existing `Icon` component from `@/components/atoms/Icon`
- Icons are sourced from Lucide React library
- Fallback icon `BookOpen` used when section.icon is undefined
- Icon names are validated through the ApperIcon component wrapper