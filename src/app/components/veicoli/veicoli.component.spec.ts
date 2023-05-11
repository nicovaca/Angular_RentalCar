import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeicoliComponent } from './veicoli.component';

describe('VeicoliComponent', () => {
  let component: VeicoliComponent;
  let fixture: ComponentFixture<VeicoliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VeicoliComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VeicoliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
