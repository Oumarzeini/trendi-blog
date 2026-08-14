# Trendi Blog

> A modern, full-stack blogging platform built with React, Vite, and Supabase.

Trendi Blog is a feature-rich blogging application where users can create, edit, discover, and interact with blog posts in a clean and responsive interface. It focuses on performance, usability, and modern web development practices while showcasing a production-ready React application.

---

## ✨ Features

- 🔐 User authentication
- 👤 User profiles
- ✍️ Create, edit delete and bookmark blog posts
- 📝 Markdown editor with live rendering
- 💬 Comment system
- ❤️ Like posts
- 🔎 Search functionality
- 📱 Fully responsive design
- ⚡ Fast navigation powered by React Router
- ☁️ Supabase backend
- 📊 PostHog analytics integration
- 🚨 Sentry error monitoring
- 🎨 Styled Components + CSS modules
- ⚡ Built with Vite for fast development and builds

---

<!-- ## 📸 Screenshots

> Add screenshots here after deployment.

| Home | Blog Post |
|------|-----------|
| ![](docs/home.png) | ![](docs/post.png) |

--- -->

# Tech Stack

### Frontend

- React 19
- Vite
- React Router v7
- Styled Components
- React Markdown

### Backend

- Supabase
  - Authentication
  - Database
  - Storage

### Monitoring

- PostHog
- Sentry

---

# Getting Started

## Clone the repository

```bash
git clone https://github.com/Oumarzeini/trendi-blog.git

cd trendi-blog
```

## Install dependencies

```bash
npm install
```

## Environment Variables

Create a `.env` file in the project root.

```env
VITE_SUPABASE_URL=your_supabase_url

VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

VITE_POSTHOG_KEY=your_posthog_key

VITE_POSTHOG_HOST=https://us.i.posthog.com

VITE_SENTRY_DSN=your_sentry_dsn
```

> Never commit your `.env` file.

---

# Running Locally

```bash
npm run dev
```

The application will be available at

```
http://localhost:5173
```

---

# Production Build

```bash
npm run build
```

Preview the production build

```bash
npm run preview
```

---

# Project Structure

```
src/
│
├── components/
├── hooks/
├── pages/
├── store/
├── styles/
├── lib/
├── icons/
└── utils/
```

---

# Main Functionality

### Authentication

- Sign up
- Sign in
- Password reset
- Protected routes

### Blog Management

- Create posts
- Edit posts
- Delete posts
- Upload cover images

### User Interaction

- Like posts
- Comment on posts
- Browse posts
- Search for posts

### Markdown Support

Supports rich markdown including:

- Headings
- Lists
- Images
- Code blocks
- Blockquotes
- Links
- Tables

---

# Analytics

The application uses **PostHog** to collect anonymous usage analytics and understand how users interact with the application.

---

# Error Monitoring

Errors are automatically reported using **Sentry**, making debugging easier in production.

---

# Deployment

The project is built with Vite and can be deployed on platforms such as:

- Vercel
- Netlify
- GitHub Pages

---

# Future Improvements

- Rich text editor
- Follow users
- Notifications
- Reading statistics
- Dark mode improvements
- Tags
- Categories
- Drafts
- Admin dashboard

---

# Learning Outcomes

This project helped reinforce knowledge of:

- React architecture
- Custom Hooks
- State management
- Authentication flows
- Database design
- Supabase
- API integration
- Markdown rendering
- Analytics
- Error monitoring
- Responsive UI design

---

# Author

**Omar Zeini**

GitHub

https://github.com/Oumarzeini

---

## Live Demo

https://trendi-blog.omarspace.com

---

# License

This project is licensed under the MIT License.