import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { TaskManagementComponent } from './task-management/task-management.component';
import { HeaderComponent } from './header/header.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { AllProjectsComponent } from './all-projects/all-projects.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';

import { UpdateProjectComponent } from './update-project/update-project.component';
import { AddStatusComponent } from './add-status/add-status.component';
import { TeamCompositionChartComponent } from './team-composition-chart/team-composition-chart.component';
import { ProjectStatusChartComponent } from './project-status-chart/project-status-chart.component';
import {ChartsModule} from 'ng2-charts';
import { MonthlyStatusComponent } from './monthly-status/monthly-status.component';
import { StatusLineChartComponent } from './status-line-chart/status-line-chart.component';
import { WeeklyStatusComponent } from './weekly-status/weekly-status.component';
import { WeeklyDefectsLineChartComponent } from './weekly-defects-line-chart/weekly-defects-line-chart.component';



@NgModule({
  declarations: [
    AppComponent,
    ProjectFormComponent,
    TaskManagementComponent,
    HeaderComponent,
    AboutUsComponent,   
    AllProjectsComponent,    
    ProjectDetailsComponent,                 
    UpdateProjectComponent,
    AddStatusComponent,
    TeamCompositionChartComponent,
    ProjectStatusChartComponent,
    MonthlyStatusComponent,
    StatusLineChartComponent,
    WeeklyStatusComponent,
    WeeklyDefectsLineChartComponent                   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ChartsModule,
    ReactiveFormsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }