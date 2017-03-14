/*
 * (c) Copyright 2017 Warwick Molloy
 *
 * Licence: GNU Public Licence version 3
 * See LICENCE.md in project directory
 * See https://www.gnu.org/licenses/lgpl.md
 */

import {
    JQueryNode,
    JQueryNodeImpl,
    NullJQueryNode
} from './jquery-node';

import {
    JQueryElement
} from './jquery-element';

function getFirstOfList(
    list: Array<JQueryNode>,
    error ?: () => void
) : JQueryNode {
    if (list.length > 0) {
        return list[0];
    } else {
        if (error) error();
        return new NullJQueryNode();
    }
}

function SafeFindFirstNode(
    node: JQueryNode,
    selector: string,
    doThisIfEmpty?: () => void
) : JQueryNode {
    return getFirstOfList(node.find(selector),doThisIfEmpty);
}

function SafeFindFirstNodeFromFirstNode(
    nodes: Array<JQueryNode>,
    selector: string,
    doThisIfEmpty?: () => void
) : JQueryNode {
    let firstNode: JQueryNode;
    let parent: JQueryNode;

    parent = getFirstOfList(nodes, doThisIfEmpty);
    if (parent) {
        firstNode = getFirstOfList(parent.find(selector), doThisIfEmpty);
    } else {
        firstNode = new NullJQueryNode();
    }
    return firstNode;
}

function SafeFindFirstFromElement(
    element: JQueryElement,
    selector: string,
    doThisIfEmpty ?: () => void
): JQueryNode {
    let node: any = getFirstOfList(element.find(selector), doThisIfEmpty);
    if (node.constructor.name != 'NullJQueryNode') {
        return node;
    }
    return node;
}

export const JQueryTools = {
    findFirst(
        node: JQueryNode | Array<JQueryNode> | JQueryElement,
        selector: string,
        doThisIfEmpty ?: () => void
    ) : JQueryNode {
        // debugger
        switch (node.constructor.name) {
            case "JQueryNodeImpl":
                return SafeFindFirstNode(<JQueryNode>node, selector, doThisIfEmpty);

            case "Array":
                let nodeList = <Array<JQueryNode>>node;
                if (nodeList.length > 0 && nodeList[0].constructor.name == 'JQueryNodeImpl') {
                    return SafeFindFirstNodeFromFirstNode(<Array<JQueryNode>> node, selector, doThisIfEmpty);
                }
                break; 

            case "JQueryElementImpl":
                return SafeFindFirstFromElement(<JQueryElement> node, selector, doThisIfEmpty);

            default:
                break;
        }
        if (doThisIfEmpty) doThisIfEmpty();
        return new NullJQueryNode();
    }


}
