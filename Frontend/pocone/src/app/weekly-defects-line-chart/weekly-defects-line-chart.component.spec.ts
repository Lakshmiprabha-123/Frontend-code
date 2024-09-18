import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyDefectsLineChartComponent } from './weekly-defects-line-chart.component';

describe('WeeklyDefectsLineChartComponent', () => {
  let component: WeeklyDefectsLineChartComponent;
  let fixture: ComponentFixture<WeeklyDefectsLineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeeklyDefectsLineChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeeklyDefectsLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
