'use client';

import { useState, useEffect } from 'react';
import { getSubscribers } from '../../../services/firebase';
import Link from 'next/link';

export default function NewsletterAdmin() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sendingNewsletter, setSendingNewsletter] = useState(false);
  const [sendResult, setSendResult] = useState(null);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      const subscribersData = await getSubscribers();
      setSubscribers(subscribersData);
      setError(null);
    } catch (err) {
      console.error('Error fetching subscribers:', err);
      setError('Failed to load subscribers. ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const sendNewsletter = async () => {
    if (!window.confirm('Are you sure you want to send the Story of the Week newsletter to all subscribers?')) {
      return;
    }

    try {
      setSendingNewsletter(true);
      setSendResult(null);

      // In a real application, you would use an environment variable for the API key
      // This is just for demonstration purposes
      const apiKey = process.env.NEXT_PUBLIC_NEWSLETTER_API_KEY || 'demo-key';
      
      const response = await fetch(`/api/send-newsletter?apiKey=${apiKey}`);
      const data = await response.json();
      
      if (response.ok) {
        setSendResult({
          success: true,
          message: data.message
        });
      } else {
        setSendResult({
          success: false,
          message: data.message || 'Failed to send newsletter'
        });
      }
    } catch (err) {
      console.error('Error sending newsletter:', err);
      setSendResult({
        success: false,
        message: 'Error sending newsletter: ' + err.message
      });
    } finally {
      setSendingNewsletter(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return 'Unknown';
    return new Date(date).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-white purple-theme">
      {/* Header with Purple style */}
      <header className="border-b border-purple-800 sticky top-0 bg-purple-700 z-10 purple-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link href="/" className="text-white font-bold text-xl">
                Creative Stories Blog
              </Link>
            </div>
            <nav>
              <Link href="/" className="text-white hover:text-purple-200 ml-4">
                Home
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-purple-800 mb-4">Newsletter Management</h1>
          
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-purple-700 mb-4">Send Story of the Week Newsletter</h2>
            <p className="mb-4">This will send the latest story to all active subscribers.</p>
            
            {sendResult && (
              <div className={`mb-4 p-4 rounded ${
                sendResult.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {sendResult.message}
              </div>
            )}
            
            <button
              onClick={sendNewsletter}
              disabled={sendingNewsletter || loading || subscribers.length === 0}
              className={`px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-800 transition-colors ${
                (sendingNewsletter || loading || subscribers.length === 0) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {sendingNewsletter ? 'Sending...' : 'Send Newsletter'}
            </button>
            
            <p className="mt-2 text-sm text-gray-500">
              {subscribers.length} active subscribers
            </p>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold text-purple-800 mb-4">Subscribers</h2>
          
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error! </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          ) : subscribers.length === 0 ? (
            <p className="text-gray-500 py-4">No subscribers yet.</p>
          ) : (
            <div className="bg-white shadow overflow-hidden rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subscribed At
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {subscribers.map((subscriber) => (
                    <tr key={subscriber.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {subscriber.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(subscriber.subscribedAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          subscriber.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {subscriber.status || 'unknown'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
