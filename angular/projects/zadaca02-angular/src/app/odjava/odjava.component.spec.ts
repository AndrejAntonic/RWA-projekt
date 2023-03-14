import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdjavaComponent } from './odjava.component';

describe('OdjavaComponent', () => {
  let component: OdjavaComponent;
  let fixture: ComponentFixture<OdjavaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OdjavaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OdjavaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
