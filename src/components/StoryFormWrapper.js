'use client';

import { useState, useEffect } from 'react';
import StoryForm from './StoryForm';
import { addStory } from '../services/firebase';

export default function StoryFormWrapper() {
  const [firebaseStatus, setFirebaseStatus] = useState({ ready: false, error: null });

  useEffect(() => {
    // Check if Firebase environment variables are available
    const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    
    if (!apiKey || !projectId) {
      console.error('Firebase configuration is incomplete. Missing required environment variables.');
      setFirebaseStatus({
        ready: false,
        error: 'Firebase configuration is incomplete. Please check your .env.local file.'
      });
    } else {
      setFirebaseStatus({ ready: true, error: null });
      console.log('Firebase configuration found');
    }
  }, []);

  const handleSubmitStory = async (storyData) => {
    try {
      if (!firebaseStatus.ready) {
        throw new Error('Firebase is not properly configured');
      }
      
      console.log('Attempting to add story to Firebase:', { ...storyData, content: storyData.content.substring(0, 20) + '...' });
      const storyId = await addStory(storyData);
      console.log('Story added successfully with ID:', storyId);
      return storyId;
    } catch (error) {
      console.error('Error in StoryFormWrapper:', error);
      throw error;
    }
  };

  if (firebaseStatus.error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Firebase Error:</strong>
        <span className="block sm:inline"> {firebaseStatus.error}</span>
        <p className="mt-2 text-sm">Please check your Firebase configuration in the .env.local file.</p>
      </div>
    );
  }

  return <StoryForm onSubmit={handleSubmitStory} />;
}
