import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeganoComponent } from './vegano.component';

describe('VeganoComponent', () => {
  let component: VeganoComponent;
  let fixture: ComponentFixture<VeganoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VeganoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VeganoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
