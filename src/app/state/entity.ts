/*
 * (c) Copyright 2017 Warwick Molloy
 *
 * Licence: GNU Public Licence version 3
 * See LICENCE.md in project directory
 * See https://www.gnu.org/licenses/lgpl.md
 */



export class Entity {
    private name: string;
    private id: number;
    private children: Array<Entity>;

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