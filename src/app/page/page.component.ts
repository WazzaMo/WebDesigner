import {
  Component,
  OnInit,
  ElementRef 
} from '@angular/core';

import { JQueryElement } from '../jquery-element';


@Component({
  selector: 'design-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
  private _templateRoot: JQueryElement;
  private pageRoot : any;
  private firstDiv : any;

  constructor(private pageElement: ElementRef) { }

  ngOnInit() {
    this._templateRoot = new JQueryElement(this.pageElement);
    this.pageRoot = this._templateRoot.find('#page');
    this.firstDiv = this.pageRoot.find('div');
  }

  public setColor(color: string) : void {
    this.firstDiv.css('color', color);
  }
}
