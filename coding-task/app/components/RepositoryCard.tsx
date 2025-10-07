'use client';

import { formatStarCount } from '@/lib/github';
import { Repository } from '@/lib/types';
import { Star, ExternalLink } from 'lucide-react';


export default function RepositoryCard({ repository }: { repository: Repository }) {
    return (
        <article className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-200 hover:border-blue-500 dark:hover:border-blue-400">
            <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                    <img
                        src={repository.owner.avatar_url}
                        alt={repository.owner.login}
                        className="w-10 h-10 rounded-full flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                        <a
                            href={repository.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-lg text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2 group"
                        >
                            <span className="truncate">{repository.full_name}</span>
                            <ExternalLink className="w-4 h-4 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                        <a
                            href={repository.owner.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                            @{repository.owner.login}
                        </a>
                    </div>
                </div>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mb-6 line-clamp-2 min-h-[3rem]">
                {repository.description || 'No description available'}
            </p>

            <div className="flex items-center justify-between gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{formatStarCount(repository.stargazers_count)}</span>
                    </div>
                </div>
                <time className="hover:text-blue-500 whitespace-nowrap">
                    <a href={repository.html_url}>Go to Repository</a>
                </time>
            </div>
        </article>
    );
}