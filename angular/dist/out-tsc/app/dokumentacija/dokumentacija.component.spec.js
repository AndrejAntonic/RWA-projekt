import { TestBed } from '@angular/core/testing';
import { DokumentacijaComponent } from './dokumentacija.component';
describe('DokumentacijaComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DokumentacijaComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(DokumentacijaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=dokumentacija.component.spec.js.map