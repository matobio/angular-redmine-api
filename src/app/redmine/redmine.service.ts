import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RedmineIssue } from './redmine-issue';

@Injectable()
export class RedmineService {
  constructor(private http: HttpClient) {}

  public getIssuesData(
    redmineUrl: string,
    apiKey: string
  ): Observable<RedmineIssue[]> {
    let url = redmineUrl.endsWith('/') ? redmineUrl : redmineUrl + '/';

    let headers = {
      Authorization: 'Basic ' + btoa(apiKey + ':any_password'),
      // Host: 'projects.imatia.com',
      // Accept: '*/*',
      // 'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Access-Control-Allow-Origin': 'http://localhost:4200/',
    };

    // return this.http.get<RedmineIssue[]>(
    //   'https://ng-course-receipt-book-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
    // );

    return this.http.get<RedmineIssue[]>(url + 'issues.json', {
      headers: headers,
    });
  }
}
