import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../Models/project.model';
import { Status } from '../Models/status.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiUrl = 'http://localhost:8080/projects'; // backend API URL
  
  constructor(private http: HttpClient) {}

  getAllProjects(): Observable<Project[]>{
    return this.http.get<Project[]>(`${this.apiUrl}`);
  }
  saveProject(project: Project): Observable<Object> {
    return this.http.post(`${this.apiUrl}`, project);
  }
  getCurrentStatus(id: number): Observable<{ status: string }> {
    return this.http.get<{ status: string }>(`${this.apiUrl}/${id}/status-alone`);
  }
  // updateProjectStatus(id: number, status: Status[]): Observable<Object>{
  //   return this.http.put(`${this.apiUrl}/${id}`, status);
  // }
  updateProject(id: number, project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.apiUrl}/${id}`, project);
  }
  deleteProject(id: number): Observable<Object>{
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  // getAllStatuses(): Observable<Status[]> {
  //   return this.http.get<Status[]>(`${this.apiUrl}`);
  // }
  saveStatus(id: number, status: Status): Observable<Status> {
    return this.http.post<Status>(`${this.apiUrl}/${id}/status`, status);
  }

  updateStatus(id: number, status: Status): Observable<Status> {
    return this.http.put<Status>(`${this.apiUrl}/${id}/status`, status);
  }
  getProjectById(id: number):Observable<Project>{
    return this.http.get<Project>(`${this.apiUrl}/${id}`);
  }
  getStatus(id: number): Observable<Status> {
    return this.http.get<Status>(`${this.apiUrl}/${id}/status`);
  }

  getMonthlyStatus(id: number, year: number, month: number): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/${id}/status-history`, {
      params: {
        year: year.toString(),
        month: month.toString()
      }
    });
  }
  getStatusHistoryByYear(id: number, year: number): Observable<{month: number,currentStatus: string}[]> {
    return this.http.get<{month: number ,currentStatus: string}[]>(`${this.apiUrl}/${id}/status-history-by-year?year=${year}`);
  }
  getWeeklyStatusByMonth(id: number, year: number, month: number): Observable<{ weekNumber: number, currentStatus: string }[]> {
    return this.http.get<{ weekNumber: number, currentStatus: string }[]>(`${this.apiUrl}/${id}/weekly-status-by-month?month=${month}&year=${year}`);
  }

 getWeeklyDefectsByMonth(id: number, year: number, month: number) {
  return this.http.get<{ weekNumber: number, numberOfDefects: number }[]>(`${this.apiUrl}/${id}/weekly-defects-by-month?month=${month}&year=${year}`);
}
}