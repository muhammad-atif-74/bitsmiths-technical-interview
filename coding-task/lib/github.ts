
import axios from 'axios';
// import { GitHubSearchResponse, RepositoryParams } from '@/types/github';

const GITHUB_API_BASE = 'https://api.github.com';

// Create axios instance with default config
const githubApi = axios.create({
    baseURL: GITHUB_API_BASE,
    headers: {
        Accept: 'application/vnd.github.v3+json',
        ...(process.env.NEXT_PUBLIC_GITHUB_TOKEN && {
            Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        }),
    },
});

export async function searchRepositories({
    query = 'stars:>5000',
    page = 1,
    per_page = 30,
}) {
    try {
        const response = await githubApi.get('/search/repositories', {
            params: {
                q: query,
                sort: 'stars',
                order: 'desc',
                per_page: per_page,
                page,
            },
        });

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                error.response?.data?.message || 'Failed to fetch repositories'
            );
        }
        throw error;
    }
}

export function formatStarCount(count: number): string {
    if (count >= 1000000) {
        return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
        return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
}

export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    }).format(date);
}