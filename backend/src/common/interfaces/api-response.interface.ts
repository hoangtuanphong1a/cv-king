export interface ApiResponse<T> {
  status: 'success' | 'error';
  message: string;
  data: T;
  meta?: {
    count?: number;
    page?: number;
    limit?: number;
    totalPages?: number;
    period?: string;
    groupBy?: string;
    [key: string]: any;
  };
  errors?: ValidationError[];
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface PaginationMeta {
  count: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface BlogAnalyticsMeta extends PaginationMeta {
  period: string;
  groupBy: string;
  totalViews?: number;
  uniqueViews?: number;
  averageViews?: number;
}
