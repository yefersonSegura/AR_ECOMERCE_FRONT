import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeeComponent } from './employeee.component';

describe('EmployeeeComponent', () => {
  let component: EmployeeeComponent;
  let fixture: ComponentFixture<EmployeeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
