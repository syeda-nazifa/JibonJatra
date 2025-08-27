// frontend/src/components/feed/FilterTabs.jsx
import React from 'react';

const FilterTabs = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { id: 'all', label: 'All', icon: '🌐' },
    { id: 'posts', label: 'Posts', icon: '📝' },
    { id: 'market', label: 'Market', icon: '🛒' },
    { id: 'products', label: 'Products', icon: '📦' },
    { id: 'lost-found', label: 'Lost & Found', icon: '🔍' },
    { id: 'services', label: 'Services', icon: '🔧' },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeFilter === filter.id
              ? 'bg-blue-100 text-blue-700 border border-blue-300'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
          }`}
        >
          <span className="mr-2">{filter.icon}</span>
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;