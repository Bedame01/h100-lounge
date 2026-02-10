# H100 Lounge & Bar - Premium Reservation & Menu Management System

A modern, full-stack web application for **H100 Lounge & Bar**, a sophisticated lounge offering refined cocktails, curated small chops, and an unparalleled ambiance. Built with Next.js 16, React 19, TypeScript, Tailwind CSS v4, Supabase, and Vercel Blob.

## ✨ Key Features

### For Guests
- **Dynamic Menu Browsing** - Explore cocktails and small chops with beautiful imagery
- **Easy Reservations** - Seamless booking with date/time selection, party size (1-12), and seating preferences
- **Featured Highlights** - Showcase of best menu items on homepage
- **Automated Confirmations** - Email notifications for reservations and status updates
- **Mobile Responsive** - Perfect experience on all devices
- **About & FAQ** - Learn about H100 and get answers to common questions

### For Administrators
- **Secure Admin Panel** - Login with password recovery functionality
- **Dashboard** - Real-time statistics and metrics
- **Reservation Management** - Review, approve, reject, and manage bookings
- **Menu Management** - Upload images via Vercel Blob, set prices, manage availability
- **Email Notifications** - Automated alerts for new reservations and customer updates
- **Settings Control** - Configure venue details and preferences

## 🛠 Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - Latest UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Modern utility-first styling
- **Shadcn/ui** - High-quality component library
- **Lucide React** - Beautiful icons

### Backend
- **Next.js Route Handlers** - Serverless API endpoints
- **Server Actions** - Form handling & mutations
- **Supabase** - PostgreSQL database with auth
- **Vercel Blob** - Image storage for menu items

### Communications
- **Resend** - Transactional email delivery
- **SWR** - Data fetching & caching

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Supabase account and project
- Vercel Blob storage configured
- Resend API key for emails

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd h100-lounge
   npm install
   ```

2. **Set up environment variables**
   
   Create `.env.local`:
   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   POSTGRES_URL=your_postgres_url
   POSTGRES_URL_NON_POOLING=your_postgres_url_non_pooling
   
   # Email
   FROM_EMAIL=noreply@h100lounge.com
   ADMIN_EMAIL=admin@h100lounge.com
   RESEND_API_KEY=your_resend_api_key
   
   # Storage
   BLOB_READ_WRITE_TOKEN=your_blob_token
   
   # Site
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ADMIN_SIGNUP_KEY=your_secure_key
   ```

3. **Initialize database**
   ```bash
   npm run setup-db
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   
   Visit [http://localhost:3000](http://localhost:3000)

## 📊 Database Schema

### Core Tables

**categories**
- Menu item groupings (Cocktails, Small Chops, etc.)

**menu_items**
- Name, description, price
- Image URL (via Vercel Blob)
- Availability status
- `is_highlighted` - Feature on homepage
- `image_url` - Optional dish photo

**reservations**
- Guest info (name, email, phone)
- Date, time, party size (1-12)
- `seating_area` (main_lounge, bar_counter)
- Status: pending → confirmed/cancelled
- Special requests

**admin_users**
- Email, hashed password
- Secure authentication

### Security
- Row Level Security (RLS) enabled on all tables
- Guests can only create reservations
- Admins can manage all data
- Password hashing with bcrypt

## 🔐 Admin Access

### Login Flow
1. Navigate to `/admin/login`
2. Enter email & password
3. Forgot password? → `/admin/forgot-password`
4. Reset via email link → `/admin/reset-password`

### Routes
- `/admin/dashboard` - Overview & metrics
- `/admin/reservations` - Manage bookings
- `/admin/menu` - Manage items & uploads
- `/admin/settings` - Configure venue info

## 📁 Project Structure

```
h100-lounge/
├── app/
│   ├── page.tsx                 # Homepage
│   ├── about/page.tsx           # About H100
│   ├── faq/page.tsx             # FAQ
│   ├── menu/page.tsx            # Menu display
│   ├── reservations/            # Booking pages
│   ├── admin/                   # Admin dashboard
│   │   ├── login/page.tsx
│   │   ├── forgot-password/
│   │   ├── reset-password/
│   │   ├── dashboard/
│   │   ├── menu/
│   │   └── reservations/
│   ├── actions/
│   │   ├── reservations.tsx     # Booking logic + emails
│   │   └── admin.tsx            # Admin operations + emails
│   ├── api/
│   │   ├── upload/              # Image upload endpoint
│   │   └── delete/              # Image deletion endpoint
│   └── layout.tsx               # Root layout
├── components/
│   ├── ui/                      # Shadcn components
│   ├── reservation-booking.tsx  # Booking form
│   ├── menu-highlights.tsx      # Featured items
│   ├── navigation.tsx
│   ├── footer.tsx
│   └── welcome-section.tsx
├── lib/
│   ├── supabase/
│   ├── resend.ts               # Email configuration
│   └── utils.ts
├── emails/                      # Email templates (legacy)
├── scripts/                     # Database migrations
└── README.md
```

## 🔧 Environment Variables

| Variable | Type | Purpose |
|----------|------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Public | Database connection |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public | DB authentication |
| `SUPABASE_SERVICE_ROLE_KEY` | Private | Server operations |
| `POSTGRES_URL` | Private | Direct DB access |
| `FROM_EMAIL` | Private | Sender email address |
| `ADMIN_EMAIL` | Private | Admin notification email |
| `RESEND_API_KEY` | Private | Email service |
| `BLOB_READ_WRITE_TOKEN` | Private | Image storage |
| `NEXT_PUBLIC_SITE_URL` | Public | Production URL |
| `ADMIN_SIGNUP_KEY` | Private | Admin registration key |

## 🚀 Deployment

### Vercel (Recommended)
```bash
vercel
```

### Manual Steps
1. Push to GitHub
2. Connect to Vercel/Netlify
3. Set environment variables
4. Deploy

### After Deployment
- Update `NEXT_PUBLIC_SITE_URL` 
- Test reservation emails
- Verify admin login
- Check image uploads

## 🔒 Security

- Server-side validation on all forms
- Passwords hashed with bcrypt
- Secure HTTP-only cookies
- Row Level Security (RLS) enforced
- Environment variables kept private
- SQL injection prevention with parameterized queries
- HTTPS required in production

## 🎨 Customization

### Colors & Styling
- Edit `app/globals.css` for theme tokens
- Adjust Tailwind configuration
- Customize component colors

### Business Info
- Hours, location in `components/welcome-section.tsx`
- Email addresses in environment variables
- Social media links in footer

### Email Templates
- Customize email text in `app/actions/reservations.tsx` and `admin.tsx`
- Update sender information
- Modify reservation flow

## 🆘 Troubleshooting

### Emails Not Sending
- Check `RESEND_API_KEY` is valid
- Verify `FROM_EMAIL` format
- Check Resend dashboard for errors

### Images Not Loading
- Verify `BLOB_READ_WRITE_TOKEN`
- Check upload succeeded in admin
- Ensure file < 5MB

### Database Errors
- Verify Supabase credentials
- Check RLS policies enabled
- Run migrations again

### Admin Login Issues
- Clear browser cookies
- Verify email in database
- Check password reset flow

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Shadcn/ui](https://ui.shadcn.com)
- [Resend Email](https://resend.com)

## 📞 Contact

**H100 Lounge & Bar**
- Email: admin@h100lounge.com
- Phone: +234 800 H100
- Hours: Tue-Sun, 6 PM - 2 AM
- Location: Victoria Island, Lagos

## 📄 License

Private project for H100 Lounge & Bar - All rights reserved.

---

**Built with ❤️ for H100 Lounge & Bar**