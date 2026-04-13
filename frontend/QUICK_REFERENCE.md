# 🚀 CampusHire Frontend - Quick Reference Guide

## ⚡ Start Here

### 1. Open Terminal & Navigate
```bash
cd frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Server
```bash
npm run dev
```

### 4. Open Browser
```
http://localhost:3000
```

### 5. Login with Demo Credentials
**Student:**
- Email: `student@example.com`
- Password: `password123`

**Recruiter:**
- Email: `recruiter@example.com`
- Password: `password123`

---

## 📚 Documentation Quick Links

| Document | Purpose | Read Time |
|----------|---------|-----------|
| [README.md](./README.md) | Complete guide | 10 min |
| [QUICKSTART.md](./QUICKSTART.md) | Fast setup | 5 min |
| [DESIGN.md](./DESIGN.md) | Architecture | 15 min |
| [COMPONENTS.md](./COMPONENTS.md) | Component ref | 10 min |
| [DIRECTORY.md](./DIRECTORY.md) | File structure | 10 min |
| [VERIFICATION.md](./VERIFICATION.md) | Testing guide | 15 min |
| [BUILD_SUMMARY.md](./BUILD_SUMMARY.md) | What's built | 10 min |
| [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) | Overview | 10 min |

---

## 🎯 Common Tasks

### Browse Jobs
```
Click "Jobs" in navbar → Search/Filter → Click job → Apply
```

### Manage Resumes (Student)
```
Dashboard → Click "Resumes" → Upload PDF → Set Primary
```

### Create Job (Recruiter)
```
Dashboard → Click "New Job" → Fill form → Submit
```

### Review Applications (Recruiter)
```
Dashboard → Click "Applications" → Filter → Click to review
```

### Check Application Status (Student)
```
Dashboard → Click "Applications" → Filter by status
```

---

## 🔧 Available Commands

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Check code quality
npm run format    # Format code
```

---

## 📁 Key Folders

```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components (13 pages)
│   ├── services/      # API integration
│   ├── hooks/         # Custom hooks
│   ├── context/       # State management
│   └── styles/        # Global styles
│
└── Documentation files (.md)
```

---

## 🎨 Design Colors

```
Primary Blue:      #5166f5  (Main buttons, highlights)
Secondary Teal:    #2ea5ca  (Secondary actions)
Gold Accent:       #f59e0b  (Important info)
Dark Background:   #111827  (Page background)
```

---

## 👥 User Roles

### Student Can:
- ✅ Browse jobs with search/filter
- ✅ View detailed job information
- ✅ Apply to jobs
- ✅ Manage resumes (up to 3 PDFs)
- ✅ Track applications with status
- ✅ View AI evaluation scores

### Recruiter Can:
- ✅ Create recruitment drives
- ✅ Post job openings
- ✅ Review job applications
- ✅ Evaluate candidates
- ✅ Accept/Reject candidates
- ✅ View candidate resumes
- ✅ Track recruitment metrics

---

## 🛣️ Page Routes

### Public Pages
- `/` - Home page
- `/login` - Login page
- `/register` - Registration page
- `/jobs` - Job listing
- `/jobs/:id` - Job detail

### Protected Pages (Students)
- `/dashboard` - Student dashboard
- `/applications` - Application tracking
- `/resumes` - Resume manager

### Protected Pages (Recruiters)
- `/dashboard` - Recruiter dashboard
- `/recruiter/applications` - Review applications
- `/recruiter/create-drive` - Create recruitment drive
- `/recruiter/create-job` - Create job posting

---

## 🔌 API Integration

**Base URL**: `http://localhost:8000/api`

All requests automatically include JWT token in headers.

**Major Endpoints:**
- Auth: `/auth/register`, `/auth/login`
- Jobs: `/jobs`, `/jobs/:id`
- Applications: `/applications`, `/applications/:id`
- Resumes: `/resumes`, `/resumes/upload`
- Drives: `/drives`
- Forms: `/forms`
- AI: `/ai/evaluate`

---

## 🧪 Testing Features

### Quick Test Flow (5 minutes)

1. **Register & Login**
   - Go to `/register` → Create account
   - Or go to `/login` → Use demo credentials

2. **Browse Jobs**
   - Click "Jobs" in navbar
   - Search for a job
   - Filter by type
   - Click to view details

3. **Apply to Job**
   - Click "Apply Now" button
   - See success notification

4. **Track Application**
   - Go to "Applications"
   - See your submitted application
   - Filter by status

5. **Manage Resume** (Student)
   - Go to "Resumes"
   - Upload PDF file
   - Set as primary

---

## 🐛 Troubleshooting

### Port 3000 in Use?
```bash
# Kill process on port 3000
# Windows: netstat -ano | findstr :3000, then taskkill /PID <PID> /F
# Mac/Linux: lsof -ti:3000 | xargs kill -9
```

### Backend Not Connecting?
- Ensure backend running on `http://localhost:8000`
- Check `.env.local` has correct API URL
- Check browser console (F12) for errors

### Styles Not Loading?
```bash
# Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
# Or restart dev server: npm run dev
```

### Dependencies Issue?
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

## 💡 Tips & Tricks

### Development
- Use React DevTools extension for state debugging
- Check console (F12) for detailed error messages
- Use Network tab to inspect API calls
- Enable dark mode in DevTools for eye comfort

### Testing
- Use demo credentials or register new account
- Test on different screen sizes (F12 → device toolbar)
- Check mobile menu by narrowing browser window
- Test form validation with empty inputs

### Customization
- Edit colors in `tailwind.config.js`
- Add new components in `src/components/`
- Add new pages in `src/pages/`
- Update API calls in `src/services/api.js`

---

## 📊 Project Stats

- **Components**: 3 main reusable components
- **Pages**: 13 page components
- **Routes**: 13 different routes
- **API Calls**: 30+ endpoints
- **State Stores**: 4 Zustand stores
- **Total Files**: 35+
- **Documentation**: 8 comprehensive guides
- **Lines of Code**: 5000+

---

## 🎯 Feature Checklist

### Student Features ✅
- [x] User registration
- [x] User login
- [x] Job browsing & search
- [x] Job filtering
- [x] Job application
- [x] Resume management (up to 3)
- [x] Application tracking
- [x] Status filtering
- [x] AI score viewing
- [x] Responsive design

### Recruiter Features ✅
- [x] User registration
- [x] User login
- [x] Create recruitment drives
- [x] Create job postings
- [x] Review applications
- [x] Evaluate candidates
- [x] Accept/reject candidates
- [x] View resumes
- [x] Track metrics
- [x] Responsive design

### Design Features ✅
- [x] Premium color palette
- [x] Dark theme
- [x] Smooth animations
- [x] Responsive layouts
- [x] Accessibility features
- [x] Form validation
- [x] Error handling
- [x] Loading states
- [x] Success notifications
- [x] Professional UI

---

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

Output: `dist/` folder ready to deploy

### Deploy To
- **Vercel** (Recommended): `vercel`
- **Netlify**: Connect GitHub repo
- **Traditional Hosting**: Upload `dist/` folder
- **Docker/Kubernetes**: Use provided config

---

## 📖 Learn More

### Frontend Technologies
- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Zustand](https://github.com/pmndrs/zustand)
- [React Router](https://reactrouter.com/)
- [Framer Motion](https://www.framer.com/motion/)

### Code Quality
- Well-organized file structure
- Component-based architecture
- Clean, maintainable code
- Comprehensive documentation
- Best practices implemented

---

## 🎓 What You're Getting

✨ **Professional Frontend**
- Modern React 18 architecture
- Premium design system
- Beautiful dark theme
- Smooth animations

✨ **Complete Functionality**
- Student & recruiter features
- Job management
- Application tracking
- Resume management
- AI integration ready

✨ **Production Ready**
- Optimized build
- Error handling
- Security features
- Performance optimized
- Fully documented

✨ **Developer Friendly**
- Easy to understand
- Well-structured code
- Comprehensive guides
- Quick to extend
- Best practices

---

## 🎉 You're All Set!

Your CampusHire frontend is:
- ✅ Complete
- ✅ Professional
- ✅ Documented
- ✅ Ready to use

**Start developing!** 

```bash
npm run dev
```

---

## 📞 Need Help?

1. Check **README.md** for detailed documentation
2. Check **QUICKSTART.md** for common issues
3. Check **DESIGN.md** for architecture details
4. Check browser console (F12) for errors
5. Check Network tab (F12) for API issues

---

## 🏆 Features Summary

| Feature | Status | Notes |
|---------|--------|-------|
| Login/Register | ✅ Complete | Demo credentials available |
| Student Dashboard | ✅ Complete | Shows metrics & jobs |
| Job Browse & Search | ✅ Complete | Full search & filter |
| Job Application | ✅ Complete | One-click apply |
| Resume Manager | ✅ Complete | Upload & manage (up to 3) |
| Application Tracking | ✅ Complete | Filter & view status |
| Recruiter Dashboard | ✅ Complete | Shows all metrics |
| Create Drives | ✅ Complete | Full form with validation |
| Create Jobs | ✅ Complete | Skills & benefits support |
| Review Applications | ✅ Complete | Evaluate & filter |
| Responsive Design | ✅ Complete | All device sizes |
| Dark Theme | ✅ Complete | Premium palette |
| Animations | ✅ Complete | Smooth transitions |
| Documentation | ✅ Complete | 8 comprehensive guides |

---

**Welcome to CampusHire! Enjoy your premium recruitment platform! 🚀**

*Happy coding!*
