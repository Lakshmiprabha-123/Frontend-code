import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../Services/project.service';
import { Project } from '../Models/project.model';
import { StatusEnum } from '../enum';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit{
  id: number=0;
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
    currentStatus:''
  };
  constructor( private route:ActivatedRoute, private projectService: ProjectService, private router: Router) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.projectService.getProjectById(this.id).subscribe(data => {
      this.project = data;
    }, error => console.log(error));
}
goBack() {
  this.router.navigate(['/all-projects']); 
}
}
