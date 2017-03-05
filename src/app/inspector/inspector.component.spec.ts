import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgRedux, DevToolsExtension } from '@angular-redux/store';

import { InspectorComponent } from './inspector.component';

import {
  StateActions,
  ApplicationState,
  INITIAL_STATE,
  rootReducer
} from '../state';

import { ReduxHelper } from '../spec/redux.helper';


describe('InspectorComponent', () => {
  let component: InspectorComponent;
  let fixture: ComponentFixture<InspectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        InspectorComponent
      ],
      imports: [],
      providers: [
        StateActions,
        ReduxHelper.provideNgRedux
      ],
    });
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(InspectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
