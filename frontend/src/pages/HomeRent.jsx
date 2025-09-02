import React, { useState, useEffect } from 'react';
import { homeApi } from '../api/homes';
import HomeRentalCard from '../components/HomeRentalCard';
import { Plus, Search, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HomeRent = ({ user }) => {
  const [homes, setHomes] = useState([]);
  const [filteredHomes, setFilteredHomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [minRent, setMinRent] = useState('');
  const [maxRent, setMaxRent] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const navigate = useNavigate();
  const isHomeowner = user?.role === 'homeowner';
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    fetchHomes();
  }, []);

  useEffect(() => {
    filterHomes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [homes, searchTerm, locationFilter, minRent, maxRent, statusFilter]);

  const fetchHomes = async () => {
    try {
      const response = await homeApi.getAll();
      setHomes(response.data);
    } catch (error) {
      console.error('Error fetching homes:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterHomes = () => {
    let result = [...homes];

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(home =>
        home.title?.toLowerCase().includes(term) ||
        home.description?.toLowerCase().includes(term) ||
        home.location?.toLowerCase().includes(term)
      );
    }

    // Location filter
    if (locationFilter) {
      result = result.filter(home =>
        home.location?.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    // Rent range filter
    if (minRent) {
      result = result.filter(home => home.rent >= Number(minRent));
    }
    if (maxRent) {
      result = result.filter(home => home.rent <= Number(maxRent));
    }

    // Status filter
    if (statusFilter) {
      result = result.filter(home => home.status === statusFilter);
    }

    setFilteredHomes(result);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setLocationFilter('');
    setMinRent('');
    setMaxRent('');
    setStatusFilter('');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Home Rentals</h1>
            <p className="text-gray-600 mt-2">Find your perfect home in the community</p>
          </div>
          
          {(isHomeowner || isAdmin) && (
            <button
              onClick={() => navigate('/create-home-rental')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center mt-4 md:mt-0 transition-colors shadow-md hover:shadow-lg"
            >
              <Plus className="w-5 h-5 mr-2" />
              Post Rental
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search Rentals
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by title, description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Any location"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Rent Range */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Min Rent
                </label>
                <input
                  type="number"
                  placeholder="Min"
                  value={minRent}
                  onChange={(e) => setMinRent(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Rent
                </label>
                <input
                  type="number"
                  placeholder="Max"
                  value={maxRent}
                  onChange={(e) => setMaxRent(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Status</option>
                <option value="available">Available</option>
                <option value="rented">Rented</option>
              </select>
            </div>
          </div>

          {/* Clear Filters */}
          {(searchTerm || locationFilter || minRent || maxRent || statusFilter) && (
            <div className="mt-4">
              <button
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredHomes.length} {filteredHomes.length === 1 ? 'rental' : 'rentals'} found
            {(searchTerm || locationFilter || minRent || maxRent || statusFilter) && " matching your criteria"}
          </p>
        </div>

        {/* Homes Grid - 2 per row */}
        {filteredHomes.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="mx-auto h-16 w-16 text-gray-400 mb-4">
              <MapPin className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No rentals found</h3>
            <p className="text-gray-500 mb-4">
              {homes.length === 0 
                ? "Be the first to post a rental in our community!"
                : "Try adjusting your search filters to find what you're looking for."
              }
            </p>
            {(isHomeowner || isAdmin) && homes.length === 0 && (
              <button
                onClick={() => navigate('/create-home-rental')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Post the first rental
              </button>
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredHomes.map((home) => (
              <HomeRentalCard
                key={home._id}
                home={home}
                user={user}
                onUpdate={fetchHomes}
              />
            ))}
          </div>
        )}
      </div>

      {/* Floating Action Button for mobile */}
      {(isHomeowner || isAdmin) && (
        <button
          onClick={() => navigate('/create-home-rental')}
          className="fixed bottom-6 right-6 md:hidden bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 z-40"
        >
          <Plus className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default HomeRent;