import { TestBed } from '@angular/core/testing';
import { KorisniciService } from './korisnici.service';
describe('KorisniciService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(KorisniciService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=korisnici.service.spec.js.map