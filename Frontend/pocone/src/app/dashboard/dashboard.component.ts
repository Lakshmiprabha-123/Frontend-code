// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { ChartOptions, ChartType, ChartDataset } from 'chart.js';

// @Component({
//   selector: 'app-dashboard',
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.css']
// })
// export class DashboardComponent implements OnInit {
//   public barChartOptions: ChartOptions = {
//     responsive: true,
//   };
//   public barChartLabels: string[] = [];
//   public barChartType: ChartType = 'bar';
//   public barChartLegend = true;
//   public barChartPlugins = [];
//   public barChartData: ChartDataset[] = [];

//   public pieChartOptions: ChartOptions = {
//     responsive: true,
//   };
//   public pieChartLabels: string[] = [];
//   public pieChartData: number[] = [];
//   public pieChartType: ChartType = 'pie';
//   public pieChartLegend = true;
//   public pieChartPlugins = [];

//   constructor(private http: HttpClient) {}

//   ngOnInit(): void {
//     this.fetchProjectData();
//   }

//   fetchProjectData(): void {
//     this.http.get<any[]>('http://localhost:8080/projects').subscribe(data => {
//       this.updateCharts(data);
//     });
//   }

//   updateCharts(data: any[]): void {
//     this.barChartLabels = data.map(project => project.name);
//     this.pieChartLabels = this.barChartLabels;

//     const statuses = ['On Track', 'Slow', 'Risk', 'Deep Risk'];
//     const statusColors = {
//       'On Track': 'green',
//       'Slow': 'yellow',
//       'Risk': 'brown',
//       'Deep Risk': 'red'
//     };

//     const barData: ChartDataset[] = statuses.map(status => ({
//       data: data.filter(project => project.status === status).map(() => 1),
//       label: status,
//       backgroundColor: statusColors[status]
//     }));

//     this.barChartData = barData;
//     this.pieChartData = statuses.map(status => data.filter(project => project.status === status).length);
//   }
// }
