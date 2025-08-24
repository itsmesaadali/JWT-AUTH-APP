# 🔐 JWT-AUTH-APP  

This is a [Next.js](https://nextjs.org) JWT-AUTH-APP with proper backend & frontend cooming soon.

## 📂 Project Structure 

```
jwt-auth-app/
├── src/
│   ├── app/                    # Next.js App Router directory
│   │   ├── (auth)/            # Authentication route group
│   │   │   ├── login/         # Login page
│   │   │   │   └── page.tsx
│   │   │   ├── register/      # Registration page
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx     # Auth pages layout
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # Authentication API endpoints
│   │   │   │   ├── login/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── register/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── logout/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── refresh/
│   │   │   │   │   └── route.ts
│   │   │   │   └── me/
│   │   │   │       └── route.ts
│   │   │   └── protected/     # Protected API endpoints
│   │   │       └── route.ts
│   │   ├── dashboard/         # Protected dashboard page
│   │   │   └── page.tsx
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/            # Reusable UI components
│   │   ├── ui/                # Basic UI components (shadcn/ui style)
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── card.tsx
│   │   │   └── ...
│   │   ├── auth/              # Auth-specific components
│   │   │   ├── login-form.tsx
│   │   │   ├── register-form.tsx
│   │   │   └── ...
│   │   └── common/            # Common components
│   │       ├── header.tsx
│   │       ├── footer.tsx
│   │       └── ...
│   ├── lib/                   # Utility libraries
│   │   ├── auth.ts            # Authentication utilities
│   │   ├── database.ts        # Database connection
│   │   ├── api.ts             # API client utilities
│   │   └── utils.ts           # General utilities
│   ├── models/                # Data models
│   │   └── user.ts            # User model/schema
│   ├── context/               # React context providers
│   │   └── auth-context.tsx   # Authentication context
│   ├── hooks/                 # Custom React hooks
│   │   ├── use-auth.ts        # Auth hook
│   │   └── ...
│   └── types/                 # TypeScript type definitions
│       ├── user.ts            # User type
│       ├── auth.ts            # Auth types
│       └── ...
├── public/                    # Static assets
│   ├── images/
│   └── ...
├── package.json               # Dependencies and scripts
├── tailwind.config.js         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
└── .env.local                 # Environment variables

```
##

<h1 align="center">COMING SOON...</h1>
 
