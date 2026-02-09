<!-- # Noir Lounge - Restaurant & Bar Management System

A modern, full-stack web application for managing a luxury lounge and bar. Built with Next.js 16, React 19, TypeScript, Tailwind CSS, and Supabase.

## Features

### Public Features
- **Homepage** - Elegant landing page with hero section, features, and call-to-action
- **Menu Display** - Dynamic menu organized by categories (Signature Cocktails, Classic Cocktails, Small Chops, Non-Alcoholic)
- **Online Reservations** - Guest booking system with form validation
- **About Page** - Company story, mission, values, and team
- **FAQ Page** - Common questions and answers
- **Policy Page** - Terms of Service, Privacy Policy, Cookie Policy
- **Theme Toggle** - Dark/Light mode support

### Admin Features
- **Secure Authentication** - Admin signup with special access key validation
- **Dashboard** - Overview statistics for reservations and menu items
- **Reservation Management** - View, update status (pending/confirmed/cancelled), and delete reservations
- **Menu Management** - Toggle item availability in real-time
- **Protected Routes** - Middleware-based authentication and authorization

## Tech Stack

- **Framework**: Next.js 16.0.10 (App Router)
- **UI Library**: React 19.2.0
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with Tailwind CSS Animate
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth with Row Level Security (RLS)
- **Components**: Shadcn UI (Radix UI primitives)
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation
- **Theme**: Next Themes for dark/light mode

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- A Supabase account and project

### Installation

1. **Clone or download the project**

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory (see `.env.example` for reference):
   
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   
   # Site Configuration
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000
   
   # Admin Configuration (server-side only)
   ADMIN_SIGNUP_KEY=NOIR_ADMIN_2024
   ```

4. **Set up the database**

   The project includes SQL migration scripts in the `scripts/` directory:
   
   - `001_create_tables.sql` - Creates tables and RLS policies
   - `002_seed_data.sql` - Adds sample menu data
   
   Run these scripts in your Supabase SQL Editor or use the v0 interface to execute them.

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Database Schema

### Tables

#### `categories`
- `id` (UUID, primary key)
- `name` (TEXT, category name)
- `slug` (TEXT, unique identifier)
- `description` (TEXT, optional description)
- `display_order` (INTEGER, for sorting)
- `created_at` / `updated_at` (TIMESTAMPTZ)

#### `menu_items`
- `id` (UUID, primary key)
- `category_id` (UUID, foreign key to categories)
- `name` (TEXT, item name)
- `description` (TEXT, optional)
- `price` (DECIMAL, in Naira)
- `image_url` (TEXT, optional)
- `is_available` (BOOLEAN, toggle visibility)
- `display_order` (INTEGER, for sorting)
- `created_at` / `updated_at` (TIMESTAMPTZ)

#### `reservations`
- `id` (UUID, primary key)
- `guest_name` (TEXT)
- `guest_email` (TEXT)
- `guest_phone` (TEXT)
- `party_size` (INTEGER, 1-12)
- `reservation_date` (DATE)
- `reservation_time` (TIME)
- `special_requests` (TEXT, optional)
- `status` (TEXT, enum: pending/confirmed/cancelled)
- `created_at` / `updated_at` (TIMESTAMPTZ)

### Row Level Security (RLS)

All tables have RLS enabled with the following policies:

- **Categories & Menu Items**:
  - Anyone can view (SELECT)
  - Only admins can insert, update, or delete
  
- **Reservations**:
  - Anyone can create (INSERT)
  - Only admins can view, update, or delete

Admin verification is based on `user.user_metadata.is_admin === true`

## Admin Access

### Creating an Admin Account

1. Navigate to `/admin/signup`
2. Enter your email and password
3. Enter the admin access key (default: `NOIR_ADMIN_2024`)
4. Complete email verification
5. Log in at `/admin/login`

### Admin Routes

- `/admin` - Admin hub
- `/admin/dashboard` - Statistics overview
- `/admin/reservations` - Manage reservations
- `/admin/menu` - Toggle menu item availability

## Project Structure

```
├── app/
│   ├── actions/          # Server actions
│   │   ├── auth.ts       # Admin signup logic
│   │   ├── admin.ts      # Reservation/menu management
│   │   └── reservations.ts # Guest reservation creation
│   ├── admin/            # Admin dashboard pages
│   │   ├── login/
│   │   ├── signup/
│   │   ├── dashboard/
│   │   ├── reservations/
│   │   └── menu/
│   ├── about/            # About page
│   ├── faq/              # FAQ page
│   ├── menu/             # Public menu display
│   ├── policy/           # Site policies
│   ├── reservations/     # Guest booking
│   ├── globals.css       # Global styles with theme tokens
│   ├── layout.tsx        # Root layout with theme provider
│   └── page.tsx          # Homepage
├── components/
│   ├── ui/               # Shadcn UI components
│   ├── admin-nav.tsx     # Admin navigation
│   ├── dashboard-stats.tsx
│   ├── footer.tsx
│   ├── hero-section.tsx
│   ├── menu-manager.tsx
│   ├── navigation.tsx
│   ├── reservation-form.tsx
│   ├── reservations-table.tsx
│   ├── theme-provider.tsx
│   └── theme-toggle.tsx
├── lib/
│   └── supabase/         # Supabase client utilities
│       ├── client.ts     # Browser client
│       ├── server.ts     # Server client
│       └── proxy.ts      # Middleware for auth
├── scripts/              # Database migrations
│   ├── 001_create_tables.sql
│   └── 002_seed_data.sql
├── proxy.ts              # Next.js middleware
└── README.md
```

## Environment Variables Reference

| Variable | Type | Description | Required |
|----------|------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Public | Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public | Supabase anonymous/public key | Yes |
| `NEXT_PUBLIC_SITE_URL` | Public | Production site URL | Yes |
| `NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL` | Public | Development redirect URL | No |
| `ADMIN_SIGNUP_KEY` | Private | Secret key for admin registration | Yes |

**Note**: Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Keep `ADMIN_SIGNUP_KEY` private (server-side only).

## Deployment

### Deploy to Vercel

1. Push your code to a Git repository (GitHub, GitLab, Bitbucket)
2. Import your repository in Vercel
3. Add environment variables in Vercel project settings
4. Deploy

### Post-Deployment

1. Run database migrations in your Supabase project
2. Update `NEXT_PUBLIC_SITE_URL` to your production domain
3. Test admin signup and login flows
4. Verify RLS policies are working correctly

## Security Considerations

- Admin signup key validation happens server-side only
- All admin routes protected by middleware
- Row Level Security enforced at database level
- Passwords hashed by Supabase Auth
- Email verification required for admin accounts
- HTTPS enforced in production

## Customization

### Changing the Admin Key

Update the `ADMIN_SIGNUP_KEY` environment variable in your `.env.local` and Vercel settings.

### Modifying Menu Categories

Edit `scripts/002_seed_data.sql` or use the Supabase dashboard to add/edit categories.

### Theme Colors

Customize theme colors in `app/globals.css` under the `@theme inline` section.

### Business Hours

Update time validation in `components/reservation-form.tsx` (currently 18:00-23:00).

## Troubleshooting

### "Invalid admin key" error
- Verify `ADMIN_SIGNUP_KEY` is set correctly in environment variables
- Restart your development server after changing `.env.local`

### Database connection errors
- Verify Supabase credentials in `.env.local`
- Check if RLS policies are enabled
- Ensure database migrations have been run

### Admin routes redirect to login
- Verify user has `is_admin: true` in user metadata
- Check middleware configuration in `lib/supabase/proxy.ts`

## Support

For issues or questions:
- Review the FAQ page at `/faq`
- Check Supabase documentation for database/auth issues
- Review Next.js documentation for framework questions

## License

Private project - All rights reserved.

---

Built with ❤️ using Next.js, React, TypeScript, Tailwind CSS, and Supabase. -->
