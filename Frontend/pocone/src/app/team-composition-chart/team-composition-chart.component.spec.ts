import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamCompositionChartComponent } from './team-composition-chart.component';

describe('TeamCompositionChartComponent', () => {
  let component: TeamCompositionChartComponent;
  let fixture: ComponentFixture<TeamCompositionChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamCompositionChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamCompositionChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
