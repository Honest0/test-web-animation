# Email Landing Page with Animated Dog 🐾

A modern, responsive email signup landing page featuring smooth animations, a delightful dog character, and a robust backend for email collection.

## 🚀 How to Run Locally

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account (for database)

### Setup Instructions

1. **Clone and install dependencies**
   ```bash
   git clone <repository-url>
   cd email-landing-page
   npm install
   ```

2. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

3. **Set up the database**
   - Create a new Supabase project
   - Run the SQL schema from `supabase-schema.sql` in your Supabase SQL editor
   - This creates the `email_submissions` table with proper indexing and RLS policies

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🛠 Tech Stack & Why

### Frontend
- **Next.js 15** - React framework with App Router for optimal performance and SEO
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS for rapid, consistent styling
- **Framer Motion** - Smooth, performant animations with declarative API
- **Lottie React** - Lightweight, high-quality vector animations

### Backend
- **Supabase** - PostgreSQL database with built-in auth, real-time, and API
- **Next.js API Routes** - Serverless functions for email submission handling

### Why This Stack?

**Next.js 15**: Chosen for its excellent performance, built-in optimizations, and seamless full-stack development experience. The App Router provides better code organization and improved performance.

**Supabase**: Perfect for rapid prototyping and production apps. Provides PostgreSQL with real-time capabilities, built-in authentication, and automatic API generation. Much faster to set up than traditional backend solutions.

**Framer Motion**: Superior animation library that works seamlessly with React. Provides smooth 60fps animations with minimal performance impact and intuitive declarative syntax.

**TypeScript**: Essential for maintainable codebases. Catches errors at compile time and provides excellent IDE support.

## 🎨 Animation Approach & Smoothness

### Animation Strategy
1. **Staggered Entry Animations**: Elements appear sequentially with slight delays for a polished feel
2. **Micro-interactions**: Hover effects, button states, and form feedback enhance user engagement
3. **Lottie Integration**: The dog animation uses Lottie for smooth, scalable vector animations
4. **Performance Optimization**: All animations use `transform` and `opacity` properties for GPU acceleration

### Smoothness Techniques
- **Framer Motion's `useSpring`**: Natural, physics-based animations
- **CSS `will-change`**: Hints to the browser about upcoming animations
- **Reduced motion support**: Respects user preferences for accessibility
- **Optimized re-renders**: Careful state management to prevent unnecessary animation recalculations

### Dog Animation Details
- **Lottie JSON**: Pre-rendered vector animation for consistent performance across devices
- **Dynamic Import**: Loaded client-side only to prevent SSR issues
- **Responsive Sizing**: Scales appropriately on different screen sizes
- **Loop Optimization**: Seamless looping with proper keyframe timing

## 🔐 Backend Choice & Secret Management

### Why Supabase?
- **Rapid Development**: Database, auth, and API ready in minutes
- **PostgreSQL**: Robust, ACID-compliant database with excellent performance
- **Built-in Security**: Row Level Security (RLS) policies for data protection
- **Real-time Capabilities**: Future-ready for live updates
- **Cost-effective**: Generous free tier, scales with usage

### Secret Management Strategy

#### Environment Variables
```env
# Public variables (safe to expose to client)
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# Private variables (server-side only)
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

#### Security Measures
1. **RLS Policies**: Database-level security prevents unauthorized access
2. **Input Validation**: Both client and server-side email validation
3. **Error Handling**: Graceful error responses without exposing internals
4. **Rate Limiting**: Built-in Supabase protection against abuse
5. **Environment Separation**: Clear distinction between public and private keys

#### Database Security
- **Row Level Security**: Enabled on all tables
- **Public Insert Policy**: Allows email submissions from anyone
- **Unique Constraints**: Prevents duplicate email registrations
- **Indexed Queries**: Optimized for performance and security

### API Design
- **RESTful Endpoints**: Clean, predictable API structure
- **Type Safety**: Shared TypeScript types between frontend and backend
- **Error Codes**: Proper HTTP status codes and meaningful error messages
- **Validation**: Comprehensive input validation and sanitization

## 📁 Project Structure

```
src/
├── app/
│   ├── api/submit-email/     # Email submission API
│   ├── globals.css           # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main landing page
├── components/
│   ├── AnimatedDog.tsx      # Lottie dog animation
│   ├── EmailForm.tsx        # Email signup form
│   └── SuccessDialog.tsx    # Success modal
├── lib/
│   ├── supabase.ts          # Database client setup
│   └── types.ts             # Shared TypeScript types
└── animations/
    └── dog.json             # Lottie animation data
```

## 🚀 Deployment

The app is ready for deployment on Vercel, Netlify, or any platform supporting Next.js:

1. **Environment Variables**: Set the same environment variables in your deployment platform
2. **Database**: Ensure your Supabase project is accessible from production
3. **Build**: `npm run build` creates an optimized production build

## 🎯 Features

- ✅ Responsive design (mobile-first)
- ✅ Smooth animations and micro-interactions
- ✅ Email validation and duplicate prevention
- ✅ Success feedback with animated dog
- ✅ TypeScript for type safety
- ✅ Database persistence with Supabase
- ✅ SEO optimized with Next.js
- ✅ Accessible design patterns

## 🔧 Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

---

Built with ❤️ using Next.js, Supabase, and Framer Motion