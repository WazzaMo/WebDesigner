/*
 * (c) Copyright 2017 Warwick Molloy
 *
 * Licence: GNU Public Licence version 3
 * See LICENCE.md in project directory
 * See https://www.gnu.org/licenses/lgpl.md
 */

import { Entity } from './entity';

import { EntityHierarchy } from './entity-hierarchy';


describe('EntityHierarchy', () => {

    describe('copyFrom', () => {
        let hierarchy: EntityHierarchy;

        it('returns undefined if given undefined', () => {
            expect(EntityHierarchy.copyFrom(undefined)).toBeUndefined();
        })


    })
})