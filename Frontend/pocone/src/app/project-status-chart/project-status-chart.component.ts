import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { ProjectService } from '../Services/project.service';
import { Project } from '../Models/project.model';

@Component({
  selector: 'app-project-status-chart',
  templateUrl: './project-status-chart.component.html',
  styleUrls: ['./project-status-chart.component.css']
})
export class ProjectStatusChartComponent implements OnInit {
  projects: Project[] = [];
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Project name'
        },
        
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
        label: (tooltipItem: any, data: any) => {
          const datasetLabel = data.datasets[tooltipItem.datasetIndex].label || '';
          const value = tooltipItem.yLabel;
          const status = this.getStatusFromValue(value);
          return `${datasetLabel}: ${status}`;
        }
      }
    },
    hover: {
      
      onHover: (event, chartElement) => {
        
        if (event && event.target) {
          (event.target as HTMLElement).style.cursor = chartElement.length ? 'pointer' : 'default';
        }
      }
    }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Project Status', backgroundColor: [] }
  ];

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectService.getAllProjects().subscribe((projects: Project[]) => {
      this.projects = projects;
      this.fetchProjectStatuses();
    });
  }

  fetchProjectStatuses() {
    const statusRequests = this.projects
      .filter(project => project.id !== undefined)
      .map(project =>
        this.projectService.getCurrentStatus(project.id!)
          .toPromise()
          .then(status => status?.status || 'Unknown')
      );

    Promise.all(statusRequests).then(statusResponses => {
      this.updateChart(statusResponses);
    }).catch(error => {
      console.error('Error fetching project statuses:', error);
    });
  }

  updateChart(statusResponses: string[]) {
    const projectNames = this.projects.map(project => project.name);
    const projectStatuses = statusResponses.map(status => {
      switch (status) {
        case 'On Track':
          return 5;
        case 'Slow':
          return 4;
        case 'Risk':
          return 3;
        case 'Deep Risk':
          return 2;
        case 'Not Yet Started':
          return 1;
        default:
          return 0;
      }
    });

    const backgroundColors: string[] = statusResponses.map(status => {
      switch (status) {
        case 'On Track':
          return 'rgb(129, 219, 129)';  // Green
        case 'Slow':
          return '#FFCE56';  // Orange
        case 'Risk':
          return ' #FF9F40';  // Yellow
        case 'Deep Risk':
          return 'rgb(240, 107, 107)';  // Red
        default:
          return 'rgb(128, 128, 128)';  // Gray
      }
    });
    

    
    this.barChartLabels = projectNames;
    this.barChartData = [
      { data: projectStatuses, label: 'Project Status', backgroundColor: backgroundColors }
    ];
  }

  getStatusFromValue(value: number): string {
    switch (value) {
      case 5:
        return 'On Track';
      case 4:
        return 'Slow';
      case 3:
        return 'Risk';
      case 2:
        return 'Deep Risk';
      case 1:
        return 'Not Yet Started';
      default:
        return 'Unknown';
    }
  }
}
