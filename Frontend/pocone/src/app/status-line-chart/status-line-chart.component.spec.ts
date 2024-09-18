import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusLineChartComponent } from './status-line-chart.component';

describe('StatusLineChartComponent', () => {
  let component: StatusLineChartComponent;
  let fixture: ComponentFixture<StatusLineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusLineChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
