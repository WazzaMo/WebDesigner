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

@Injectable()
export class StateActions {
    static SELECTION = 'SELECTION';

    select(selection: EntitySelection) : SelectionAction {
        return { type: StateActions.SELECTION, value: selection };
    }
}