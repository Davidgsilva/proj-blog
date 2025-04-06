import StoryFormWrapper from "../components/StoryFormWrapper";
import FirebaseDebug from "../components/FirebaseDebug";
import StoriesList from "../components/StoriesList";
import FlowerAnimation from "../components/FlowerAnimation";
import StoryOfTheWeek from "../components/StoryOfTheWeek";

export default function Home() {
  return (
    <div className="min-h-screen bg-white purple-theme">
      <FlowerAnimation />
      {/* Header with Purple style */}
      <header className="border-b border-purple-800 sticky top-0 bg-purple-700 z-10 purple-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-white tracking-tight">TBD</h1>
            </div>
            {/* <nav className="hidden md:flex space-x-8">
              {['Business'].map((item) => (
                <a key={item} href="#" className="text-sm font-medium text-white hover:text-purple-200">
                  {item}
                </a>
              ))}
            </nav> */}
            <div className="flex items-center">
              <button className="bg-purple-900 text-white px-4 py-2 text-sm font-medium rounded hover:bg-purple-800 purple-btn">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-8">
            {/* Hero Section */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-purple-800 mb-4 leading-tight purple-text-dark">
                Creative Stories Hub
              </h2>
              <p className="text-lg text-purple-700 mb-6 leading-relaxed">
                Discover imaginative stories from talented writers across genres including sci-fi, romance, historical fiction, and more.
              </p>
              <div className="h-1 w-24 bg-purple-700 mb-8 purple-accent"></div>
              
              {/* Story of the Week Feature */}
              <StoryOfTheWeek />
            </section>

            {/* Stories List */}
            <section className="mb-12">
              <div className="mb-8">
                <h3 className="text-xl font-bold text-purple-700 mb-4 uppercase tracking-wide purple-text">LATEST STORIES</h3>
                <div className="h-0.5 w-full bg-purple-200 mb-6"></div>
                <StoriesList />
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              {/* Development Tags */}
              <div className="mb-8 bg-purple-50 p-6 rounded-lg border border-purple-200 purple-bg-light purple-border">
                <h3 className="text-lg font-bold text-purple-700 mb-4 purple-text">Browse by Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {['sci-fi', 'romance', 'historical', 'fantasy', 'mystery', 'thriller'].map((tag) => (
                    <a 
                      key={tag} 
                      href={`#${tag}`} 
                      className="bg-white text-purple-700 hover:bg-purple-700 hover:text-white px-3 py-1.5 rounded-full text-sm border border-purple-300 transition-colors"
                    >
                      {tag}
                    </a>
                  ))}
                </div>
              </div>
              
              <div className="mb-8 bg-purple-50 p-6 rounded-lg border border-purple-200 purple-bg-light purple-border">
                <h3 className="text-lg font-bold text-purple-700 mb-4 purple-text">Firebase Configuration Status</h3>
                <FirebaseDebug />
              </div>

              {/* Story Submission Form */}
              <StoryFormWrapper />
            </div>
          </div>
        </div>
      </main>

      {/* Newsletter Section - Business Insider style */}
      <section className="border-t border-purple-200 bg-purple-50 py-12 purple-bg-light purple-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-purple-700 mb-4 purple-text">Get the Insider Newsletter</h2>
            <p className="text-white mb-6">Daily updates on the most important stories in business and tech.</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="px-4 py-3 rounded-md border border-gray-300 bg-purple-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-300 sm:w-72 placeholder:text-white"
              />
              <button className="px-6 py-3 bg-purple-700 text-white rounded-md hover:bg-purple-800 transition-colors font-medium purple-btn">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-purple-200 py-8 purple-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-purple-600">&copy; {new Date().getFullYear()} INSIDER. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              {['Terms', 'Privacy', 'Cookies', 'Sitemap'].map((item) => (
                <a key={item} href="#" className="text-sm text-purple-500 hover:text-purple-700">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
