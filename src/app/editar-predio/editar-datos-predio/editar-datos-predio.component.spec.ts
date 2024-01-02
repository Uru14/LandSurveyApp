import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarDatosPredioComponent } from './editar-datos-predio.component';

describe('EditarDatosPredioComponent', () => {
  let component: EditarDatosPredioComponent;
  let fixture: ComponentFixture<EditarDatosPredioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarDatosPredioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarDatosPredioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
