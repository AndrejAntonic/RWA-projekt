import { TestBed } from '@angular/core/testing';
import { FilmComponent } from './film.component';
describe('FilmComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FilmComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(FilmComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=film.component.spec.js.map