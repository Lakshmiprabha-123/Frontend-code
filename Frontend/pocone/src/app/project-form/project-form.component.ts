import { Component } from '@angular/core';
import { ProjectService } from '../Services/project.service';
import { Project } from '../Models/project.model';
import { StatusEnum } from '../enum';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent {
  statusEnum = StatusEnum;  
  techStackInput: string = '';
  successMessage: string = '';  // Property to hold success message
  showSuccessMessage: boolean = false; 

  project: Project = {
    name: '',
    lead: '',
    techStack: '',
    projectStatus: '',
    startdate: '',
    deadline: '',
    totalPeopleAllocated: 0,
    actualAllocationSOW: 0,
    adrItemDocumentation: StatusEnum.NOT_YET,
    c4Documentation: StatusEnum.NOT_YET,
    salesHandover: StatusEnum.NOT_YET,
    architectureHandover: StatusEnum.NOT_YET,
    decodersRepository: StatusEnum.NOT_YET,
    processAdoptionLatestVersion: StatusEnum.NOT_YET,
    projectKickoff: StatusEnum.NOT_YET,
    projectSharedDocumentRepository: StatusEnum.NOT_YET,
    
  };

  
  constructor(private projectService: ProjectService, private route:ActivatedRoute, private router: Router) {}

  onSubmit() {
    console.log('Project data:', this.project);
    this.projectService.saveProject(this.project).subscribe(
      response => {
        console.log('Project created:', response);
        this.successMessage = 'Project created successfully!';
        this.showSuccessMessage = true;
      },
    );
  }
  goBack() {
    this.router.navigate(['/all-projects']); 
  }
  
}

