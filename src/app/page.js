import StoryFormWrapper from "../components/StoryFormWrapper";
import StoriesList from "../components/StoriesList";
import FlowerAnimation from "../components/FlowerAnimation";
import StoryOfTheWeek from "../components/StoryOfTheWeek";

export default function Home() {
  return (
    <div className="min-h-screen bg-white purple-theme">
      {/* News-style Header */}
      <header className="sticky top-0 z-10 purple-header">
        {/* Top Header Bar */}
        <div className="bg-[var(--shannons-purple)] py-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <div className="text-white text-sm">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Header */}
        <div className="bg-[var(--shannons-purple)] border-t border-b border-purple-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-4 flex justify-center">
              <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight font-delius">{("Brevity Blog").toUpperCase()}</h1>
            </div>
          </div>
        </div>
        
        {/* Navigation Bar */}
        <div className="bg-purple-100 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex justify-between items-center h-10">
              <div className="flex space-x-6">
                {['Home', 'Sci-Fi', 'Romance', 'Fantasy', 'Mystery', 'Thriller', 'Historical'].map((item) => (
                  <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-black hover:text-purple-700">
                    {item}
                  </a>
                ))}
              </div>

            </nav>
          </div>
        </div>
      </header>

      {/* Breaking News Banner */}
      <div className="bg-purple-700 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <span className="font-bold mr-3 bg-white text-purple-700 px-2 py-0.5 rounded text-sm">BREAKING</span>
            <p className="text-sm">New writing competition announced! Submit your stories by April 30th.</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Top Headlines Section */}
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-1 md:col-span-2">
              <h2 className="text-2xl font-bold text-black mb-2 border-b-2 border-purple-700 pb-2 uppercase tracking-wide">TOP STORY</h2>
              <StoryOfTheWeek />
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-8">
            {/* Latest Stories Section */}
            <section className="mb-8">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-black mb-2 border-b-2 border-purple-700 pb-2 uppercase tracking-wide">LATEST STORIES</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <StoriesList />
                </div>
              </div>
            </section>

            {/* Editor's Picks Section */}
            <section className="mb-8">
              <h3 className="text-xl font-bold text-black mb-2 border-b-2 border-purple-700 pb-2 uppercase tracking-wide">EDITOR'S PICKS</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <div className="h-32 bg-purple-200 rounded-md mb-3"></div>
                    <h4 className="font-semibold text-black mb-1 font-delius">Featured Story Title</h4>
                    <p className="text-xs text-gray-600 mb-2">By Author Name • April 12, 2025</p>
                    <p className="text-sm text-black line-clamp-2 font-delius">A short preview of this amazing story that will capture readers' attention...</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              {/* Trending Section */}
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h3 className="text-lg font-bold text-black mb-3 border-b border-purple-300 pb-2">TRENDING NOW</h3>
                <ul className="space-y-3">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <li key={item} className="flex items-start">
                      <span className="font-bold text-purple-700 mr-2">{item}.</span>
                      <div>
                        <a href="#" className="text-sm font-medium text-black hover:text-purple-700 line-clamp-2">Popular trending story title that people are reading right now</a>
                        <p className="text-xs text-gray-600 mt-1">2.5k reads</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Browse by Tags */}
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h3 className="text-lg font-bold text-black mb-3 border-b border-purple-300 pb-2">CATEGORIES</h3>
                <div className="flex flex-wrap gap-2">
                  {['sci-fi', 'romance', 'historical', 'fantasy', 'mystery', 'thriller', 'poetry', 'horror', 'comedy'].map((tag) => (
                    <a 
                      key={tag} 
                      href={`#${tag}`} 
                      className="bg-white text-black px-3 py-1.5 rounded-full text-sm border border-purple-300 transition-colors hover:bg-purple-100"
                    >
                      {tag}
                    </a>
                  ))}
                </div>
              </div>
              
              {/* Newsletter Signup */}
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h3 className="text-lg font-bold text-black mb-2">NEWSLETTER</h3>
                <p className="text-sm text-gray-700 mb-3">Stay updated with the latest stories and news</p>
                <div className="flex">
                  <input type="email" placeholder="Your email" className="flex-grow p-2 text-sm border border-purple-300 rounded-l focus:outline-none focus:ring-1 focus:ring-purple-500" />
                  <button className="bg-[var(--shannons-purple)] text-white px-3 py-2 text-sm font-medium rounded-r hover:bg-purple-700">Subscribe</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* News-style Footer */}
      <footer className="bg-purple-50 border-t border-purple-200 pt-8 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-lg font-bold text-black mb-4 border-b border-purple-300 pb-2">ABOUT US</h4>
              <p className="text-sm text-gray-700 mb-4">Brevity Blog is a platform for creative writers to share their stories with the world.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-purple-700 hover:text-purple-900">📱</a>
                <a href="#" className="text-purple-700 hover:text-purple-900">📘</a>
                <a href="#" className="text-purple-700 hover:text-purple-900">📸</a>
                <a href="#" className="text-purple-700 hover:text-purple-900">🐦</a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-bold text-black mb-4 border-b border-purple-300 pb-2">EXPLORE</h4>
              <ul className="space-y-2">
                {['Latest Stories', 'Top Authors', 'Writing Tips', 'Competitions', 'Events'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-gray-700 hover:text-purple-700">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold text-black mb-4 border-b border-purple-300 pb-2">LEGAL</h4>
              <ul className="space-y-2">
                {['Terms of Use', 'Privacy Policy', 'Cookie Policy', 'Copyright', 'GDPR'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-gray-700 hover:text-purple-700">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold text-black mb-4 border-b border-purple-300 pb-2">CONTACT</h4>
              <ul className="space-y-2">
                <li className="text-sm text-gray-700">📧 contact@brevityblog.com</li>
                <li className="text-sm text-gray-700">📞 (555) 123-4567</li>
                <li className="text-sm text-gray-700">📍 123 Story Lane, Fiction City</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-purple-200 pt-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-600 mb-2 md:mb-0">&copy; {new Date().getFullYear()} Brevity Blog. All rights reserved.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-xs text-gray-600 hover:text-purple-700">Sitemap</a>
                <a href="#" className="text-xs text-gray-600 hover:text-purple-700">Accessibility</a>
                <a href="#" className="text-xs text-gray-600 hover:text-purple-700">Advertise</a>
                <a href="#" className="text-xs text-gray-600 hover:text-purple-700">Help Center</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
