# 📝 NextBlog

**NextBlog** is a modern full-stack blogging platform built with **Next.js (App Router)**, **Convex**, **shadcn/ui**, and **TypeScript**. It supports authentication, blog creation with image uploads, real-time comments, and a clean responsive UI.

---

## 🚀 Features

- 🔐 Authentication (login required to post & comment)
- ✍️ Create blog posts with image uploads
- 🖼 Image storage via Convex file storage
- 💬 Real-time comments per post
- 👀 Presence indicator for readers
- ⚡ Fast server actions with Next.js
- 🎨 Clean UI with shadcn/ui + Tailwind
- 📱 Fully responsive design

---

## 🛠 Tech Stack

| Layer | Technology |
|------|-----------|
Frontend | Next.js 14 (App Router), React, TypeScript |
Backend | Convex |
UI | Tailwind CSS, shadcn/ui |
Forms | react-hook-form, Zod |
Auth | Custom auth (Convex + Next middleware) |
Storage | Convex file storage |

---

## 📂 Project Structure

```text
app/
 ├─ blog/
 ├─ create/
 ├─ actions.ts
 ├─ schemas/
components/
 ├─ web/
 ├─ ui/
convex/
```


```
- git clone https://github.com/itsmesaadali/nextblog.git
- cd nextblog
```
 

```
- pnpm install
# or
- npm install
```

```
CONVEX_DEPLOYMENT=your-convex-deployment
NEXT_PUBLIC_CONVEX_URL=your-convex-url
```

```
npx convex dev
```

```
pnpm dev
# or
npm run dev
```


