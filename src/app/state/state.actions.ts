import { Injectable } from '@angular/core';
import { Action } from 'redux';

import { Options } from './options';
import { SelectionAction } from './selection-action';
import { ObjectSelection } from './object-selection';

@Injectable()
export class StateActions {
    static SELECTION = 'SELECTION';

    select(selection: ObjectSelection) : SelectionAction {
        return { type: StateActions.SELECTION, value: selection };
    }
}