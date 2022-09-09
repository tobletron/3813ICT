import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  groupUrl = "./data/groups"

  constructor(private httpClient: HttpClient) { }

  sendGetRequest() {
    return this.httpClient.get(this.groupUrl);
  }
}
