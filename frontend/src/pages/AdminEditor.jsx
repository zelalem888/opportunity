import React, { useState, useRef, useMemo, useEffect } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';

export default function AdminEditor() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    university: '',
    country: '',
    category: 'Masters',
    fundingType: 'Fully Funded',
    duration: '',
    programStartDate: '',
    deadline: '',
    applyLink: '',
    tags: '', // stored as string in state, sent as array
  });
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const quillRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchScholarship = async () => {
        try {
          const res = await api.get(`/scholarships/${id}`);
          const { title, university, country, category, fundingType, duration, programStartDate, deadline, applyLink, content, tags } = res.data;
          setFormData({
            title,
            university,
            country,
            category,
            fundingType: fundingType || 'Fully Funded',
            duration: duration || '',
            programStartDate: programStartDate ? new Date(programStartDate).toISOString().split('T')[0] : '',
            deadline: new Date(deadline).toISOString().split('T')[0],
            applyLink: applyLink || '',
            tags: tags && tags.length > 0 ? tags.join(', ') : ''
          });
          setContent(content);
        } catch (err) {
          console.error(err);
          alert('Failed to load opportunity details');
        }
      };
      fetchScholarship();
    }
  }, [id]);

  const handlePublish = async () => {
    if (!formData.title || !formData.university || !formData.country || !formData.deadline || !formData.applyLink || !content) {
        return alert("Please fill in all required fields (including deadline, application link, and content).");
    }
    
    // Parse tags string into an array of trimmed strings
    const parsedTags = formData.tags 
      ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
      : [];

    const payload = { ...formData, tags: parsedTags, content };

    try {
      setIsSubmitting(true);
      if (id) {
        await api.put(`/scholarships/${id}`, payload);
      } else {
        await api.post('/scholarships', payload);
      }
      navigate('/admin');
    } catch (err) {
      console.error(err);
      alert('Failed to publish: ' + (err.response?.data?.error || err.response?.data?.message || err.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const quill = quillRef.current.getEditor();
          const range = quill.getSelection();
          quill.insertEmbed(range.index, 'image', e.target.result);
        };
        reader.readAsDataURL(file);
      }
    };
  };

  // Configure Quill modules
  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'],
        ['clean']
      ],
      handlers: {
        image: imageHandler
      }
    }
  }), []);

  return (
    <div className="min-h-screen bg-slate-50 relative pb-32">
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 px-8 py-4 flex items-center justify-between shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all">
            <div className="flex items-center gap-6">
                <button onClick={() => navigate('/admin')} className="text-slate-400 hover:text-slate-700 hover:bg-slate-100 p-2 rounded-xl transition-all">
                    <span className="material-symbols-outlined text-[24px]">arrow_back</span>
                </button>
                <div>
                    <h1 className="text-xl font-bold font-['Inter'] text-slate-800 tracking-tight leading-none">
                      {id ? 'Edit Opportunity' : 'Create Opportunity'}
                    </h1>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest mt-1 block">Draft Mode</span>
                </div>
            </div>
            
            <div className="flex items-center gap-3">
                <button className="px-5 py-2.5 rounded-xl text-slate-600 font-semibold text-sm hover:bg-slate-100 font-['Inter'] transition-colors">
                    Save Draft
                </button>
                <button 
                  onClick={handlePublish}
                  disabled={isSubmitting}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.23)] hover:-translate-y-0.5 transition-all flex items-center gap-2"
                >
                    <span className="material-symbols-outlined text-[18px]">publish</span>
                    {isSubmitting ? 'Saving...' : (id ? 'Update Post' : 'Publish Post')}
                </button>
            </div>
        </header>

        <main className="max-w-4xl mx-auto mt-12 px-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-10 shadow-sm mb-8">
                <div className="space-y-8">
                    <input 
                      type="text" 
                      placeholder="Scholarship Title..." 
                      className="w-full text-4xl font-black font-['Inter'] text-slate-800 placeholder:text-slate-300 border-none outline-none focus:ring-0 px-0 bg-transparent tracking-tight"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">University / Organization</label>
                            <input 
                              type="text" 
                              placeholder="e.g. Oxford University" 
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none text-slate-700 font-medium"
                              value={formData.university}
                              onChange={(e) => setFormData({...formData, university: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Country Location</label>
                            <input 
                              type="text" 
                              placeholder="e.g. United Kingdom" 
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none text-slate-700 font-medium"
                              value={formData.country}
                              onChange={(e) => setFormData({...formData, country: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Category / Level</label>
                            <input 
                                list="categories"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none text-slate-700 font-medium"
                                value={formData.category}
                                onChange={(e) => setFormData({...formData, category: e.target.value})}
                                placeholder="e.g. Master, Training, Short Course"
                            />
                            <datalist id="categories">
                                <option value="Bachelors" />
                                <option value="Masters" />
                                <option value="PhD" />
                                <option value="Training" />
                                <option value="Short Course" />
                                <option value="Fellowship" />
                                <option value="Internship" />
                            </datalist>
                        </div>
                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Funding Type</label>
                            <input 
                                list="fundings"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none text-slate-700 font-medium"
                                value={formData.fundingType}
                                onChange={(e) => setFormData({...formData, fundingType: e.target.value})}
                                placeholder="e.g. Fully Funded"
                            />
                            <datalist id="fundings">
                                <option value="Fully Funded" />
                                <option value="Partially Funded" />
                                <option value="Government Funded" />
                                <option value="Self Funded" />
                            </datalist>
                        </div>
                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Duration</label>
                            <input 
                              type="text" 
                              placeholder="e.g. 2 Years, 6 Months" 
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none text-slate-700 font-medium"
                              value={formData.duration}
                              onChange={(e) => setFormData({...formData, duration: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Program Start Date (Optional)</label>
                            <input 
                              type="date" 
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none text-slate-700 font-medium cursor-pointer"
                              value={formData.programStartDate}
                              onChange={(e) => setFormData({...formData, programStartDate: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Application Deadline</label>
                            <input 
                              type="date" 
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none text-slate-700 font-medium cursor-pointer"
                              value={formData.deadline}
                              onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                        <div className="md:col-span-2">
                            <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                              Search Tags / Attributes
                            </label>
                            <input 
                              type="text" 
                              placeholder="e.g. No Application Fee, Without IELTS, Medical Fields (Comma separated)" 
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none text-slate-700 font-medium"
                              value={formData.tags}
                              onChange={(e) => setFormData({...formData, tags: e.target.value})}
                            />
                            <p className="text-[11px] text-slate-400 mt-2 font-medium">Add exact phrases from the navigation menu (comma separated) so users can filter this post.</p>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100">
                        <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Application Link</label>
                        <input 
                          type="url" 
                          placeholder="https://example.com/apply" 
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none text-slate-700 font-medium"
                          value={formData.applyLink}
                          onChange={(e) => setFormData({...formData, applyLink: e.target.value})}
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden min-h-[600px] flex flex-col relative ql-infinite-canvas">
                <ReactQuill 
                    ref={quillRef}
                    theme="snow"
                    value={content}
                    onChange={setContent}
                    modules={modules}
                    placeholder="Start writing the scholarship details..."
                    className="flex-1 rounded-bl-3xl rounded-br-3xl"
                />
            </div>
        </main>
    </div>
  );
}
