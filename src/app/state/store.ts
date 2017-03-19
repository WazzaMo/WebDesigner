/*
 * (c) Copyright 2017 Warwick Molloy
 *
 * Licence: GNU Public Licence version 3
 * See LICENCE.md in project directory
 * See https://www.gnu.org/licenses/lgpl.md
 */


import { Action } from 'redux';

import {
    ApplicationState,
    SelectionAction,
    StateActions,
    Entity,
    EntityComponent,
    EntityHierarchy,
    HierarchyAction,
    HierarchyActionKind,
    EntitySelection
} from '.';


export const INITIAL_STATE : ApplicationState  = {
    selected: <EntitySelection> { name: '-root-', id: 0, options: {}},
    hierarchy: new EntityHierarchy(
            new Entity('-root-', 0, [
                {name: 'base', styles: [
                    {cssKey: 'background-color', cssValue: 'black;'},
                    {cssKey: 'color', cssValue: 'white'}
                ]}
            ]
        )
    )
}

export function rootReducer(
    lastState: ApplicationState,
    action: SelectionAction | HierarchyAction | Action
): ApplicationState {
    switch(action.type) {
        case StateActions.SELECTION:
            return selectionReducer(lastState, <SelectionAction> action);
        case StateActions.HIERARCHY:
            return hierarchyReducer(lastState, <HierarchyAction>action);
        default: return lastState;
    }
}

function selectionReducer(lastState: ApplicationState, action: SelectionAction): ApplicationState {
    let next: ApplicationState  = {
        selected: action.value,
        hierarchy: EntityHierarchy.copyFrom(lastState.hierarchy)
    }
    return next;
}

function hierarchyReducer(lastState: ApplicationState, action: Action) : ApplicationState {
    let hierarchyAction = <HierarchyAction> action;
    let next: EntityHierarchy;

    if (hierarchyAction.actionKind == HierarchyActionKind.ADD_TO_SELECTED) {
        let parentId: number = lastState.selected.id;
        next = EntityHierarchy.addEntity('New Entity', parentId, lastState.hierarchy);
    } else {
        next = lastState.hierarchy;
    }
    return {
        selected: lastState.selected,
        hierarchy: next
    };
}