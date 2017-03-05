import { Action } from 'redux';
import { ObjectSelection } from './object-selection';

export interface SelectionAction extends Action {
    value: ObjectSelection;
}