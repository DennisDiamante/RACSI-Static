
# Radians Automation and Control Solutions, Inc.

A modern, fully responsive website for Radians Automation and Control Solutions, Inc., an industrial automation company specializing in electrical control solutions in the Philippines.

## 🌟 Features

### Public Website
- **Homepage** with hero section, services overview, and call-to-action
- **About Us** page with mission, vision, and core values
- **Products & Services** page showcasing all offerings
- **Project References** page with image galleries (up to 5 images per project)
- **Contact Page** with form submission, inquiry tracking, and embedded map

### Admin CMS (Content Management System)
- **Dashboard** with overview statistics
- **User Management** with role-based access control (Developer, Super Admin, Admin)
- **Project Management** with CRUD operations and image uploads
- **Inquiry Management** to view and respond to contact form submissions
- **About Us Editor** to update company content
- **Secure Authentication** with NextAuth.js

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn UI, Radix UI
- **Database:** PostgreSQL (via Prisma ORM)
- **Authentication:** NextAuth.js
- **File Storage:** AWS S3
- **Deployment:** Vercel / Custom hosting

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and Yarn
- PostgreSQL database
- AWS S3 bucket (for image uploads)

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/YOUR_USERNAME/radians-automation-website.git
cd radians-automation-website/nextjs_space
```

2. **Install dependencies:**
```bash
yarn install
```

3. **Set up environment variables:**

Create a `.env` file in the `nextjs_space` directory:

```env
# Database
DATABASE_URL="postgresql://username:password@host:port/database"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# AWS S3 (for image uploads)
AWS_BUCKET_NAME="your-bucket-name"
AWS_FOLDER_PREFIX="radians-automation/"
AWS_ACCESS_KEY_ID="your-access-key"
AWS_SECRET_ACCESS_KEY="your-secret-key"
AWS_REGION="your-region"
```

4. **Set up the database:**
```bash
# Generate Prisma Client
yarn prisma generate

# Run migrations
yarn prisma migrate deploy

# Seed initial data
yarn prisma db seed
```

5. **Run the development server:**
```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 👥 User Roles & Permissions

### Developer (Full System Access)
- Create/delete Super Admins and Admins
- View all users including other Developers
- Change passwords of all users
- Full access to all content and project management

### Super Admin
- Create Admin users only
- View Super Admins and Admins (not Developers)
- Delete Admin users only
- Full access to content and project management

### Admin
- View Super Admins and Admins only
- Cannot create or delete users
- Full access to content and project management

## 🔐 Default Admin Credentials

**Developer Account:**
- Email: `dev@radians-automation.com`
- Password: `RadiansDev2024!Secure#Master`

**Super Admin Account:**
- Email: `admin@radians-automation.com`
- Password: `RadiansAdmin2024!Secure#Phase1`

**⚠️ IMPORTANT:** Change these passwords immediately after first login!

## 📦 Database Schema

The application uses the following main models:
- **User** - Authentication and role management
- **Project** - Project references with images
- **ProjectImage** - Image gallery for projects
- **ContactInquiry** - Contact form submissions
- **AboutContent** - About Us page content

## 🏗️ Project Structure

```
nextjs_space/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin dashboard pages
│   ├── api/               # API routes
│   └── (public pages)/    # Public-facing pages
├── components/            # React components
│   ├── admin/            # Admin-specific components
│   ├── ui/               # Shadcn UI components
│   └── (others)/         # Shared components
├── lib/                   # Utility functions
├── prisma/               # Database schema and migrations
├── public/               # Static assets
└── scripts/              # Utility scripts
```

## 🚢 Deployment

### Deploy to Vercel
1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Deploy to Custom Server
1. Build the application:
```bash
yarn build
```

2. Start the production server:
```bash
yarn start
```

## 📝 License

Copyright © 2024 Radians Automation and Control Solutions, Inc. All rights reserved.

## 🤝 Support

For support or inquiries, contact:
- **Email:** info@radians-automation.com
- **Phone:** (02) 8911-3924 / 0995 313 3924
- **Address:** Unit 210, 88 Corporate Center, Sedeno St., Marcos Highway, Brgy. Dela Paz, Pasig City, Metro Manila, Philippines 1613

---

Built with ❤️ by the Radians Automation team
