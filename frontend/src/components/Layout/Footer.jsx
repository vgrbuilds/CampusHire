export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-900 border-t border-dark-700 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">CH</span>
              </div>
              <span className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
                CampusHire
              </span>
            </div>
            <p className="text-dark-400 text-sm">
              Connecting talented students with premier opportunities from top companies.
            </p>
          </div>

          {/* For Students */}
          <div>
            <h4 className="font-semibold text-white mb-4">For Students</h4>
            <ul className="space-y-2 text-sm text-dark-400">
              <li><a href="/jobs" className="hover:text-white transition">Browse Jobs</a></li>
              <li><a href="/applications" className="hover:text-white transition">My Applications</a></li>
              <li><a href="/resumes" className="hover:text-white transition">Resume Manager</a></li>
            </ul>
          </div>

          {/* For Recruiters */}
          <div>
            <h4 className="font-semibold text-white mb-4">For Recruiters</h4>
            <ul className="space-y-2 text-sm text-dark-400">
              <li><a href="/recruiter/create-drive" className="hover:text-white transition">Create Drive</a></li>
              <li><a href="/recruiter/applications" className="hover:text-white transition">View Applications</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-dark-400">
              <li><a href="#" className="hover:text-white transition">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-dark-700 pt-8">
          <p className="text-center text-dark-400 text-sm">
            © {currentYear} CampusHire. All rights reserved. | Crafted with ❤️
          </p>
        </div>
      </div>
    </footer>
  );
}
