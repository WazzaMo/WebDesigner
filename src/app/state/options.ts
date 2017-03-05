/*
 * (c) Copyright 2017 Warwick Molloy
 *
 * Licence: GNU Public Licence version 3
 * See LICENCE.md in project directory
 * See https://www.gnu.org/licenses/lgpl.md
 */


export interface Options {
    [id:string]: Array<string>
}

function copyStringArray(original: Array<string>) : Array<string> {
    let copy = new Array<string>();
    original.forEach(value => copy.push(value));
    return copy;
}

export function copyOptions(source: Options) : Options {
    let copy = <Options> {};
    let count = 0;
    for(let item in source) {
        copy[item] = copyStringArray(source[item]);
        count++;
    }
    return copy;
}
