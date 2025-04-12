'use client';

import { useState } from 'react';
import { addSubscriber } from '../services/firebase';

export default function NewsletterSubscribe() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setStatus({ type: 'error', message: 'Please enter your email address' });
      return;
    }
    
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });
    
    try {
      const result = await addSubscriber(email);
      
      if (result.success) {
        setStatus({ type: 'success', message: result.message });
        setIsSubscribed(true);
        setEmail('');
      } else {
        setStatus({ type: 'error', message: result.message });
      }
    } catch (error) {
      console.error('Error subscribing:', error);
      setStatus({ 
        type: 'error', 
        message: error.message || 'Failed to subscribe. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isSubscribed) {
    return (
      <div className="max-w-3xl mx-auto text-center">
        <div className="bg-purple-800 rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-4">Thanks for Subscribing!</h2>
          <p className="text-white mb-6">
            You've been added to our newsletter. We'll send you updates about the latest stories and features.
          </p>
          
          <div className="mb-6">
            <svg className="w-16 h-16 mx-auto text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          
          <p className="text-purple-200 text-sm">
            You can manage your subscription preferences at any time.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="text-2xl font-bold text-purple-700 mb-4 purple-text">Get the Insider Newsletter</h2>
      <p className="text-white mb-6">Daily updates on the most important stories in creative fiction.</p>
      
      {status.message && (
        <div className={`mb-4 p-3 rounded ${
          status.type === 'success' 
            ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200' 
            : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200'
        }`}>
          {status.message}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email" 
          className="px-4 py-3 rounded-md border border-gray-300 bg-purple-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-300 sm:w-72 placeholder:text-white"
          disabled={isSubmitting}
        />
        <button 
          type="submit"
          disabled={isSubmitting}
          className={`px-6 py-3 bg-purple-700 text-white rounded-md hover:bg-purple-800 transition-colors font-medium purple-btn ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
    </div>
  );
}
