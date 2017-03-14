/*
 * (c) Copyright 2017 Warwick Molloy
 *     Lokel Digital Pty Ltd
 *
 * Licence: GNU Public Licence version 3
 * See LICENCE.md in project directory
 * See https://www.gnu.org/licenses/lgpl.md
 */


import { ElementRef, Injectable } from '@angular/core';

import {
    JQueryNode, JQueryNodeImpl, NullJQueryNode
} from './jquery-node';


declare var jQuery : any;


export interface JQueryElement {
    find(selector: string) : Array<JQueryNode>;
}

export class JQueryElementImpl implements JQueryElement {
    private jQueryNode: JQueryNode;

    constructor(private element: ElementRef) {
        let jqueryElement = jQuery(element.nativeElement);
        this.jQueryNode = new JQueryNodeImpl(jqueryElement);
    }

    public find(selector: string) : Array<JQueryNode> {
        return this.jQueryNode.find(selector);
    }
}

@Injectable()
export class JQueryElementFactory {
    createJQueryElement(element: ElementRef) : JQueryElement {
        return new JQueryElementImpl(element);
    }
}