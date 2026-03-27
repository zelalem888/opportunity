import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import DOMPurify from 'dompurify';
import api from '../api';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

export default function OpportunityView() {
  const { id } = useParams();
  const [opportunity, setOpportunity] = useState(null);

  useEffect(() => {
    fetchOpportunity();
  }, [id]);

  const fetchOpportunity = async () => {
    try {
      const res = await api.get(`/scholarships/${id}`);
      setOpportunity(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!opportunity) return <div className="p-20 text-center">Loading...</div>;

  const sanitizedHTML = DOMPurify.sanitize(opportunity.content, { 
    ADD_ATTR: ['class', 'target', 'style'],
  });

  return (
    <div className="min-h-screen bg-background dark:bg-slate-900 transition-colors">
      <NavBar />
      <main className="pt-24 pb-16 px-6 max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-primary-dim mb-8">
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Back to Directory
        </Link>
        
        <header className="mb-10">
            <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-primary-container dark:bg-slate-800 text-on-primary-container dark:text-slate-300 rounded-full text-xs font-bold uppercase tracking-wide">
                    {opportunity.category}
                </span>
                <span className="text-sm font-medium text-on-surface-variant dark:text-slate-400 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">location_on</span>
                    {opportunity.country}
                </span>
                {opportunity.tags && opportunity.tags.map(tag => (
                   <span key={tag} className="px-3 py-1 bg-surface-variant dark:bg-slate-800 text-on-surface-variant dark:text-slate-300 rounded-full text-[11px] font-bold uppercase tracking-widest border border-outline-variant/30 dark:border-slate-700">
                       {tag}
                   </span>
                ))}
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-on-background dark:text-slate-100 tracking-tight leading-tight mb-6">
                {opportunity.title}
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6 text-on-surface-variant dark:text-slate-300 border-y border-outline-variant/20 dark:border-slate-800 py-5">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary dark:text-indigo-400">school</span>
                    <span className="font-semibold">{opportunity.university}</span>
                </div>
                {opportunity.fundingType && (
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary dark:text-indigo-400">payments</span>
                        <span className="font-semibold">{opportunity.fundingType}</span>
                    </div>
                )}
                {opportunity.duration && (
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary dark:text-indigo-400">schedule</span>
                        <span className="font-semibold">{opportunity.duration}</span>
                    </div>
                )}
                {opportunity.programStartDate && (
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary dark:text-indigo-400">flight_takeoff</span>
                        <span>Starts: <span className="font-semibold">{new Date(opportunity.programStartDate).toLocaleDateString()}</span></span>
                    </div>
                )}
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary dark:text-indigo-400">event</span>
                    <span>Deadline: <span className="font-semibold text-error dark:text-red-400">{new Date(opportunity.deadline).toLocaleDateString()}</span></span>
                </div>
            </div>
        </header>

        <article 
            className="prose prose-slate dark:prose-invert prose-lg max-w-full w-full break-words overflow-x-hidden prose-headings:font-bold prose-headings:text-on-background dark:prose-headings:text-white prose-a:text-primary dark:prose-a:text-indigo-400 hover:prose-a:text-primary-dim dark:hover:prose-a:text-indigo-300 prose-a:break-all prose-img:max-w-full prose-img:h-auto prose-img:rounded-xl prose-img:shadow-sm"
            dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
        />
        
        <div className="mt-16 bg-surface-container-low dark:bg-slate-800 p-8 rounded-2xl text-center border border-outline-variant/10 dark:border-slate-700">
            <h3 className="text-2xl font-bold mb-4 dark:text-white">Ready to apply?</h3>
            <p className="text-on-surface-variant dark:text-slate-400 mb-6">Make sure you review all requirements before submitting your application.</p>
            <a href={opportunity.applyLink} target="_blank" rel="noopener noreferrer" className="inline-block bg-primary dark:bg-indigo-600 text-on-primary dark:text-white px-8 py-3 rounded-full font-bold shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                Visit Official Website
            </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
