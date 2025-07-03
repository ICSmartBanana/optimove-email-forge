
import { useState } from 'react';
import { EmailExportApp } from '../components/EmailExportApp';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Sitecore Email Export to Optimove</h1>
            <p className="text-gray-600 mt-2">Export email templates from Sitecore to Optimove with advanced preview and placeholder management</p>
          </div>
          <EmailExportApp />
        </div>
      </div>
    </div>
  );
};

export default Index;
