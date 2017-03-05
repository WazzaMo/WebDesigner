
import { ElementRef, Injectable } from '@angular/core';

declare var jQuery : any;


export interface JQueryElement {
    find(selector: string) : any;
}

export class JQueryElementImpl implements JQueryElement {
    private jQueryElement: any;

    constructor(private element: ElementRef) {
        this.jQueryElement = jQuery(element.nativeElement);
    }

    public find(selector: string) : any {
        return this.jQueryElement.find(selector);
    }
}

@Injectable()
export class JQueryElementFactory {
    createJQueryElement(element: ElementRef) : JQueryElement {
        return new JQueryElementImpl(element);
    }
}