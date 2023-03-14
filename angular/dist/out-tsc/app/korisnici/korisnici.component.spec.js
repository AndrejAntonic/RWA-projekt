import { TestBed } from '@angular/core/testing';
import { KorisniciComponent } from './korisnici.component';
describe('KorisniciComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [KorisniciComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(KorisniciComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=korisnici.component.spec.js.map