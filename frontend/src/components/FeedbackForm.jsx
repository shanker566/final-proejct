import React, { useState } from 'react';
import axios from 'axios';

export default function FeedbackForm(){
  const [form, setForm] = useState({ name:'', email:'', message:'', issueType:'' });
  const submit = async (e) => {
    e.preventDefault();
    await axios.post(`${import.meta.env.VITE_API_URL}/feedback`, form);
    alert('Feedback sent');
    setForm({ name:'', email:'', message:'', issueType:'' });
  };
  return (
    <form onSubmit={submit} className="space-y-2 max-w-md">
      <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Name" className="w-full p-2 border rounded" />
      <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email" className="w-full p-2 border rounded" />
      <input value={form.issueType} onChange={e=>setForm({...form,issueType:e.target.value})} placeholder="Issue Type" className="w-full p-2 border rounded" />
      <textarea value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="Message" className="w-full p-2 border rounded" />
      <button className="px-4 py-2 bg-blue-600 text-white rounded">Send Feedback</button>
    </form>
  )
}
