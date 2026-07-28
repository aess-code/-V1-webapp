# Pulse Protocol - Logo Usage Guide

**Version**: 1.0  
**Status**: Official  
**Last Updated**: 2026-07-27

---

## 1. Official Logo Asset

### 1.1 Logo File

**Location**: `client/public/brand/logo/pulse-logo.png`

**Specifications**:
- Format: PNG with transparency
- Dimensions: 1024×1024 pixels
- Color Space: RGB
- Aspect Ratio: 1:1 (square)
- File Size: ~1.4 MB

### 1.2 Logo Description

**Visual Elements**:
- Eye-shaped frame with blue-to-purple gradient
- Central circle containing heartbeat/pulse waveform
- White accent elements for contrast
- Geometric, modern design language

**Color Composition**:
- Primary Gradient: Cyan Blue (#0EA5E9) → Royal Blue (#2563EB) → Deep Purple (#7C3AED)
- Accent: Pure White (#FFFFFF)
- Background: Transparent

---

## 2. Logo Usage Rules

### 2.1 ✅ ALLOWED

- **Proportional Scaling**: Resize while maintaining 1:1 aspect ratio
- **Different Output Sizes**: favicon, app icon, header, hero sections
- **Transparent Background**: Use on any colored background
- **Monochrome Conversion**: For specific contexts (print, limited color)
- **Placement**: Any location on website or application

### 2.2 ❌ NOT ALLOWED

- **Redesign or Modification**: Do not alter the visual design
- **Color Changes**: Do not modify the gradient or colors
- **Gradient Alterations**: Do not change the gradient direction or colors
- **Proportion Changes**: Do not distort or change aspect ratio
- **Redrawing or Tracing**: Do not recreate the logo
- **Cropping or Clipping**: Do not crop the logo
- **Shadow or Effects**: Do not add drop shadows, glows, or effects
- **Visual Effect Changes**: Do not modify transparency or visual appearance

---

## 3. Logo Sizing Guidelines

### 3.1 Minimum Size

**Minimum Recommended Size**: 32px × 32px

**Usage**: Favicon, small icons

**Note**: Below 32px, logo details may become unclear. Avoid sizes smaller than this.

### 3.2 Recommended Sizes

| Size | Usage | Context |
|------|-------|---------|
| **32×32 px** | Favicon, browser tab | Browser |
| **40×40 px** | Header logo | Navigation bar |
| **64×64 px** | Hero section | Large display |
| **180×180 px** | Apple touch icon | iOS home screen |
| **192×192 px** | Android app icon | PWA, Android |
| **512×512 px** | PWA splash screen | App installation |

### 3.3 Safe Margin (Clearance)

**Minimum Clear Space**: 8px around logo

**Purpose**: Prevent visual crowding and ensure logo clarity

**Application**: Leave at least 8px of empty space on all sides of the logo

```
┌─────────────────────────────┐
│                             │
│    [8px margin]             │
│    ┌──────────────────┐     │
│    │                  │     │
│    │   Pulse Logo     │     │
│    │                  │     │
│    └──────────────────┘     │
│    [8px margin]             │
│                             │
└─────────────────────────────┘
```

---

## 4. Logo Implementation

### 4.1 HTML Usage

**Standard Logo Display**:
```html
<img 
  src="/brand/logo/pulse-logo.png" 
  alt="Pulse Protocol"
  width="40"
  height="40"
/>
```

**With Link to Home**:
```html
<a href="/">
  <img 
    src="/brand/logo/pulse-logo.png" 
    alt="Pulse Protocol - Home"
    width="40"
    height="40"
  />
</a>
```

**Responsive Logo**:
```html
<picture>
  <source 
    media="(min-width: 1024px)" 
    srcset="/brand/logo/pulse-logo.png"
  />
  <img 
    src="/brand/logo/pulse-logo.png" 
    alt="Pulse Protocol"
    width="40"
    height="40"
  />
</picture>
```

### 4.2 React Component Usage

**Basic Logo Component**:
```tsx
import { brand } from '@/config/brand';

export function Logo({ size = 40 }: { size?: number }) {
  return (
    <img
      src={brand.logo}
      alt={brand.name}
      width={size}
      height={size}
      style={{ aspectRatio: '1 / 1' }}
    />
  );
}
```

**Logo with Link**:
```tsx
import { Link } from 'wouter';
import { brand } from '@/config/brand';

export function LogoLink({ size = 40 }: { size?: number }) {
  return (
    <Link href="/">
      <a className="flex items-center gap-2">
        <img
          src={brand.logo}
          alt={brand.name}
          width={size}
          height={size}
          style={{ aspectRatio: '1 / 1' }}
        />
        <span className="hidden sm:inline font-semibold">
          {brand.name}
        </span>
      </a>
    </Link>
  );
}
```

### 4.3 CSS Usage

**Logo as Background Image**:
```css
.logo-background {
  background-image: url('/brand/logo/pulse-logo.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 40px;
  height: 40px;
  aspect-ratio: 1 / 1;
}
```

**Logo with Hover Effect**:
```css
.logo-hover {
  transition: transform 200ms ease-out;
}

.logo-hover:hover {
  transform: scale(1.05);
}
```

---

## 5. Logo Placement

### 5.1 Header Logo

**Position**: Top-left corner  
**Size**: 36-40px height  
**Spacing**: 16px from edge  
**Click Action**: Navigate to home page  
**Responsive**: Maintains aspect ratio on all breakpoints

**Desktop Layout**:
```
┌─────────────────────────────────────────────────────────┐
│ [Logo] Pulse Protocol    Protocol  Features  Developers │
│                                                Enter App │
└─────────────────────────────────────────────────────────┘
```

**Mobile Layout**:
```
┌──────────────────┐
│ [Logo]    ☰      │
└──────────────────┘
```

### 5.2 Hero Section Logo

**Position**: Center of hero section  
**Size**: 64-96px  
**Animation**: Subtle breathing effect (optional)  
**Background**: Dark background for contrast

### 5.3 Footer Logo

**Position**: Bottom-left corner  
**Size**: 32px  
**Spacing**: 24px from edges  
**Context**: With protocol name and slogan

### 5.4 Favicon

**Location**: `client/public/brand/logo/favicon.ico`  
**Size**: 32×32, 64×64 pixels  
**Format**: ICO  
**Usage**: Browser tab, bookmarks

### 5.5 App Icons

**Apple Touch Icon**:
- Location: `client/public/brand/logo/apple-touch-icon.png`
- Size: 180×180 pixels
- Usage: iOS home screen

**Android Icon (192px)**:
- Location: `client/public/brand/logo/icon-192.png`
- Size: 192×192 pixels
- Usage: Android app icon

**Android Icon (512px)**:
- Location: `client/public/brand/logo/icon-512.png`
- Size: 512×512 pixels
- Usage: PWA splash screen

---

## 6. Logo on Different Backgrounds

### 6.1 Dark Background

**Recommended**: Primary use case  
**Background Color**: #0F172A (dark navy)  
**Logo Appearance**: Bright, clear, high contrast

```
┌─────────────────────┐
│ ░░░░░░░░░░░░░░░░░░░│
│ ░░░░░ [Logo] ░░░░░░│
│ ░░░░░░░░░░░░░░░░░░░│
└─────────────────────┘
Dark Background (#0F172A)
```

### 6.2 Light Background

**Not Recommended**: Avoid if possible  
**If Required**: Add semi-transparent dark overlay behind logo

```
┌─────────────────────┐
│ ░░░░░░░░░░░░░░░░░░░│
│ ░░░░░ [Logo] ░░░░░░│
│ ░░░░░░░░░░░░░░░░░░░│
└─────────────────────┘
Dark Overlay + Light Background
```

### 6.3 Gradient Background

**Recommended**: Use with dark gradients  
**Avoid**: Light or pastel gradients

---

## 7. Logo Animation Guidelines

### 7.1 Breathing Animation (Loading State)

**Purpose**: Indicate loading or processing  
**Duration**: 1 second loop  
**Effect**: Subtle opacity and scale change

**CSS**:
```css
@keyframes pulse-breathing {
  0%, 100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
}

.logo-loading {
  animation: pulse-breathing 1s ease-in-out infinite;
}
```

### 7.2 Hover Animation

**Purpose**: Indicate interactivity  
**Duration**: 200ms  
**Effect**: Scale up slightly

**CSS**:
```css
.logo-interactive {
  transition: transform 200ms ease-out;
}

.logo-interactive:hover {
  transform: scale(1.1);
}
```

### 7.3 Entrance Animation

**Purpose**: Page load animation  
**Duration**: 500ms  
**Effect**: Fade in with scale

**CSS**:
```css
@keyframes logo-entrance {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.logo-entrance {
  animation: logo-entrance 500ms ease-out;
}
```

---

## 8. Logo in Different Contexts

### 8.1 Navigation Bar

**Size**: 40px  
**Position**: Top-left  
**Style**: With text label on desktop, text hidden on mobile

### 8.2 Hero Section

**Size**: 64-96px  
**Position**: Center  
**Style**: Prominent, possibly with animation

### 8.3 Footer

**Size**: 32px  
**Position**: Bottom-left  
**Style**: With protocol name and slogan

### 8.4 Social Media

**Size**: 200×200 pixels minimum  
**Format**: PNG with transparent background  
**Usage**: Profile pictures, cover images

### 8.5 Documentation

**Size**: 64px  
**Position**: Top-left or center  
**Style**: Clear and prominent

### 8.6 Email Signature

**Size**: 32-48px  
**Format**: PNG or embedded image  
**Style**: With link to website

---

## 9. Logo Accessibility

### 9.1 Alt Text

**Always Include**: Descriptive alt text for screen readers

**Examples**:
- `alt="Pulse Protocol"`
- `alt="Pulse Protocol - Home"`
- `alt="Pulse Protocol Logo"`

### 9.2 ARIA Labels

**For Interactive Logos**:
```html
<a 
  href="/" 
  aria-label="Pulse Protocol - Go to home page"
>
  <img 
    src="/brand/logo/pulse-logo.png" 
    alt="Pulse Protocol"
    width="40"
    height="40"
  />
</a>
```

### 9.3 Focus States

**Ensure Visible Focus Ring**:
```css
.logo-link:focus {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
  border-radius: 4px;
}
```

---

## 10. Logo Performance

### 10.1 Image Optimization

**Format**: PNG (lossless)  
**Compression**: Optimized for web  
**Size**: ~1.4 MB (original), ~50-100 KB (optimized)

### 10.2 Lazy Loading

**For Below-the-Fold Logos**:
```html
<img 
  src="/brand/logo/pulse-logo.png" 
  alt="Pulse Protocol"
  loading="lazy"
  width="40"
  height="40"
/>
```

### 10.3 Responsive Images

**Using srcset**:
```html
<img 
  src="/brand/logo/pulse-logo.png"
  srcset="
    /brand/logo/pulse-logo.png 1x,
    /brand/logo/pulse-logo.png 2x
  "
  alt="Pulse Protocol"
  width="40"
  height="40"
/>
```

---

## 11. Logo Asset Management

### 11.1 File Structure

```
client/public/brand/
├── logo/
│   ├── pulse-logo.png          # Main logo (1024×1024)
│   ├── favicon.ico             # Browser favicon
│   ├── apple-touch-icon.png    # iOS home screen (180×180)
│   ├── icon-192.png            # Android app icon (192×192)
│   └── icon-512.png            # PWA splash screen (512×512)
├── og/
│   └── og-image.png            # Open Graph image (1200×630)
└── manifest/
    └── site.webmanifest        # PWA manifest
```

### 11.2 Centralized Configuration

**All logo paths are defined in**: `client/src/config/brand.ts`

**Never hardcode logo paths in components**. Import from brand config:

```tsx
import { brand } from '@/config/brand';

// Use brand.logo instead of hardcoding path
<img src={brand.logo} alt={brand.name} />
```

---

## 12. Verification Checklist

- [ ] Logo displays correctly at all sizes
- [ ] Logo maintains aspect ratio (1:1)
- [ ] Logo has sufficient clear space (8px margin)
- [ ] Logo is accessible (alt text, ARIA labels)
- [ ] Logo animations are smooth and performant
- [ ] Logo works on all backgrounds
- [ ] Logo is responsive on mobile, tablet, desktop
- [ ] Logo file is optimized for web
- [ ] All logo references use brand config
- [ ] No hardcoded logo paths in code

---

## 13. Troubleshooting

### Issue: Logo appears blurry or pixelated

**Solution**: Ensure size is at least 32px. Use higher resolution source if available.

### Issue: Logo colors don't match

**Solution**: Verify background color. Logo uses RGB color space. Check browser color management.

### Issue: Logo animation is jerky

**Solution**: Use `transform` and `opacity` only. Avoid animating `width`, `height`, or `position`.

### Issue: Logo doesn't display

**Solution**: Verify file path in `brand.ts`. Check file exists at `client/public/brand/logo/pulse-logo.png`.

---

## 14. Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-07-27 | Initial logo usage guide |

---

**Status**: Official  
**Approval**: Pulse Protocol Team  
**Last Review**: 2026-07-27
