import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full py-16 lg:py-20 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 mt-16 transition-all duration-200">
      <div className="w-full max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <Link to="/" className="text-2xl font-bold tracking-tighter text-indigo-900 dark:text-white flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                 <span className="material-symbols-outlined text-white text-[18px]">school</span>
              </div>
              Opportunity nest
            </Link>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-sm">
              Your global platform for discovering the latest fully-funded scholarships, fellowships, and international internships to advance your career.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-wider text-xs">Platform</h4>
            <div className="flex flex-col gap-4 text-sm font-medium">
              <Link className="text-slate-500 hover:text-primary transition-colors" to="/about">About Us</Link>
              <Link className="text-slate-500 hover:text-primary transition-colors" to="/about">Contact Support</Link>
              <a className="text-slate-500 hover:text-primary transition-colors" href="#">Submit Opportunity</a>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-wider text-xs">Legal</h4>
            <div className="flex flex-col gap-4 text-sm font-medium">
              <a className="text-slate-500 hover:text-primary transition-colors" href="#">Privacy Policy</a>
              <a className="text-slate-500 hover:text-primary transition-colors" href="#">Terms of Service</a>
              <a className="text-slate-500 hover:text-primary transition-colors" href="#">Cookie Policy</a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-100 dark:border-slate-800 gap-6 md:gap-0">
          <p className="font-['Inter'] text-xs uppercase tracking-widest text-slate-400 dark:text-slate-500">
            © 2026 Opportunity Nest. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-primary transition-all">
                <span className="material-symbols-outlined text-[20px]">share</span>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-primary transition-all">
                <span className="material-symbols-outlined text-[20px]">public</span>
            </a>
            <a href="mailto:contact@opportunitynest.com" className="w-10 h-10 rounded-full bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-primary transition-all">
                <span className="material-symbols-outlined text-[20px]">mail</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
