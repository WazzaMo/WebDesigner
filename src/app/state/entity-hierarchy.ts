/*
 * (c) Copyright 2017 Warwick Molloy
 *
 * Licence: GNU Public Licence version 3
 * See LICENCE.md in project directory
 * See https://www.gnu.org/licenses/lgpl.md
 */

import { JQueryElement } from '../jquery/jquery-element';
import { Entity, ViewEntity } from './entity';


export class EntityHierarchy {
    private root: Entity;
    private idToEntity: Array<Entity>;

    public constructor(root ?: Entity) {
        this.root = typeof(root) === 'undefined' ? new Entity('root', 0) : root;
        this.idToEntity= [this.root];
    }

    public static copyFrom(other: EntityHierarchy) : EntityHierarchy {
        if (typeof other === 'undefined') {
            return undefined;
        } else {
            let copy = new EntityHierarchy();
            copy.root = Entity.copyFrom(other.root);
            copy.root.forAll( entity => copy.idToEntity[entity.getId()] = entity );
            return copy;
        }
    }

    public static makeHierarchyView(other:EntityHierarchy) : Array<ViewEntity> {
        let view: Array<ViewEntity> = [];

        other.idToEntity.forEach( (entity: Entity, id: number) => {
            view.push(Entity.makeRenderView(entity));
        });
        return view;
    }

    public static makeRenderView(other: EntityHierarchy) : Array<ViewEntity> {
        let renderView: Array<ViewEntity> = [];
        other.idToEntity.forEach(item => {
            renderView.push(Entity.makeRenderView(item));
        })
        return renderView;
    }

    public static addEntity(
        name: string, parentId: number, toHierarchy: EntityHierarchy
    ) : EntityHierarchy {
        let hierarchy = EntityHierarchy.copyFrom(toHierarchy);
        let parentEntity = hierarchy.idToEntity[parentId];
        hierarchy.idToEntity.push(parentEntity.add(name, hierarchy.getNextId()));
        return hierarchy;
    }

    public forAll(traverser: (entity:Entity, depth: number) => void) : void {
        this.root.forAll(traverser, 0);
    }

    private getNextId() : number {
        return this.idToEntity.length;
    }
}