import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosPredioComponent } from './datos-predio.component';

describe('DatosPredioComponent', () => {
  let component: DatosPredioComponent;
  let fixture: ComponentFixture<DatosPredioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosPredioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatosPredioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
