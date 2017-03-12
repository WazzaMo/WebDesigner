/*
 * (c) Copyright 2017 Warwick Molloy
 *
 * Licence: GNU Public Licence version 3
 * See LICENCE.md in project directory
 * See https://www.gnu.org/licenses/lgpl.md
 */


import { Options, copyOptions } from './options';

export class EntitySelection {
    name: string;
    id: number;
    options: Options;

    constructor(name: string, id: number, options: Options) {
        this.name = name;
        this.id = id;
        this.options = options;
    }
}

export function copySelection(source: EntitySelection) : EntitySelection {
    return <EntitySelection>{
        name: source.name,
        id: source.id,
        options: copyOptions(source.options)
    };
}