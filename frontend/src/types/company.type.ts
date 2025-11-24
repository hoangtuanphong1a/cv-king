export interface Company {
  id: string;
  name: string;
  logo: string;
  description: string;
  industry: string;
  size: string;
  website: string;
  location: string;
  founded: number;
  rating: number;
  reviewCount: number;
}

export interface CompanyReview {
  id: string;
  companyId: string;
  reviewerName: string;
  rating: number;
  title: string;
  content: string;
  createdAt: string;
}