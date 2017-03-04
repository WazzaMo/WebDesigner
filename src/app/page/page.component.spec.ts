import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockJQuery } from '../spec/jquery.helper';
import { ReduxHelper } from '../spec/redux.helper';

import {
  StateActions,
  ApplicationState,
  INITIAL_STATE,
  rootReducer
} from '../state';

import { PageComponent } from './page.component';


describe('PageComponent', () => {
  let component: PageComponent;
  let fixture: ComponentFixture<PageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PageComponent
      ],
      imports: [],
      providers: [
        StateActions,
        ReduxHelper.provideNgRedux,
        MockJQuery.provideJQuery
      ],
    });//.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
