# 📋 CampusHire Frontend - Components Map

## 📍 Complete Component Reference

### 🔐 Authentication Components

#### ProtectedRoute.jsx
**Location**: `src/components/Auth/ProtectedRoute.jsx`

**Purpose**: Protects routes and manages role-based access control

**Props**:
- `isAuthenticated`: Boolean - Authentication status
- `userRole`: String - User's role (student/recruiter)
- `requiredRole`: String (optional) - Required role for access
- `children`: JSX - Component to render if authorized

**Usage**:
```jsx
<ProtectedRoute 
  isAuthenticated={isAuthenticated} 
  userRole={user?.role}
  requiredRole="student"
>
  <StudentPage />
</ProtectedRoute>
```

---

### 🏘️ Layout Components

#### Navbar.jsx
**Location**: `src/components/Layout/Navbar.jsx`

**Purpose**: Navigation bar with responsive menu and user info

**Features**:
- Logo with branding
- Links to main pages
- User profile dropdown
- Mobile hamburger menu
- Role-based navigation
- Logout functionality

**Props**: None (uses hooks for auth state)

**Responsive**: Mobile menu collapses below md breakpoint


#### Footer.jsx
**Location**: `src/components/Layout/Footer.jsx`

**Purpose**: Application footer with links and information

**Features**:
- Brand information
- Quick links by category
- Support section
- Copyright notice
- Year auto-update

**Props**: None

**Responsive**: Responsive grid layout

---

### 💼 Job Components

#### JobCard.jsx
**Location**: `src/components/Jobs/JobCard.jsx`

**Purpose**: Reusable job listing card component

**Props**:
- `job`: Object - Job data with id, title, company, description, etc.

**Features**:
- Job title and company
- Job type badge
- Location, salary, experience
- Skills display (with +N more)
- Link to job detail page
- Hover effects

**Usage**:
```jsx
<JobCard job={jobData} />
```

---

## 📄 Page Components

### Public Pages

#### Home.jsx
**Location**: `src/pages/Home.jsx`

**Purpose**: Landing page with hero and features

**Sections**:
- Hero section with CTA
- Stats showcase (500+ companies, 50K+ students)
- Features grid (3 features)
- Final CTA section

**Features**:
- Framer Motion animations
- Gradient cards
- Responsive hero
- Call-to-action buttons


#### Login.jsx
**Location**: `src/pages/Auth/Login.jsx`

**Purpose**: User login page

**Features**:
- Email input
- Password input
- Demo credentials display (for testing)
- Forgot password link
- Register link
- Form validation
- Loading state

**Form Fields**:
- Email (required)
- Password (required)

**Demo Credentials**:
- Student: student@example.com / password123
- Recruiter: recruiter@example.com / password123


#### Register.jsx
**Location**: `src/pages/Auth/Register.jsx`

**Purpose**: User registration page

**Features**:
- Name input
- Email input
- Password with confirmation
- Role selection (Student/Recruiter)
- Company field (recruiter only)
- Terms agreement checkbox
- Form validation

**Form Fields**:
- Name (required)
- Email (required)
- Password (required, min 6 chars)
- Confirm Password (must match)
- Role (required) - Student or Recruiter
- Company (required if Recruiter)

---

### Student Pages

#### Dashboard.jsx
**Location**: `src/pages/Student/Dashboard.jsx`

**Purpose**: Student main dashboard with metrics and jobs

**Features**:
- Welcome message with name
- 4 stats cards:
  * Total Applications
  * Active Jobs
  * Offers Received
  * Pending Applications
- Latest 3 job listings
- Loading states with skeletons

**Data Sources**:
- User info from auth store
- Jobs from API
- Applications from API


#### Applications.jsx
**Location**: `src/pages/Student/Applications.jsx`

**Purpose**: Track and manage job applications

**Features**:
- Filter tabs (All, Pending, Accepted, Rejected)
- Application list with details
- Status badges with colors
- Applied date display
- AI score display
- Share button (UI ready)

**Data**: Fetched from `/applications/student/:studentId`


#### ResumesManager.jsx
**Location**: `src/pages/Student/ResumesManager.jsx`

**Purpose**: Manage student resumes (up to 3)

**Features**:
- Resume upload (PDF only)
- Display max 3 resumes
- Set primary resume
- Delete resume
- File information display
- Upload progress

**Constraints**:
- Maximum 3 resumes
- PDF files only
- Shows remaining upload slots

---

### Recruiter Pages

#### Dashboard.jsx
**Location**: `src/pages/Recruiter/Dashboard.jsx`

**Purpose**: Recruiter main dashboard

**Features**:
- Welcome message with name
- 4 stats cards:
  * Active Drives
  * Job Openings
  * Total Applications
  * Accepted Candidates
- Recent 3 drives list
- Action buttons (New Drive, New Job)

**Data Sources**:
- Drives from API
- Jobs from API
- Applications from API


#### Applications.jsx
**Location**: `src/pages/Recruiter/Applications.jsx`

**Purpose**: Review and manage applications

**Features**:
- Filter tabs (All, Pending, Accepted, Rejected)
- Applications list (left side)
- Details panel (right side)
- Candidate information:
  * Name and email
  * Applied position
  * AI score with progress bar
- Accept/Reject buttons
- View Resume button

**Responsive**: 
- Single column on mobile
- Two columns on desktop


#### CreateDrive.jsx
**Location**: `src/pages/Recruiter/CreateDrive.jsx`

**Purpose**: Create new recruitment drive

**Form Fields**:
- Drive Name (required)
- Company Name (required)
- Description (optional)
- Start Date (required)
- End Date (required)

**Features**:
- Date picker inputs
- Form validation
- Loading state
- Success notification
- Back button
- Error handling


#### CreateJob.jsx
**Location**: `src/pages/Recruiter/CreateJob.jsx`

**Purpose**: Post new job opening

**Form Fields**:
- Job Title (required)
- Job Type (required) - Full-time, Part-time, Internship, Contract
- Location (optional)
- Salary Range (optional)
- Years of Experience (optional)
- Job Description (required, textarea)
- Requirements (optional, textarea)
- Required Skills (multi-add in array)
- Benefits & Perks (multi-add in array)

**Features**:
- Dynamic skill/benefit input
- Remove individual skills/benefits
- Enter key to add
- Skill/benefit chips display
- Form validation
- Loading state
- Error handling

---

### Job Pages

#### JobsListing.jsx
**Location**: `src/pages/Jobs/JobsListing.jsx`

**Purpose**: Browse and search jobs

**Features**:
- Search by job title/company
- Filter by job type
- Grid layout of job cards
- Results counter
- Loading states with skeletons
- Empty state message

**Filters**:
- Search term (text input)
- Job Type (select dropdown)


#### JobDetail.jsx
**Location**: `src/pages/Jobs/JobDetail.jsx`

**Purpose**: Detailed job view and application

**Sections**:
- Job header (title, company, type)
- Job metadata (location, salary, experience, applications)
- Job description
- Requirements section
- Skills section
- Benefits section
- Sidebar:
  * Apply button (or "Already Applied" status)
  * Company info card

**Features**:
- Back to jobs button
- Share button
- Apply button with loading state
- Application status check
- Prevent duplicate applications
- Responsive layout

**Data Sources**:
- Job from `/jobs/:id`
- User applications from `/applications/student/:studentId`

---

## 🎣 Custom Hooks

### useAuth()
**Location**: `src/hooks/useAuth.js`

**Purpose**: Centralized authentication state management

**Returns**:
```javascript
{
  user: Object,           // Current user data
  token: String,          // JWT token
  isAuthenticated: Boolean,
  setAuth: Function,      // Set user and token
  logout: Function,       // Clear auth
  hydrate: Function       // Load from localStorage
}
```

**Usage**:
```jsx
const { user, isAuthenticated, logout } = useAuth();
```

---

### useLocalStorage()
**Location**: `src/hooks/useAuth.js`

**Purpose**: Persist state in localStorage

**Parameters**:
- `key`: String - localStorage key
- `initialValue`: Any - Default value

**Returns**: [value, setValue] - Similar to useState

**Usage**:
```jsx
const [savedData, setSavedData] = useLocalStorage('key', defaultValue);
```

---

## 🗄️ State Stores (Zustand)

### useAuthStore
**Location**: `src/context/store.js`

**State**:
```javascript
{
  user: null,
  token: null,
  isAuthenticated: false,
  setAuth: (user, token) => {},
  logout: () => {},
  hydrate: () => {}
}
```

### useJobsStore
**Location**: `src/context/store.js`

**State**:
```javascript
{
  jobs: [],
  selectedJob: null,
  loading: false,
  setJobs: (jobs) => {},
  setSelectedJob: (job) => {},
  setLoading: (loading) => {}
}
```

### useDrivesStore
**Location**: `src/context/store.js`

**State**:
```javascript
{
  drives: [],
  selectedDrive: null,
  loading: false,
  setDrives: (drives) => {},
  setSelectedDrive: (drive) => {},
  setLoading: (loading) => {}
}
```

### useApplicationsStore
**Location**: `src/context/store.js`

**State**:
```javascript
{
  applications: [],
  loading: false,
  setApplications: (apps) => {},
  setLoading: (loading) => {}
}
```

---

## 🔌 API Service (src/services/api.js)

### Auth API
```javascript
authAPI.register(userData)     // POST /auth/register
authAPI.login(credentials)     // POST /auth/login
```

### Jobs API
```javascript
jobsAPI.getAll()              // GET /jobs
jobsAPI.getById(id)           // GET /jobs/:id
jobsAPI.getByDrive(driveId)   // GET /jobs/drive/:driveId
jobsAPI.create(data)          // POST /jobs
jobsAPI.update(id, data)      // PUT /jobs/:id
jobsAPI.delete(id)            // DELETE /jobs/:id
```

### Applications API
```javascript
applicationsAPI.getAll()              // GET /applications
applicationsAPI.getById(id)           // GET /applications/:id
applicationsAPI.getByJob(jobId)       // GET /applications/job/:jobId
applicationsAPI.getByStudent(studentId) // GET /applications/student/:id
applicationsAPI.create(data)          // POST /applications
applicationsAPI.updateStatus(id, status) // PATCH /applications/:id/status
applicationsAPI.delete(id)            // DELETE /applications/:id
```

### Resumes API
```javascript
resumesAPI.getAll()              // GET /resumes
resumesAPI.getById(id)           // GET /resumes/:id
resumesAPI.getByStudent(studentId) // GET /resumes/student/:id
resumesAPI.upload(formData)      // POST /resumes/upload
resumesAPI.update(id, data)      // PUT /resumes/:id
resumesAPI.delete(id)            // DELETE /resumes/:id
```

### Drives API
```javascript
drivesAPI.getAll()              // GET /drives
drivesAPI.getById(id)           // GET /drives/:id
drivesAPI.create(data)          // POST /drives
drivesAPI.update(id, data)      // PUT /drives/:id
drivesAPI.delete(id)            // DELETE /drives/:id
```

### Forms API
```javascript
formsAPI.getAll()              // GET /forms
formsAPI.getById(id)           // GET /forms/:id
formsAPI.getByJob(jobId)       // GET /forms/job/:jobId
formsAPI.create(data)          // POST /forms
formsAPI.update(id, data)      // PUT /forms/:id
formsAPI.delete(id)            // DELETE /forms/:id
```

### AI API
```javascript
aiAPI.evaluateCandidate(data)      // POST /ai/evaluate
aiAPI.generateRecommendations(data) // POST /ai/recommendations
```

---

## 🎯 Component Usage Summary

| Component | Location | Type | Purpose |
|-----------|----------|------|---------|
| ProtectedRoute | Auth | Wrapper | Route protection |
| Navbar | Layout | Layout | Navigation |
| Footer | Layout | Layout | Page footer |
| JobCard | Jobs | Display | Job preview |
| Home | Page | Public | Landing page |
| Login | Auth Page | Public | User login |
| Register | Auth Page | Public | User signup |
| StudentDashboard | Student Page | Protected | Student main view |
| Applications | Student Page | Protected | Track applications |
| ResumesManager | Student Page | Protected | Manage resumes |
| RecruiterDashboard | Recruiter Page | Protected | Recruiter main view |
| RecruiterApplications | Recruiter Page | Protected | Review applications |
| CreateDrive | Recruiter Page | Protected | Create drive |
| CreateJob | Recruiter Page | Protected | Post job |
| JobsListing | Job Page | Public | Browse jobs |
| JobDetail | Job Page | Public | View job & apply |

---

## 📊 Component Hierarchy

```
App
├── Navbar
├── Routes
│   ├── Home
│   ├── Login
│   ├── Register
│   ├── ProtectedRoute
│   │   ├── StudentDashboard
│   │   ├── RecruiterDashboard
│   │   ├── Applications
│   │   ├── ResumesManager
│   │   ├── RecruiterApplications
│   │   ├── CreateDrive
│   │   └── CreateJob
│   ├── JobsListing
│   │   └── JobCard (x multiple)
│   └── JobDetail
└── Footer
```

---

*Component Documentation | CampusHire Frontend v1.0.0*
