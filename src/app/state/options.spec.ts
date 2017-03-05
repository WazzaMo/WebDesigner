/*
 * (c) Copyright 2017 Warwick Molloy
 *
 * Licence: GNU Public Licence version 3
 * See LICENCE.md in project directory
 * See https://www.gnu.org/licenses/lgpl.md
 */


import { Options, copyOptions } from './options';

import { Value } from '../spec/value.helper';

function getNumberOfProperties(someObject: Object) : number {
    let count = 0;
    for(let item in someObject) {
        count++;
    }
    return count;
}

function an_option() : Options {
    let some_options : Options = {};
    Value.do_a_number_of_times( id => {
        let name = Value.a_string();
        while(some_options[name] != undefined) {
            name = Value.a_string();
        }
        some_options[name] = Value.a_string_array();
    });
    return some_options;
}

function arrayMatch(someStrings: Array<string>, otherStrings: Array<string>) : boolean {
    return someStrings.join() == otherStrings.join();
}

function allOptionsAreMatched(first: Options, second: Options): boolean {
    for(let optionName in first) {
        let firstValues = first[optionName];
        let secondValues = second[optionName];
        if (second === undefined) return false;
        if (! arrayMatch(firstValues, secondValues)) return false;
    }
    return true;
}

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
                    expect(arrayMatch(subjectItem, sourceItem)).toBeTruthy();
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