import type { SVGProps } from 'react';

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface Meta {
  page: number;
  limit: number;
  totalPage: number;
  totalItem: number;
}

export interface SuccessResponse<T = unknown> {
  message: string;
  data: T;
  statusCode: 200;
}

export interface PaginatedResponse<T = unknown> {
  message: string;
  data: {
    items: T[];
    meta: Meta;
  };
  statusCode: 200;
}

export interface PaginatedDataResponse<T = unknown> {
  items: T[];
  meta: Meta;
}

export interface ErrorResponse<T = unknown> {
  error: string;
  data: T;
  statusCode: 400 | 401 | 403 | 404 | 429 | 500;
}
