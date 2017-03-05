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