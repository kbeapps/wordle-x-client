export function logInfo(label: string, message?: string): void {
  console.log(`${label}: ${message}`);
}

export function logError(label: string, error?: string): void {
  console.log(`${label}: ${error}`);
}
