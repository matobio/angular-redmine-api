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
    apiKey: string,
    options?: {
      offset?: number;
      limit?: number;
      sort?: ':asc' | ':desc';
    }
  ): Observable<RedmineIssue[]> {
    let url =
      'http://cors.io/?' + redmineUrl.endsWith('/')
        ? redmineUrl
        : redmineUrl + '/';
    // let url = '';
    url = url + 'issues.json';

    var params = '';

    var addParam = function (param: string) {
      if (params.length > 0) {
        params += '&';
      }
      params += param;
    };

    if (options) {
      params += '?';
      if (options.offset) {
        addParam('offset=' + options.offset);
      }
      if (options.limit) {
        addParam('limit=' + options.limit);
      }
      if (options.sort) {
        addParam('sort=' + options.sort);
      }
    }
    url += params;

    let headers = {
      Authorization: 'Basic ' + btoa(apiKey + ':any_password'),
    };

    return this.http
      .get<RedmineIssue[]>(url, {
        headers: headers,
      })
      .pipe(
        map((response: any) => {
          return response ? response.issues : [];
        })
      );
  }
}
