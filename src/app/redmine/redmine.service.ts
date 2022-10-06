import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RedmineIssue } from './redmine-issue';
import { map } from 'rxjs/operators';

@Injectable()
export class RedmineService {
  constructor(private http: HttpClient) {}

  public getIssuesData(
    redmineUrl: string,
    apiKey: string
  ): Observable<RedmineIssue[]> {
    // let url = redmineUrl.endsWith('/') ? redmineUrl : redmineUrl + '/';
    let url = '';

    let headers = {
      Authorization: 'Basic ' + btoa(apiKey + ':any_password'),
      // 'Access-Control-Allow-Origin': '*',
    };

    return this.http
      .get<RedmineIssue[]>(url + 'issues.json', {
        headers: headers,
      })
      .pipe(
        map((response: any) => {
          return response ? response.issues : [];
        })
      );
  }
}
