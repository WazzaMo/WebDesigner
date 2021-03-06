/*
 * (c) Copyright 2017 Warwick Molloy
 *
 * Licence: GNU Public Licence version 3
 * See LICENCE.md in project directory
 * See https://www.gnu.org/licenses/lgpl.md
 */

import { Action } from 'redux';
import { EntitySelection } from './entity-selection';

export interface SelectionAction extends Action {
    value: EntitySelection;
}