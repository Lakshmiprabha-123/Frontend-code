import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../Services/project.service';
import { Project } from '../Models/project.model';
import { StatusEnum } from '../enum';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.css']
})
export class UpdateProjectComponent implements OnInit {
  statusEnum = StatusEnum; 
techStackInput: string = '';
id:number=0;
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

 

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.projectService.getProjectById(this.id).subscribe(data => {
      this.project = data;
    }, error => console.log(error));
  }

  onSubmit(){
    this.projectService.updateProject(this.id, this.project).subscribe( data =>{
      this.successMessage = 'Project updated successfully!';
      this.showSuccessMessage = true;
    }
    , error => console.log(error));
  }
  goBack() {
    this.router.navigate(['/all-projects']); 
  }

 
}