export function isAffirmative(val?: string): boolean {
  if (!val) return false;
  const v = val.trim().toLowerCase();
  return v === 'sim' || v === 's' || v === 'true' || v === '1' || v === 'yes' || v === 'y';
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export function paginate<T>(items: T[], page: number = 1, limit: number = 100): PaginatedResult<T> {
  const validPage = Math.max(1, page);
  const validLimit = Math.max(1, Math.min(limit, 1000)); // max 1000 per page
  const start = (validPage - 1) * validLimit;
  const end = start + validLimit;

  return {
    data: items.slice(start, end),
    total: items.length,
    page: validPage,
    limit: validLimit,
  };
}
