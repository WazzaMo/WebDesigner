
import { NgRedux, DevToolsExtension } from '@angular-redux/store';
export { NgRedux, DevToolsExtension } from '@angular-redux/store';

const MockObservable = {
    subscribe: function() : void {}
}

const MockRedux  = {
    dispatch: function() {},
    select: function() {
        return MockObservable;
    }
}

export const ReduxHelper = {
    mockRedux: MockRedux,
    provideNgRedux: { provide: NgRedux, useValue: MockRedux }
}; 

