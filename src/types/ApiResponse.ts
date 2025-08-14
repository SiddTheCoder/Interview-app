export interface ApiResponse {
  success: boolean;
  message: string;
  error: string | null;
  data?: any;
  [key: string]: any;
}
