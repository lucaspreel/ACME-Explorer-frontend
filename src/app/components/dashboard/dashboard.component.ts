import { Component, OnInit } from '@angular/core';
import { DashboardStats } from 'src/app/models/dashboard_stats';
import { FinderStats } from 'src/app/models/finder_stats';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  finderStats: FinderStats;
  dashboardStats: DashboardStats;

  constructor(private dashboardService: DashboardService,) {
  }

  ngOnInit() {
    this.dashboardService.getFinderStats()
    .then((val) => {
      this.finderStats = val;
    })
    .catch((err) => {
      console.log(err);
    });

    this.dashboardService.getDashboardStats()
    .then((val) => {
      this.dashboardStats = val;
    })
    .catch((err) => {
      console.log(err);
    });

  }

}
