import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  storeKey: string = 'store';
  constructor() {}

  setData(key: string, data: any) {
    const jsonData = typeof data === 'string' ? data : JSON.stringify(data);
    localStorage.setItem(key, jsonData);
  }

  getData(key: string): object | undefined {
    const data: string | null = localStorage.getItem(key);
    return data ? JSON.parse(data) : undefined;
  }

  removeData(key: string) {
    localStorage.removeItem(key);
  }

  clearData() {
    localStorage.clear();
  }
}
