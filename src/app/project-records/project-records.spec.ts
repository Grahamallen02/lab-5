import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectRecords } from './project-records';

describe('ProjectRecords', () => {
  let component: ProjectRecords;
  let fixture: ComponentFixture<ProjectRecords>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectRecords],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectRecords);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
