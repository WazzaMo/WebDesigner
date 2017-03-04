
import { ElementRef } from '@angular/core';
import { JQueryElement, JQueryElementFactory } from '../jquery-element';

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