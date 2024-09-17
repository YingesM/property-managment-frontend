
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PropertiesService {
  private apiUrl = 'http://localhost:3000/properties';

  constructor(private http: HttpClient) {}

  getAllProperties(): Observable<Record<string, string>> {
    return this.http.get<Record<string, string>>(this.apiUrl);
  }

  addProperty(key: string, value: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}`, { key, value });
  }

  updateProperty(key: string, value: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${key}`, { value });
  }

  deleteProperty(key: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${key}`);
  }
}