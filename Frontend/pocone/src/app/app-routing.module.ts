import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { AllProjectsComponent } from './all-projects/all-projects.component';
import { UpdateProjectComponent } from './update-project/update-project.component';
import { HeaderComponent } from './header/header.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { TaskManagementComponent } from './task-management/task-management.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { AddStatusComponent } from './add-status/add-status.component';
import { MonthlyStatusComponent } from './monthly-status/monthly-status.component';
import { StatusLineChartComponent } from './status-line-chart/status-line-chart.component';



const routes: Routes = [
  { path: 'task-management', component: TaskManagementComponent },
  { path: 'project-form', component: ProjectFormComponent},
  { path: 'header', component: HeaderComponent },
  {path:'all-projects', component:AllProjectsComponent},
  {path:'update-project/:id',component:UpdateProjectComponent},
  {path:'project-details/:id',component:ProjectDetailsComponent},
  {path:'add-status/:projectId',component:AddStatusComponent},
  {path:'monthly-status',component:MonthlyStatusComponent},
 {path:'status-line-chart',component:StatusLineChartComponent},
  { path: 'about-us', component: AboutUsComponent },
  
  { path: '', redirectTo: '/task-management', pathMatch: 'full' },
  { path: '**', redirectTo: '/task-management' } ]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }