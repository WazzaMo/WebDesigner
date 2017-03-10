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
    jQuery,
    setupJQueryMock,
    SetupValues
} from '../spec/jquery.helper';

import { Value } from '../spec/value.helper';

import { JQueryNode, JQueryNodeImpl } from './jquery-node';

describe('JQueryNodeImpl', () => {
    let an_element : any;
    let jqueryNode : JQueryNode;

    beforeEach(()=>{
        setupJQueryMock();
        an_element = {};
        jqueryNode = new JQueryNodeImpl(an_element);
    })

    describe('css', ()=> {
        let css_key: string;
        let css_value: string;

        beforeEach(()=>{
            css_key = Value.a_string();
            css_value = Value.a_string();
            jqueryNode.css(css_key, css_value);
        })

        it('calls the css function of jQuery with its args', ()=> {
            expect(jQueryCss).toHaveBeenCalledWith(css_key, css_value);
        })

        it('calls the jQuery function with the element argument', () => {
            expect(jQuery).toHaveBeenCalledWith(an_element);
        })
    })

    describe('find', () => {
        let selector: string;
        let expected_node: any;
        let result: any;
        let subject: any;

        beforeEach(() => {
            selector = Value.a_string();
            subject = jQueryFind;
            result = jqueryNode.find(selector);
        })

        it('calls the jQuery find method', () => {
            expect(subject).toHaveBeenCalled();
        })

        it('calls the jQuery find method passing the selector', () => {
            expect(subject).toHaveBeenCalledWith(selector);
        })

        it('never returns undefined', () => {
            expect(result).not.toBeUndefined();
        })

        describe('for success selector with single result, ', () => {
            beforeEach(() => {
                expected_node = {name: Value.a_string()};
                setupJQueryMock(<SetupValues>{find_result: [expected_node]});
                result = jqueryNode.find(selector);
            })

            it('should return array length of 1', () => {
                expect(result.length).toBe(1);
            })

            it('should return value from jQuery find', () => {
                expect(result[0].getNode()).toBe(expected_node);
            })
        })
    })
})