import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ChartOptions, ChartType, ChartData } from 'chart.js';
import { RevenueAggregation } from 'src/app/modules/admin/models/RevenueAggregation.model';
import * as RevenueActions from '../../store/revenue/revenue.actions';
import { selectRevenueData, selectRevenueLoading } from '../../store/revenue/revenue.selectors';

@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.css']
})
export class RevenueComponent implements OnInit {
  data: RevenueAggregation[] = [];
  loading$ = this.store.pipe(select(selectRevenueLoading));

  barChartOptions: ChartOptions = {
    responsive: true
  };
  barChartType: ChartType = 'bar';
  barChartLegend = false;

  barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: []
  };

  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(RevenueActions.loadMonthlyRevenue()); // default load

    this.store.pipe(select(selectRevenueData)).subscribe(res => {
      this.data = res;
      this.updateChart();
    });
  }

  loadMonthly() {
    this.store.dispatch(RevenueActions.loadMonthlyRevenue());
  }

  loadWeekly() {
    this.store.dispatch(RevenueActions.loadWeeklyRevenue());
  }

  private updateChart() {
    const labels = this.data.map(d => d.period);
    const values = this.data.map(d => d.totalRevenue);

    this.barChartData = {
      labels,
      datasets: [
        {
          label: 'Revenue ($)',
          data: values,
          backgroundColor: '#4e73df'
        }
      ]
    };
  }

  toggleChartType() {
    this.barChartType = this.barChartType === 'bar' ? 'line' : 'bar';
  }
}
