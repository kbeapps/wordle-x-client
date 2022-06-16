import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface IResponse {
  message: string;
  data: object;
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class HttpRequestService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  // async get(
  //   route: string,
  //   paramKey: string,
  //   paramValue: string
  // ): Promise<IResponse | void> {
  //   try {
  //     return await firstValueFrom(
  //       this.http.get<IResponse>(
  //         `${this.apiUrl}${route}/${paramKey}/${paramValue}`
  //       )
  //     );
  //   } catch (error) {
  //     throw new Error(
  //       error instanceof HttpErrorResponse ? error.error.message : undefined
  //     );
  //   }
  // }

  post(route: string, payload: object) {
    return this.http.post<any>(this.apiUrl + route, payload, httpOptions);
  }
}

// async patch(route: string, payload: object): Promise<IResponse | void> {
//   try {
//     return await firstValueFrom(
//       this.http.patch<IResponse>(this.apiUrl + route, payload, httpOptions)
//     );
//   } catch (error) {
//     throw new Error(
//       error instanceof HttpErrorResponse ? error.error.message : undefined
//     );
//   }
// }

// async delete(route: string, params: string): Promise<IResponse | void> {
//   try {
//     return await firstValueFrom(
//       this.http.delete<IResponse>(
//         `${this.apiUrl}${route}/${params}`,
//         httpOptions
//       )
//     );
//   } catch (error) {
//     throw new Error(
//       error instanceof HttpErrorResponse ? error.error.message : undefined
//     );
//   }
// }
// }
