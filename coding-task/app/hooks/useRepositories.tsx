'use client';

import { useQuery } from '@tanstack/react-query';
import { searchRepositories } from '@/lib/github';

interface UseRepositoriesParams {
    query?: string;
    page?: number;
    per_page?: number;
}


export function useRepositories({ query, page = 1, per_page = 30 }: UseRepositoriesParams) {
    const searchQuery = query ? `${query} stars:>5000` : 'stars:>5000';

    return useQuery({
        queryKey: ['repositories', searchQuery, page, per_page],
        queryFn: () => searchRepositories({ query: searchQuery, page, per_page }),
        placeholderData: (previousData) => previousData,
    });
}