import { TestBed } from '@angular/core/testing';
import { ZanroviComponent } from './zanrovi.component';
describe('ZanroviComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ZanroviComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(ZanroviComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=zanrovi.component.spec.js.map