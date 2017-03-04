import { Action } from 'redux';
import { ObjectSelection } from './selection';

export interface SelectionAction extends Action {
    value: ObjectSelection;
}