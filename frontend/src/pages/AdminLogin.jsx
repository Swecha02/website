import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Lock, Loader2, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { adminLogin } from '@/lib/api';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await adminLogin(email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Login - Swecha Enterprises</title>
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-primary p-8 text-center">
            <h1 className="text-2xl font-bold text-white mb-2">Admin Portal</h1>
            <p className="text-blue-200">Please sign in to continue</p>
          </div>
          
          <div className="p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder="admin@swecha.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm text-center">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90 h-11 text-base font-semibold"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>
          </div>
        </div>
        <p className="mt-8 text-gray-400 text-sm">
          Protected Area. Authorized Personnel Only.
        </p>
      </div>
    </>
  );
};

export default AdminLogin;
