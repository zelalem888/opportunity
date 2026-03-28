import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

export default function About() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState('idle');

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setSubmitStatus('loading');
    
    // Simulate API call for the contact form
    setTimeout(() => {
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background dark:bg-slate-900 transition-colors font-body">
      <NavBar />
      
      {/* Hero Section */}
      <main className="pt-28 pb-20 px-6 max-w-7xl mx-auto">
        <section className="text-center mb-24 animate-[fadeIn_0.5s_ease-out]">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary-container dark:bg-indigo-900/30 text-on-primary-container dark:text-indigo-300 rounded-full text-sm font-bold uppercase tracking-widest mb-6">
            <span className="material-symbols-outlined text-[18px]">info</span>
            About The Platform
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-on-background dark:text-white tracking-tight leading-tight mb-8">
            Empowering Global <br className="hidden md:block"/> Education & Careers
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Opportunity Nest is a dedicated global hub built to bridge the gap between talented individuals and world-class educational and professional opportunities. Whether you're searching for a fully-funded Master's program in Europe or seeking a remote tech internship, our mission is to curate and deliver the most prestigious globally accessible opportunities.
          </p>
        </section>

        {/* Creator Profile Section */}
        <section className="mb-24 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-surface-container to-surface-container-high dark:from-slate-800 dark:to-slate-800/50 rounded-[3rem] -skew-y-2 transform -z-10 origin-top-left"></div>
          
          <div className="bg-surface-container-lowest dark:bg-slate-800 rounded-3xl p-8 md:p-12 shadow-[0_20px_60px_rgba(0,51,96,0.06)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.4)] border border-outline-variant/20 dark:border-slate-700 flex flex-col lg:flex-row gap-12 items-center">
            
            {/* Visual Profile Column */}
            <div className="w-full lg:w-1/3 flex flex-col items-center">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-white dark:border-slate-700 shadow-xl overflow-hidden mb-6 bg-slate-200 dark:bg-slate-700">
                {/* Placeholder Image - User can replace src later */}
                <img 
                  src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=400&h=400" 
                  alt="Zelalem - Creator" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-2xl font-bold text-on-background dark:text-white mb-1">Zelalem</h2>
              <div className="text-primary dark:text-indigo-400 font-bold tracking-wide uppercase text-sm mb-4">Founder & Lead Developer</div>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 rounded-full bg-surface-container dark:bg-slate-700 flex items-center justify-center text-on-surface-variant dark:text-slate-300 hover:bg-primary hover:text-white dark:hover:bg-indigo-500 transition-all">
                  <span className="material-symbols-outlined">link</span>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-surface-container dark:bg-slate-700 flex items-center justify-center text-on-surface-variant dark:text-slate-300 hover:bg-primary hover:text-white dark:hover:bg-indigo-500 transition-all">
                  <span className="material-symbols-outlined">mail</span>
                </a>
              </div>
            </div>

            {/* Profile Info Column */}
            <div className="w-full lg:w-2/3">
              <h3 className="text-3xl font-extrabold text-on-background dark:text-white mb-6">Meet the Creator</h3>
              <p className="text-on-surface-variant dark:text-slate-300 text-lg leading-relaxed mb-8">
                I am a passionate Software Developer and Educational Advocate driven by the belief that lack of information should never be a barrier to success. Recognizing the immense difficulty brilliant students face when scouring the internet for legitimate scholarships and global internships, I architected and engineered Opportunity Nest to solve that exact problem.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-slate-900/50 p-6 rounded-2xl border border-outline-variant/10 dark:border-slate-700/50 hover:-translate-y-1 transition-transform">
                  <div className="w-12 h-12 rounded-xl bg-primary-container dark:bg-indigo-900/50 flex items-center justify-center text-primary dark:text-indigo-400 mb-4">
                    <span className="material-symbols-outlined">code</span>
                  </div>
                  <h4 className="font-bold text-on-background dark:text-white mb-2">Technical Qualifications</h4>
                  <ul className="text-on-surface-variant dark:text-slate-400 text-sm space-y-2">
                    <li>• Full Stack Web Development</li>
                    <li>• React, Node.js, & MongoDB Architecture</li>
                    <li>• UI/UX Design & System Scalability</li>
                  </ul>
                </div>
                
                <div className="bg-white dark:bg-slate-900/50 p-6 rounded-2xl border border-outline-variant/10 dark:border-slate-700/50 hover:-translate-y-1 transition-transform">
                  <div className="w-12 h-12 rounded-xl bg-tertiary-container dark:bg-emerald-900/30 flex items-center justify-center text-tertiary dark:text-emerald-400 mb-4">
                    <span className="material-symbols-outlined">public</span>
                  </div>
                  <h4 className="font-bold text-on-background dark:text-white mb-2">Professional Mission</h4>
                  <ul className="text-on-surface-variant dark:text-slate-400 text-sm space-y-2">
                    <li>• Democratizing global education access</li>
                    <li>• Engineering seamless user experiences</li>
                    <li>• Empowering future community leaders</li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Contact Form Section */}
        <section className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-on-background dark:text-white mb-4">Get in Touch</h2>
            <p className="text-on-surface-variant dark:text-slate-400 text-lg">Have a question, partnership proposal, or just want to say hello? Drop a message below!</p>
          </div>

          <form onSubmit={handleContactSubmit} className="bg-white dark:bg-slate-800 p-8 md:p-10 rounded-3xl shadow-sm border border-outline-variant/20 dark:border-slate-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-bold text-on-background dark:text-slate-200 mb-2">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-surface-container-lowest dark:bg-slate-900 border border-outline-variant/30 dark:border-slate-600 rounded-xl px-4 py-3 text-on-surface dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-on-background dark:text-slate-200 mb-2">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-surface-container-lowest dark:bg-slate-900 border border-outline-variant/30 dark:border-slate-600 rounded-xl px-4 py-3 text-on-surface dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-bold text-on-background dark:text-slate-200 mb-2">Subject</label>
              <input 
                type="text" 
                required
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                className="w-full bg-surface-container-lowest dark:bg-slate-900 border border-outline-variant/30 dark:border-slate-600 rounded-xl px-4 py-3 text-on-surface dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                placeholder="How can we collaborate?"
              />
            </div>
            <div className="mb-8">
              <label className="block text-sm font-bold text-on-background dark:text-slate-200 mb-2">Message</label>
              <textarea 
                rows="5" 
                required
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-surface-container-lowest dark:bg-slate-900 border border-outline-variant/30 dark:border-slate-600 rounded-xl px-4 py-3 text-on-surface dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                placeholder="Write your message here..."
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              disabled={submitStatus === 'loading' || submitStatus === 'success'}
              className="w-full md:w-auto px-10 py-4 bg-primary text-on-primary rounded-xl font-bold text-lg shadow-[0_8px_20px_rgba(86,84,168,0.3)] hover:shadow-[0_12px_25px_rgba(86,84,168,0.4)] hover:-translate-y-1 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:-translate-y-0 disabled:shadow-none"
            >
              {submitStatus === 'loading' && <span className="material-symbols-outlined animate-spin hidden md:block">autorenew</span>}
              {submitStatus === 'success' ? 'Message Sent Successfully!' : 'Send Message'}
              {submitStatus === 'idle' && <span className="material-symbols-outlined text-[20px]">send</span>}
            </button>
          </form>
        </section>

      </main>

      <Footer />
    </div>
  );
}
