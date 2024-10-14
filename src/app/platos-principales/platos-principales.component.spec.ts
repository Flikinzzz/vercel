import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatosPrincipalesComponent } from './platos-principales.component';

describe('PlatosPrincipalesComponent', () => {
  let component: PlatosPrincipalesComponent;
  let fixture: ComponentFixture<PlatosPrincipalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlatosPrincipalesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlatosPrincipalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
