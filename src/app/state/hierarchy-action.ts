/*
 * (c) Copyright 2017 Warwick Molloy
 *
 * Licence: GNU Public Licence version 3
 * See LICENCE.md in project directory
 * See https://www.gnu.org/licenses/lgpl.md
 */


import { Injectable } from '@angular/core';
import { Action } from 'redux';

import { Entity } from './entity';
import { EntityHierarchy } from './entity-hierarchy';

export enum HierarchyActionKind {
    ADD_TO_SELECTED,
    REMOVE_SELECTED
}

export interface HierarchyAction extends Action {
    actionKind: HierarchyActionKind;
}