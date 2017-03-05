/*
 * (c) Copyright 2017 Warwick Molloy
 *
 * Licence: GNU Public Licence version 3
 * See LICENCE.md in project directory
 * See https://www.gnu.org/licenses/lgpl.md
 */


import { Options, copyOptions } from './options';

import { Value, getNumberOfProperties } from '../spec/value.helper';

import { an_option, allArrayValuesMatch, allOptionsAreMatched } from './option.helpers';


describe('Options', () => {
    describe('copyOptions', () => {

        describe('copy of non-null, empty options object', () => {
            let source: Options;
            let subject: Options;

            beforeEach(() => {
                source = {};
                subject = copyOptions(source);
            });

            it('should be defined', () => expect(subject).toBeDefined());
            it('should not be null', () => expect(subject).not.toBeNull() );
            it('should have no items in it', () => expect(getNumberOfProperties(subject)).toBe(0));
        });

        describe('copy of single item option', () => {
            let source: Options;
            let subject: Options;

            beforeAll(() => {
                source = { single: ['an item']};
                subject = copyOptions(source);
            });

            it('should have one item', () => expect(getNumberOfProperties(subject)).toBe(1));

            it('should have the same value', () => {
                for(let item in subject) {
                    let subjectItem = subject[item];
                    let sourceItem = source[item];
                    console.debug(`For item ${item} : source = ${sourceItem} and copy = ${subjectItem}`);
                    expect(allArrayValuesMatch(subjectItem, sourceItem)).toBeTruthy();
                }
            });
        })

        describe('copy of multiple item options', () => {
            let source: Options;
            let subject: Options;
            let numberOfOptions: number;

            beforeAll(() => {
                source = an_option();
                numberOfOptions = getNumberOfProperties(source);
                subject = copyOptions(source);
            });

            it('should have the right number of options', () => expect(getNumberOfProperties(subject)).toBe(numberOfOptions));

            it('should match all the option values', () => expect(allOptionsAreMatched(source, subject)).toBeTruthy());
        });

    });
});