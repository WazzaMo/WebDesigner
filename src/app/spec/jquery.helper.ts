/*
 * (c) Copyright 2017 Warwick Molloy
 *
 * Licence: Lesser GNU Public Licence version 3
 * See LGPL-LICENCE.md in same directory, or
 * See https://www.gnu.org/licenses/lgpl-3.0.en.html
 */

import { ElementRef } from '@angular/core';
import { JQueryElement, JQueryElementFactory } from '../jquery/jquery-element';

export const jQueryFind = jasmine.createSpy('find');

export const jQuery = function() {
    return {
        find: jQueryFind
    };
}
window['jQuery'] = jQuery;


let mockFind = function defaultMockFind(selector: string) : any {
    return { info: '-defaultMockFind value' };
}

const MockJQueryObject = {
    find: mockFind
}

class MockJQueryElement implements JQueryElement {
    find(selector: string) : any {
        return MockJQueryObject;
    }
}

const MockJQueryElementFactory = {
    createJQueryElement(element: ElementRef) : JQueryElement {
        return new MockJQueryElement();
    }
}

export const MockJQuery = {
    provideJQuery : { provide: JQueryElementFactory, useValue: MockJQueryElementFactory },

    setMockFind( a_find: (selector:string) => any) {
        MockJQueryObject.find = a_find;
    }
}