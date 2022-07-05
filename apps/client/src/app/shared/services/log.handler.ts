import { environment } from '../../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http';

export function logInfo(label: string, message?: string): void {
  if (!environment.production) {
    console.log(`[info] ${label}: ${message}`);
  }
}

export function logError(
  label: string,
  error?: Error | HttpErrorResponse | string
): void {
  if (!environment.production) {
    console.log(`[error] ${label}: `, error);
  }
}
