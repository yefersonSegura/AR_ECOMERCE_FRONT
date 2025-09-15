import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentationProductComponent } from './presentation-product.component';

describe('PresentationProductComponent', () => {
  let component: PresentationProductComponent;
  let fixture: ComponentFixture<PresentationProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PresentationProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PresentationProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
