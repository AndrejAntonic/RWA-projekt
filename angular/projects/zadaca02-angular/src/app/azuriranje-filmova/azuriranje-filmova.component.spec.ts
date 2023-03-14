import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AzuriranjeFilmovaComponent } from './azuriranje-filmova.component';

describe('AzuriranjeFilmovaComponent', () => {
  let component: AzuriranjeFilmovaComponent;
  let fixture: ComponentFixture<AzuriranjeFilmovaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AzuriranjeFilmovaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AzuriranjeFilmovaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
