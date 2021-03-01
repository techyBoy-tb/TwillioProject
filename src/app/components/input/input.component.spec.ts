import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CustomAngularMaterialModule } from 'src/app/angular-material.modules';
import { FormHelper } from 'src/app/util/form-helper';
import { InputComponent } from './input.component';


describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InputComponent],
      imports: [
        CustomAngularMaterialModule,
        ReactiveFormsModule
      ],
      providers: [
        FormHelper
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(InputComponent);
      component = fixture.componentInstance;
      formBuilder = TestBed.inject(FormBuilder);
      component.control = formBuilder.control('');
      component.control.setParent(formBuilder.group({ unspecified: component.control }));
      fixture.detectChanges();
    });
  }));

  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
