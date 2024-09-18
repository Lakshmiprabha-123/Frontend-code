import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../Services/project.service';
import { Project } from '../Models/project.model'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.css']
})
export class AllProjectsComponent implements OnInit {
  projects: Project[] = [];

  constructor(private projectService: ProjectService, private router: Router) {}
  ngOnInit(): void {
    this.loadProjects();
  }
  loadProjects(): void {
    this.projectService.getAllProjects().subscribe(data => {
      this.projects = data;
      this.projects.forEach(project => {
        this.projectService.getCurrentStatus(project.id!).subscribe(response => {
          project.currentStatus = response.status;
        });
      });
    });
  }
  updateproject(id: number){
    this.router.navigate(['update-project',id]);
  }
  projectdetails(id:number){
    this.router.navigate(['project-details',id]);
  }
  // viewProject(id?: number): void {
  //   if(id!==undefined){
  //   // Navigate to view details page or open a modal
  //   console.log('View project with ID:', id);
  // }else{
  //   console.error('Project ID is undefined');
  // }
// }

deleteProject(id?: number): void {
  if (id !== undefined) {
    this.projectService.deleteProject(id).subscribe(() => {
      this.loadProjects(); // Refresh the list after deletion
    });
  } else {
    console.error('Project ID is undefined');
  }
}
addstatus(id:number):void{
  this.router.navigate(['add-status',id]);
}
goBack() {
  this.router.navigate(['/projects']); // Adjust the route to your "Project List" page
}
}

  