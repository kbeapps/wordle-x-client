import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadService {
  private loading: boolean = false;
  private loadingSubject: Subject<boolean> = new Subject();

  constructor() {}

  public get isLoading(): boolean {
    return this.loading;
  }

  public set isLoading(loading: boolean) {
    this.loading = loading;
    this.loadingSubject.next(this.loading);
  }

  public watchIsLoading(): Observable<boolean> {
    return this.loadingSubject.asObservable();
  }
}
