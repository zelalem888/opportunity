import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function AdminLogin() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await api.post('/auth/login', data);
      localStorage.setItem('token', res.data.token);
      navigate('/admin');
    } catch (err) {
      setServerError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-primary-container rounded-2xl mx-auto mb-6 flex items-center justify-center transform rotate-3">
            <span className="material-symbols-outlined text-primary text-3xl transform -rotate-3">admin_panel_settings</span>
          </div>
          <h1 className="text-2xl font-bold font-['Inter'] text-slate-800 tracking-tight">Admin Welcome Back</h1>
        </div>

        {serverError && <p className="text-error text-center mb-4">{serverError}</p>}

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2 font-['Inter']">Username</label>
            <input 
              {...register('username', { required: 'Username is required' })}
              type="text"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
              placeholder="admin"
            />
            {errors.username && <p className="text-error text-xs mt-1">{errors.username.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2 font-['Inter']">Password</label>
            <input 
              {...register('password', { required: 'Password is required' })}
              type="password"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
              placeholder="••••••••"
            />
            {errors.password && <p className="text-error text-xs mt-1">{errors.password.message}</p>}
          </div>

          <button type="submit" className="w-full bg-primary hover:bg-primary-dim text-white font-semibold rounded-xl px-4 py-3.5 mt-8 shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.23)] hover:-translate-y-0.5 transition-all text-sm tracking-wide">
            Sign In to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
