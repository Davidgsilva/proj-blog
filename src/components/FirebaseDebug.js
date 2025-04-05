'use client';

import { useEffect, useState } from 'react';
import { checkFirebaseConnection } from '../services/firebase';

export default function FirebaseDebug() {
  const [envVars, setEnvVars] = useState({});
  const [showDetails, setShowDetails] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState({ status: 'pending', message: 'Not tested yet' });
  const [isTesting, setIsTesting] = useState(false);

  useEffect(() => {
    // Collect all NEXT_PUBLIC_FIREBASE environment variables
    const vars = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? '✓ Set' : '✗ Missing',
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? '✓ Set' : '✗ Missing',
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? '✓ Set' : '✗ Missing',
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ? '✓ Set' : '✗ Missing',
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ? '✓ Set' : '✗ Missing',
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ? '✓ Set' : '✗ Missing'
    };
    setEnvVars(vars);
  }, []);

  const testConnection = async () => {
    setIsTesting(true);
    setConnectionStatus({ status: 'testing', message: 'Testing connection...' });
    
    try {
      const result = await checkFirebaseConnection();
      
      if (result.success) {
        setConnectionStatus({ 
          status: 'success', 
          message: 'Connection successful! Your Firebase configuration is working.' 
        });
      } else {
        setConnectionStatus({ 
          status: 'error', 
          message: `Connection failed: ${result.error}`,
          details: result.code
        });
      }
    } catch (error) {
      setConnectionStatus({ 
        status: 'error', 
        message: `Connection test error: ${error.message}`,
        details: error.code || 'Unknown error code'
      });
    } finally {
      setIsTesting(false);
    }
  };

  const missingVars = Object.values(envVars).filter(v => v === '✗ Missing').length;
  const statusColor = missingVars > 0 ? 'text-red-600' : 'text-green-600';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Firebase Configuration Status</h3>
        <span className={`font-medium ${statusColor}`}>
          {missingVars > 0 ? `${missingVars} missing variables` : 'All variables set'}
        </span>
      </div>
      
      <div className="mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <button 
          onClick={() => setShowDetails(!showDetails)}
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
        >
          {showDetails ? 'Hide Details' : 'Show Details'}
        </button>
        
        <button
          onClick={testConnection}
          disabled={isTesting}
          className={`px-4 py-2 rounded-md text-white ${isTesting ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {isTesting ? 'Testing...' : 'Test Firebase Connection'}
        </button>
      </div>
      
      {/* Connection Status */}
      {connectionStatus.status !== 'pending' && (
        <div className={`mt-4 p-3 rounded ${connectionStatus.status === 'success' ? 'bg-green-100 text-green-800' : connectionStatus.status === 'error' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
          <p className="font-medium">{connectionStatus.message}</p>
          {connectionStatus.details && (
            <p className="text-sm mt-1">Error code: {connectionStatus.details}</p>
          )}
          {connectionStatus.status === 'error' && connectionStatus.message.includes('400') && (
            <div className="mt-2 text-sm">
              <p className="font-medium">Common causes for 400 Bad Request errors:</p>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>Your Firebase project may not exist or be properly set up</li>
                <li>The API key or project ID in your .env.local file might be incorrect</li>
                <li>Firestore database might not be enabled for your project</li>
                <li>Your Firebase project might have restrictive security rules</li>
                <li>Your Firebase project might be in a different region than your client</li>
              </ul>
            </div>
          )}
        </div>
      )}
      
      {/* Environment Variables */}
      {showDetails && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {Object.entries(envVars).map(([key, value]) => (
            <div key={key} className="flex justify-between">
              <span className="text-gray-700 dark:text-gray-300">{key}:</span>
              <span className={value.includes('✓') ? 'text-green-600' : 'text-red-600'}>
                {value}
              </span>
            </div>
          ))}
          <div className="col-span-1 sm:col-span-2 mt-4 text-sm text-gray-600 dark:text-gray-400">
            <p>If any variables are missing, check your .env.local file.</p>
            <p className="mt-2">
              <strong>Note:</strong> The actual values are not displayed for security reasons.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
