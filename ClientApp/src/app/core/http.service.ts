import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HttpService {
    private readonly _baseUrl = '/';

    constructor(private readonly _http: HttpClient) {}

    public get(url: string, options?: any): Observable<any> {
        return this._http.get(`${url}`, options);
    }

    public post<T>(url: string, data: T, options?: any): Observable<any> {
        return this._http.post(url, data, options);
    }

    public put<T>(url: string, data: T, options?: any): Observable<any> {
        return this._http.put(url, data, options);
    }

    public remove<T>(url: string, data: T): Observable<any> {
        return this._http.delete(url, { body: data } as any);
    }
}
