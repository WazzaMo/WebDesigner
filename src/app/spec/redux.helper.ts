/*
 * (c) Copyright 2017 Warwick Molloy
 *
 * Licence: Lesser GNU Public Licence version 3
 * See LGPL-LICENCE.md in same directory, or
 * See https://www.gnu.org/licenses/lgpl-3.0.en.html
 */


import { NgRedux, DevToolsExtension } from '@angular-redux/store';
export { NgRedux, DevToolsExtension } from '@angular-redux/store';

const MockSubscription = {
    closed: true,
    
    remove(subscription:any): void {},
    add(tearDown:any): any {return MockSubscription},
    unsubscribe() : void {
        console.debug('MockSubscription: unsubscribe called');
    }
}

const MockObservable = {
    subscribe<T>( task: (value: any) => void ) : any {
        console.debug("MockObservable returning MockSubscription");
        debugger;
        return MockSubscription;
    }
}

const MockRedux = {
    dispatch: () => {},

    select<T>(selector: any) : any {
        console.debug("Returning MockObservable: " );
        return MockObservable;
    }
}

export const ReduxHelper = {
    mockRedux: MockRedux,
    provideNgRedux: { provide: NgRedux, useValue: MockRedux }
}; 

