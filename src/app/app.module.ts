import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NgReduxModule, NgRedux } from '@angular-redux/store';

import { AppComponent } from './app.component';
import { PageComponent } from './page/page.component';
import { InspectorComponent } from './inspector/inspector.component';

import { ApplicationState } from './state/application-state';
import { rootReducer, INITIAL_STATE } from './state/store';
import { StateActions } from './state/state.actions';

@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    InspectorComponent
  ],
  imports: [
    BrowserModule,  
    FormsModule,
    HttpModule,
    NgReduxModule
  ],
  providers: [StateActions],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<ApplicationState>) {
    ngRedux.configureStore(rootReducer, INITIAL_STATE);
  }
}
