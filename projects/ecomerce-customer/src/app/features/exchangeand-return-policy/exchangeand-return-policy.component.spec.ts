import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeandReturnPolicyComponent } from './exchangeand-return-policy.component';

describe('ExchangeandReturnPolicyComponent', () => {
  let component: ExchangeandReturnPolicyComponent;
  let fixture: ComponentFixture<ExchangeandReturnPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExchangeandReturnPolicyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExchangeandReturnPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
