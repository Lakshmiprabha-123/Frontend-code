import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { ProjectService } from '../Services/project.service';

@Component({
  selector: 'app-weekly-defects-line-chart',
  templateUrl: './weekly-defects-line-chart.component.html',
  styleUrls: ['./weekly-defects-line-chart.component.css']
})
export class WeeklyDefectsLineChartComponent implements OnInit {
  public projects: any[] = [];
  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[] = [];
  public selectedProjectId: number = 0;
  public selectedYear: number = new Date().getFullYear();
  public selectedMonth: number = new Date().getMonth() + 1;
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
          labelString: 'Week Number'
        }
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Number of Defects'
        },
        ticks: {
          beginAtZero: true
        }
      }]
    },
    legend: {
      display: true,
      position: 'bottom'
    },
    tooltips: {
      callbacks: {
        label: (tooltipItem) => {
          return `Week ${tooltipItem.xLabel}: ${tooltipItem.yLabel} Defects`;
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
        this.fetchWeeklyDefects();
      }
    });
  }

  fetchWeeklyDefects(): void {
    if (this.selectedProjectId && this.selectedYear && this.selectedMonth) {
      this.projectService.getWeeklyDefectsByMonth(this.selectedProjectId, this.selectedYear, this.selectedMonth)
        .subscribe((defectsData: { weekNumber: number, numberOfDefects: number }[]) => {
          if (defectsData.length > 0) {
            const weekNumbers = defectsData.map(item => `Week ${item.weekNumber}`);
            const defectsCount = defectsData.map(item => item.numberOfDefects);

            this.lineChartLabels = weekNumbers;
            this.lineChartData = [{
              data: defectsCount,
              label: `Project ${this.selectedProjectId} Defects for ${this.selectedYear}-${this.selectedMonth}`,
              fill: false,
              borderColor: 'blue',
              backgroundColor: 'rgba(255, 0, 0, 0.2)',
            }];
          } else {
            // No data found, display "No Data Available"
            this.lineChartLabels = Array.from({ length: 5 }, (_, i) => `Week ${i + 1}`);
            this.lineChartData = [{
              data: new Array(5).fill(0),  // Default data of 0 for all weeks
              label: `No Data Available`,
              fill: false,
              borderColor: 'gray',
              backgroundColor: 'rgba(128, 128, 128, 0.2)',
            }];
          }
        }, error => {
          // Handle the error case if something goes wrong with the API call
          this.lineChartLabels = Array.from({ length: 5 }, (_, i) => `Week ${i + 1}`);
          this.lineChartData = [{
            data: new Array(5).fill(0),  // Default data of 0 for all weeks
            label: `No Data Available`,
            fill: false,
            borderColor: 'gray',
            backgroundColor: 'rgba(128, 128, 128, 0.2)',
          }];
        });
    } else {
      // Clear chart data when selection is invalid (no project or year or month selected)
      this.lineChartLabels = Array.from({ length: 5 }, (_, i) => `Week ${i + 1}`);
      this.lineChartData = [{
        data: new Array(5).fill(0),  // Default data of 0 for all weeks
        label: `No Data Available`,
        fill: false,
        borderColor: 'gray',
        backgroundColor: 'rgba(128, 128, 128, 0.2)',
      }];
    }
  }
}