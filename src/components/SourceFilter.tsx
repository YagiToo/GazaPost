import React from 'react';

interface SourceFilterProps {
  sources: string[];
  selectedSource: string;
  onSelectSource: (source: string) => void;
}

const SourceFilter: React.FC<SourceFilterProps> = ({ sources, selectedSource, onSelectSource }) => {
  return (
    <div className="mb-4">
      <button
        className={`mr-2 px-4 py-2 border rounded ${selectedSource === '' ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-400'}`}
        onClick={() => onSelectSource('')}
      >
        All
      </button>
      {sources.map((source) => (
        <button
          key={source}
          className={`mr-2 px-4 py-2 border rounded ${selectedSource === source ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-400'}`}
          onClick={() => onSelectSource(source)}
        >
          {source}
        </button>
      ))}
    </div>
  );
};

export default SourceFilter;
