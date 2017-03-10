/*
 * (c) Copyright 2017 Warwick Molloy
 *
 * Licence: GNU Public Licence version 3
 * See LICENCE.md in project directory
 * See https://www.gnu.org/licenses/lgpl.md
 */

declare var jQuery;

export interface JQueryNode {
    css(key: string, value: string);
    find(selector: string) : Array<JQueryNode>;
    getNode() : any;
}

export class JQueryNodeImpl implements JQueryNode {
    constructor(private node: any) {
    }

    css(key: string, value: string) : void {
        jQuery(this.node).css(key, value);
    }

    find(selector: string) : Array<JQueryNode> {
        let value = jQuery().find(selector);
        return <Array<JQueryNode>>[new JQueryNodeImpl(value[0])];
    }

    getNode() : any {
        return this.node;
    }
}