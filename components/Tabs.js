'use client';
import { useState, useEffect } from 'react';

export default function Tabs({ tabs, defaultTab = 0, activeTab: externalActiveTab, onTabChange }) {
  const [internalActiveTab, setInternalActiveTab] = useState(defaultTab);
  
  // Se activeTab for controlado externamente, use-o; caso contrário, use o estado interno
  const activeTab = externalActiveTab !== undefined ? externalActiveTab : internalActiveTab;

  const handleTabClick = (index) => {
    if (externalActiveTab === undefined) {
      setInternalActiveTab(index);
    }
    if (onTabChange) {
      onTabChange(index);
    }
  };

  return (
    <div className="w-full">
      <div className="border-b border-gray-200 -mx-4 sm:mx-0">
        <div className="overflow-x-auto scrollbar-hide px-4 sm:px-0">
          <nav className="flex space-x-4 md:space-x-8 min-w-max md:min-w-0">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => handleTabClick(index)}
                className={`
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors flex-shrink-0
                  ${activeTab === index
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                `}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
      <div className="mt-6">
        {tabs[activeTab]?.content}
      </div>
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
