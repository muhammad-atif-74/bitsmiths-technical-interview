
'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalResults: number;
  per_page: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export default function Pagination({
  currentPage,
  totalResults,
  per_page,
  onPageChange,
  isLoading = false,
}: PaginationProps) {
  const totalPages = Math.min(Math.ceil(totalResults / per_page), 34);
  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;

  const startResult = (currentPage - 1) * per_page + 1;
  const endResult = Math.min(currentPage * per_page, totalResults);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-6 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 rounded-b-lg">
      <div className="text-sm text-gray-600 dark:text-gray-400">
        Showing <span className="font-medium">{startResult}</span> to{' '}
        <span className="font-medium">{endResult}</span> of{' '}
        <span className="font-medium">{totalResults.toLocaleString()}</span> results
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!hasPreviousPage || isLoading}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>



        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNextPage || isLoading}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}