import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { PageComponent } from './page/page.component';
import { InspectorComponent } from './inspector/inspector.component';

import { NgRedux, DevToolsExtension } from '@angular-redux/store';

import { Observable } from 'rxjs';

import {
  StateActions,
  ApplicationState,
  INITIAL_STATE,
  rootReducer
} from './state';

import { ReduxHelper } from './spec/redux.helper';
import { MockJQuery } from './spec/jquery.helper';


describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        PageComponent,
        InspectorComponent
      ],
      imports: [],
      providers: [
        StateActions,
        ReduxHelper.provideNgRedux,
        MockJQuery.provideJQuery
      ],
    });
  }));


  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
