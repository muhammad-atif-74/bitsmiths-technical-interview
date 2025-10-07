export interface RepositoryOwner {
  login: string;
  html_url: string;
  avatar_url: string;
}

export interface Repository {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  topics?: string[];
  owner: RepositoryOwner;
}
