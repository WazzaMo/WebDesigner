
import { ElementRef } from '@angular/core';

declare var jQuery : any;

export class JQueryElement {
    private jQueryElement: any;

    constructor(private element: ElementRef) {
        this.jQueryElement = jQuery(element.nativeElement);
    }

    public find(selector: string) : any {
        return this.jQueryElement.find(selector);
    }
}