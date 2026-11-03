import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Project {
  _id: string;
  projectName: string;
  description: string;
  startDate: string;
  dueDate: string;
  status: string;
  teamMember: string;
  progressNote: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiUrl = 'http://localhost:8001/projects';

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }

  addProject(project: any): Observable<any> {
    return this.http.post(this.apiUrl, project);
  }

  updateProject(id: string, project: any): Observable<any> {
    return this.http.put(this.apiUrl + '/' + id, project);
  }

  deleteProject(id: string): Observable<any> {
    return this.http.delete(this.apiUrl + '/' + id);
  }
}
