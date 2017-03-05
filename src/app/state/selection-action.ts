/*
 * (c) Copyright 2017 Warwick Molloy
 *
 * Licence: GNU Public Licence version 3
 * See LICENCE.md in project directory
 * See https://www.gnu.org/licenses/lgpl.md
 */

import { Action } from 'redux';
import { ObjectSelection } from './object-selection';

export interface SelectionAction extends Action {
    value: ObjectSelection;
}