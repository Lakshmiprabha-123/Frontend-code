// import { Component, OnInit } from '@angular/core';
// import { ProjectService } from '../Services/project.service';
// import { Project } from '../Models/project.model';
// import { Label, Color, SingleDataSet } from 'ng2-charts';
// import { Chart, ChartOptions, ChartType } from 'chart.js';

// @Component({
//   selector: 'app-team-composition-chart',
//   templateUrl: './team-composition-chart.component.html',
//   styleUrls: ['./team-composition-chart.component.css']
// })
// export class TeamCompositionChartComponent implements OnInit {
//   projects: Project[] = [];
//   selectedProject: Project | null = null;
//   pieChartLabels: Label[] = [];
//   pieChartData: SingleDataSet = [];
//   pieChartType: ChartType = 'pie';
//   pieChartOptions: ChartOptions = {
//     responsive: true,
//     plugins: {
//       legend: {
//         display: true,
//         position: 'right',
//         align: 'left',  
//         labels: {
//           boxWidth: 20, 
//           padding: 10,  
//         }
//       }
//     }
//   };
//   pieChartOptions: ChartOptions = {
//   responsive: true,
//   plugins: {
//     legend: {
//       display: true,
//       position: 'right',  // Legends on the right side
//       labels: {
//         boxWidth: 20,     // Size of the color box next to the label
//         padding: 15,      // Space between the labels
//         font: {
//           size: 14        // Legend font size
//         },
//         generateLabels: (chart: Chart) => {
//           const data = chart.data;
        
//           if (data.labels && data.datasets && data.datasets[0] && data.datasets[0].data) {
//             return data.labels.map((label: string | number | string[] | number[] | Date, index: number) => {
              
//               const value = data.datasets![0].data![index];  // Get the value from the pie chart data
        
//               // Convert the label to a string, handling arrays and complex types
//               let labelString = '';
        
//               if (typeof label === 'string' || typeof label === 'number') {
//                 labelString = label.toString();  // Direct conversion for strings and numbers
//               } else if (Array.isArray(label)) {
//                 labelString = label.join(', ');  // Convert arrays to a comma-separated string
//               } else if (label instanceof Date) {
//                 labelString = label.toDateString();  // Convert Date objects to a readable string
//               }
        
//               // Check if backgroundColor is an array before accessing it
//               const backgroundColor = data.datasets![0].backgroundColor;
//               let fillStyle = '#000';  // Default to black if color is not found
        
//               if (Array.isArray(backgroundColor)) {
//                 fillStyle = (backgroundColor[index] as string) || '#000';  // Access the color safely
//               }
        
//               return {
//                 text: `${labelString}: ${value}`,  // Combine the label and value for the legend
//                 fillStyle: fillStyle,  // Set the color for the legend
//                 strokeStyle: '#fff',  // White stroke for the legend box
//                 lineWidth: 2,
//                 hidden: isNaN(value as number) || value === null,  // Hide if value is NaN or null
//                 index: index
//               };
//             });
//           }
        
//           return [];
//         }
               
        
        
//       }
//     }
//   },
//   layout: {
//     padding: {
//       right: 20,  // Add extra padding on the right for the legend
//     }
//   }
// };

//   pieChartColors: Color[] = [
//     {
//       backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#E6E6FA', '#F08080', '#90EE90', '#FFA07A' ]
//     }
//   ];

//   constructor(private projectService: ProjectService) {}

//   ngOnInit(): void {
//     this.projectService.getAllProjects().subscribe((projects: Project[]) => {
//       this.projects = projects;
//       if (this.projects.length > 0) {
//         this.onProjectSelect({ target: { value: this.projects[0].id } });
//       }
//     });
//   }

//   onProjectSelect(event: any): void {
//     const selectedProjectId = +event.target.value;
//     const selectedProject = this.projects.find(project => project.id === selectedProjectId);

//     if (selectedProject && selectedProject.status) {
//       const teamComposition = selectedProject.status.teamComposition;
//       this.pieChartLabels = Object.keys(teamComposition);
//       this.pieChartData = Object.values(teamComposition);
//       this.selectedProject = selectedProject;
//     } else {
//       this.pieChartLabels = [];
//       this.pieChartData = [];
//       this.selectedProject = null;
//     }
//   }
// }
import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../Services/project.service';
import { Project } from '../Models/project.model';
import { Label, Color, SingleDataSet } from 'ng2-charts';
import { ChartOptions, Chart, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-team-composition-chart',
  templateUrl: './team-composition-chart.component.html',
  styleUrls: ['./team-composition-chart.component.css']
})
export class TeamCompositionChartComponent implements OnInit {
  projects: Project[] = [];
  selectedProject: Project | null = null;
  pieChartLabels: Label[] = [];
  pieChartData: SingleDataSet = [];
  pieChartType: ChartType = 'pie'; // Use ChartType for chart type
  pieChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'right',
        align: 'left',
        labels: {
          generateLabels: (chart: any) => {
            const data = chart.data;
            if (data.labels && data.datasets && data.datasets[0] && data.datasets[0].data) {
              return data.labels.map((label: string | number, index: number) => {
                const value = data.datasets[0].data[index] as number;
                const labelText = typeof label === 'string' || typeof label === 'number' ? label.toString() : '';
      
                // Log the label and value to the console
                console.log(`Legend Item - Label: ${labelText}, Value: ${value} members`);
      
                // Ensure backgroundColor is an array and safely access it
                const backgroundColor = data.datasets[0].backgroundColor as string[];
                const fillStyle = Array.isArray(backgroundColor) ? backgroundColor[index] : '#000';
      
                return {
                  text: `${label}: ${value} members`,
                  fillStyle: fillStyle,
                  strokeStyle: '#fff',
                  lineWidth: 2,
                  hidden: false,
                  index: index
                };
              });
            }
            return [];
          }
        }
      }
      
      
      
    }
  };
  pieChartColors: Color[] = [
    {
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#E6E6FA', '#F08080', '#90EE90', '#FFA07A']
    }
  ];

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    console.log('Component initialized');
    this.projectService.getAllProjects().subscribe((projects: Project[]) => {
      this.projects = projects;
      if (this.projects.length > 0) {
        this.onProjectSelect({ target: { value: this.projects[0].id } });
      }
    });
  }

  onProjectSelect(event: any): void {
    const selectedProjectId = +event.target.value;
    const selectedProject = this.projects.find(project => project.id === selectedProjectId);
  
    if (selectedProject && selectedProject.status) {
      const teamComposition = selectedProject.status.teamComposition;
  
      // Log the team composition object to the console
      console.log('Team Composition:', teamComposition);
  
      this.pieChartLabels = Object.keys(teamComposition);
      this.pieChartData = Object.values(teamComposition);
  
      // Log the labels and data for the chart
      console.log('Pie Chart Labels:', this.pieChartLabels);
      console.log('Pie Chart Data (Number of Members):', this.pieChartData);
  
      this.selectedProject = selectedProject;
    } else {
      this.pieChartLabels = [];
      this.pieChartData = [];
      this.selectedProject = null;
    }
  }
  
}
