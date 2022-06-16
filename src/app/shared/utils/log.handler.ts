import { environment } from 'src/environments/environment';

export function logInfo(label: string, message?: string): void {
  if (!environment.production) {
    console.log(`[info] ${label}: ${message}`);
  }
}

export function logError(label: string, error?: string): void {
  if (!environment.production) {
    console.log(`[error] ${label}: ${error}`);
  }
}
