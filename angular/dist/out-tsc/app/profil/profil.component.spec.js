import { TestBed } from '@angular/core/testing';
import { ProfilComponent } from './profil.component';
describe('ProfilComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProfilComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(ProfilComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=profil.component.spec.js.map