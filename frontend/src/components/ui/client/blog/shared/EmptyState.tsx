import React from "react";

interface EmptyStateProps {
  title: string;
  description?: string;
  onReset?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, description, onReset }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center text-gray-500 py-12 col-span-full -mt-8">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-16 w-16 mb-6 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <h2 className="text-lg font-semibold text-gray-700 mb-2">{title}</h2>
      {description && <p className="text-sm text-gray-500 max-w-md mb-4">{description}</p>}
      {onReset && (
        <button
          onClick={onReset}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
};

export default EmptyState;
