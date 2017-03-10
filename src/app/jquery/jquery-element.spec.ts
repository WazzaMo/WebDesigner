/*
 * (c) Copyright 2017 Warwick Molloy
 *
 * Licence: GNU Public Licence version 3
 * See LICENCE.md in project directory
 * See https://www.gnu.org/licenses/lgpl.md
 */

import { ElementRef, Injectable } from '@angular/core';

import {
    JQueryNode
} from './jquery-node';

import {
    JQueryElement,
    JQueryElementFactory,
    JQueryElementImpl
} from './jquery-element';

import { Value } from '../spec/value.helper';
import {
    jQueryFind,
    jQuery,
    setupJQueryMock
} from '../spec/jquery.helper';

class JQueryNodeMock implements JQueryNode {
    private cssMock: Function;
    private findMock: Function;

    constructor(findVal: Array<JQueryNode> = []) {
        this.cssMock = jasmine.createSpy('css');
        this.findMock = jasmine.createSpy('find').and.returnValue(findVal);
    }

    css(key: string, value: string) {
        this.cssMock(key, value);
    }

    find(selector: string) : Array<JQueryNode> {
        return this.findMock(selector);
    }

    getNode() : any {
        return {};
    }
}
    
describe('JQueryElementImpl', () => {
    beforeEach(() => {
        setupJQueryMock();
    })

    describe('find', () => {
        let jQuery : any;
        let subject : JQueryElementImpl;
        let selector = Value.a_string();
        let element: ElementRef;
        let mockRootNode: JQueryNodeMock;
        let mockChildNode: JQueryNodeMock;

        beforeEach( () => {
            mockChildNode = new JQueryNodeMock();
            mockRootNode = new JQueryNodeMock([mockChildNode]);
            element = jasmine.createSpyObj('ElementRef',[{'nativeElement': mockRootNode}]);
            setupJQueryMock({find_result: [mockChildNode] })
            subject = new JQueryElementImpl(element);
        })

        it('attempts to find the given selector', () => {
            subject.find(selector)
            expect(jQueryFind).toHaveBeenCalledWith(selector);
        })

        it('returns the child node', () => {
            let result = subject.find(selector);
            expect(result[0]).toBe(mockChildNode);
        })
    });
})