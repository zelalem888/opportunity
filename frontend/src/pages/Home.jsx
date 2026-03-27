import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import api from '../api';

export default function Home() {
  const [scholarships, setScholarships] = useState([]);
  const [search, setSearch] = useState('');
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || '';
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchScholarships();
  }, [category, search, page]);

  // Reset page to 1 when search or category changes
  useEffect(() => {
    setPage(1);
  }, [category, search]);

  const fetchScholarships = async () => {
    try {
      const res = await api.get('/scholarships', {
        params: { searchQuery: search, category, page, limit: 16 }
      });
      if (res.data.scholarships) {
        setScholarships(res.data.scholarships);
        setTotalPages(res.data.totalPages);
      } else {
        setScholarships(res.data);
        setTotalPages(1);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-background dark:bg-slate-900 transition-colors">
      <NavBar />
      <main className="pt-24 pb-16 px-6 max-w-7xl mx-auto">
        <section className="mb-12">
          <div className="flex flex-col gap-6">
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-slate-400">search</span>
              <input
                className="w-full bg-surface-container-lowest dark:bg-slate-800 border-none ring-1 ring-outline-variant/30 dark:ring-slate-700 focus:ring-2 focus:ring-primary rounded-xl py-4 pl-12 pr-4 text-lg font-body placeholder:text-on-surface-variant/50 dark:placeholder:text-slate-500 text-slate-800 dark:text-slate-100 transition-all outline-none"
                placeholder="Search by University or Title"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </section>

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-on-background dark:text-white">
            {category && category !== 'All'
              ? `Featured Opportunities for ${category}`
              : 'Featured Opportunities'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {scholarships.map((item) => (
            <Link to={`/opportunity/${item._id}`} key={item._id} className="group bg-surface-container-lowest dark:bg-slate-800 rounded-md p-5 border border-slate-300 dark:border-slate-700 hover:shadow-[0_12px_40px_rgba(0,51,96,0.06)] dark:hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] transition-all duration-300 flex flex-col justify-between h-full">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-lg bg-surface-container dark:bg-slate-700 overflow-hidden flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary dark:text-indigo-400">school</span>
                  </div>
                  <span className="px-2 py-1 bg-surface-container-high dark:bg-slate-700 text-on-surface-variant dark:text-slate-300 text-[10px] font-bold rounded uppercase tracking-wider">
                    {new Date(item.deadline) > new Date() ? `${Math.ceil((new Date(item.deadline) - new Date()) / (1000 * 60 * 60 * 24))} Days Left` : 'Expired'}
                  </span>
                </div>
                <h3 className="font-bold text-lg leading-snug mb-2 dark:text-slate-100 group-hover:text-primary dark:group-hover:text-indigo-400 transition-colors">{item.title}</h3>
                <p className="text-on-surface-variant dark:text-slate-400 text-sm flex items-center gap-1 mb-3">
                  <span className="material-symbols-outlined text-sm">location_on</span>
                  {item.country} - {item.university}
                </p>
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.tags.slice(0, 2).map((tag, idx) => (
                      <span key={idx} className="px-2 py-[2px] bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300 text-[9px] font-bold rounded-md uppercase tracking-wider border border-slate-200 dark:border-slate-600">
                        {tag}
                      </span>
                    ))}
                    {item.tags.length > 2 && <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold">+{item.tags.length - 2}</span>}
                  </div>
                )}
              </div>
              <div className="pt-4 border-t border-slate-50 dark:border-slate-700 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-primary dark:text-indigo-400 uppercase tracking-widest">{item.category}</span>
                  {item.fundingType && <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">{item.fundingType}</span>}
                </div>
                <span className="material-symbols-outlined text-on-surface-variant dark:text-slate-400 group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </Link>
          ))}
          {scholarships.length === 0 && (
            <div className="col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4 text-center py-10 text-on-surface-variant dark:text-slate-400">
              No opportunities found. Try adjusting your search or category.
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="mt-16 flex items-center justify-center gap-4">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="px-6 py-2.5 bg-surface-container dark:bg-slate-800 text-on-surface dark:text-slate-200 font-semibold rounded-xl border border-outline-variant/20 dark:border-slate-700 hover:bg-surface-container-high dark:hover:bg-slate-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-sm font-semibold text-on-surface-variant dark:text-slate-400 font-['Inter']">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="px-6 py-2.5 bg-surface-container dark:bg-slate-800 text-on-surface dark:text-slate-200 font-semibold rounded-xl border border-outline-variant/20 dark:border-slate-700 hover:bg-surface-container-high dark:hover:bg-slate-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
