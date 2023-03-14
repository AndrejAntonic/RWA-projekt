import { TestBed } from '@angular/core/testing';
import { PregledFilmovaComponent } from './pregled-filmova.component';
describe('PregledFilmovaComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PregledFilmovaComponent]
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
//# sourceMappingURL=pregled-filmova.component.spec.js.map