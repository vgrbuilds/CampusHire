# 🚀 CampusHire Frontend - Quick Start Guide

## Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Backend server running on `http://localhost:8000`

## ⚡ Quick Start (5 Minutes)

### 1️⃣ Install Dependencies
```bash
cd frontend
npm install
```

### 2️⃣ Start Development Server
```bash
npm run dev
```

✅ Frontend is now running at `http://localhost:3000`

### 3️⃣ Login with Demo Credentials

**Student Account:**
- Email: `student@example.com`
- Password: `password123`

**Recruiter Account:**
- Email: `recruiter@example.com`
- Password: `password123`

---

## 📱 What You Can Do

### As a Student
- ✅ Browse job listings
- ✅ Search and filter jobs
- ✅ View detailed job information
- ✅ Apply to jobs
- ✅ Manage resumes (upload up to 3)
- ✅ Track your applications
- ✅ View application status

### As a Recruiter
- ✅ Create recruitment drives
- ✅ Post job openings
- ✅ Review job applications
- ✅ Evaluate candidates
- ✅ Accept/Reject applications
- ✅ View AI-powered candidate scoring
- ✅ Manage job postings

---

## 🎨 Premium Features

✨ **Beautiful Dark Theme** - Professional, modern interface  
✨ **Responsive Design** - Works on mobile, tablet, desktop  
✨ **Smooth Animations** - Framer Motion transitions  
✨ **Real-time Notifications** - Toast messages for actions  
✨ **Role-based Access** - Different features for students and recruiters  
✨ **AI Integration** - Candidate evaluation and scoring  

---

## 📂 Project Structure

```
frontend/
├── src/
│   ├── components/         # Reusable UI components
│   ├── pages/             # Page components
│   ├── services/          # API integration
│   ├── hooks/             # Custom React hooks
│   ├── context/           # State management
│   └── styles/            # Global CSS
├── public/                # Static files
└── index.html             # Entry point
```

---

## 🛠️ Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Check code quality |
| `npm run format` | Format code with Prettier |

---

## 🔧 Environment Setup

Create a `.env.local` file:

```env
VITE_API_URL=http://localhost:8000/api
VITE_API_TIMEOUT=30000
VITE_APP_NAME=CampusHire
VITE_ENABLE_MOCK_DATA=false
```

---

## 📋 Common Tasks

### Add a New Component

1. Create file in `src/components/YourComponent/YourComponent.jsx`
2. Use the component in pages/other components
3. Example:

```jsx
export default function MyComponent() {
  return (
    <div className="card-premium">
      <h2 className="text-2xl font-bold">Hello</h2>
    </div>
  );
}
```

### Create a New Page

1. Create file in `src/pages/YourPage.jsx`
2. Add route in `App.jsx`
3. Example:

```jsx
<Route path="/your-path" element={<YourPage />} />
```

### Add API Integration

1. Update `src/services/api.js`
2. Use in component:

```jsx
import { jobsAPI } from '../services/api';

const data = await jobsAPI.getAll();
```

---

## 🐛 Troubleshooting

### Port 3000 Already in Use?
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

### Backend Not Connecting?
- Ensure backend is running on `http://localhost:8000`
- Check `VITE_API_URL` in `.env.local`
- Look at browser console for errors

### Tailwind Styles Not Applying?
```bash
# Rebuild CSS
npm run build

# Or restart dev server
npm run dev
```

---

## 📱 Responsive Testing

Open DevTools (F12) and test on different screen sizes:
- Mobile: 375px - 640px
- Tablet: 641px - 1024px
- Desktop: 1025px+

---

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

Output folder: `dist/`

### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
1. Push to GitHub
2. Connect repo to Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`

---

## 📚 Next Steps

1. Explore the codebase: `src/pages/`, `src/components/`
2. Check `DESIGN.md` for architecture details
3. Read `README.md` for full documentation
4. Start the backend server for full functionality

---

## 💡 Pro Tips

- Use browser DevTools to inspect components
- Check Console tab for errors and logs
- Use React DevTools extension for state debugging
- Read inline code comments for implementation details

---

## 🎯 Goals Achieved

✅ Professional, premium frontend design  
✅ Full student and recruiter functionality  
✅ Responsive on all devices  
✅ Smooth animations and transitions  
✅ Proper backend integration  
✅ Clean, maintainable code  
✅ Complete documentation  

---

**Happy coding! 🎉**

For issues or questions, check the documentation or GitHub issues.
