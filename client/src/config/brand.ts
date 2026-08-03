/**
 * Pulse Protocol - Official Brand Configuration
 * 
 * Centralized brand identity management.
 * All brand information is defined here to ensure consistency across the application.
 * 
 * DO NOT hardcode brand names, logos, or links in components.
 * Import from this file instead.
 */

export const brand = {
  // ============================================================================
  // Official Names
  // ============================================================================
  
  /** Full official name */
  name: 'Pulse Protocol',
  
  /** Short name for compact display */
  shortName: 'Pulse',
  
  /** Official slogan */
  slogan: 'VIEW. ANALYZE. STAKE. BELIEVE.',
  
  /** Brand tagline */
  tagline: 'A decentralized protocol for permissionless opinion market creation.',
  
  // ============================================================================
  // Logo & Assets
  // ============================================================================
  
  /** Logo path (PNG format) */
  logo: '/brand/logo/pulse-logo.png',
  
  /** Logo path for dark theme */
  logoDark: '/brand/logo/pulse-logo.png',
  
  /** Favicon path */
  favicon: '/brand/logo/favicon.ico',
  
  /** Apple touch icon for iOS */
  appleTouchIcon: '/brand/logo/apple-touch-icon.png',
  
  /** Android app icon (192x192) */
  icon192: '/brand/logo/icon-192.png',
  
  /** Android app icon (512x512) */
  icon512: '/brand/logo/icon-512.png',
  
  /** Open Graph image for social media */
  ogImage: '/brand/og/og-image.png',
  
  // ============================================================================
  // Colors
  // ============================================================================
  
  colors: {
    // Primary brand colors (from logo)
    primary: '#2563EB',      // Blue
    primaryLight: '#0EA5E9',  // Cyan (gradient start)
    primaryDark: '#7C3AED',   // Purple (gradient end)
    
    // Semantic colors
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
    info: '#0EA5E9',
    
    // Neutral colors (dark theme)
    background: '#0F172A',
    surface: '#1E293B',
    surfaceLight: '#334155',
    text: '#F1F5F9',
    textSecondary: '#CBD5E1',
    border: '#334155',
    muted: '#64748B',
  },
  
  // ============================================================================
  // Gradients
  // ============================================================================
  
  gradients: {
    /** Primary brand gradient (Cyan → Blue → Purple) */
    primary: 'linear-gradient(135deg, #0EA5E9 0%, #2563EB 50%, #7C3AED 100%)',
    
    /** Subtle background gradient */
    subtle: 'linear-gradient(180deg, #1E293B 0%, #0F172A 100%)',
    
    /** Accent gradient for hover states */
    accent: 'linear-gradient(45deg, #0EA5E9 0%, #7C3AED 100%)',
  },
  
  // ============================================================================
  // Typography
  // ============================================================================
  
  typography: {
    fontFamily: {
      sans: 'Inter, system-ui, -apple-system, sans-serif',
      mono: 'Fira Code, Monaco, monospace',
    },
  },
  
  // ============================================================================
  // Social & External Links
  // ============================================================================
  
  links: {
    github:           'https://github.com/aess-code/pulse-protocol-v1',
    githubFrontend:   'https://github.com/aess-code/-V1-webapp',
    docsIndex:        'https://github.com/aess-code/pulse-protocol-v1/tree/main/docs',
    docsApi:          'https://github.com/aess-code/pulse-protocol-v1/blob/main/docs/PULSE_V1_DEVELOPER_API_REFERENCE.md',
    docsConstitution: 'https://github.com/aess-code/pulse-protocol-v1/blob/main/docs/Protocol_Constitution.md',
    x:                'https://x.com/buildonpulse?s=11',
    telegram:         'https://t.me/PulseProtocol_first',
  },
  
  // ============================================================================
  // SEO & Meta
  // ============================================================================
  
  seo: {
    /** Page title */
    title: 'Pulse Protocol - Decentralized Opinion Markets',
    
    /** Meta description */
    description: 'A decentralized protocol for permissionless opinion market creation. View, analyze, stake, and believe in any outcome.',
    
    /** Canonical URL */
    canonical: 'https://pulse.protocol',
    
    /** Theme color for browser chrome */
    themeColor: '#2563EB',
    
    /** Background color for PWA */
    backgroundColor: '#0F172A',
  },
  
  // ============================================================================
  // Logo Specifications
  // ============================================================================
  
  logoSpecs: {
    /** Minimum recommended size */
    minSize: 32,
    
    /** Recommended size for header */
    headerSize: 40,
    
    /** Recommended size for hero section */
    heroSize: 64,
    
    /** Safe margin around logo */
    safeMargin: 8,
    
    /** Aspect ratio (width:height) */
    aspectRatio: '1:1',
  },
  
  // ============================================================================
  // Spacing System
  // ============================================================================
  
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px',
  },
  
  // ============================================================================
  // Border Radius
  // ============================================================================
  
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },
  
  // ============================================================================
  // Animation Timing
  // ============================================================================
  
  animation: {
    /** Quick feedback animations */
    fast: '100ms',
    
    /** Standard animations */
    normal: '200ms',
    
    /** Slow animations */
    slow: '300ms',
    
    /** Very slow animations */
    verySlow: '500ms',
    
    /** Loading animation duration */
    loadingDuration: '1s',
  },
  
  // ============================================================================
  // Responsive Breakpoints
  // ============================================================================
  
  breakpoints: {
    mobile: 320,
    tablet: 641,
    desktop: 1025,
  },
  
  // ============================================================================
  // Copyright & Legal
  // ============================================================================
  
  copyright: {
    year: new Date().getFullYear(),
    owner: 'Pulse Protocol',
    text: `© ${new Date().getFullYear()} Pulse Protocol. All rights reserved.`,
  },
} as const;

/**
 * Type-safe brand configuration
 */
export type Brand = typeof brand;

/**
 * Helper function to get brand color
 */
export const getBrandColor = (key: keyof typeof brand.colors): string => {
  return brand.colors[key];
};

/**
 * Helper function to get brand gradient
 */
export const getBrandGradient = (key: keyof typeof brand.gradients): string => {
  return brand.gradients[key];
};

/**
 * Helper function to get brand link
 */
export const getBrandLink = (key: keyof typeof brand.links): string => {
  return brand.links[key];
};

export default brand;
