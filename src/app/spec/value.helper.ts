/*
 * (c) Copyright 2017 Warwick Molloy
 *
 * Licence: Lesser GNU Public Licence version 3
 * See LGPL-LICENCE.md in same directory, or
 * See https://www.gnu.org/licenses/lgpl-3.0.en.html
 */


export function number_val(magnitude = 100) : number {
    return Math.round(magnitude * Math.random());
}

export function string_val() : string {
    return number_val().toString();
}

export function stringArray_val() : Array<string> {
    let volume = number_val();
    let value = new Array<string>();
    for(let count = 0; count < volume; count++) {
        value.push(string_val());
    }
    return value;
}

export type ActionThing = (index: number) => void;

export function for_some_number( action: ActionThing) : number {
    let volume = number_val();
    for(let count = 0; count < volume; count++ ) {
        action(count);
    }
    return volume;
}

export function getNumberOfProperties(someObject: Object) : number {
    let count = 0;
    for(let item in someObject) {
        count++;
    }
    return count;
}


export const Value = {
    a_number: number_val,
    a_string: string_val,
    a_string_array: stringArray_val,
    do_a_number_of_times: for_some_number,
    get_number_properties: getNumberOfProperties
}
