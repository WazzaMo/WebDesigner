/*
 * (c) Copyright 2017 Warwick Molloy
 *
 * Licence: GNU Public Licence version 3
 * See LICENCE.md in project directory
 * See https://www.gnu.org/licenses/lgpl.md
 */


import { EntitySelection } from './entity-selection';
import { Entity } from './entity';
import { EntityHierarchy } from './entity-hierarchy';


export interface ApplicationState {
    selected: EntitySelection;
    hierarchy: EntityHierarchy;
}
