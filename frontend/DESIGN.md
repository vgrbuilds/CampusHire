# CampusHire Frontend - Design & Architecture Documentation

## 📋 Table of Contents
1. [Design System](#design-system)
2. [Architecture](#architecture)
3. [Component Structure](#component-structure)
4. [Features Overview](#features-overview)
5. [User Flows](#user-flows)
6. [API Integration](#api-integration)

---

## 🎨 Design System

### Color Palette

The frontend uses a sophisticated, premium color palette designed for professional recruitment environment.

#### Primary Colors
- **Primary Blue**: `#5166f5` - Main brand color (Call-to-action buttons, highlights)
- **Secondary Teal**: `#2ea5ca` - Complementary color (Secondary actions, badges)
- **Accent Gold**: `#f59e0b` - Highlights & accents (Important information)

#### Dark Theme
- **Background Dark-900**: `#111827` - Main background
- **Background Dark-800**: `#1f2937` - Card backgrounds
- **Background Dark-700**: `#374151` - Hover states
- **Text Light**: `#f3f4f6` - Main text
- **Text Dark**: `#9ca3af` - Secondary text

#### Status Colors
- **Success Green**: `#10b981` - Approved applications
- **Warning Amber**: `#f59e0b` - Pending status
- **Error Red**: `#ef4444` - Rejected applications

### Typography

- **Font Family**: Inter (Google Fonts)
- **Font Weights**: 300, 400, 500, 600, 700, 800
- **Heading Hierarchy**:
  - H1: 48px, 700 weight
  - H2: 36px, 700 weight
  - H3: 30px, 600 weight
  - H4: 24px, 600 weight
  - Body: 16px, 400 weight

### Spacing System

Consistent 4px grid spacing:
- `px-4` = 16px
- `py-6` = 24px
- `gap-4` = 16px spacing between items

### Component Patterns

#### Buttons
1. **Primary Button** (btn-primary)
   - Gradient background (Primary to Secondary)
   - White text
   - Hover: Elevated shadow, slight scale up

2. **Secondary Button** (btn-secondary)
   - Solid secondary color background
   - White text
   - Hover: Darker shade

3. **Outline Button** (btn-outline)
   - Transparent background, colored border
   - Hover: Fills with background color

#### Cards
1. **Premium Card** (card-premium)
   - Dark background with border
   - Shadow effect
   - Hover: Enhanced shadow

2. **Gradient Card** (card-gradient)
   - Full gradient background (Primary to Secondary)
   - White text
   - Used for highlights/important sections

3. **Glass Effect** (glass-effect)
   - Semi-transparent background
   - Backdrop blur
   - Border with transparency

#### Badge Styles
- `badge-primary`: Blue background
- `badge-success`: Green background
- `badge-warning`: Amber background
- `badge-danger`: Red background

---

## 🏗️ Architecture

### Folder Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   └── ProtectedRoute.jsx       # Route protection logic
│   │   ├── Jobs/
│   │   │   └── JobCard.jsx              # Reusable job card component
│   │   └── Layout/
│   │       ├── Navbar.jsx               # Navigation bar with responsive menu
│   │       └── Footer.jsx               # Application footer
│   │
│   ├── pages/
│   │   ├── Home.jsx                     # Landing page with hero section
│   │   ├── Auth/
│   │   │   ├── Login.jsx                # Login with role selection
│   │   │   └── Register.jsx             # Registration form
│   │   ├── Student/
│   │   │   ├── Dashboard.jsx            # Student dashboard with stats
│   │   │   ├── Applications.jsx         # Application tracking
│   │   │   └── ResumesManager.jsx       # Resume management (max 3)
│   │   ├── Recruiter/
│   │   │   ├── Dashboard.jsx            # Recruiter metrics dashboard
│   │   │   ├── Applications.jsx         # Application review panel
│   │   │   ├── CreateDrive.jsx          # Create recruitment drive
│   │   │   └── CreateJob.jsx            # Post job opening
│   │   └── Jobs/
│   │       ├── JobsListing.jsx          # Job search & filter
│   │       └── JobDetail.jsx            # Detailed job view
│   │
│   ├── services/
│   │   └── api.js                       # Axios instance & API calls
│   │
│   ├── hooks/
│   │   └── useAuth.js                   # Authentication hook
│   │
│   ├── context/
│   │   └── store.js                     # Zustand state management
│   │
│   ├── styles/
│   │   └── globals.css                  # Tailwind directives & custom classes
│   │
│   ├── App.jsx                          # Main app with routes
│   └── main.jsx                         # React entry point
│
├── public/                              # Static assets
├── index.html                           # HTML shell
├── vite.config.js                       # Vite configuration
├── tailwind.config.js                   # Tailwind customization
├── postcss.config.js                    # PostCSS plugins
└── package.json                         # Dependencies
```

### State Management

Using **Zustand** for lightweight state management:

```javascript
// Auth Store
- user: Current logged-in user
- token: JWT authentication token
- isAuthenticated: Boolean flag
- setAuth(): Set user and token
- logout(): Clear auth state

// Jobs Store
- jobs: Array of jobs
- selectedJob: Currently selected job
- loading: Loading state

// Applications Store
- applications: User's applications
- loading: Loading state

// Drives Store
- drives: Recruitment drives
- selectedDrive: Current drive
- loading: Loading state
```

### API Service Layer

Centralized API client with interceptors:

```javascript
// services/api.js exports:
- apiClient: Axios instance with base URL
- authAPI: Login, register
- jobsAPI: CRUD jobs
- applicationsAPI: Manage applications
- resumesAPI: Upload/manage resumes
- drivesAPI: Manage drives
- formsAPI: Manage forms
- aiAPI: AI evaluation endpoints
```

The client automatically:
- Adds JWT token to all requests
- Handles base URL middleware
- Manages request/response interceptors

---

## 🧩 Component Structure

### Page Components Flow

#### Home Page
```
Home
├── Hero Section (CTA buttons)
├── Stats Section (500+ companies, 50K+ students, etc.)
├── Features Grid (3 feature cards)
└── CTA Section (Sign up prompt)
```

#### Authentication
```
Login / Register
├── Form Container (Card)
├── Input Fields (Email, Password)
├── Role Selection (Student/Recruiter)
├── Company Field (Recruiter only)
└── Action Buttons
```

#### Student Dashboard
```
StudentDashboard
├── Header with welcome message
├── Stats Grid (4 metric cards)
├── Latest Jobs Section
└── Job Cards Grid
```

#### Job Listing
```
JobsListing
├── Header
├── Search & Filter Bar
├── Jobs Grid
└── Results Counter
```

#### Job Detail
```
JobDetail
├── Back Button
├── Job Header (Title, Company)
├── Job Meta (Location, Salary, etc.)
├── Main Content (Description, Requirements)
├── Sidebar (Apply Button, Company Info)
└── Skills & Benefits Sections
```

#### Recruiter Dashboard
```
RecruiterDashboard
├── Header with action buttons (New Drive, New Job)
├── Stats Grid (4 metric cards)
├── Recent Drives Section
└── Quick Actions
```

#### Application Review
```
RecruiterApplications
├── Filter Tabs (All, Pending, Accepted, Rejected)
├── Applications List (Filterable)
├── Selected App Details Panel
└── Action Buttons (Accept, Reject)
```

---

## ✨ Features Overview

### 1. **Authentication System**
- **Registration**: Student and Recruiter roles
- **Login**: Email and password authentication
- **Token Management**: JWT stored in localStorage
- **Demo Credentials**: For testing purposes

### 2. **Student Features**

#### Dashboard
- Statistics cards showing:
  - Total applications
  - Active jobs count
  - Offers received
  - Pending applications
- Quick view of latest job listings
- Navigation to applications and resumes

#### Job Browse & Search
- Full-text search across job titles and companies
- Filter by job type (Full-time, Part-time, Internship, Contract)
- Job cards with key information
- Pagination support (built for scalability)

#### Job Application
- One-click apply functionality
- Resume selection during application
- Application tracking with status
- Applied jobs history

#### Resume Management
- Upload up to 3 resumes (PDF only)
- Set primary resume for applications
- Delete resumes when needed
- File management interface

#### Application Tracking
- Filter applications by status (Pending, Accepted, Rejected)
- View application details
- Track AI evaluation scores
- Time-stamped application records

### 3. **Recruiter Features**

#### Dashboard
- Key metrics:
  - Active recruitment drives
  - Total job openings
  - Total applications received
  - Accepted candidates count
- Recent drives list
- Quick action buttons

#### Recruitment Drive Management
- Create new drives with:
  - Drive name
  - Company information
  - Date range
  - Description
- Manage multiple concurrent drives
- Track drive status

#### Job Posting
- Comprehensive job creation form:
  - Title and description
  - Job type selection
  - Location and salary info
  - Experience requirements
  - Required skills (multi-add)
  - Benefits & perks (multi-add)
- Edit and delete job postings
- Manage job visibility

#### Application Review
- View all applications for company
- Filter by status (Pending, Accepted, Rejected)
- Detailed candidate information:
  - Name and email
  - Applied position
  - Application date
  - AI quality score
- Accept or reject candidates
- View candidate resume

#### AI-Powered Evaluation
- Automatic candidate scoring
- Fit assessment based on qualifications
- Interview recommendations

### 4. **Design Features**

#### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly interface on mobile
- Adaptive layouts for all screen sizes

#### Animations & Transitions
- Framer Motion for page transitions
- Smooth button hover effects
- Card elevation on hover
- Loading animations
- Staggered list animations

#### Accessibility
- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- Color contrast compliance
- Focus states on interactive elements

#### User Feedback
- Toast notifications (React Hot Toast)
  - Success messages
  - Error alerts
  - Info messages
- Loading states on buttons
- Disabled states for invalid actions
- Confirmation flows for critical actions

---

## 🔄 User Flows

### Student User Flow

```
1. Home Page
   ↓
2. Register (if new)
   ├→ Fill name, email, password
   ├→ Select "Student" role
   ├→ Accept terms
   └→ Redirected to Dashboard
   
3. Dashboard
   ├→ View statistics
   ├→ Browse latest jobs
   └→ OR navigate to Jobs page

4. Jobs Listing
   ├→ Search jobs
   ├→ Filter by type
   └→ Click job to view details

5. Job Detail
   ├→ Read description
   ├→ Review requirements
   └→ Click "Apply Now"

6. Application Submission
   ├→ Select primary resume
   └→ Submit application

7. Applications Page
   ├→ View all applications
   ├→ Filter by status
   └→ Track progress

8. Resume Manager
   ├→ Upload resume (max 3)
   ├→ Set primary resume
   └→ Delete if needed
```

### Recruiter User Flow

```
1. Home Page
   ↓
2. Register (if new)
   ├→ Fill name, email, password
   ├→ Select "Recruiter" role
   ├→ Enter company name
   └→ Redirected to Dashboard

3. Recruiter Dashboard
   ├→ View recruitment metrics
   ├→ Click "New Drive" button
   └→ OR "New Job" button

4. Create Drive
   ├→ Fill drive details
   ├→ Set date range
   └→ Create

5. Create Job
   ├→ Fill job details
   ├→ Add skills (multi)
   ├→ Add benefits (multi)
   └→ Publish job

6. Application Review
   ├→ View all applications
   ├→ Filter by status
   ├→ Click to review candidate
   ├→ View candidate details
   ├→ Check AI score
   └→ Accept/Reject

7. Dashboard Update
   └→ Metrics automatically update
```

---

## 🔌 API Integration

### Backend Endpoints Used

#### Authentication
```javascript
POST /api/auth/register
  Body: { name, email, password, role, company? }
  Response: { token, user }

POST /api/auth/login
  Body: { email, password }
  Response: { token, user }
```

#### Jobs
```javascript
GET /api/jobs                    // All jobs
GET /api/jobs/:id               // Job detail
GET /api/jobs/drive/:driveId    // Jobs in drive
POST /api/jobs                  // Create (Recruiter)
PUT /api/jobs/:id               // Update (Recruiter)
DELETE /api/jobs/:id            // Delete (Recruiter)
```

#### Applications
```javascript
GET /api/applications                      // All applications
GET /api/applications/:id                  // Application detail
GET /api/applications/job/:jobId           // Job applications
GET /api/applications/student/:studentId   // Student applications
POST /api/applications                     // Submit application
PATCH /api/applications/:id/status         // Update status
DELETE /api/applications/:id               // Withdraw application
```

#### Resumes
```javascript
GET /api/resumes                        // All resumes
GET /api/resumes/student/:studentId     // Student resumes
POST /api/resumes/upload                // Upload (multipart)
PUT /api/resumes/:id                    // Update
DELETE /api/resumes/:id                 // Delete
```

#### Drives & Forms & AI
```javascript
GET/POST /api/drives
GET/POST /api/forms
POST /api/ai/evaluate
POST /api/ai/recommendations
```

### Error Handling

Frontend implements centralized error handling:
- API errors caught and displayed as toast notifications
- Automatic token refresh on 401
- Graceful fallbacks for failed requests
- User-friendly error messages

### Request Interceptors

```javascript
// Automatically adds JWT token
Authorization: Bearer <token>
```

---

## 📊 Performance Considerations

1. **Code Splitting**
   - Route-based lazy loading ready
   - Component-based splitting

2. **Caching**
   - Browser cache for static assets
   - Zustand for state caching
   - API response caching ready

3. **Optimization**
   - Image lazy loading support
   - CSS minification via Tailwind
   - Production build optimization

4. **Bundle Size**
   - Vite for fast bundling
   - Tree-shaking enabled
   - Small dependencies (Zustand < 2KB)

---

## 🔒 Security

1. **Authentication**
   - JWT tokens for stateless auth
   - Tokens stored in localStorage
   - Automatic token inclusion in requests

2. **Protected Routes**
   - ProtectedRoute component checks auth
   - Role-based access control
   - Redirect to login if unauthorized

3. **Input Validation**
   - Client-side form validation
   - Server-side validation via API
   - XSS protection via React

4. **CORS**
   - Handled by backend
   - Frontend API URL in environment variables

---

## 📝 Best Practices Implemented

1. **Component Design**
   - Functional components with hooks
   - Props validation through usage
   - Composition over inheritance

2. **State Management**
   - Minimal global state (Zustand)
   - Component-level state for UI
   - Clean separation of concerns

3. **Code Organization**
   - Feature-based folder structure
   - Single responsibility principle
   - Reusable, composable components

4. **Styling**
   - Utility-first CSS (Tailwind)
   - Consistent design tokens
   - Dark mode support

5. **Performance**
   - Debounced search
   - Lazy loaded components
   - Optimized re-renders

6. **Accessibility**
   - Semantic HTML
   - Keyboard navigation
   - Screen reader support

---

## 🚀 Future Enhancements

1. **Features**
   - Notification system (real-time)
   - Chat/messaging between recruiters and students
   - Schedule interviews through platform
   - Skill assessments/tests
   - Advanced filtering and saved searches

2. **Performance**
   - Service Worker for offline support
   - Image optimization and CDN
   - Advanced caching strategies
   - Virtualized lists for large datasets

3. **Analytics**
   - User engagement tracking
   - Conversion funnel analysis
   - Recruiter ROI metrics
   - Job performance analytics

4. **Mobile App**
   - React Native version
   - Push notifications
   - Offline application support

---

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [Zustand Documentation](https://github.com/pmndrs/zustand)

---

**Last Updated**: December 2024  
**Version**: 1.0.0  
**Status**: Production Ready
