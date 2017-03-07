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
    jQuery
} from '../spec/jquery.helper';


describe('For all JQuery related classes', () => {
    describe('JQueryElementImpl', () => {
        describe('find', () => {
            let jQuery : any;
            let subject : JQueryElementImpl;
            let selector = Value.a_string();
            let element: ElementRef;

            beforeEach( () => {
                element = jasmine.createSpyObj('ElementRef',['nothing']);
                subject = new JQueryElementImpl(element);
            })

            it('attempts to find the given selector', () => {
                subject.find(selector)
                expect(jQueryFind).toHaveBeenCalledWith(selector);
            })
        });
    })
})