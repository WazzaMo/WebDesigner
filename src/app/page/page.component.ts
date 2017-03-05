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

import { JQueryElement, JQueryElementFactory } from '../jquery-element';
import { StateActions } from '../state/state.actions';
import { Options } from '../state/options';
import { ObjectSelection } from '../state/object-selection';
import { ApplicationState } from '../state/application-state';

@Component({
  selector: 'design-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
  private _templateRoot: JQueryElement;
  private pageRoot : any;
  private firstDiv : any;

  constructor(
    private ngRedux: NgRedux<ApplicationState>,
    private pageElement: ElementRef,
    private jqueryFactory : JQueryElementFactory,
    private stateActions: StateActions
  ) { }

  ngOnInit() {
    this._templateRoot = this.jqueryFactory.createJQueryElement(this.pageElement);
    this.pageRoot = this._templateRoot.find('#page');
    this.firstDiv = this.pageRoot.find('div');
  }

  public setColor(color: string) : void {
    this.firstDiv.css('color', color);
  }

  public clickedObject(name: string, options: Options) {
    this.ngRedux.dispatch( this.stateActions.select(<ObjectSelection>{name: name, options: options}) );
  }
}
