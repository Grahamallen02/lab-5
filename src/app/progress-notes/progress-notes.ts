
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  selector: 'app-progress-notes',
  styleUrl: './progress-notes.css',
  templateUrl: './progress-notes.html',
})
export class ProgressNotes {
  progressNote = 'Initial progress note';
  projectCodeNotFound = false;

  progressNotesForm = new FormGroup({
    projectCode: new FormControl(''),
    projectName: new FormControl(''),
    date: new FormControl(''),
    currentStatus: new FormControl('Completed'),
    teamMember: new FormControl('')
  });

  updateProjectName() {
    const code = this.progressNotesForm.controls.projectCode.value;

    if (code === 'PPT101') {
      this.progressNotesForm.controls.projectName.setValue('Project Progress Tracker');
    } else if (code === 'WEB202') {
      this.progressNotesForm.controls.projectName.setValue('Website Redesign');
    } else if (code === 'APP303') {
      this.progressNotesForm.controls.projectName.setValue('Mobile Application Development');
    } else if (code === 'DATA404') {
      this.progressNotesForm.controls.projectName.setValue('Data Analytics Dashboard');
    } else {
      this.progressNotesForm.controls.projectName.setValue('');
    }

    this.projectCodeNotFound = code !== '' &&
      !['PPT101', 'WEB202', 'APP303', 'DATA404'].includes(code ?? '');
  }
}
