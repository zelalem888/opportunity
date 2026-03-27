import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

export default function AdminDashboard() {
  const [scholarships, setScholarships] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchScholarships();
  }, []);

  const fetchScholarships = async () => {
    try {
      const res = await api.get('/scholarships?limit=0');
      setScholarships(res.data.scholarships || res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this opportunity?')) {
      try {
        await api.delete(`/scholarships/${id}`);
        setScholarships(scholarships.filter(s => s._id !== id));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-200 fixed h-full z-10 flex flex-col hidden lg:flex">
        <div className="p-8 pb-4">
          <div className="w-12 h-12 bg-indigo-50 rounded-xl mb-4 flex items-center justify-center">
            <span className="material-symbols-outlined text-indigo-600 text-2xl">workspace_premium</span>
          </div>
          <h2 className="text-xl font-bold font-['Inter'] text-slate-800 tracking-tight">Curator Workspace</h2>
          <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">Admin Portal</p>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <Link to="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-indigo-50 text-indigo-700 font-semibold text-sm font-['Inter'] transition-colors">
            <span className="material-symbols-outlined text-[20px]">dashboard</span>
            Opportunities
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-slate-600 hover:bg-rose-50 hover:text-rose-600 font-semibold text-sm font-['Inter'] transition-colors">
            <span className="material-symbols-outlined text-[20px]">logout</span>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-72 bg-slate-50 min-h-screen">
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold font-['Inter'] text-slate-800 tracking-tight">Active Posts</h1>
            <span className="bg-indigo-100 text-indigo-700 py-1 px-3 rounded-full text-xs font-bold">{scholarships.length}</span>
          </div>
          
          <Link to="/admin/editor" className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 flex items-center gap-2 rounded-xl text-sm font-bold shadow-[0_4px_12px_rgba(79,70,229,0.3)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.4)] hover:-translate-y-0.5 transition-all">
            <span className="material-symbols-outlined text-[18px]">add</span>
            New Opportunity
          </Link>
        </header>

        <div className="p-8">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/50">
                  <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500 w-[40%]">Opportunity Title</th>
                  <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500">Category</th>
                  <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500">Deadline</th>
                  <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {scholarships.map(s => (
                  <tr key={s._id} className="border-b border-slate-100 hover:bg-slate-50/80 transition-colors group">
                    <td className="py-4 px-6">
                      <p className="font-semibold text-slate-800 text-sm">{s.title}</p>
                      <p className="text-xs text-slate-500 mt-1">{s.university} &bull; {s.country}</p>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-100">
                        {s.category}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-600">
                      {new Date(s.deadline).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 text-right space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link to={`/admin/editor/${s._id}`} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors inline-block">
                        <span className="material-symbols-outlined text-[20px]">edit</span>
                      </Link>
                      <button onClick={() => handleDelete(s._id)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {scholarships.length === 0 && (
              <div className="p-10 text-center text-slate-500">
                No opportunities posted yet. Try creating one!
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
