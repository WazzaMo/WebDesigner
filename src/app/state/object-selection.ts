/*
 * (c) Copyright 2017 Warwick Molloy
 *
 * Licence: GNU Public Licence version 3
 * See LICENCE.md in project directory
 * See https://www.gnu.org/licenses/lgpl.md
 */


import { Options, copyOptions } from './options';

export class ObjectSelection {
    name: string;
    options: Options;

    constructor(name: string, options: Options) {
        this.name = name;
        this.options = options;
    }
}

export function copySelection(source: ObjectSelection) : ObjectSelection {
    return <ObjectSelection>{
        name: source.name,
        options: copyOptions(source.options)
    };
}