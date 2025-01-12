// frontend/src/Signup.jsx
import React, { useState } from 'react';
import { Button } from "../components/ui/button";
import Input from '../components/ui/input';
import { Label } from "../components/ui/label";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../config';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${config.backendUrl}/api/auth/register`, { email, password });
      navigate('/login');
    } catch (err) {
      alert('Signup failed');
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <Button type="submit" className="w-full">Signup</Button>
        </form>
        <div className="mt-4 text-center">
          <Button onClick={handleLoginRedirect} className="w-full">Already have an account</Button>
        </div>
      </div>
    </div>
  );
}