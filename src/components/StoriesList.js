'use client';

import { useState, useEffect } from 'react';
import { getStories } from '../services/firebase';

export default function StoriesList() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        setLoading(true);
        const storiesData = await getStories();
        setStories(storiesData);
        setError(null);
      } catch (err) {
        console.error('Error fetching stories:', err);
        setError('Failed to load stories. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  // Format date to a readable string
  const formatDate = (date) => {
    if (!date) return 'Unknown date';
    
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error! </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  if (stories.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-600 dark:text-gray-400">No stories found. Be the first to submit a story!</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Submitted Stories</h2>
      
      {stories.map((story) => (
        <div key={story.id} className="bg-white dark:bg-purple-900 rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{story.title}</h3>
          <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-4">
            <span className="mr-2">By {story.author}</span>
            <span>•</span>
            <span className="ml-2">{formatDate(story.createdAt)}</span>
          </div>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{story.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
