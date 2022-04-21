import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sponsorship } from '../models/sponsorship.model';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SponsorshipService {

  constructor(private http: HttpClient) { }

  getSponsorshipsList(): Promise<Sponsorship[]> {
    let sponsorshipUrl = environment.json_server_baseURL + '/sponsorships';
    return this.http.get(sponsorshipUrl).toPromise<any>();
  }

  createSponsorship(sponsorship: Sponsorship): void {
    const url = `${environment.json_server_baseURL + '/sponsorships'}`;
    const body = JSON.stringify(sponsorship);
    this.http.post(url, body, httpOptions).toPromise();
  }
}
