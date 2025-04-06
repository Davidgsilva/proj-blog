'use client';

import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import Link from 'next/link';

export default function StoryOfTheWeek() {
  const [featuredStory, setFeaturedStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStoryOfTheWeek = async () => {
      try {
        // For now, we'll just get the most recent story with the highest views
        // In a real app, you might have an admin panel to select the story of the week
        const storiesRef = collection(db, 'stories');
        const q = query(
          storiesRef,
          orderBy('createdAt', 'desc'),
          limit(1)
        );
        
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
          setLoading(false);
          return;
        }
        
        const storyData = querySnapshot.docs[0].data();
        setFeaturedStory({
          id: querySnapshot.docs[0].id,
          ...storyData,
          createdAt: storyData.createdAt?.toDate?.() || new Date()
        });
      } catch (err) {
        console.error('Error fetching story of the week:', err);
        setError('Failed to load story of the week');
      } finally {
        setLoading(false);
      }
    };

    fetchStoryOfTheWeek();
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-purple-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-purple-100 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-purple-100 rounded w-full mb-2"></div>
        <div className="h-4 bg-purple-100 rounded w-5/6 mb-4"></div>
        <div className="h-32 bg-purple-100 rounded w-full"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!featuredStory) {
    return (
      <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
        <h3 className="text-xl font-bold text-purple-700 mb-2">Story of the Week</h3>
        <p className="text-gray-600">No featured story available yet. Be the first to submit a story!</p>
      </div>
    );
  }

  return (
    <div className="bg-purple-50 p-6 rounded-lg border border-purple-200 shadow-md">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-purple-800">Story of the Week</h3>
        <div className="bg-purple-700 text-white text-xs px-2 py-1 rounded-full">Featured</div>
      </div>
      
      <Link href={`/story/${featuredStory.id}`} className="hover:underline">
        <h4 className="text-lg font-semibold text-gray-900 mb-2">{featuredStory.title}</h4>
      </Link>
      
      <div className="flex flex-wrap gap-2 mb-3">
        {featuredStory.tags && featuredStory.tags.map((tag, index) => (
          <span 
            key={index} 
            className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full text-xs"
          >
            {tag}
          </span>
        ))}
      </div>
      
      <p className="text-gray-700 mb-4 line-clamp-3">
        {featuredStory.content.substring(0, 150)}
        {featuredStory.content.length > 150 ? '...' : ''}
      </p>
      
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-600">By {featuredStory.author}</span>
        <span className="text-purple-600">
          {new Date(featuredStory.createdAt).toLocaleDateString()}
        </span>
      </div>
      
      <Link 
        href={`/story/${featuredStory.id}`}
        className="mt-4 block w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors text-sm font-medium text-center"
      >
        Read Full Story
      </Link>
    </div>
  );
}
