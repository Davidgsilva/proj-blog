'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import Link from 'next/link';


export default function StoryPage() {
  const params = useParams();
  const storyId = params.id;
  
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        setLoading(true);
        const storyDoc = await getDoc(doc(db, 'stories', storyId));
        
        if (!storyDoc.exists()) {
          setError('Story not found');
          return;
        }
        
        const storyData = storyDoc.data();
        setStory({
          id: storyDoc.id,
          ...storyData,
          createdAt: storyData.createdAt?.toDate?.() || new Date()
        });
      } catch (err) {
        console.error('Error fetching story:', err);
        setError('Failed to load story. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (storyId) {
      fetchStory();
    }
  }, [storyId]);

  // Format date to a readable string
  const formatDate = (date) => {
    if (!date) return 'Unknown date';
    
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white purple-theme">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="h-10 bg-purple-200 rounded w-3/4 mb-6"></div>
            <div className="h-4 bg-purple-100 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-purple-100 rounded w-full mb-2"></div>
            <div className="h-4 bg-purple-100 rounded w-5/6 mb-2"></div>
            <div className="h-4 bg-purple-100 rounded w-full mb-2"></div>
            <div className="h-4 bg-purple-100 rounded w-3/4 mb-8"></div>
            <div className="h-32 bg-purple-100 rounded w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white purple-theme">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error! </strong>
            <span className="block sm:inline">{error}</span>
          </div>
          <div className="mt-6">
            <Link href="/" className="text-purple-600 hover:text-purple-800 font-medium">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="min-h-screen bg-white purple-theme">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <p className="text-gray-600">Story not found</p>
          <div className="mt-6">
            <Link href="/" className="text-purple-600 hover:text-purple-800 font-medium">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white purple-theme">
      {/* Header with Purple style */}
      <header className="border-b border-purple-800 sticky top-0 bg-purple-700 z-10 purple-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <Link href="/" className="text-2xl font-bold text-white tracking-tight">
                Creative Stories Hub
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Story Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-6">
          <Link href="/" className="text-purple-600 hover:text-purple-800 font-medium">
            ← Back to Home
          </Link>
        </div>
        
        <article className="bg-purple-50 p-6 rounded-lg border border-purple-200 shadow-md">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-4 story-title font-delius">
            {story.title}
          </h1>
          
          <div className="flex flex-wrap items-center text-gray-600  text-sm mb-6">
            <span className="mr-2">By {story.author}</span>
            <span className="mx-2">•</span>
            <span>{formatDate(story.createdAt)}</span>
          </div>
          
          {story.tags && story.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {story.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="bg-[var(--shannons-purple)] text-white px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          <div className="prose max-w-none">
            <p className="whitespace-pre-wrap leading-relaxed story-content font-delius text-black">
              {story.content}
            </p>
          </div>
        </article>
      </main>
    </div>
  );
}
