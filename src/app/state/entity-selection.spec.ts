/*
 * (c) Copyright 2017 Warwick Molloy
 *
 * Licence: GNU Public Licence version 3
 * See LICENCE.md in project directory
 * See https://www.gnu.org/licenses/lgpl.md
 */

import { Options, copyOptions } from './options';
import { EntitySelection, copySelection } from './entity-selection';

import { Value } from '../spec/value.helper';
import { an_option, allOptionsAreMatched } from './option.helpers';



describe('EntitySelection', () =>{
    describe('copySelection', () => {
        let source: EntitySelection;
        let subject: () => EntitySelection;

        beforeAll(()=> {
            source = new EntitySelection(Value.a_string(),an_option());
            subject = () => {
                let copy = copySelection(source);
                return copy;
            }
        })

        it('should copy the name', () => expect(subject().name).toBe(source.name));

        it('should copy the options', () => {
            expect(allOptionsAreMatched(subject().options, source.options)).toBeTruthy()
        });
    })
});