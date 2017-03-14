/*
 * (c) Copyright 2017 Warwick Molloy
 *
 * Licence: GNU Public Licence version 3
 * See LICENCE.md in project directory
 * See https://www.gnu.org/licenses/lgpl.md
 */

import {
    jQueryFind,
    jQueryCss,
    SetupValues,
    setupJQueryMock
} from '../spec/jquery.helper';

import { ElementRef } from '@angular/core';


import {
    JQueryNode,
    JQueryNodeImpl,
    NullJQueryNode
} from './jquery-node';

import {
    JQueryElement,
    JQueryElementFactory
} from './jquery-element';

import {
    JQueryTools
} from './jquery-tools';

describe('JQueryTools.findFirst', ()=>{
    describe('JQueryNode type', () => {
        let errorHandler: () => void;
        let jqueryNode: JQueryNode;

        beforeEach(() => {
            jqueryNode = new JQueryNodeImpl( 'the-node');
        })

        it('called errorHandler when selector not found', () => {
            errorHandler = jasmine.createSpy('errorHandler');
            setupJQueryMock();

            JQueryTools.findFirst(jqueryNode, 'selector', errorHandler);
            expect(errorHandler).toHaveBeenCalled();
        })

        it('returns a NullJQueryNode when selector not found', () => {
            let value = JQueryTools.findFirst(jqueryNode, 'selector');
            expect( value.isEmpty()).toBeTruthy();
        })

        describe('for a JQueryNode with children matching selector', () => {
            let expected_node;
            let setup: SetupValues;
            let parentNode: JQueryNode;
            let value: JQueryNode;

            beforeEach(()=> {
                expected_node = 'expected_node';
                setup = <SetupValues> {
                    find_result: [expected_node, 'other-node']
                }
                setupJQueryMock(setup);
                parentNode = new JQueryNodeImpl('parent');
                value = JQueryTools.findFirst(parentNode, 'selector');
            })

            it('causes jQuery to be called with the selector', ()=>{
                expect(jQueryFind).toHaveBeenCalledWith('selector');
            })

            it('should return a proper node', () => expect(value.isEmpty()).toBeFalsy());

            it('returns the expected HTML node', () => {
                expect(value.getNode()).toBe(expected_node);
            })
        })

        describe('for an array of JQueryNode', () => {
            let expected_node;
            let setup: SetupValues;
            let parentNodes: Array<JQueryNode>;
            let value: JQueryNode;

            beforeEach(()=> {
                expected_node = 'expected_node';
                setup = <SetupValues> {
                    find_result: [expected_node, 'other-node']
                }
                setupJQueryMock(setup);
                parentNodes = [new JQueryNodeImpl('parent')];
                value = JQueryTools.findFirst(parentNodes, 'selector');
            })

            it('returns a populated node', ()=>expect(value.isEmpty()).toBeFalsy());
            it('returns the expected node', ()=>expect(value.getNode()).toBe(expected_node));
        })

        describe('for a JQueryElement', () => {
            let expected_node;
            let setup: SetupValues;
            let element:ElementRef;
            let parentElement: JQueryElement;
            let value: JQueryNode;

            beforeEach(()=> {
                expected_node = 'expected_node';
                setup = <SetupValues> {
                    find_result: [expected_node, 'other-node']
                }
                setupJQueryMock(setup);
                element = <ElementRef><any> { nativeElement: 'an-element'};
                parentElement = new JQueryElementFactory().createJQueryElement(element);
                value = JQueryTools.findFirst(parentElement, 'selector');
            })

            it('returns a populated node', ()=>expect(value.isEmpty()).toBeFalsy());
        })
    })
})