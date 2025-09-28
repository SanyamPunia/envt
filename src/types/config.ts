/**
 * eg:
 * DATABASE_URL: {
 * type: "string",
 * required: true,
 * description: "..."
 * }
 */

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  env: Record<string, any>;
}
