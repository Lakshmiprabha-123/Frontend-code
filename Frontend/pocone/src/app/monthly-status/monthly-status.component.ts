import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../Services/project.service';  // Update the path if necessary
import { Chart, ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Project } from '../Models/project.model';

@Component({
  selector: 'app-monthly-status',
  templateUrl: './monthly-status.component.html',
  styleUrls: ['./monthly-status.component.css']
})
export class MonthlyStatusComponent implements OnInit {
  public projects: Project[] = [];
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
          labelString: 'Events'
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
      display: true,
      position: 'bottom',
      labels: {
        fontColor: 'black'
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

  public lineChartType: ChartType = 'line';
  
  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    this.years = Array.from({ length: 10 }, (_, i) => currentYear - i);

    this.selectedYear = currentYear;
    this.selectedMonth = new Date().getMonth() + 1;

    this.projectService.getAllProjects().subscribe((projects: Project[]) => {
      this.projects = projects;
      if (projects.length > 0 && projects[0].id !== undefined) {
        this.selectedProjectId = projects[0].id!;
        this.onProjectSelect();
      }
    });
  }
   selectedProjectName: string = '';
  // onProjectSelect(): void {
  //   if (this.selectedProjectId && this.selectedYear && this.selectedMonth) {
  //     // Retrieve the selected project each time the method is called
  //     const selectedProject = this.projects.find(project => project.id === this.selectedProjectId);
  
  //     if (selectedProject) { // Ensure the project is found
  //       this.projectService.getMonthlyStatus(this.selectedProjectId, this.selectedYear, this.selectedMonth)
  //         .subscribe((statusData: string[]) => {
  //           const flattenedData = statusData.map(status => this.mapStatusToValue(status));
  //           this.lineChartLabels = this.createLabelsForStatusHistory(flattenedData.length);
  //           this.lineChartData = [{
  //             data: flattenedData,
  //             // Dynamically update the label with the selected project's name
  //             label: `${selectedProject.name} Status History (${this.selectedMonth}/${this.selectedYear})`,
  //             fill: false,
  //             borderColor: 'blue',
  //             backgroundColor: 'rgba(0, 0, 255, 0.2)',
  //           }];
  //         });
  //     } else {
  //       console.error('Selected project not found');
  //     }
  //   }
  // }
  onProjectSelect(): void {
    if (this.selectedProjectId && this.selectedYear && this.selectedMonth) {
      this.projectService.getMonthlyStatus(this.selectedProjectId, this.selectedYear, this.selectedMonth)
        .subscribe((statusData: string[]) => {
          if (statusData && statusData.length > 0) {
            const flattenedData = statusData.map(status => this.mapStatusToValue(status));
            this.lineChartLabels = this.createLabelsForStatusHistory(flattenedData.length);
            this.lineChartData = [{
              data: flattenedData,
              label: `Project ${this.selectedProjectId} Status History (${this.selectedMonth}/${this.selectedYear})`,
              fill: false,
              borderColor: 'blue',
              backgroundColor: 'rgba(0, 0, 255, 0.2)',
            }];
          } else {
            // If no data is available, reset the chart to display "No Data Available"
            this.lineChartLabels = this.createLabelsForStatusHistory(5);  // Example: 5 dummy events
            this.lineChartData = [{
              data: Array(5).fill(0),  // No data points
              label: `No Data Available for Project ${this.selectedProjectId} (${this.selectedMonth}/${this.selectedYear})`,
              fill: false,
              borderColor: 'gray',
              backgroundColor: 'rgba(128, 128, 128, 0.2)',
            }];
          }
        }, (error) => {
          // Handle error case by resetting the chart
          console.error("Error fetching data", error);
          this.lineChartLabels = this.createLabelsForStatusHistory(5);
          this.lineChartData = [{
            data: Array(5).fill(0),
            label: 'No data available',
            fill: false,
            borderColor: 'grey',
            backgroundColor: 'rgba(255, 0, 0, 0.2)',
          }];
        });
    }
  }
  private createLabelsForStatusHistory(dataLength: number): Label[] {
    return Array.from({ length: dataLength }, (_, i) => `Event ${i + 1}`);
  }

  onYearChange(year: number): void {
    this.selectedYear = year;
    this.onProjectSelect();
  }

  onMonthChange(month: number): void {
    this.selectedMonth = month;
    this.onProjectSelect();
  }

  onProjectChange(projectId: number): void {
    this.selectedProjectId = projectId;
    this.onProjectSelect();
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