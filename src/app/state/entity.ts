/*
 * (c) Copyright 2017 Warwick Molloy
 *
 * Licence: GNU Public Licence version 3
 * See LICENCE.md in project directory
 * See https://www.gnu.org/licenses/lgpl.md
 */

import { EntityComponent } from './entity-component';


export interface ViewEntity {
    name: string;
    id: number;
    children: Array<ViewEntity>;
    components: Array<EntityComponent>;
}

export class Entity {
    private name: string;
    private id: number;
    private children: Array<Entity>;
    private components: Array<EntityComponent>;

    constructor(
        newName: string,
        newId: number
    ) {
        this.name = newName;
        this.id = newId;
        this.children = [];
    }

    public static copyFrom(other: Entity) : Entity {
        let value: Entity = new Entity(other.name, other.id);
        other.children.forEach(item => {
            let child = Entity.copyFrom(item);
            value.children.push(child);
        });
        return value;
    }

    public static makeHierarchyView(other: Entity) : ViewEntity {
        let root: ViewEntity = {name: other.name, id: other.id, children: [], components:[]};
        other.children.forEach(item => {
            let child:ViewEntity = Entity.makeHierarchyView(item);
            root.children.push(child);
        });
        return root;
    }

    public static makeRenderView(other: Entity) : ViewEntity {
        let view : ViewEntity = {
            name: other.name,
            id: other.id,
            children: [],
            components: other.components
        };
        return view;
    }

    public add(name: string, id: number) : Entity {
        let entity = new Entity(name, id);
        this.children.push(entity);
        return entity;
    }

    isParent() : boolean {
        return this.children.length > 0;
    }

    getId() : number { return this.id;}
    getName() : string { return this.name; }

    forAll(
        task: (anEntity: Entity, depth: number ) => void,
        depth: number = 0
    ) : void {
        task(this, depth);
        this.children.forEach( entity => {
            entity.forAll(task, depth + 1);
        })
    }
}