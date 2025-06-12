export interface ApiResponse<T = any> {
  message: string;
  status: number;
  timestamp?: string;
  data?: T;
  errors?: Record<string, string[]>;
}
