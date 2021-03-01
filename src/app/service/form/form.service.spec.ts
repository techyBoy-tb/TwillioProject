import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FormService } from './form.service';


describe('FormService', () => {
  let service: FormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ]
    });
    service = TestBed.inject(FormService);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });
});
