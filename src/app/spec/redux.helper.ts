/*
 * (c) Copyright 2017 Warwick Molloy
 *
 * Licence: Lesser GNU Public Licence version 3
 * See LGPL-LICENCE.md in same directory, or
 * See https://www.gnu.org/licenses/lgpl-3.0.en.html
 */


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

