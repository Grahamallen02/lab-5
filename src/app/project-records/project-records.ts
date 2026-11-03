import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ProjectService, Project } from '../project';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-project-records',
  styleUrl: './project-records.css',
  templateUrl: './project-records.html',
})
export class ProjectRecords implements OnInit {
  projects: Project[] = [];
  editingId: string | null = null;

  projectForm = new FormGroup({
    projectName: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    startDate: new FormControl('', Validators.required),
    dueDate: new FormControl('', Validators.required),
    status: new FormControl('Not Started', Validators.required),
    teamMember: new FormControl('', Validators.required),
    progressNote: new FormControl('')
  });

  constructor(private projectService: ProjectService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    this.projectService.getProjects().subscribe((data) => {
      this.projects = data;
      this.cdr.detectChanges();
    });
  }

  onEdit(project: Project) {
    this.editingId = project._id;
    this.projectForm.setValue({
      projectName: project.projectName,
      description: project.description,
      startDate: project.startDate.substring(0, 10),
      dueDate: project.dueDate.substring(0, 10),
      status: project.status,
      teamMember: project.teamMember,
      progressNote: project.progressNote
    });
  }

  onSubmit() {
    if (this.editingId) {
      this.projectService.updateProject(this.editingId, this.projectForm.value).subscribe(() => {
        this.editingId = null;
        this.projectForm.reset({ status: 'Not Started' });
        this.loadProjects();
      });
    } else {
      this.projectService.addProject(this.projectForm.value).subscribe(() => {
        this.projectForm.reset({ status: 'Not Started' });
        this.loadProjects();
      });
    }
  }

  onDelete(id: string) {
    this.projectService.deleteProject(id).subscribe(() => {
      this.loadProjects();
    });
  }
}
