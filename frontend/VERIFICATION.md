# ✅ CampusHire Frontend - Installation & Verification Checklist

## 📋 Pre-Installation Checklist

### System Requirements
- [ ] Node.js v16+ installed
- [ ] npm v7+ installed (or yarn)
- [ ] Git installed
- [ ] Backend server (http://localhost:8000) ready

### Check Versions
```bash
node --version      # Should be v16 or higher
npm --version       # Should be v7 or higher
```

---

## 🚀 Installation Checklist

### Step 1: Navigate to Frontend Directory
- [ ] Open terminal/command prompt
- [ ] Navigate to: `cd frontend`
- [ ] Verify you're in the frontend directory

### Step 2: Install Dependencies
- [ ] Run: `npm install`
- [ ] Wait for installation to complete
- [ ] Check for any error messages
- [ ] Verify `node_modules` folder created
- [ ] Verify `package-lock.json` created

### Step 3: Create Environment File
- [ ] Copy `.env.example` to `.env.local`
- [ ] Check content is present:
  ```
  VITE_API_URL=http://localhost:8000/api
  ```
- [ ] Save the file

### Step 4: Start Development Server
- [ ] Run: `npm run dev`
- [ ] Look for message: "Local: http://localhost:3000"
- [ ] Open browser and go to http://localhost:3000
- [ ] Verify homepage loads without errors
- [ ] Check console for any errors (F12 → Console tab)

---

## 🧪 Functionality Verification

### Authentication Testing
- [ ] **Register as Student**
  - [ ] Go to `/register`
  - [ ] Fill name: "Test Student"
  - [ ] Fill email: "test@student.com"
  - [ ] Set role to "Student"
  - [ ] Enter password (min 6 chars)
  - [ ] Submit form
  - [ ] Verify redirected to dashboard

- [ ] **Register as Recruiter**
  - [ ] Go to `/register`
  - [ ] Fill name: "Test Recruiter"
  - [ ] Fill email: "test@recruiter.com"
  - [ ] Set role to "Recruiter"
  - [ ] Enter company name
  - [ ] Enter password
  - [ ] Submit form
  - [ ] Verify redirected to dashboard

- [ ] **Login with Demo Credentials**
  - [ ] Go to `/login`
  - [ ] Click student demo credentials
  - [ ] Verify form auto-filled with: `student@example.com` / `password123`
  - [ ] Click login button
  - [ ] Verify redirected to student dashboard
  - [ ] Logout
  - [ ] Repeat with recruiter credentials

### Navigation Testing
- [ ] Logo click redirects to home
- [ ] Navbar links work correctly
- [ ] Mobile menu opens on small screens
- [ ] Footer links are clickable
- [ ] Back buttons work

### Home Page Testing
- [ ] Page loads with no errors
- [ ] Hero section displays
- [ ] Stats cards visible
- [ ] Features grid shows 3 items
- [ ] CTA buttons are clickable
- [ ] Hover effects work
- [ ] Responsive on mobile

### Student Dashboard Testing
- [ ] Page requires authentication
- [ ] Attempts to access without login redirect to login
- [ ] Welcome message shows student name
- [ ] 4 stats cards display
- [ ] Latest jobs section loads
- [ ] Job cards display correctly

### Job Listing Testing
- [ ] `/jobs` page loads
- [ ] Search input works
- [ ] Filter dropdown works
- [ ] Job cards display in grid
- [ ] Job cards are clickable
- [ ] Results count updates correctly

### Job Detail Testing
- [ ] Job detail page loads
- [ ] All sections display:
  - [ ] Title and company
  - [ ] Description
  - [ ] Requirements
  - [ ] Skills
  - [ ] Benefits
  - [ ] Apply button
- [ ] Apply button works
- [ ] Back button returns to jobs list

### Student Applications Testing
- [ ] Applications page loads
- [ ] Filter tabs work
- [ ] Applications list displays
- [ ] Status badges show correct colors
- [ ] Data filters correctly

### Resume Manager Testing
- [ ] Resume manager page loads
- [ ] Upload input appears
- [ ] Can select PDF file
- [ ] Upload completes
- [ ] Resume appears in list
- [ ] Can set as primary
- [ ] Can delete resume
- [ ] Max 3 resumes enforced

### Recruiter Dashboard Testing
- [ ] Page shows recruiter metrics
- [ ] 4 stats cards display
- [ ] Recent drives list loads
- [ ] "New Drive" button visible
- [ ] "New Job" button visible

### Create Drive Testing
- [ ] Form loads
- [ ] All fields display properly
- [ ] Can fill in:
  - [ ] Drive name
  - [ ] Company name
  - [ ] Date range
  - [ ] Description
- [ ] Submit button works
- [ ] Verification message shows

### Create Job Testing
- [ ] Form loads
- [ ] All fields display properly
- [ ] Can fill in all required fields
- [ ] Can add multiple skills
- [ ] Can add multiple benefits
- [ ] Can remove skills/benefits
- [ ] Submit button works

### Application Review Testing
- [ ] Filter tabs work
- [ ] Applications list displays
- [ ] Can click to select application
- [ ] Details panel shows candidate info
- [ ] Accept/Reject buttons work
- [ ] Status updates correctly

---

## 🎨 Design Verification

### Color Scheme
- [ ] Primary blue accent visible
- [ ] Secondary teal highlights visible
- [ ] Gold accent colors present
- [ ] Dark theme background correct
- [ ] Text contrast acceptable (readability)

### Responsive Design
- [ ] Test on mobile (375px width)
- [ ] Test on tablet (768px width)
- [ ] Test on desktop (1024px+ width)
- [ ] Navigation collapses on mobile
- [ ] Grid layouts stack on mobile
- [ ] Text is readable on all sizes
- [ ] Buttons are touch-friendly

### Animations
- [ ] Page transitions smooth
- [ ] Button hover effects visible
- [ ] Card hover elevation works
- [ ] Loading spinners animate
- [ ] Fade-in animations present

---

## 🔌 API Integration Verification

### Connection Check
- [ ] Backend server running on port 8000
- [ ] Check network tab in DevTools
- [ ] API requests show in Network tab
- [ ] No CORS errors in console
- [ ] Responses have correct status codes

### API Endpoints
- [ ] POST /auth/register responds
- [ ] POST /auth/login responds
- [ ] GET /jobs returns data
- [ ] GET /applications returns data
- [ ] Other endpoints accessible

### Error Handling
- [ ] Network errors show toast messages
- [ ] Invalid form submissions show errors
- [ ] Validation messages appear
- [ ] 404 errors handled gracefully

---

## 🔒 Security Verification

### Authentication
- [ ] JWT token stored in localStorage
- [ ] Token sent in API requests
- [ ] Token removed on logout
- [ ] Protected routes prevent access
- [ ] Role-based access works

### Input Validation
- [ ] Empty form submission rejected
- [ ] Email validation working
- [ ] Password requirements enforced
- [ ] File upload validation works

---

## 🚨 Troubleshooting Checklist

### If Installation Fails
- [ ] Clear npm cache: `npm cache clean --force`
- [ ] Delete node_modules: `rm -rf node_modules`
- [ ] Delete package-lock.json
- [ ] Reinstall: `npm install`

### If Server Won't Start
- [ ] Check port 3000 is free
- [ ] Kill existing process on port 3000
- [ ] Check for syntax errors in dev console
- [ ] Clear browser cache
- [ ] Try incognito/private window

### If API Doesn't Connect
- [ ] Verify backend running on port 8000
- [ ] Check `VITE_API_URL` in `.env.local`
- [ ] Check browser console for errors
- [ ] Check Network tab in DevTools
- [ ] Verify CORS headers in backend

### If Styles Don't Apply
- [ ] Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- [ ] Clear browser cache
- [ ] Restart dev server
- [ ] Rebuild: `npm run build`

### If Components Don't Render
- [ ] Check browser console for errors
- [ ] Verify component file exists
- [ ] Check import paths are correct
- [ ] Verify Tailwind classes are spelled correctly

---

## ✨ Visual Verification

### Home Page
- [ ] Hero section centered
- [ ] Stats cards in grid
- [ ] Features cards displayed
- [ ] CTAs visible and styled
- [ ] Footer at bottom

### Form Pages
- [ ] Form centered on page
- [ ] Input fields properly styled
- [ ] Labels visible
- [ ] Buttons visible
- [ ] Error messages display
- [ ] Success messages display

### List Pages
- [ ] Cards in responsive grid
- [ ] Hover effects work
- [ ] Filters/search functional
- [ ] Empty states show
- [ ] Loading states show

### Detail Pages
- [ ] Content properly formatted
- [ ] Sidebar visible on desktop
- [ ] Sidebar stacks on mobile
- [ ] Sections clearly separated
- [ ] Buttons accessible

---

## 📊 Performance Verification

### Loading Time
- [ ] Home page loads < 3 seconds
- [ ] Dashboard loads < 2 seconds
- [ ] Search/filter responsive (< 500ms)
- [ ] Images load quickly

### Network Activity
- [ ] Bundle size reasonable
- [ ] No unnecessary requests
- [ ] API responses fast
- [ ] No 404 errors

---

## 🎉 Final Verification

### Overall Functionality
- [ ] Can register new account
- [ ] Can login successfully
- [ ] Can view dashboard
- [ ] Can browse jobs
- [ ] Can apply to jobs
- [ ] Can manage resumes
- [ ] Can logout

### Recruiter Specific
- [ ] Can create recruitment drive
- [ ] Can post job opening
- [ ] Can review applications
- [ ] Can accept/reject candidates
- [ ] Dashboard shows correct metrics

### Student Specific
- [ ] Dashboard shows correct stats
- [ ] Can search and filter jobs
- [ ] Can view job details
- [ ] Can apply to jobs
- [ ] Can upload resumes
- [ ] Can track applications

---

## 📝 Sign-Off

Once all checks are complete:

- [ ] Functionality verified
- [ ] Design looks professional
- [ ] No console errors
- [ ] API integration working
- [ ] Responsive on all devices
- [ ] Ready for development/deployment

**Date Verified**: _______________

**Verified By**: _______________

**Notes**: 

---

## 🚀 Next Steps After Verification

1. **Deploy to Production**
   ```bash
   npm run build
   # Deploy dist/ folder
   ```

2. **Continue Development**
   - Add more features
   - Customize styling
   - Add more pages

3. **User Testing**
   - Test with real users
   - Gather feedback
   - Make improvements

4. **Performance Optimization**
   - Monitor load times
   - Optimize images
   - Implement caching

---

**Congratulations! Your CampusHire frontend is verified and ready! 🎉**
