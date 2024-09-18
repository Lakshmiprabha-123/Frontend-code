import { Component } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { ProjectService } from '../Services/project.service';
import { Project } from '../Models/project.model';

@Component({
  selector: 'app-weekly-status',
  templateUrl: './weekly-status.component.html',
  styleUrls: ['./weekly-status.component.css']
})
export class WeeklyStatusComponent {
  public projects: Project[] = [];
  public selectedProjectId: number = 0;
  public selectedYear: number = new Date().getFullYear();
  public selectedMonth: number = new Date().getMonth() + 1; // Current month
  public years: number[] = [];
  public months = [
    { value: 1, name: 'January' },
    { value: 2, name: 'February' },
    { value: 3, name: 'March' },
    { value: 4, name: 'April' },
    { value: 5, name: 'May' },
    { value: 6, name: 'June' },
    { value: 7, name: 'July' },
    { value: 8, name: 'August' },
    { value: 9, name: 'September' },
    { value: 10, name: 'October' },
    { value: 11, name: 'November' },
    { value: 12, name: 'December' }
  ];

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Week Number(yearly based)'
        }
      }],
      yAxes: [{
        ticks: {
          min: 0,
          max: 5,
          stepSize: 1,
          callback: (value: number) => {
            const statuses = ['Undefined', 'Not Yet Started', 'Deep Risk', 'Risk', 'Slow', 'On Track'];
            return statuses[value];
          }
        },
        scaleLabel: {
          display: true,
          labelString: 'Status'
        }
      }]
    },
    legend: {
      display: false,
      labels: {
        fontColor: 'black',
        generateLabels: function(chart) {
          return [
            {
              text: 'On Track',
              fillStyle: 'rgb(129, 219, 129)',
              strokeStyle: 'rgb(129, 219, 129)',
              hidden: false,
            },
            {
              text: 'Slow',
              fillStyle: '#FFCE56',
              strokeStyle: '#FFCE56',
              hidden: false,
            },
            {
              text: 'Risk',
              fillStyle: ' #FF9F40',
              strokeStyle: '#FF9F40',
              hidden: false,
            },
            {
              text: 'Deep Risk',
              fillStyle: 'rgb(240, 107, 107)',
              strokeStyle: 'rgb(240, 107, 107)',
              hidden: false,
            },
            {
              text: 'Not yet started',
              fillStyle: 'grey',
              strokeStyle: 'grey',
              hidden: false,
            }
          ];
        }
      }
    },
    tooltips: {
      callbacks: {
        label: (tooltipItem) => {
          const statuses = ['Undefined', 'Not Yet Started', 'Deep Risk', 'Risk', 'Slow', 'On Track'];
          return statuses[tooltipItem.yLabel as number] || 'Unknown';
        }
      }
    }
  };
  
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Weekly Project Status', backgroundColor: [] }
  ];

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    this.years = Array.from({ length: 10 }, (_, i) => currentYear - i);

    this.projectService.getAllProjects().subscribe((projects: Project[]) => {
      this.projects = projects;
      if (projects.length > 0 && projects[0].id !== undefined) {
        this.selectedProjectId = projects[0].id!;
        this.fetchWeeklyStatus();
      }
    });
  }
fetchWeeklyStatus(): void {
    if (this.selectedProjectId && this.selectedYear && this.selectedMonth) {
      this.projectService.getWeeklyStatusByMonth(this.selectedProjectId, this.selectedYear, this.selectedMonth)
        .subscribe((statusData: { weekNumber: number, currentStatus: string }[]) => {
          const statusMap = statusData.map(item => ({
            weekNumber: item.weekNumber,
            statusValue: this.mapStatusToValue(item.currentStatus)
          }));

          const weekNumbers = statusMap.map(item => `Week ${item.weekNumber}`);
          const statusValues = statusMap.map(item => item.statusValue);
          const backgroundColors = statusMap.map(item => this.getStatusColor(item.statusValue));

          this.barChartLabels = weekNumbers;
          this.barChartData = [
            { data: statusValues, label: `Weekly Status for Project ${this.selectedProjectId}`, backgroundColor: backgroundColors }
          ];
        });
    }
  }

  mapStatusToValue(status: string): number {
    switch (status) {
      case 'On Track': return 5;
      case 'Slow': return 4;
      case 'Risk': return 3;
      case 'Deep Risk': return 2;
      case 'Not Yet Started': return 1;
      default: return 0;
    }
  }

  getStatusColor(value: number): string {
    switch (value) {
      case 5: return 'rgb(129, 219, 129)'; ;
      case 4: return '#FFCE56';
      case 3: return ' #FF9F40';  
      case 2: return 'rgb(240, 107, 107)';
      case 1: return 'rgb(128, 128, 128)'; 
      default: return 'rgb(128, 128, 128)'; 
    }
  }
}