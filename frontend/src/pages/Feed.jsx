import React, { useState, useEffect } from 'react';
import { feedAPI } from '../api/feed';
import PostCard from '../components/feed/PostCard';
import MarketCard from '../components/feed/MarketCard';
import ProductCard from '../components/feed/ProductCard';
import ItemCard from '../components/feed/ItemCard';
import ServiceCard from '../components/feed/ServiceCard';
import AnnouncementSidebar from '../components/feed/AnnouncementSidebar';
import FilterTabs from '../components/feed/FilterTabs';
import SponsoredCarousel from '../components/feed/SponsoredCarousel';

const Feed = () => {
  const [feed, setFeed] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  const fetchFeed = async (filter = 'all', pageNum = 1, shouldAppend = false) => {
    try {
      setLoading(true);
      console.log('Fetching feed with filter:', filter);
      
      const response = filter === 'all' 
        ? await feedAPI.getFeed(pageNum)
        : await feedAPI.getFilteredFeed(filter, pageNum);

      console.log('API Response:', response.data);
      
      if (response.data.success) {
        console.log('Feed data received:', response.data.feed);
        console.log('Announcements received:', response.data.announcements);
        
        if (shouldAppend) {
          setFeed(prev => [...prev, ...response.data.feed]);
        } else {
          setFeed(response.data.feed);
        }
        setAnnouncements(response.data.announcements || []);
        setHasMore(response.data.pagination?.hasNext || false);
        setError('');
      }
    } catch (err) {
      setError('Failed to load feed. Please try again.');
      console.error('Feed error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeed(activeFilter, 1, false);
  }, [activeFilter]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchFeed(activeFilter, nextPage, true);
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setPage(1);
  };

  const renderContent = (item) => {
    console.log('Rendering item:', item._id, 'Type:', item.contentType, 'Data:', item);
    
    switch (item.contentType) {
      case 'posts':
        return <PostCard key={`post-${item._id}`} post={item} />;
      case 'market':
        return <MarketCard key={`market-${item._id}`} item={item} />;
      case 'products':
        return <ProductCard key={`product-${item._id}`} product={item} />;
      case 'lost-found':
        return <ItemCard key={`item-${item._id}`} item={item} />;
      case 'services':
        return <ServiceCard key={`service-${item._id}`} service={item} />;
      default:
        console.warn('Unknown content type:', item.contentType, item);
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-4xl">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content - Single Column */}
          <div className="w-full">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Community Feed</h1>
              
              <FilterTabs 
                activeFilter={activeFilter} 
                onFilterChange={handleFilterChange} 
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            <div className="space-y-6">
              {feed.length === 0 && !loading ? (
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                  <p className="text-gray-500 text-lg">No content found. Be the first to post!</p>
                </div>
              ) : (
                feed.map(renderContent)
              )}
            </div>

            {hasMore && (
              <div className="mt-8 text-center">
                <button
                  onClick={handleLoadMore}
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium disabled:opacity-50 transition-colors duration-200"
                >
                  {loading ? 'Loading...' : 'Load More'}
                </button>
              </div>
            )}
          </div>

          {/* Sidebar - Hidden on smaller screens, shown on larger ones */}
          <div className="hidden lg:block lg:w-80">
            <div className="sticky top-6 space-y-6">
              <AnnouncementSidebar announcements={announcements} />
              <SponsoredCarousel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;