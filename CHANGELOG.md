# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.3] - 2024-12-19

### 🚀 Major Architecture Updates

#### Added
- **Tailwind CSS v4 Support**: Upgraded to the latest Tailwind CSS for improved performance and features
- **CSS Inlining**: All styles are now automatically inlined into JavaScript bundles
- **Scoped Styling**: Added `pka:` prefix to all Tailwind utilities to prevent style conflicts
- **Zero CSS Dependencies**: No external CSS imports required
- **Modern Build Pipeline**: Migrated from Sass to pure CSS with Vite optimization

#### Changed
- **BREAKING**: Removed requirement for CSS import (`@pakt/auth-module/dist/styles.css`)
- **Performance**: Bundle now includes optimized, inlined styles
- **Architecture**: Migrated from Sass preprocessor to pure CSS with Tailwind v4
- **Class Naming**: Updated all component classes from `pka-*` to `pka:*` variant syntax
- **Bundle Size**: ES module ~399KB, CommonJS ~315KB (includes all styles)

#### Removed
- **Sass Dependencies**: No longer requires `sass` or SCSS preprocessing
- **External CSS Files**: Eliminates need for separate stylesheet imports
- **Style Conflicts**: Scoped classes prevent conflicts with application styles

#### Fixed
- **CSS Compatibility**: Resolved Tailwind v4 compatibility issues
- **Missing Utilities**: All Tailwind classes now properly available
- **Build Optimization**: Improved build process for better performance

### 📚 Documentation Updates

#### Added
- **Migration Guide**: Step-by-step upgrade instructions
- **Technical Architecture**: Detailed styling and bundle information
- **Browser Compatibility**: Updated requirements and support matrix
- **Development Guide**: Instructions for building from source

#### Changed
- **Quick Start**: Updated to reflect CSS-free integration
- **Examples**: Removed CSS import requirements from all code samples
- **Features**: Enhanced feature list with new capabilities

## [0.0.2] - Previous Release

### Features
- Email/Password authentication
- Google OAuth integration
- Two-factor authentication
- Password reset functionality
- Email verification
- Customizable theming
- TypeScript support

---

## Migration from v0.0.2 to v0.0.3

### Required Changes

1. **Remove CSS Import**:
   ```typescript
   // ❌ Remove this line
   import '@pakt/auth-module/dist/styles.css';
   ```

2. **Update Dependencies** (if needed):
   ```bash
   yarn add @pakt/auth-module@^0.0.3
   ```

### Benefits

- **Simplified Integration**: No CSS management required
- **Better Performance**: Optimized, inlined styles
- **No Conflicts**: Scoped classes prevent style conflicts
- **Modern Architecture**: Built with latest Tailwind CSS v4
- **Zero Config**: Works out of the box without additional setup

### API Compatibility

All component APIs remain fully compatible. No code changes required beyond removing the CSS import.