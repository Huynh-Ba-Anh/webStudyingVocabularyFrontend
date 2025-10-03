export interface ImportResponse {
  message: string;
  successCount: number;
  errorCount: number;
  errors: Array<{ row: number; message: string }>;
}
