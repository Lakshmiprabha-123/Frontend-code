
import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { ProjectService } from '../Services/project.service';
import { Project } from '../Models/project.model';

@Component({
  selector: 'app-status-line-chart',
  templateUrl: './status-line-chart.component.html',
  styleUrls: ['./status-line-chart.component.css']
})
export class StatusLineChartComponent implements OnInit {
  public projects: any[] = [];
  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[] = [];
  public selectedProjectId: number = 0;
  public selectedYear: number = new Date().getFullYear();
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
  public lineChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Month'
        }
      }],
      yAxes: [{
        ticks: {
          min: 0,
          max: 5,
          stepSize: 1,
          callback: (value: number) => {
            const statuses = ['Undefined','Not Yet Started', 'Deep Risk', 'Risk', 'Slow', 'On Track'];
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
      display: true,
      position: 'bottom',
      labels: {
        fontColor: 'black'
      }
    },
    tooltips: {
      callbacks: {
        label: (tooltipItem) => {
          const statuses = ['Undefined','Not Yet Started', 'Deep Risk', 'Risk', 'Slow', 'On Track'];
          return statuses[tooltipItem.yLabel as number] || 'Unknown';
        }
      }
    }
  };
  public lineChartType: ChartType = 'line';

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    this.years = Array.from({ length: 10 }, (_, i) => currentYear - i);

    this.projectService.getAllProjects().subscribe((projects: any[]) => {
      this.projects = projects;
      if (projects.length > 0 && projects[0].id !== undefined) {
        this.selectedProjectId = projects[0].id!;
        this.fetchStatusHistory();
      }
    });
  }

  fetchStatusHistory(): void {
    this.clearChartData();
    if (this.selectedProjectId && this.selectedYear) {
      this.projectService.getStatusHistoryByYear(this.selectedProjectId, this.selectedYear).subscribe((statusData: { month: number, currentStatus: string }[]) => {
        
        const statusMap = new Array(12).fill(0);

        statusData.forEach(item => {
          
          const monthIndex = item.month - 1;
          statusMap[monthIndex] = this.mapStatusToValue(item.currentStatus);
        });

        this.lineChartLabels = this.months.map(m => m.name);
        this.lineChartData = [{
          data: statusMap,
          label: `Project ${this.selectedProjectId} Status History (${this.selectedYear})`,
          fill: false,
          borderColor: 'blue',
          backgroundColor: 'rgba(0, 0, 255, 0.2)',
        }];
      });
    }
    else{
      this.clearChartData();
    }
  }

  private createLabelsForStatusHistory(dataLength: number): Label[] {
    return Array.from({ length: dataLength }, (_, i) => `Month ${i + 1}`);
  }
  private clearChartData(): void {
    this.lineChartLabels = this.months.map(m => m.name);  // Keep the months as labels
    this.lineChartData = [{
      data: new Array(12).fill(0),  // Set all data points to 0 (Undefined)
      label: `No Data Available`,
      fill: false,
      borderColor: 'gray',
      backgroundColor: 'rgba(128, 128, 128, 0.2)',
    }];
  }

  private mapStatusToValue(status: string): number {
    switch (status) {
      case 'On Track': return 5;
      case 'Slow': return 4;
      case 'Risk': return 3;
      case 'Deep Risk': return 2;
      case 'Not Yet Started': return 1;
      default: return 0;
    }
  }
}