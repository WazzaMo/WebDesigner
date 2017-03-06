/*
 * (c) Copyright 2017 Warwick Molloy
 *
 * Licence: GNU Public Licence version 3
 * See LICENCE.md in project directory
 * See https://www.gnu.org/licenses/lgpl.md
 */

export interface JQueryNode {
    css(key: string, value: string);
    find(selector: string) : JQueryNode;
}
