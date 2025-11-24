export type SortKey = "newest" | "popular" | "comments" | "oldest";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  tags: string[];
  publishDate: string;
  views?: number;
  comments?: number;
  category: string;
  featured?: boolean;
}
