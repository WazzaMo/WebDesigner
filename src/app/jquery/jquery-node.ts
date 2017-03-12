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
    isEmpty() : boolean;
}




export class JQueryNodeImpl implements JQueryNode {
    constructor(private node: any) {
    }

    css(key: string, value: string) : void {
        jQuery(this.node).css(key, value);
    }

    find(selector: string) : Array<JQueryNode> {
        let nodeArray: Array<JQueryNode>;
        let value = jQuery().find(selector);
        if (value.length == 0) {
            nodeArray = [];
        } else {
            nodeArray = [];
            value.forEach(element => nodeArray.push(new JQueryNodeImpl(element)));
        }
        return nodeArray;
    }

    getNode() : any {
        return this.node;
    }

    isEmpty() : boolean { return false; }
}

export class NullJQueryNode implements JQueryNode {
    constructor() {}

    css(key: string, value: string) : void {}

    find(selector: string) : Array<JQueryNode> {
        return [];
    }

    getNode() : any {
        return {} ;
    }

    isEmpty() : boolean { return true; }
}