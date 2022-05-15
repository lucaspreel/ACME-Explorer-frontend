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
    let sponsorshipListUrl = environment.json_server_baseURL + '/sponsorships';
    return this.http.get(sponsorshipListUrl).toPromise<any>();
  }

  getSponsorship(sponsorshipId: string): Promise<Sponsorship> {
    let sponsorshipUrl = environment.json_server_baseURL + '/sponsorships/' + sponsorshipId;
    return this.http.get<Sponsorship>(sponsorshipUrl).toPromise();
  }

  createSponsorship(sponsorship: Sponsorship): void {
    const url = `${environment.json_server_baseURL + '/sponsorships'}`;
    const body = JSON.stringify(sponsorship);
    this.http.post(url, body, httpOptions).toPromise();
  }

  updateSponsorship(sponsorship: Sponsorship, sponsorshipId: string): void {
    const url = `${environment.json_server_baseURL + '/sponsorships/' + sponsorshipId}`;
    const body = JSON.stringify(sponsorship);
    this.http.put(url, body, httpOptions).toPromise();
  }

  removeSponsorship(sponsorship: Sponsorship, sponsorshipId: string): void {
    const url = `${environment.json_server_baseURL + '/sponsorships/' + sponsorshipId}`;
    const body = JSON.stringify(sponsorship);
    this.http.patch(url, {
      'isDeleted': true,
    }).toPromise();
  }

  paySponsorship(sponsorship: Sponsorship, sponsorshipId: string): void {
    const url = `${environment.json_server_baseURL + '/sponsorships/' + sponsorshipId}`;
    const body = JSON.stringify(sponsorship);
    this.http.patch(url, {
      'isPayed': true,
    }).toPromise();
  }
}
