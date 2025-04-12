'use client';

import { useState } from 'react';

export default function StoryForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    tags: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage({ type: '', message: '' });

    try {
      // Call the onSubmit prop function that will handle Firebase submission
      await onSubmit(formData);
      
      // Reset form after successful submission
      setFormData({ title: '', content: '', author: '', tags: [] });
      setSubmitMessage({ 
        type: 'success', 
        message: 'Story submitted successfully!' 
      });
    } catch (error) {
      console.error('Error submitting story:', error);
      setSubmitMessage({ 
        type: 'error', 
        message: `Failed to submit story: ${error.message}` 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[var(--shannons-purple)] rounded-lg shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Share Your Story</h3>
      
      {submitMessage.message && (
        <div className={`mb-4 p-3 rounded ${
          submitMessage.type === 'success' 
            ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200' 
            : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200'
        }`}>
          {submitMessage.message}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-white  mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md bg-[var(--shannons-purple)] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter story title"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="author" className="block text-sm font-medium text-white  mb-1">
            Author
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md bg-[var(--shannons-purple)] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Your name"
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="content" className="block text-sm font-medium text-white  mb-1">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows="6"
            className="w-full px-4 py-2 border rounded-md bg-[var(--shannons-purple)] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Write your story here..."
          ></textarea>
        </div>
        
        <div className="mb-6">
          <label htmlFor="tags" className="block text-sm font-medium text-white  mb-1">
            Tags
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.tags.map((tag, index) => (
              <span 
                key={index} 
                className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100 px-3 py-1 rounded-full text-sm flex items-center"
              >
                {tag}
                <button 
                  type="button" 
                  onClick={() => {
                    const newTags = [...formData.tags];
                    newTags.splice(index, 1);
                    setFormData(prev => ({ ...prev, tags: newTags }));
                  }}
                  className="ml-2 text-purple-600 dark:text-purple-300 hover:text-purple-800 dark:hover:text-purple-100"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              id="tagInput"
              placeholder="Add a tag (e.g., sci-fi, romance)"
              className="flex-grow px-4 py-2 rounded-md bg-[var(--shannons-purple)] text-gray-900 dark:text-white"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.target.value.trim()) {
                  e.preventDefault();
                  const newTag = e.target.value.trim().toLowerCase();
                  if (!formData.tags.includes(newTag)) {
                    setFormData(prev => ({
                      ...prev,
                      tags: [...prev.tags, newTag]
                    }));
                  }
                  e.target.value = '';
                }
              }}
            />
            <button
              type="button"
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
              onClick={() => {
                const tagInput = document.getElementById('tagInput');
                const newTag = tagInput.value.trim().toLowerCase();
                if (newTag && !formData.tags.includes(newTag)) {
                  setFormData(prev => ({
                    ...prev,
                    tags: [...prev.tags, newTag]
                  }));
                  tagInput.value = '';
                }
              }}
            >
              Add
            </button>
          </div>
          <p className="mt-1 text-sm">
            Popular tags: sci-fi, romance, historical, fantasy, mystery, thriller
          </p>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors font-medium ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Story'}
        </button>
      </form>
    </div>
  );
}
