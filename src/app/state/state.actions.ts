/*
 * (c) Copyright 2017 Warwick Molloy
 *
 * Licence: GNU Public Licence version 3
 * See LICENCE.md in project directory
 * See https://www.gnu.org/licenses/lgpl.md
 */


import { Injectable } from '@angular/core';
import { Action } from 'redux';

import { Options } from './options';
import { SelectionAction } from './selection-action';
import { EntitySelection } from './entity-selection';
import { HierarchyAction, HierarchyActionKind } from './hierarchy-action';

@Injectable()
export class StateActions {
    static SELECTION = 'SELECTION';
    static HIERARCHY = 'HIERARCHY';

    select(selection: EntitySelection) : SelectionAction {
        return {
            type: StateActions.SELECTION,
            value: selection
        };
    }

    addToSelectedEntity() : HierarchyAction {
        return {
            type: StateActions.HIERARCHY,
            actionKind: HierarchyActionKind.ADD_TO_SELECTED
        };
    }
    removeSelectedEntity() : HierarchyAction {
        return {
            type: StateActions.HIERARCHY,
            actionKind: HierarchyActionKind.REMOVE_SELECTED
        };
    }
}