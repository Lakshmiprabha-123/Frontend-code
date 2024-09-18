import { Component, OnInit } from '@angular/core';
import { StatusEnum } from '../enum'
import { Status } from '../Models/status.model'
import { ProjectService } from '../Services/project.service'
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../Models/project.model';

@Component({
  selector: 'app-add-status',
  templateUrl: './add-status.component.html',
  styleUrls: ['./add-status.component.css']
})
export class AddStatusComponent implements OnInit {
  teamCompositionLabels = [
    "QA Engineers", 
    "Frontend Developers", 
    "Scrum Master", 
    "Backend Developers", 
    "Technical Lead", 
    "Marketing and Sales", 
    "Stakeholders", 
    "UI/UX Designers", 
    "DevOps Engineers", 
    "BA"
  ];
  statusEnum = StatusEnum;  // Enum reference for template binding

  status: Status = {
    id:0,
    risksInDelivery: false,
    teamComposition: {},
    processFlows: StatusEnum.NOT_YET,
    defectsReport: false,
    numberOfDefects: 0,
    dailyUpdates: StatusEnum.NOT_YET,
    qaUpdates: StatusEnum.NOT_YET,
    sonarqube: StatusEnum.NOT_YET,
    weeklyReports: StatusEnum.NOT_YET,
    closeClientCommunication: StatusEnum.NOT_YET,
    gitReport: StatusEnum.NOT_YET,
    escalation: StatusEnum.NOT_YET,
    boardUpdates: StatusEnum.NOT_YET
  };
  projectId: number = 0;
  teamCompositionString: string = '';
  projects: Project[] =[];
  isUpdateMode: boolean = false;
  successMessage: string = '';  // Property to hold success message
  showSuccessMessage: boolean = false; 

  
 
  constructor(private projectService: ProjectService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['projectId']) {
        this.projectId = +params['projectId'];
        this.checkCurrentStatus();
      }
    });
  
    // this.route.url.subscribe(url => {
    //   if (url.some(segment => segment.path === 'update-status')) {
    //     this.isUpdateMode = true;
    //     this.loadStatus();
    //   }
    // });
  }
  checkCurrentStatus(): void {
    this.projectService.getCurrentStatus(this.projectId).subscribe(response => {
      if (response.status === 'Not Yet Started') {
        this.isUpdateMode = false;
        this.resetForm(); // Reset the form for a fresh status
      } else {
        this.isUpdateMode = true;
        this.loadStatus(); // Load the existing status for update
      }
    });
  }
  loadStatus(): void {
    this.projectService.getStatus(this.projectId).subscribe(fullStatus => {
      this.status = fullStatus;
      this.teamCompositionString = JSON.stringify(this.status.teamComposition); // Convert the team composition back to JSON string for display
    });
  }
  onTeamCompositionChange(label: string, event: Event): void{
    const inputElement = event.target as HTMLInputElement;
    this.status.teamComposition[label] = Number(inputElement.value);
    this.teamCompositionString = JSON.stringify(this.status.teamComposition); 
  }
onSubmit() {
  
  try {
    // Check if the JSON string is not empty
    if (this.teamCompositionString.trim()) {
      this.status.teamComposition = JSON.parse(this.teamCompositionString);
    } else {
      throw new Error('Team composition JSON string is empty');
    }

    if (this.isUpdateMode) {
      this.projectService.updateStatus(this.projectId, this.status).subscribe(response => {
        console.log('Status updated:', response);
        this.successMessage = 'Project status updated successfully!';
          this.showSuccessMessage = true;
        
        
      });
    } else {
      this.projectService.saveStatus(this.projectId, this.status).subscribe(response => {
        console.log('Status added:', response);
        this.successMessage = 'Project status added successfully!';
          this.showSuccessMessage = true;
        
      });
    }
  } catch (e) {
    console.error('Invalid JSON for team composition', e);
  }
}
 
resetForm(): void {
  this.status = {
    id: 0,
    risksInDelivery: false,
    teamComposition: {},
    processFlows: StatusEnum.NOT_YET,
    defectsReport: false,
    numberOfDefects: 0,
    dailyUpdates: StatusEnum.NOT_YET,
    qaUpdates: StatusEnum.NOT_YET,
    sonarqube: StatusEnum.NOT_YET,
    weeklyReports: StatusEnum.NOT_YET,
    closeClientCommunication: StatusEnum.NOT_YET,
    gitReport: StatusEnum.NOT_YET,
    escalation: StatusEnum.NOT_YET,
    boardUpdates: StatusEnum.NOT_YET
  };
  this.teamCompositionString = '';
}
goBack() {
  this.router.navigate(['/all-projects']); // Adjust the route to your "Project List" page
}
}
