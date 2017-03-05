/*
 * (c) Copyright 2017 Warwick Molloy
 *
 * Licence: GNU Public Licence version 3
 * See LICENCE.md in project directory
 * See https://www.gnu.org/licenses/lgpl.md
 */

import { Options } from './options';
import { Value } from '../spec/value.helper';


export function an_option() : Options {
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

export function allArrayValuesMatch(someStrings: Array<string>, otherStrings: Array<string>) : boolean {
    if (someStrings && otherStrings ) {
        return someStrings.join() == otherStrings.join();
    } else {
        return false;
    }
}

export function allOptionsAreMatched(first: Options, second: Options): boolean {
    for(let optionName in first) {
        let firstValues = first[optionName];
        let secondValues = second[optionName];
        if (second === undefined) return false;
        if (! allArrayValuesMatch(firstValues, secondValues)) return false;
    }
    return true;
}