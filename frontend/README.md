# CampusHire Frontend

A modern, premium recruitment platform frontend built with **React**, **Vite**, and **Tailwind CSS**. Designed for seamless campus recruitment management with an elegant user interface.

## 🚀 Features

### For Students
- 📋 Browse and apply to job opportunities
- 📝 Manage multiple resumes (up to 3)
- 📊 Track application status in real-time
- 💼 Detailed job information and company profiles
- 🎯 AI-powered candidate scoring

### For Recruiters
- 📌 Create and manage recruitment drives
- 💼 Post job openings with detailed descriptions
- 👥 Review and evaluate candidate applications
- ⭐ AI-assisted candidate evaluation
- 📈 Track recruitment metrics and analytics

## 💎 Design Highlights

### Premium Color Palette
- **Primary**: Deep Indigo/Navy Blue (`#5166f5`)
- **Secondary**: Modern Teal (`#2ea5ca`)
- **Accent**: Gold/Amber (`#f59e0b`)
- **Dark Theme**: Professional dark backgrounds for reduced eye strain

### UI Components
- Glass-morphism effects
- Smooth animations and transitions
- Responsive design (mobile-first)
- Accessible form inputs
- Interactive cards with hover effects

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Animation**: Framer Motion
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup Steps

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create environment file**
```bash
cp .env.example .env.local
```

4. **Configure API endpoint** (if needed)
Edit `.env.local` and update `VITE_API_URL` if your backend runs on a different port.

## 🚀 Development

### Start Development Server
```bash
npm run dev
```
The app will be available at `http://localhost:3000`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Lint Code
```bash
npm run lint
```

### Format Code
```bash
npm run format
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Auth/         # Authentication components
│   │   ├── Jobs/         # Job-related components
│   │   └── Layout/       # Layout components (Navbar, Footer)
│   ├── pages/            # Page components
│   │   ├── Auth/         # Login, Register pages
│   │   ├── Student/      # Student dashboard, applications
│   │   ├── Recruiter/    # Recruiter dashboard, application review
│   │   └── Jobs/         # Job listing and details
│   ├── services/         # API service functions
│   ├── hooks/            # Custom React hooks
│   ├── context/          # State management (Zustand)
│   ├── styles/           # Global styles
│   └── App.jsx          # Main app component
├── public/               # Static assets
├── index.html           # HTML entry point
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
└── package.json         # Dependencies
```

## 🔐 Authentication

- **Login/Register** endpoints handle user authentication
- JWT tokens stored in localStorage
- Automatic token inclusion in API requests
- Protected routes for student and recruiter features
- Demo credentials available on login page:
  - **Student**: `student@example.com` / `password123`
  - **Recruiter**: `recruiter@example.com` / `password123`

## 🎨 Customization

### Change Color Scheme
Edit `tailwind.config.js` to modify the color palette:

```javascript
colors: {
  primary: {
    500: '#your-color'
  },
  secondary: {
    500: '#your-color'
  }
}
```

### Responsive Breakpoints
Tailwind's default breakpoints are used:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

## 📱 Responsive Design

All pages are fully responsive and optimized for:
- 📱 Mobile (320px - 640px)
- 📱 Tablet (640px - 1024px)
- 💻 Desktop (1024px+)

## 🔄 API Integration

The frontend communicates with the backend API at `http://localhost:8000/api`

### Available Endpoints

- **Auth**: `/auth/register`, `/auth/login`
- **Jobs**: `/jobs`, `/jobs/:id`
- **Applications**: `/applications`, `/applications/:id`
- **Resumes**: `/resumes`, `/resumes/upload`
- **Drives**: `/drives`, `/drives/:id`
- **Forms**: `/forms`, `/forms/:id`
- **AI**: `/ai/evaluate`, `/ai/recommendations`

## 🚦 Running Locally

1. Start the backend server (if not running)
```bash
cd server
npm run dev
```

2. In another terminal, start the frontend
```bash
cd frontend
npm run dev
```

3. Open `http://localhost:3000` in your browser

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:8000/api` |
| `VITE_API_TIMEOUT` | API request timeout (ms) | `30000` |
| `VITE_APP_NAME` | Application name | `CampusHire` |
| `VITE_ENABLE_MOCK_DATA` | Use mock data for development | `false` |

## 🐛 Troubleshooting

### Port 3000 Already in Use
Change the port in `vite.config.js`:
```javascript
server: {
  port: 3001
}
```

### API Connection Fails
- Ensure backend is running on port 8000
- Check `VITE_API_URL` in `.env.local`
- Verify CORS configuration in backend

### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
1. Push code to GitHub
2. Connect repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`

### Docker (Optional)
```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 📚 Documentation

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [Zustand Store](https://github.com/pmndrs/zustand)

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/YourFeature`)
2. Commit changes (`git commit -m 'Add YourFeature'`)
3. Push to branch (`git push origin feature/YourFeature`)
4. Open a Pull Request

## 📄 License

This project is part of CampusHire. See LICENSE file for details.

## 💬 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Contact: support@campushire.com

---

**Built with ❤️ for campus recruitment excellence**
