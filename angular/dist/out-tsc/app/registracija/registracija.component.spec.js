import { TestBed } from '@angular/core/testing';
import { RegistracijaComponent } from './registracija.component';
describe('RegistracijaComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RegistracijaComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(RegistracijaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=registracija.component.spec.js.map