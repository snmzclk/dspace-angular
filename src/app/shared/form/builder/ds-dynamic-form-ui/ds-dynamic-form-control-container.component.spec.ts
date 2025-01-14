import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, SimpleChange } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TextMaskModule } from 'angular2-text-mask';
import {
  DynamicCheckboxGroupModel,
  DynamicCheckboxModel,
  DynamicColorPickerModel,
  DynamicDatePickerModel,
  DynamicEditorModel,
  DynamicFileUploadModel,
  DynamicFormArrayModel,
  DynamicFormControlModel,
  DynamicFormGroupModel,
  DynamicFormsCoreModule,
  DynamicFormService,
  DynamicInputModel,
  DynamicRadioGroupModel,
  DynamicRatingModel,
  DynamicSelectModel,
  DynamicSliderModel,
  DynamicSwitchModel,
  DynamicTextAreaModel,
  DynamicTimePickerModel
} from '@ng-dynamic-forms/core';
import {
  DynamicNGBootstrapCalendarComponent,
  DynamicNGBootstrapCheckboxComponent,
  DynamicNGBootstrapCheckboxGroupComponent,
  DynamicNGBootstrapInputComponent,
  DynamicNGBootstrapRadioGroupComponent,
  DynamicNGBootstrapSelectComponent,
  DynamicNGBootstrapTextAreaComponent,
  DynamicNGBootstrapTimePickerComponent
} from '@ng-dynamic-forms/ui-ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

import {
  DsDynamicFormControlContainerComponent,
  dsDynamicFormControlMapFn
} from './ds-dynamic-form-control-container.component';
import { SharedModule } from '../../../shared.module';
import { DynamicDsDatePickerModel } from './models/date-picker/date-picker.model';
import { DynamicRelationGroupModel } from './models/relation-group/dynamic-relation-group.model';
import { DynamicListCheckboxGroupModel } from './models/list/dynamic-list-checkbox-group.model';
import { AuthorityOptions } from '../../../../core/integration/models/authority-options.model';
import { DynamicListRadioGroupModel } from './models/list/dynamic-list-radio-group.model';
import { DynamicLookupModel } from './models/lookup/dynamic-lookup.model';
import { DynamicScrollableDropdownModel } from './models/scrollable-dropdown/dynamic-scrollable-dropdown.model';
import { DynamicTagModel } from './models/tag/dynamic-tag.model';
import { DynamicTypeaheadModel } from './models/typeahead/dynamic-typeahead.model';
import { DynamicQualdropModel } from './models/ds-dynamic-qualdrop.model';
import { DynamicLookupNameModel } from './models/lookup/dynamic-lookup-name.model';
import { DsDynamicTypeaheadComponent } from './models/typeahead/dynamic-typeahead.component';
import { DsDynamicScrollableDropdownComponent } from './models/scrollable-dropdown/dynamic-scrollable-dropdown.component';
import { DsDynamicTagComponent } from './models/tag/dynamic-tag.component';
import { DsDynamicListComponent } from './models/list/dynamic-list.component';
import { DsDatePickerComponent } from './models/date-picker/date-picker.component';
import { DsDynamicLookupComponent } from './models/lookup/dynamic-lookup.component';
import { DsDynamicFormArrayComponent } from './models/array-group/dynamic-form-array.component';
import { DsDynamicFormGroupComponent } from './models/form-group/dynamic-form-group.component';
import { DsDynamicRelationGroupComponent } from './models/relation-group/dynamic-relation-group.components';
import { DsDatePickerInlineComponent } from './models/date-picker-inline/dynamic-date-picker-inline.component';

describe('DsDynamicFormControlContainerComponent test suite', () => {

  const authorityOptions: AuthorityOptions = {
    closed: false,
    metadata: 'list',
    name: 'type_programme',
    scope: 'c1c16450-d56f-41bc-bb81-27f1d1eb5c23'
  };
  const formModel = [
    new DynamicCheckboxModel({ id: 'checkbox' }),
    new DynamicCheckboxGroupModel({ id: 'checkboxGroup', group: [] }),
    new DynamicColorPickerModel({ id: 'colorpicker' }),
    new DynamicDatePickerModel({ id: 'datepicker' }),
    new DynamicEditorModel({ id: 'editor' }),
    new DynamicFileUploadModel({ id: 'upload', url: '' }),
    new DynamicFormArrayModel({ id: 'formArray', groupFactory: () => [] }),
    new DynamicFormGroupModel({ id: 'formGroup', group: [] }),
    new DynamicInputModel({ id: 'input', maxLength: 51 }),
    new DynamicRadioGroupModel({ id: 'radioGroup' }),
    new DynamicRatingModel({ id: 'rating' }),
    new DynamicSelectModel({
      id: 'select',
      options: [{ value: 'One' }, { value: 'Two' }],
      value: 'One'
    }),
    new DynamicSliderModel({ id: 'slider' }),
    new DynamicSwitchModel({ id: 'switch' }),
    new DynamicTextAreaModel({ id: 'textarea' }),
    new DynamicTimePickerModel({ id: 'timepicker' }),
    new DynamicTypeaheadModel({ id: 'typeahead' }),
    new DynamicScrollableDropdownModel({
      id: 'scrollableDropdown',
      authorityOptions: authorityOptions
    }),
    new DynamicTagModel({ id: 'tag' }),
    new DynamicListCheckboxGroupModel({
      id: 'checkboxList',
      authorityOptions: authorityOptions,
      repeatable: true
    }),
    new DynamicListRadioGroupModel({
      id: 'radioList',
      authorityOptions: authorityOptions,
      repeatable: false
    }),
    new DynamicRelationGroupModel({
      submissionId: '1234',
      id: 'relationGroup',
      formConfiguration: [],
      mandatoryField: '',
      name: 'relationGroup',
      relationFields: [],
      scopeUUID: '',
      submissionScope: ''
    }),
    new DynamicDsDatePickerModel({ id: 'datepicker' }),
    new DynamicLookupModel({ id: 'lookup' }),
    new DynamicLookupNameModel({ id: 'lookupName' }),
    new DynamicQualdropModel({ id: 'combobox', readOnly: false })
  ];
  const testModel = formModel[8];
  let formGroup: FormGroup;
  let fixture: ComponentFixture<DsDynamicFormControlContainerComponent>;
  let component: DsDynamicFormControlContainerComponent;
  let debugElement: DebugElement;
  let testElement: DebugElement;

  beforeEach(async(() => {

    TestBed.overrideModule(BrowserDynamicTestingModule, {

      set: {
        entryComponents: [DynamicNGBootstrapInputComponent]
      }
    });

    TestBed.configureTestingModule({

      imports: [
        FormsModule,
        ReactiveFormsModule,
        NgbModule.forRoot(),
        DynamicFormsCoreModule.forRoot(),
        SharedModule,
        TranslateModule.forRoot(),
        TextMaskModule
      ],
      providers: [DsDynamicFormControlContainerComponent, DynamicFormService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents().then(() => {

      fixture = TestBed.createComponent(DsDynamicFormControlContainerComponent);

      component = fixture.componentInstance;
      debugElement = fixture.debugElement;
    });
  }));

  beforeEach(inject([DynamicFormService], (service: DynamicFormService) => {

    formGroup = service.createFormGroup(formModel);

    component.group = formGroup;
    component.model = testModel;

    component.ngOnChanges({

      group: new SimpleChange(null, component.group, true),
      model: new SimpleChange(null, component.model, true)
    });

    fixture.detectChanges();
    testElement = debugElement.query(By.css(`input[id='${testModel.id}']`));
  }));

  it('should initialize correctly', () => {
    expect(component.context).toBeNull();
    expect(component.control instanceof FormControl).toBe(true);
    expect(component.group instanceof FormGroup).toBe(true);
    expect(component.model instanceof DynamicFormControlModel).toBe(true);
    expect(component.hasErrorMessaging).toBe(false);
    expect(component.asBootstrapFormGroup).toBe(true);

    expect(component.onControlValueChanges).toBeDefined();
    expect(component.onModelDisabledUpdates).toBeDefined();
    expect(component.onModelValueUpdates).toBeDefined();

    expect(component.blur).toBeDefined();
    expect(component.change).toBeDefined();
    expect(component.focus).toBeDefined();

    expect(component.componentType).toBe(DynamicNGBootstrapInputComponent);
  });

  it('should have an input element', () => {

    expect(testElement instanceof DebugElement).toBe(true);
  });

  it('should listen to native blur events', () => {

    spyOn(component, 'onBlur');

    testElement.triggerEventHandler('blur', null);

    expect(component.onBlur).toHaveBeenCalled();
  });

  it('should listen to native focus events', () => {

    spyOn(component, 'onFocus');

    testElement.triggerEventHandler('focus', null);

    expect(component.onFocus).toHaveBeenCalled();
  });

  it('should listen to native change event', () => {

    spyOn(component, 'onChange');

    testElement.triggerEventHandler('change', null);

    expect(component.onChange).toHaveBeenCalled();
  });

  it('should update model value when control value changes', () => {

    spyOn(component, 'onControlValueChanges');

    component.control.setValue('test');

    expect(component.onControlValueChanges).toHaveBeenCalled();
  });

  it('should update control value when model value changes', () => {

    spyOn(component, 'onModelValueUpdates');

    (testModel as DynamicInputModel).valueUpdates.next('test');

    expect(component.onModelValueUpdates).toHaveBeenCalled();
  });

  it('should update control activation when model disabled property changes', () => {

    spyOn(component, 'onModelDisabledUpdates');

    testModel.disabledUpdates.next(true);

    expect(component.onModelDisabledUpdates).toHaveBeenCalled();
  });

  it('should map a form control model to a form control component', () => {
    const testFn = dsDynamicFormControlMapFn;
    expect(testFn(formModel[0])).toEqual(DynamicNGBootstrapCheckboxComponent);
    expect(testFn(formModel[1])).toEqual(DynamicNGBootstrapCheckboxGroupComponent);
    expect(testFn(formModel[2])).toBeNull();
    expect(testFn(formModel[3])).toEqual(DsDatePickerInlineComponent);
    (formModel[3] as DynamicDatePickerModel).inline = true;
    expect(testFn(formModel[3])).toEqual(DynamicNGBootstrapCalendarComponent);
    expect(testFn(formModel[4])).toBeNull();
    expect(testFn(formModel[5])).toBeNull();
    expect(testFn(formModel[6])).toEqual(DsDynamicFormArrayComponent);
    expect(testFn(formModel[7])).toEqual(DsDynamicFormGroupComponent);
    expect(testFn(formModel[8])).toEqual(DynamicNGBootstrapInputComponent);
    expect(testFn(formModel[9])).toEqual(DynamicNGBootstrapRadioGroupComponent);
    expect(testFn(formModel[10])).toBeNull();
    expect(testFn(formModel[11])).toEqual(DynamicNGBootstrapSelectComponent);
    expect(testFn(formModel[12])).toBeNull();
    expect(testFn(formModel[13])).toBeNull();
    expect(testFn(formModel[14])).toEqual(DynamicNGBootstrapTextAreaComponent);
    expect(testFn(formModel[15])).toEqual(DynamicNGBootstrapTimePickerComponent);
    expect(testFn(formModel[16])).toEqual(DsDynamicTypeaheadComponent);
    expect(testFn(formModel[17])).toEqual(DsDynamicScrollableDropdownComponent);
    expect(testFn(formModel[18])).toEqual(DsDynamicTagComponent);
    expect(testFn(formModel[19])).toEqual(DsDynamicListComponent);
    expect(testFn(formModel[20])).toEqual(DsDynamicListComponent);
    expect(testFn(formModel[21])).toEqual(DsDynamicRelationGroupComponent);
    expect(testFn(formModel[22])).toEqual(DsDatePickerComponent);
    expect(testFn(formModel[23])).toEqual(DsDynamicLookupComponent);
    expect(testFn(formModel[24])).toEqual(DsDynamicLookupComponent);
    expect(testFn(formModel[25])).toEqual(DsDynamicFormGroupComponent);
  });

});
