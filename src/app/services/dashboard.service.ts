import { Injectable } from '@angular/core';
import { FinderStats } from '../models/finder_stats';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { DashboardStats } from '../models/dashboard_stats';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getFinderStats() {
    const url = `${environment.json_server_baseURL + '/dashboard_finder_stats'}`;
    console.log(url);
    return this.http.get<FinderStats>(url).toPromise();
  }

  getDashboardStats() {
    const url = `${environment.json_server_baseURL + '/dashboard_stats'}`;
    console.log(url);
    return this.http.get<DashboardStats>(url).toPromise();
  }


}
