'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import LoadingState, { ErrorState, EmptyState } from './components/LoadingState';
import { Github } from 'lucide-react';
import SearchBar from './components/SearchBar';
import RepositoryCard from './components/RepositoryCard';
import Pagination from './components/Pagination';
import { useRepositories } from './hooks/useRepositories';
import { Repository } from '@/lib/types';

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);

  const { data, isLoading, error, refetch } = useRepositories({
    query,
    page,
    per_page: 30,
  });

  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (page > 1) params.set('page', page.toString());

    const newUrl = params.toString() ? `/?${params.toString()}` : '/';
    router.push(newUrl, { scroll: false });
  }, [query, page, router]);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3 mb-6">
            <Github className="w-8 h-8 text-gray-900 dark:text-white" />
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                GitHub Repository Explorer
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Discover popular repositories with 5000+ stars
              </p>
            </div>
          </div>
          <SearchBar onSearch={handleSearch} initialQuery={query} />
        </div>
      </header>


      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {data && !isLoading && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {query ? (
                <>
                  Search results for <span className="text-blue-600 dark:text-blue-400">"{query}"</span>
                </>
              ) : (
                'Popular Repositories'
              )}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {data.total_count.toLocaleString()} repositories found
            </p>
          </div>
        )}

        {isLoading && <LoadingState />}

        {error && (
          <ErrorState
            message={error instanceof Error ? error.message : 'An error occurred'}
            onRetry={() => refetch()}
          />
        )}

        {data && data.items.length === 0 && <EmptyState query={query} />}

        {data && data.items.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {data.items.map((repo: Repository) => (
                <RepositoryCard key={repo.id} repository={repo} />
              ))}

            </div>

            <Pagination
              currentPage={page}
              totalResults={data.total_count}
              per_page={30}
              onPageChange={handlePageChange}
              isLoading={isLoading}
            />
          </>
        )}
      </main>
    </div>
  );
}