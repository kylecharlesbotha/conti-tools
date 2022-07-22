export type Request = {
  page: number;
  pageSize: number;
  order?: string;
  orderBy?: string;
  search?: string;
  filters?: Record<string, string>;
};
