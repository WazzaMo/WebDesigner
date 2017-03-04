import { Action } from 'redux';

import { ApplicationState } from './application-state';
import { SelectionAction } from './selection-action';
import { StateActions } from './state.actions';

export const INITIAL_STATE : ApplicationState  = {
    selected: { name: '', options: {}}
}

export function rootReducer(lastState: ApplicationState, action: SelectionAction | Action): ApplicationState {
    switch(action.type) {
        case StateActions.SELECTION: return selectionReducer(lastState, <SelectionAction> action);
        default: return lastState;
    }
}

function selectionReducer(lastState: ApplicationState, action: SelectionAction): ApplicationState {
    console.debug("Name: " + action.value.name);
    return { selected: action.value};
}