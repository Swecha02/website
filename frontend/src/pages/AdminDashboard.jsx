import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import {
  LogOut,
  LayoutDashboard,
  Layout,
  Globe,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import LandingPageStats from '@/components/analytics/LandingPageStats';
import WebsiteStats from '@/components/analytics/WebsiteStats';
import SubmissionsTab from '@/components/admin/SubmissionsTab';
import { adminLogout } from '@/lib/api';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('landing');

  const handleLogout = async () => {
    try {
      await adminLogout();
    } finally {
      navigate('/admin/login');
    }
  };

  return (
    <>
      <Helmet>
        <title>Dashboard - Swecha Admin</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-lg">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900 hidden sm:block">Analytics Dashboard</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </header>

        {/* Tab Navigation */}
        <div className="bg-white border-b border-gray-200 shadow-sm z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab('landing')}
                className={`
                  flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors
                  ${activeTab === 'landing' 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                `}
              >
                <Layout className="w-4 h-4" />
                Landing Page Statistics
              </button>

              <button
                onClick={() => setActiveTab('website')}
                className={`
                  flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors
                  ${activeTab === 'website' 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                `}
              >
                <Globe className="w-4 h-4" />
                Website Statistics
              </button>

              <button
                onClick={() => setActiveTab('submissions')}
                className={`
                  flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors
                  ${activeTab === 'submissions'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                `}
              >
                <MessageSquare className="w-4 h-4" />
                Form Submissions
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          {activeTab === 'landing' && <LandingPageStats />}
          {activeTab === 'website' && <WebsiteStats />}
          {activeTab === 'submissions' && <SubmissionsTab />}
        </main>
      </div>
    </>
  );
};

export default AdminDashboard;