# debugtools

A professional collection of 30+ developer tools built with Next.js 14 and React. Fast, reliable, and always free - featuring a clean, minimal design with cloud sync capabilities.

[![GitHub stars](https://img.shields.io/github/stars/jasimvk/mydebugtools?style=social)](https://github.com/jasimvk/mydebugtools/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/jasimvk/mydebugtools)](https://github.com/jasimvk/mydebugtools/issues)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/jasimvk/mydebugtools/actions)
[![Next.js](https://img.shields.io/badge/Next.js-14.1.0-black.svg)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://react.dev/)

## ✨ Features

### 🔧 Core Developer Tools

- **API Tester** ⭐ - Professional REST API client with collections, authentication, and cloud sync
  - 🔐 Optional Google OAuth for cloud sync
  - 📁 Organize requests in collections
  - 💾 Works offline with localStorage
  - ☁️ Sync collections across devices
  - 🔑 Bearer Token Wizard with auto-refresh
  - 📋 Multiple authentication methods (Basic, Bearer, API Key)
  - 🎯 Request history tracking
  - 📤 Import/Export collections
  
- **JSON Tools** - Comprehensive JSON manipulation toolkit with advanced features
  - ✨ Format and beautify JSON with syntax highlighting
  - ✅ Validate JSON with error detection
  - 🗜️ Minify and compress JSON
  - 🔄 Transform and restructure JSON data
  - 📋 Copy formatted output
  - 🌐 Load JSON from URLs
  - 📁 Import/Export JSON files
  - 🎨 Multiple view modes (Tree, Code, Preview)
  
- **JWT Decoder** - Decode and verify JWT tokens with detailed header/payload inspection
- **Base64 Converter** - Encode/decode text and files (images, PDFs) to Base64
- **Code Diff** - Side-by-side code comparison with syntax highlighting
- **HTTP Status** - Complete HTTP status codes reference with descriptions

### 🚀 Additional Tools

- **Regex Tester** - Test regular expressions with real-time matching
- **CSS Tools** - Minify, beautify, and validate CSS code
- **HTML Tools** - Format, minify, and validate HTML
- **Markdown Preview** - Live markdown editor with preview
- **Icon Finder** - Search and download icons for your projects
- **Crash Beautifier** - Format and analyze stack traces
- **Build Diff** - Compare build outputs
- **Bundle Analyzer** - Analyze JavaScript bundle sizes
- **Color Picker** - Color tools and palette generator
- **And 20+ more tools!**

## 🎨 Design

Built with a clean, professional interface inspired by Postman:
- ✅ Inter font (same as Postman)
- ✅ No animations or distractions
- ✅ Clean white navbar with subtle borders
- ✅ Full-width layouts for maximum workspace
- ✅ Mobile-responsive design
- ✅ Professional color scheme (#FF6C37 orange accent)
- ✅ Custom orange Terminal icon favicon
- ✅ Professional OG image for social sharing
- ✅ SEO-optimized metadata
- ✅ Modern responsive layouts with improved spacing and typography
- ✅ Enhanced card designs with hover effects and scale transforms
- ✅ Dark gradient footers with better visual hierarchy
- ✅ Accessible accordion components for FAQ

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm 9.x or later

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/jasimvk/mydebugtools.git
   cd mydebugtools
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   
   Create a `.env.local` file in the root directory:
   
   **For basic usage (tools only):**
   ```env
   # Optional: Google Analytics
   NEXT_PUBLIC_GA_MEASUREMENT_ID=your-ga-id
   
   # Optional: Google AdSense
   NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-your-id
   ```
   
   **For API Tester with cloud sync (optional):**
   ```env
   # NextAuth Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secure-random-secret
   
   # Google OAuth (for cloud sync)
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   
   # Supabase (for cloud storage)
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-key
   ```
   
   > **Note:** The app works perfectly fine without authentication. Cloud sync is optional for users who want to save collections across devices. See [GOOGLE_OAUTH_QUICK_SETUP.md](GOOGLE_OAUTH_QUICK_SETUP.md) for detailed setup instructions.

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser**

### Available Scripts

```bash
npm run dev      # Start development server (port 3000)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
npm run test     # Run tests with Jest
```

## 🛠️ Tech Stack

### Core
- **Framework:** Next.js 14 (App Router)
- **UI Library:** React 18
- **Language:** TypeScript
- **Styling:** Tailwind CSS 3

### Authentication & Database (Optional)
- **Authentication:** NextAuth.js 4.24 (JWT strategy)
- **OAuth Provider:** Google OAuth 2.0
- **Database:** Supabase PostgreSQL
- **Storage:** Row Level Security (RLS) enabled

### UI & Design
- **Icons:** Heroicons, Lucide React
- **Font:** Inter (Google Fonts)
- **Color Scheme:** #FF6C37 (Orange accent)

### Analytics & Monitoring
- **Analytics:** Google Analytics 4
- **Testing:** Jest, React Testing Library
- **Code Quality:** ESLint, TypeScript

### Key Features
- 🔄 Hybrid storage (localStorage + cloud sync)
- 🔐 Optional authentication (Google OAuth)
- 📱 Responsive design
- ⚡ Server-side rendering (SSR)
- 🎨 Postman-inspired interface
- 🌐 SEO optimized

## 🤝 How to Contribute

We welcome contributions of all kinds! Here's how you can help:

### Quick Contribution Steps

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit with clear messages**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
5. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Contribution Ideas

- 🐛 Report bugs or fix existing ones
- ✨ Suggest or implement new tools
- 📖 Improve documentation
- 🎨 Enhance UI/UX
- ⚡ Performance improvements
- 🧪 Add tests

For detailed guidelines, see [CONTRIBUTING.md](CONTRIBUTING.md)

## 🎯 API Tester - Flagship Feature

The API Tester is our most advanced tool - a professional REST API client with cloud sync:

### Core Features
- **🔓 Works Without Sign-In** - Use all features locally without authentication
- **☁️ Optional Cloud Sync** - Sign in with Google to sync collections across devices
- **📁 Collections** - Organize your API requests into collections
- **💾 Hybrid Storage** - Works offline with localStorage, syncs to cloud when signed in
- **🔑 Authentication Support** - Basic, Bearer, and API Key authentication
- **🔄 Auto Token Refresh** - Bearer Token Wizard with automatic refresh
- **📤 Import/Export** - Import Postman collections, export to JSON
- **🎨 Clean UI** - Postman-inspired interface with tabs and sidebar

### How It Works
1. **Local Mode (Default)** - All collections saved to browser localStorage
2. **Sign In (Optional)** - Click "Sign in to Sync" to enable cloud features:
   - ☁️ Automatic sync to Supabase database
   - 🔄 Manual sync button for on-demand updates
   - 📱 Access collections from any device
   - 💾 Permanent cloud backup
3. **Auto-Sync** - Local collections automatically upload on first sign-in
4. **Offline Support** - Continue working locally even without internet

### Documentation
- [GOOGLE_OAUTH_QUICK_SETUP.md](GOOGLE_OAUTH_QUICK_SETUP.md) - OAuth setup guide
- [SUPABASE_SETUP.md](SUPABASE_SETUP.md) - Database configuration
- [COLLECTION_SYNC_GUIDE.md](COLLECTION_SYNC_GUIDE.md) - Sync troubleshooting
- [QA_REPORT.md](QA_REPORT.md) - Comprehensive QA report

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Fork this repository**

2. **Deploy to Vercel:**
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/jasimvk/mydebugtools)

3. **Add Environment Variables** (optional - only if you want cloud sync):
   ```
   NEXTAUTH_URL=https://your-domain.com
   NEXTAUTH_SECRET=your-secure-random-secret
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-key
   ```

4. **Configure Google OAuth** (if using cloud sync):
   - Add redirect URIs in Google Cloud Console:
     - `https://your-domain.com/api/auth/callback/google`
     - `https://www.your-domain.com/api/auth/callback/google`

### Build Status
- **Local Build:** ✅ Passing (36 pages generated, 85kB shared JS)
- **GitHub Actions:** ✅ Passing (Node 18.x & 20.x tested)
- **Vercel Deployment:** ✅ Production-ready (with --legacy-peer-deps)
- **Browser Support:** Modern browsers (Chrome, Firefox, Safari, Edge)

> **Note:** The app works perfectly without environment variables. All tools function locally without any backend setup.

### WWW Redirect Configuration

Automatic www to non-www redirect is included in `vercel.json`:
```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install --legacy-peer-deps",
  "framework": "nextjs",
  "redirects": [{
    "source": "/:path*",
    "has": [{"type": "host", "value": "www.your-domain.com"}],
    "destination": "https://your-domain.com/:path*",
    "permanent": true
  }]
}
```

**Key Deployment Optimizations:**
- `--legacy-peer-deps` flag: Resolves peer dependency conflicts during installation
- Automatic pre-rendering of 36 pages
- Optimized JavaScript bundle (85kB shared)
- Full SSR support for dynamic routes

## 💬 Community & Support

- **🐛 Found a bug?** [Open an issue](https://github.com/jasimvk/mydebugtools/issues)
- **💡 Feature request?** [Start a discussion](https://github.com/jasimvk/mydebugtools/discussions)
- **❓ Questions?** Check our [FAQ](https://debugtools.org) or open an issue

## 📁 Project Structure

```
mydebugtools/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/                # API routes
│   │   │   ├── auth/          # NextAuth endpoints
│   │   │   ├── collections/   # Collection CRUD
│   │   │   └── requests/      # Request CRUD
│   │   ├── components/         # Shared components
│   │   │   ├── AdSlot.tsx     # Google AdSense integration
│   │   │   ├── GoogleAnalytics.tsx
│   │   │   └── Navigation.tsx
│   │   ├── tools/              # Tool pages
│   │   │   ├── layout.tsx     # Tools layout (navbar + footer)
│   │   │   ├── api/           # API Tester (with auth & sync)
│   │   │   │   ├── page.tsx   # Main API Tester component (3345 lines)
│   │   │   │   └── hooks/
│   │   │   │       └── useCollections.ts  # Collection sync logic
│   │   │   ├── all/           # All Tools Grid Page
│   │   │   ├── json/          # JSON Tools
│   │   │   ├── jwt/           # JWT Decoder
│   │   │   ├── base64/        # Base64 Converter
│   │   │   ├── code-diff/     # Code Diff
│   │   │   └── ...            # 25+ more tools
│   │   ├── faq/               # FAQ page
│   │   ├── contact/           # Contact page
│   │   ├── privacy-policy/    # Privacy policy page
│   │   ├── icon.tsx           # Dynamic favicon generator (Terminal icon)
│   │   ├── page.tsx           # Homepage
│   │   ├── layout.tsx         # Root layout with metadata
│   │   └── globals.css        # Global styles
│   ├── components/             # Reusable components
│   │   └── ui/                # UI components
│   ├── lib/                   # Utility functions
│   │   ├── utils.ts
│   │   └── supabase-admin.ts  # Supabase client
│   └── __tests__/             # Test files
├── supabase/                   # Database schema
│   └── schema.sql             # 9 tables with RLS
├── public/                     # Static assets
│   ├── og-image.svg           # OG image for social sharing (1200x630px)
│   ├── favicon.svg            # SVG favicon backup
│   ├── ads.txt                # AdSense verification
│   ├── sitemap.xml            # SEO sitemap
│   ├── robots.txt             # SEO robots
│   └── screenshots/           # Marketing screenshots
├── chrome-extension/           # Chrome extension files
├── scripts/                    # Build scripts
│   └── generate-sitemap.js
├── vercel.json                 # Vercel deployment config
├── QA_REPORT.md               # Comprehensive QA report
└── ...
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Heroicons](https://heroicons.com/) - Icon library
- [Lucide React](https://lucide.dev/) - Icon library
- [Inter Font](https://fonts.google.com/specimen/Inter) - Typography
- And all our amazing [contributors](https://github.com/jasimvk/mydebugtools/graphs/contributors)!

## ⭐ Support the Project

If you find debugtools helpful, please consider:
- ⭐ [Star the repository](https://github.com/jasimvk/mydebugtools)
- ☕ [Buy me a coffee](https://buymeacoffee.com/jasimvk) - Support development
- 🐦 [Share on Twitter](https://twitter.com/intent/tweet?text=Check%20out%20debugtools%20-%20A%20collection%20of%2030%2B%20developer%20tools&url=https://github.com/jasimvk/mydebugtools)
- 🐛 Report bugs and suggest features
- 🤝 Contribute code or documentation
- 💬 Spread the word!

## 🗺️ Roadmap

### Completed ✅
- [x] JSON Tools with validation
- [x] JWT Decoder
- [x] Base64 Converter
- [x] Code Diff Tool
- [x] HTTP Status Reference
- [x] Chrome Extension
- [x] API Tester with Collections
- [x] Google OAuth Authentication
- [x] Cloud Sync with Supabase
- [x] Hybrid Local + Cloud Storage
- [x] Bearer Token Auto-Refresh
- [x] All Tools Grid Page (5-column responsive layout)
- [x] FAQ Page with 10 FAQs
- [x] Contact Page with responsive design
- [x] Professional Branding (orange Terminal icon favicon)
- [x] OG Image for social sharing
- [x] Optimized Metadata for SEO
- [x] Modern Layout Improvements (enhanced typography, spacing, hover effects)
- [x] Dark Gradient Footers with improved visual hierarchy
- [x] Responsive Card Designs with scale transforms and shadows

### In Progress 🚧
- [ ] Request History Tracking
- [ ] Environment Variables Management
- [ ] Team Collaboration Features

### Planned 📋
- [ ] Database Query Tool
- [ ] Performance Monitoring
- [ ] API Mocking Tool
- [ ] GraphQL Playground
- [ ] WebSocket Tester
- [ ] Request Templates Library
- [ ] Shareable Collection Links

Check our full [Roadmap](https://debugtools.org/roadmap) for more details.

---

**Developed & Maintained by [Jasim](https://x.com/jasimvk)**

Made with ❤️ for developers, by developers.
