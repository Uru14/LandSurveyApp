import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstablecerServidorComponent } from './establecer-servidor.component';

describe('EstablecerServidorComponent', () => {
  let component: EstablecerServidorComponent;
  let fixture: ComponentFixture<EstablecerServidorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstablecerServidorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstablecerServidorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
