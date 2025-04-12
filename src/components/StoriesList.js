'use client';

import { useState, useEffect } from 'react';
import { getStories } from '../services/firebase';
import Link from 'next/link';

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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
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
      {stories.map((story) => (
        <div key={story.id} className="bg-purple-50 p-6 rounded-lg border border-purple-200 shadow-md">
          <Link href={`/story/${story.id}`} className="hover:underline">
            <h3 className="text-xl font-semibold text-black mb-2 story-title font-delius">{story.title}</h3>
          </Link>
          <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-4">
            <span className="mr-2">By {story.author}</span>
            <span>•</span>
            <span className="ml-2">{formatDate(story.createdAt)}</span>
          </div>
          
          {story.tags && story.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {story.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          <div className="prose dark:prose-invert max-w-none mb-4">
            <p className="text-black whitespace-pre-wrap line-clamp-3 story-content font-delius">
              {story.content.substring(0, 150)}
              {story.content.length > 150 ? '...' : ''}
            </p>
          </div>
          
          <Link 
            href={`/story/${story.id}`}
            className="inline-block px-4 py-2 text-white rounded-md bg-[var(--shannons-purple)] hover:bg-purple-700 transition-colors text-sm font-medium"
          >
            Read More
          </Link>
        </div>
      ))}
    </div>
  );
}
