import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BebestiblesComponent } from './bebestibles.component';

describe('BebestiblesComponent', () => {
  let component: BebestiblesComponent;
  let fixture: ComponentFixture<BebestiblesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BebestiblesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BebestiblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
