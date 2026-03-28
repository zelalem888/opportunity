import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../api';

export default function NavBar() {
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [email, setEmail] = useState('');
  const [subStatus, setSubStatus] = useState('idle');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const currentCategory = searchParams.get('category') || '';

  // Dark Mode State
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    try {
      setSubStatus('loading');
      await api.post('/subscribers', { email });
      setSubStatus('success');
      setEmail('');
      setTimeout(() => {
        setIsSubscribing(false);
        setSubStatus('idle');
      }, 3000);
    } catch (err) {
      alert(err.response?.data?.message || 'Subscription failed');
      setSubStatus('error');
    }
  };
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-400  dark:border-slate-800 transition-all duration-200 ease-in-out">
      <div className="flex items-center justify-between px-6 py-3 w-full max-w-full">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-xl lg:text-[2em] font-bold flex items-center gap-2 tracking-tighter text-indigo-900 dark:text-white">
            <img src='/opportunityNest.png' className='h-8 w-8 lg:h-[3rem] lg:w-[3rem] rounded-full shrink-0' />
            <span className="truncate">Opportunity nest</span>
          </Link>
          <div className="hidden lg:flex items-center gap-4 xl:gap-6 font-['Inter'] antialiased tracking-tight text-sm font-medium">
            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-indigo-600 transition-colors py-2 text-slate-600 dark:text-slate-300">
                Scholarships <span className="material-symbols-outlined text-[16px]">expand_more</span>
              </button>
              <div className="absolute top-full left-0 w-64 bg-white dark:bg-slate-800 shadow-xl rounded-xl border border-slate-100 dark:border-slate-700 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {[
                  { label: 'Fully Funded Scholarships', query: 'Fully Funded' },
                  { label: 'Government Scholarships', query: 'Government' },
                  { label: 'Undergraduate Scholarships', query: 'Undergraduate' },
                  { label: 'Master Scholarships', query: 'Master' },
                  { label: 'PhD Scholarships', query: 'PhD' },
                  { label: 'Post Doctoral', query: 'Post Doctoral' },
                  { label: 'Without IELTS Scholarships', query: 'Without IELTS' },
                  { label: 'No Application Fee', query: 'No Application Fee' }
                ].map(item => (
                  <Link key={item.label} to={`/?category=${encodeURIComponent(item.query)}`} className="block px-5 py-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-indigo-600 text-slate-600 dark:text-slate-300 transition-colors">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link to="/?category=Internship" className="transition-colors hover:text-indigo-600 text-slate-600 dark:text-slate-300 py-2">Internships</Link>

            <Link to="/?category=Fellowship" className="transition-colors hover:text-indigo-600 text-slate-600 dark:text-slate-300 py-2">Fellowships</Link>

            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-indigo-600 transition-colors py-2 text-slate-600 dark:text-slate-300">
                Jobs <span className="material-symbols-outlined text-[16px]">expand_more</span>
              </button>
              <div className="absolute top-full left-0 w-48 bg-white dark:bg-slate-800 shadow-xl rounded-xl border border-slate-100 dark:border-slate-700 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {[
                  { label: 'Entry Level Jobs', query: 'Entry Level' },
                  { label: 'Graduate Jobs', query: 'Graduate' },
                  { label: 'Remote Jobs', query: 'Remote' },
                  { label: 'Part-Time Jobs', query: 'Part-Time' }
                ].map(item => (
                  <Link key={item.label} to={`/?category=${encodeURIComponent(item.query)}`} className="block px-5 py-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-indigo-600 text-slate-600 dark:text-slate-300 transition-colors">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-indigo-600 transition-colors py-2 text-slate-600 dark:text-slate-300">
                Regions <span className="material-symbols-outlined text-[16px]">expand_more</span>
              </button>
              <div className="absolute top-full left-0 w-48 bg-white dark:bg-slate-800 shadow-xl rounded-xl border border-slate-100 dark:border-slate-700 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {['Asia', 'Europe', 'USA', 'UK', 'Canada', 'Australia', 'Africa'].map(cat => (
                  <Link key={cat} to={`/?category=${encodeURIComponent(cat)}`} className="block px-5 py-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-indigo-600 text-slate-600 dark:text-slate-300 transition-colors">
                    {cat}
                  </Link>
                ))}
              </div>
            </div>

            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-indigo-600 transition-colors py-2 text-slate-600 dark:text-slate-300">
                Other <span className="material-symbols-outlined text-[16px]">expand_more</span>
              </button>
              <div className="absolute top-full left-0 w-48 bg-white dark:bg-slate-800 shadow-xl rounded-xl border border-slate-100 dark:border-slate-700 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {[
                  { label: 'Conferences', query: 'Conference' },
                  { label: 'Exchange Programs', query: 'Exchange' },
                  { label: 'Online Courses', query: 'Online Course' },
                  { label: 'Bootcamps', query: 'Bootcamp' }
                ].map(item => (
                  <Link key={item.label} to={`/?category=${encodeURIComponent(item.query)}`} className="block px-5 py-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-indigo-600 text-slate-600 dark:text-slate-300 transition-colors">
                    {item.label}
                  </Link>
                ))}
                <Link to="/about" className="block px-5 py-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-indigo-600 text-slate-800 dark:text-white font-semibold transition-colors mt-2 border-t border-slate-100 dark:border-slate-700 pt-2">
                  About Us & Contact
                </Link>
                {localStorage.getItem('token') && (
                  <Link to="/admin" className="block px-5 py-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-indigo-600 text-primary font-bold hover:underline transition-colors mt-2 border-t border-slate-200 dark:border-slate-700 pt-2">
                    Admin Dashboard
                  </Link>
                )}
              </div>
            </div>


          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            title="Toggle Dark Mode"
          >
            <span className="material-symbols-outlined text-[20px]">
              {isDarkMode ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
          
          <button
            onClick={() => setIsSubscribing(true)}
            className="hidden md:block bg-primary text-on-primary px-5 py-2 rounded-full text-sm font-semibold hover:bg-primary-dim active:scale-95 transition-all shadow-sm"
          >
            Subscribe
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <span className="material-symbols-outlined text-[24px]">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-b border-t border-slate-200 dark:border-slate-800 shadow-xl max-h-[75vh] overflow-y-auto flex flex-col animate-[fadeIn_0.2s_ease-out]">
          <div className="px-6 py-3 font-bold text-slate-400 text-xs uppercase tracking-wider bg-slate-50 dark:bg-slate-800/50">Core Opportunities</div>
          {[
            { label: 'Fully Funded Scholarships', query: 'Fully Funded' },
            { label: 'Master Scholarships', query: 'Master' },
            { label: 'Internships', query: 'Internship' },
            { label: 'Fellowships', query: 'Fellowship' },
            { label: 'Entry Level Jobs', query: 'Entry Level' },
          ].map(item => (
            <Link 
              key={item.label} 
              to={`/?category=${encodeURIComponent(item.query)}`} 
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-6 py-3.5 border-b border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-200 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 active:bg-slate-100 dark:active:bg-slate-700 transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <div className="px-6 py-3 font-bold text-slate-400 text-xs uppercase tracking-wider bg-slate-50 dark:bg-slate-800/50">Platform</div>
          <Link 
            to="/about" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="px-6 py-3.5 border-b border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-200 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            About Us & Contact
          </Link>
          {localStorage.getItem('token') && (
            <Link 
              to="/admin" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-6 py-3.5 border-b border-slate-100 dark:border-slate-800 text-primary dark:text-indigo-400 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              Admin Dashboard
            </Link>
          )}

          <div className="p-6 pb-8">
            <button 
              onClick={() => { setIsMobileMenuOpen(false); setIsSubscribing(true); }}
              className="w-full bg-primary text-white py-3.5 rounded-xl font-bold hover:bg-primary-dim transition-colors shadow-md flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[20px]">notifications_active</span>
              Subscribe to Newsletter
            </button>
          </div>
        </div>
      )}

      {/* Subscription Modal Popup */}
      {isSubscribing && createPortal(
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl w-full max-w-md p-8 relative">
            <button
              onClick={() => setIsSubscribing(false)}
              className="absolute top-4 right-4 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-500 dark:text-slate-300 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary-container rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-3xl">mark_email_unread</span>
              </div>
              <h2 className="text-2xl font-bold font-['Inter'] text-slate-800 dark:text-white mb-2 tracking-tight">Never miss an opportunity</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Join our newsletter to get the latest global scholarships delivered straight to your inbox.</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-800 dark:text-slate-100 transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
                disabled={subStatus === 'loading' || subStatus === 'success'}
              />
              <button
                type="submit"
                disabled={subStatus === 'loading' || subStatus === 'success'}
                className="w-full bg-primary text-on-primary px-4 py-3.5 rounded-xl text-sm font-bold hover:bg-primary-dim transition-all shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] disabled:shadow-none disabled:bg-emerald-500 disabled:text-white flex items-center justify-center gap-2"
              >
                {subStatus === 'success' ? (
                  <>
                    <span className="material-symbols-outlined text-[20px]">check_circle</span>
                    Subscribed Successfully!
                  </>
                ) : subStatus === 'loading' ? 'Subscribing...' : 'Subscribe Now'}
              </button>
            </form>
          </div>
        </div>,
        document.body
      )}
    </nav>
  );
}
