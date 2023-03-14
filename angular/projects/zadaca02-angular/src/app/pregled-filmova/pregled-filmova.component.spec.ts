import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledFilmovaComponent } from './pregled-filmova.component';

describe('PregledFilmovaComponent', () => {
  let component: PregledFilmovaComponent;
  let fixture: ComponentFixture<PregledFilmovaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PregledFilmovaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PregledFilmovaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
