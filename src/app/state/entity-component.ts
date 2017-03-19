/*
 * (c) Copyright 2017 Warwick Molloy
 *
 * Licence: GNU Public Licence version 3
 * See LICENCE.md in project directory
 * See https://www.gnu.org/licenses/lgpl.md
 */

export interface Style {
    cssKey: string;
    cssValue: string;
}

export interface EntityComponent {
    name: string;
    styles: Array<Style>;
}
