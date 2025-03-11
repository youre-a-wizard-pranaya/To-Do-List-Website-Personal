import React from 'react';

interface FilterTabsProps {
  currentFilter: 'all' | 'active' | 'completed';
  setCurrentFilter: (filter: 'all' | 'active' | 'completed') => void;
}

const FilterTabs: React.FC<FilterTabsProps> = ({ currentFilter, setCurrentFilter }) => {
  return (
    <div className="flex justify-center mb-6">
      <div className="inline-flex bg-white rounded-lg shadow-sm">
        <button 
          className={`px-4 py-2 rounded-l-lg ${
            currentFilter === 'all' 
              ? 'bg-[#4a6fa5] text-white' 
              : 'bg-white text-[#4a6fa5] hover:bg-gray-100'
          }`}
          onClick={() => setCurrentFilter('all')}
        >
          All
        </button>
        <button 
          className={`px-4 py-2 ${
            currentFilter === 'active' 
              ? 'bg-[#4a6fa5] text-white' 
              : 'bg-white text-[#4a6fa5] hover:bg-gray-100'
          }`}
          onClick={() => setCurrentFilter('active')}
        >
          Active
        </button>
        <button 
          className={`px-4 py-2 rounded-r-lg ${
            currentFilter === 'completed' 
              ? 'bg-[#4a6fa5] text-white' 
              : 'bg-white text-[#4a6fa5] hover:bg-gray-100'
          }`}
          onClick={() => setCurrentFilter('completed')}
        >
          Completed
        </button>
      </div>
    </div>
  );
};

export default FilterTabs;
