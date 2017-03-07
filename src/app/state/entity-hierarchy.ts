/*
 * (c) Copyright 2017 Warwick Molloy
 *
 * Licence: GNU Public Licence version 3
 * See LICENCE.md in project directory
 * See https://www.gnu.org/licenses/lgpl.md
 */

import { JQueryElement } from '../jquery/jquery-element';

export interface EntityComponent {

}

export class EntityItem {
    private name: string;
    private id: number;
    private children: Array<EntityItem>;

    constructor(
        newName: string,
        newId: number
    ) {
        this.name = newName;
        this.id = newId;
        this.children = [];
    }

    isParent() : boolean {
        return this.children.length > 0;
    }
}

export class EntityHierarchy {
    private nextId : number;

}