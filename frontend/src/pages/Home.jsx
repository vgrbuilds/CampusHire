import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Briefcase, Users, Zap, ArrowRight, CheckCircle } from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: 'Discover Opportunities',
      description: 'Browse and apply to top companies recruiting on campus',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Connect with Talent',
      description: 'Recruiters can find and evaluate the best candidates',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'AI-Powered Evaluation',
      description: 'Smart candidate scoring and fitment analysis',
    },
  ];

  const stats = [
    { number: '500+', label: 'Companies' },
    { number: '50K+', label: 'Students' },
    { number: '10K+', label: 'Placements' },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-40 -left-40 w-80 h-80 bg-secondary-500/10 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Your<span className="bg-gradient-primary bg-clip-text text-transparent"> Dream Career</span> Starts Here
            </h1>
            <p className="text-xl text-dark-300 mb-8 max-w-2xl mx-auto">
              Connect with top companies, showcase your skills, and land your perfect job. All in one powerful platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="btn-primary inline-flex items-center gap-2 justify-center">
                Get Started <ArrowRight size={20} />
              </Link>
              <Link to="/jobs" className="btn-outline inline-flex items-center gap-2 justify-center">
                Explore Jobs
              </Link>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16"
          >
            <div className="card-gradient aspect-video rounded-2xl" />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-dark-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <p className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                  {stat.number}
                </p>
                <p className="text-dark-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16"
          >
            Why Choose CampusHire?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="card-premium"
              >
                <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center text-primary-400 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-dark-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="card-gradient text-center py-12"
          >
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Career?</h2>
            <p className="text-lg mb-8 opacity-90">
              Join thousands of students who have successfully landed their dream jobs through CampusHire.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="px-8 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-dark-100 transition"
              >
                Sign Up Now
              </Link>
              <Link
                to="/jobs"
                className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition"
              >
                Browse Opportunities
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
