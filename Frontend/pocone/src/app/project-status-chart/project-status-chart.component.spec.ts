import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectStatusChartComponent } from './project-status-chart.component';

describe('ProjectStatusChartComponent', () => {
  let component: ProjectStatusChartComponent;
  let fixture: ComponentFixture<ProjectStatusChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectStatusChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectStatusChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
