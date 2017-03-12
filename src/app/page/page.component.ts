/*
 * (c) Copyright 2017 Warwick Molloy
 *
 * Licence: GNU Public Licence version 3
 * See LICENCE.md in project directory
 * See https://www.gnu.org/licenses/lgpl.md
 */


import {
  Component,
  OnInit,
  ElementRef 
} from '@angular/core';

import { NgRedux } from '@angular-redux/store';

import {
  JQueryElement, JQueryElementFactory,
  JQueryNode, 
  JQueryOperators,
  NullJQueryNode
} from '../jquery';

import { StateActions } from '../state/state.actions';
import { Options } from '../state/options';

import { 
  EntitySelection,
  ApplicationState,
  Entity,
  EntityHierarchy
} from '../state';

@Component({
  selector: 'design-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
  private _templateRoot: JQueryElement;
  private pageRoot : Array<JQueryNode>;
  private firstDiv : JQueryNode;

  constructor(
    private ngRedux: NgRedux<ApplicationState>,
    private pageElement: ElementRef,
    private jqueryFactory : JQueryElementFactory,
    private stateActions: StateActions
  ) { }

  ngOnInit() {
    this._templateRoot = this.jqueryFactory.createJQueryElement(this.pageElement);
    this.pageRoot = this._templateRoot.find('#page');
    if (this.pageRoot.length) {
      let theDivs = this.pageRoot[0].find('div');
      this.firstDiv = theDivs.length > 0 ? theDivs[0] : new NullJQueryNode();
    } else {
      this.firstDiv = new NullJQueryNode();
      console.error("page.component.html is missing an element with id #page");
    }
  }

  public setColor(color: string) : void {
    this.firstDiv.css('color', color);
  }

  public clickedObject(name: string, options: Options) {
    this.ngRedux.dispatch( this.stateActions.select(<EntitySelection>{name: name, options: options}) );
  }
}
