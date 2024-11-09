import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaAdminComponent } from './pagina-admin.component';

describe('PaginaAdminComponent', () => {
  let component: PaginaAdminComponent;
  let fixture: ComponentFixture<PaginaAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaginaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
