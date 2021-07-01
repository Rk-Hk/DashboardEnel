import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public baseUri: string;
 
  constructor(
    private http: HttpClient,
    private storageService: StorageService) { }

  getHeaders() {
    let headers = new HttpHeaders();
    const token = JSON.parse(this.storageService.getData('token')) ? JSON.parse(this.storageService.getData('token')) : null;
    if (token && token !== undefined) {
      headers = headers.set('Authorization', token);
    }
    headers = headers.set('Content-Type', 'application/json');
    return headers;
  }

  setBaseUriApi(baseUri: string): void {
    this.baseUri = baseUri;
  }

  execPostJson(data?: any): Observable<any> {
    return this.http.post(this.baseUri, data, { headers: this.getHeaders() });
  }
  execPostJsonBLOB(data?: any): Observable<any> {
    return this.http.post(this.baseUri, data, { headers: this.getHeaders(), responseType: 'blob' });
  }

  execPutJson(params, data?: any): Observable<any> {
    return this.http.put(this.baseUri, data, { headers: this.getHeaders(), params});
  }
  
  execGetJson(): Observable<any> {
    return this.http.get(this.baseUri, { headers: this.getHeaders() });
  }
  execGetJsonWithParams(params): Observable<any> {
    return this.http.get(this.baseUri , {headers: this.getHeaders(), params})
  }

  execStructureIdJson(structureId?: string): Observable<any> {
    return this.http.get(this.baseUri, { headers: this.getHeaders(), params: { structureId } });
  }

  execPostFormDataBlob = (url, formData): Observable<any> => {
    return this.http.post(url, formData);
  }
}
