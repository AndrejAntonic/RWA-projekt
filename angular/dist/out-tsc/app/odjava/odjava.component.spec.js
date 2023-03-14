import { TestBed } from '@angular/core/testing';
import { OdjavaComponent } from './odjava.component';
describe('OdjavaComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [OdjavaComponent]
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
//# sourceMappingURL=odjava.component.spec.js.map